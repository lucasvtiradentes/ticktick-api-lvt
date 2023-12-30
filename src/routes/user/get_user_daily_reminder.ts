import { z } from 'zod';
import { TRequestConfigs } from '../../utils/configs';
import { getRequestOptions } from '../../utils/get_request_options';

const route = '/user/preferences/dailyReminder' as const;

const responseSchema = z.object({
  enable: z.boolean(),
  dailyReminders: z.array(z.string()),
  notifyOptions: z.array(z.string()),
  weekDays: z.array(z.string()),
  holidayNotify: z.boolean()
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
