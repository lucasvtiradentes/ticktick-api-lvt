import { z } from 'zod';
import { getRequestOptions } from '../../utils/get_request_options';
import { completedTaskSchema } from '../../utils/common_schemas';
import { TRequestConfigs } from '../../utils/configs';

const route = '/project/:id/completed' as const;

const responseSchema = z.array(completedTaskSchema);
type TResponse = z.infer<typeof responseSchema>;

async function method(requestConfigs: TRequestConfigs, id: string): Promise<TResponse> {
  const parsedRoute = `${route.replace(':id', id)}`;
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
