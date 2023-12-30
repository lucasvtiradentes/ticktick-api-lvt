import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { handleRequestWithSchema } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';

const route = '/column/project/:id' as const;

const projectSectionSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
  sortOrder: z.number(),
  createdTime: z.string(),
  modifiedTime: z.string(),
  etag: z.string()
});

const responseSchema = z.array(projectSectionSchema);

async function method(requestConfigs: TRequestConfigs, id: string) {
  const parsedRoute = route.replace(':id', id);
  const requestOptions = parseRequestOptions(requestConfigs, { route: parsedRoute, method: 'GET' });
  return handleRequestWithSchema({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route };
