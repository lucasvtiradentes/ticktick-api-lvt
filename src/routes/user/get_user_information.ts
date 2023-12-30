import { z } from 'zod';
import { TRequestConfigs } from '../../utils/configs';
import { getRequestOptions } from '../../utils/get_request_options';

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
