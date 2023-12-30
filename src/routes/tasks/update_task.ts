import { z } from 'zod';
import { addTaskSchema, deleteTaskSchema, updateTaskSchema } from '../../utils/common_schemas';
import { TRequestConfigs } from '../../utils/configs';
import { getRequestOptions } from '../../utils/get_request_options';

const route = '/batch/task' as const;

const payloadSchema = z.object({
  add: z.array(addTaskSchema),
  update: z.array(updateTaskSchema),
  delete: z.array(deleteTaskSchema),
  addAttachments: z.array(z.any()),
  updateAttachments: z.array(z.any()),
  deleteAttachments: z.array(z.any())
});

export type TUpdateTaskPayload = z.infer<typeof payloadSchema>;

const responseSchema = z.object({
  id2etag: z.any(),
  id2error: z.any()
});

type TResponse = z.infer<typeof responseSchema>;

async function method(requestConfigs: TRequestConfigs, payload: TUpdateTaskPayload): Promise<TResponse> {
  const options = getRequestOptions(requestConfigs, { route, method: 'POST', payload });

  return new Promise((resolve) => {
    requestConfigs.request(options, (error, response, body) => {
      if (requestConfigs.validateSchema) {
        const parsedData = responseSchema.parse(body);
        resolve(parsedData as TResponse);
      } else {
        resolve(body as TResponse);
      }
    });
  });
}

export const apiMethod = { method, route };
