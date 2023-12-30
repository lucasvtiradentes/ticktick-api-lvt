import { z } from 'zod';
import { TRequestConfigs } from '../../utils/configs';
import { getRequestOptions } from '../../utils/get_request_options';

const route = '/habits' as const;

export const habitSchema = z.object({
  id: z.string(),
  name: z.string(),
  iconRes: z.string(),
  color: z.string(),
  sortOrder: z.number(),
  status: z.number(),
  encouragement: z.string(),
  totalCheckIns: z.number(),
  createdTime: z.string(),
  modifiedTime: z.string(),
  archivedTime: z.string().nullable(),
  type: z.string(),
  goal: z.number(),
  step: z.number(),
  unit: z.string(),
  etag: z.string(),
  repeatRule: z.string(),
  reminders: z.array(z.string()),
  recordEnable: z.boolean(),
  sectionId: z.string(),
  targetDays: z.number(),
  targetStartDate: z.number(),
  completedCycles: z.number(),
  exDates: z.null()
});

const responseSchema = z.array(habitSchema);
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
