import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { handleGetRequest } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';
import { completedTaskSchema } from '../../utils/common_schemas';

const route = '/project/all/completedInAll' as const;

const responseSchema = z.array(completedTaskSchema);

async function method(requestConfigs: TRequestConfigs) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'GET' });
  return handleGetRequest({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route };
