import { z } from 'zod';
import { addTaskSchema, batchCheckCommonSchema, deleteTaskSchema, updateTaskSchema } from '../../utils/common_schemas';
import { TRequestConfigs } from '../../utils/configs';
import { getRequestOptions } from '../../utils/get_request_options';

const route = '/batch/check/1' as const;

const responseSchema = batchCheckCommonSchema
  .merge(
    z.object({
      syncTaskBean: z.object({
        update: z.array(updateTaskSchema),
        delete: z.array(deleteTaskSchema),
        add: z.array(addTaskSchema),
        deletedInTrash: z.array(deleteTaskSchema),
        deletedForever: z.array(deleteTaskSchema),
        empty: z.boolean()
      })
    })
  )
  .strict();

type TResponse = z.infer<typeof responseSchema>;

async function method(requestConfigs: TRequestConfigs): Promise<TResponse> {
  const options = getRequestOptions(requestConfigs, { route, method: 'GET' });

  return new Promise((resolve) => {
    requestConfigs.request(options, (error, response, body) => {
      const responseData = JSON.parse(body);

      if (requestConfigs.validateSchema) {
        const parsedData = responseSchema.parse(responseData);
        resolve(parsedData as TResponse);
      } else {
        resolve(responseData as TResponse);
      }
    });
  });
}

export const apiMethod = { method, route };
