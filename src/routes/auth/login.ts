import { z } from 'zod';
import { TRequestConfigs } from '../../utils/configs';
import { getRequestOptions } from '../../utils/get_request_options';

const route = '/user/signon?wc=true&remember=true' as const;

const responseSchema = z.object({
  token: z.string(),
  userId: z.string(),
  userCode: z.string(),
  username: z.string(),
  teamPro: z.boolean(),
  proStartDate: z.string(),
  proEndDate: z.string(),
  subscribeType: z.string(),
  subscribeFreq: z.string(),
  needSubscribe: z.boolean(),
  freq: z.string(),
  inboxId: z.string(),
  teamUser: z.boolean(),
  activeTeamUser: z.boolean(),
  freeTrial: z.boolean(),
  pro: z.boolean(),
  ds: z.boolean()
});

type TResponse = z.infer<typeof responseSchema>;

type TPayload = {
  username: string;
  password: string;
};

async function method(requestConfigs: TRequestConfigs, payload: TPayload): Promise<TResponse> {
  const options = getRequestOptions(requestConfigs, { route, method: 'POST', payload });

  return new Promise((resolve) => {
    requestConfigs.request(options, async (error, request, body) => {
      const responseData = body;

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
