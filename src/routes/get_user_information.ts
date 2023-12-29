import { TApiMethod, getRequestOptions } from '../utils/get_request_options';
import { z } from 'zod';

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

async function getUserInformation({ apiUrl, request, validateSchema }: TApiMethod): Promise<TResponse> {
  const url = `${apiUrl}/${route}`;
  const options = getRequestOptions({ url, method: 'GET' });

  return new Promise((resolve) => {
    request(options, (error, response, body) => {
      const responseData = JSON.parse(body);

      if (validateSchema) {
        const parsedData = responseSchema.parse(responseData);
        resolve(parsedData as TResponse);
      } else {
        resolve(responseData as TResponse);
      }
    });
  });
}

export { route, responseSchema, getUserInformation };
