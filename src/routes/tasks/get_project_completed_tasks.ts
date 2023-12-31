import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { TApiMethod, handleRequestWithSchema } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';
import { completedTaskSchema } from '../../utils/common_schemas';

const route = '/project/:id/completed' as const;

const responseSchema = z.array(completedTaskSchema);

async function method(requestConfigs: TRequestConfigs, id: string) {
  const parsedRoute = `${route.replace(':id', id)}`;
  const requestOptions = parseRequestOptions(requestConfigs, { route: parsedRoute, method: 'GET' });
  return handleRequestWithSchema({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route } satisfies TApiMethod;
