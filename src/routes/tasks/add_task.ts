import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { handleRequestWithSchema } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';
import { addTaskSchema, deleteTaskSchema, updateTaskSchema } from '../../utils/common_schemas';

const route = '/batch/task' as const;

const payloadSchema = z.object({
  add: z.array(addTaskSchema),
  update: z.array(updateTaskSchema),
  delete: z.array(deleteTaskSchema),
  addAttachments: z.array(z.any()),
  updateAttachments: z.array(z.any()),
  deleteAttachments: z.array(z.any())
});

export type TAddTaskPayload = z.infer<typeof payloadSchema>;

const responseSchema = z.object({
  id2etag: z.any(),
  id2error: z.any()
});

async function method(requestConfigs: TRequestConfigs, payload: TAddTaskPayload) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'POST', payload });
  return handleRequestWithSchema({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route };
