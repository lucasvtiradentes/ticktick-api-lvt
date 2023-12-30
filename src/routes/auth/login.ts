import { z } from 'zod';
import { TRequestConfigs } from '../../configs';
import { handlePostRequest } from '../../api_handler/requests_handler';
import { parseRequestOptions } from '../../api_handler/parse_request_options';

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

type TPayload = {
  username: string;
  password: string;
};

async function method(requestConfigs: TRequestConfigs, payload: TPayload) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'POST', payload });
  return handlePostRequest({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route };
