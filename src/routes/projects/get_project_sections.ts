import { z } from 'zod';
import { TRequestConfigs } from '../../utils/configs';
import { getRequestOptions } from '../../utils/get_request_options';

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
type TResponse = z.infer<typeof responseSchema>;

async function method(requestConfigs: TRequestConfigs, id: string): Promise<TResponse> {
  const parsedRoute = route.replace(':id', id);
  const options = getRequestOptions(requestConfigs, { route: parsedRoute, method: 'GET' });

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
