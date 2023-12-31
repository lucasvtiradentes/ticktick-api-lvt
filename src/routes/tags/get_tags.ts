import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { TApiMethod, handleRequestWithSchema } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';

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

async function method(requestConfigs: TRequestConfigs) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'GET' });
  return handleRequestWithSchema({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route } satisfies TApiMethod;
