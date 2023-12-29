import { TApiMethod, getRequestOptions } from '../utils/get_request_options';
import { z } from 'zod';

const route = '/user/preferences/dailyReminder' as const;

const responseSchema = z.object({
  enable: z.boolean(),
  dailyReminders: z.array(z.string()),
  notifyOptions: z.array(z.string()),
  weekDays: z.array(z.string()),
  holidayNotify: z.boolean()
});

type TResponse = z.infer<typeof responseSchema>;

async function getUserDailyReminder({ apiUrl, request, validateSchema }: TApiMethod): Promise<TResponse> {
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

export { route, responseSchema, getUserDailyReminder };
