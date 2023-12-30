import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { handleRequestWithSchema } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';

const route = '/user/profile' as const;

const responseSchema = z.object({
  etimestamp: z.null(),
  username: z.string(),
  siteDomain: z.string(),
  createdCampaign: z.null(),
  createdDeviceInfo: z.null(),
  filledPassword: z.boolean(),
  accountDomain: z.null(),
  extenalId: z.null(),
  email: z.null(),
  verifiedEmail: z.boolean(),
  fakedEmail: z.boolean(),
  phone: z.null(),
  name: z.string(),
  givenName: z.null(),
  familyName: z.null(),
  link: z.null(),
  picture: z.string(),
  gender: z.null(),
  locale: z.string(),
  userCode: z.string(),
  verCode: z.null(),
  verKey: z.null(),
  externalId: z.null(),
  displayName: z.string()
});

async function method(requestConfigs: TRequestConfigs) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'GET' });
  return handleRequestWithSchema({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route };
