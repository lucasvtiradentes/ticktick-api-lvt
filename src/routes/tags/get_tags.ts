import { z } from 'zod';
import { TRequestConfigs } from '../../utils/configs';
import { getRequestOptions } from '../../utils/get_request_options';

const route = '/tags' as const;

export const tagSchema = z.object({
  name: z.string(),
  rawName: z.string(),
  label: z.string(),
  sortOrder: z.number(),
  sortType: z.string(),
  color: z.string(),
  etag: z.string(),
  type: z.number()
});

const responseSchema = z.array(tagSchema);
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
