import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { handleRequestWithSchema, TApiMethod } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';
import { addTaskSchema, batchCheckCommonSchema, deleteTaskSchema, updateTaskSchema } from '../../utils/common_schemas';

const route = '/batch/check/0' as const;

const responseSchema = batchCheckCommonSchema.merge(
  z.object({
    syncTaskBean: z.object({
      update: z.array(updateTaskSchema),
      delete: z.array(deleteTaskSchema),
      add: z.array(addTaskSchema),
      empty: z.boolean()
    })
  })
);

async function method(requestConfigs: TRequestConfigs) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'GET' });
  return handleRequestWithSchema({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route } satisfies TApiMethod;
