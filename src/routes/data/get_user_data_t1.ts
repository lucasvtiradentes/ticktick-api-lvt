import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { handleGetRequest } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';
import { addTaskSchema, batchCheckCommonSchema, deleteTaskSchema, updateTaskSchema } from '../../utils/common_schemas';

const route = '/batch/check/1' as const;

const responseSchema = batchCheckCommonSchema.merge(
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
);

async function method(requestConfigs: TRequestConfigs) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'GET' });
  return handleGetRequest({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route };
