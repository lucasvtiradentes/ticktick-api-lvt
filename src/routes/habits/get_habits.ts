import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { handleGetRequest } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';

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

async function method(requestConfigs: TRequestConfigs) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'GET' });
  return handleGetRequest({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route };
