import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { TApiMethod, handleRequestWithSchema } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';

const route = '/user/profile' as const;

const responseSchema = z.object({
  etimestamp: z.string().nullable(),
  username: z.string(),
  siteDomain: z.string(),
  createdCampaign: z.string().nullable(),
  createdDeviceInfo: z.string().nullable(),
  filledPassword: z.boolean(),
  accountDomain: z.string().nullable(),
  extenalId: z.string().nullable(),
  email: z.string().nullable(),
  verifiedEmail: z.boolean(),
  fakedEmail: z.boolean(),
  phone: z.string().nullable(),
  name: z.string(),
  givenName: z.string().nullable(),
  familyName: z.string().nullable(),
  link: z.string().nullable(),
  picture: z.string(),
  gender: z.string().nullable(),
  locale: z.string(),
  userCode: z.string(),
  verCode: z.string().nullable(),
  verKey: z.string().nullable(),
  externalId: z.string().nullable(),
  displayName: z.string()
});

async function method(requestConfigs: TRequestConfigs) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'GET' });
  return handleRequestWithSchema({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route } satisfies TApiMethod;
