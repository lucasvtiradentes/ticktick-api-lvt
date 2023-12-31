import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { TApiMethod, handleRequestWithSchema } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';

const route = '/user/preferences/dailyReminder' as const;

const responseSchema = z.object({
  enable: z.boolean(),
  dailyReminders: z.array(z.string()),
  notifyOptions: z.array(z.string()),
  weekDays: z.array(z.string()),
  holidayNotify: z.boolean()
});

async function method(requestConfigs: TRequestConfigs) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'GET' });
  return handleRequestWithSchema({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route } satisfies TApiMethod;
