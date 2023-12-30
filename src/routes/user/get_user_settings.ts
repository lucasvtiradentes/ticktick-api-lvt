import { z } from 'zod';
import { TRequestConfigs } from '../../utils/configs';
import { getRequestOptions } from '../../utils/get_request_options';

const route = '/user/preferences/settings?includeWeb=true' as const;

const responseSchema = z.object({
  id: z.number(),
  timeZone: z.string(),
  locale: z.string(),
  isTimeZoneOptionEnabled: z.boolean(),
  startDayOfWeek: z.string(),
  defaultRemindTime: z.string(),
  dailyRemindTime: z.string(),
  showMeridiem: z.boolean(),
  defaultPriority: z.number(),
  defaultDueDate: z.number(),
  defaultRemindBefore: z.string(),
  defaultReminds: z.array(z.string()),
  defaultTags: z.array(z.any()),
  defaultADReminders: z.array(z.any()),
  defaultTimeMode: z.string(),
  defaultTimeDuration: z.number(),
  defaultToAdd: z.number(),
  sortTypeOfAllProject: z.string(),
  sortTypeOfInbox: z.string(),
  sortTypeOfAssignMe: z.string(),
  sortTypeOfToday: z.string(),
  sortTypeOfTomorrow: z.string(),
  sortTypeOfWeek: z.string(),
  language: z.string(),
  theme: z.string(),
  removeDate: z.boolean(),
  removeTag: z.boolean(),
  showPomodoro: z.boolean(),
  showCompleted: z.boolean(),
  posOfOverdue: z.number(),
  showFutureTask: z.boolean(),
  showChecklist: z.boolean(),
  webCalendarViewType: z.string(),
  swipeConf: z.string(),
  shortcutItemConfPc: z.string(),
  webCalendarViewFilter: z.string(),
  collapsedTime: z.array(z.number()),
  enableCountdown: z.boolean(),
  smartProjects: z.array(
    z.object({
      name: z.enum(['inbox', 'all', 'today', 'tomorrow', 'n7ds', 'calendar', 'assignee', 'completed', 'trash', 'stats', 'summary', 'tag', 'filter', 'project', 'subscribedCalendar', 'abandoned']),
      visibility: z.string().nullable(),
      order: z.null()
    })
  ),
  isNotificationEnabled: z.boolean(),
  tabBars: z.array(
    z.object({
      name: z.enum(['TASK', 'CALENDAR', 'POMO', 'HABIT', 'SEARCH', 'SETTING']),
      enabled: z.boolean()
    })
  ),
  weekNumbersEnabled: z.boolean(),
  notificationOptions: z.array(z.string()),
  inboxColor: z.string(),
  templateEnabled: z.boolean(),
  calendarViewConf: z.object({
    showDetail: z.boolean(),
    showCompleted: z.boolean(),
    showChecklist: z.boolean(),
    showFutureTask: z.boolean(),
    showFocusRecord: z.boolean(),
    showHabit: z.boolean(),
    cellColorType: z.string()
  }),
  startWeekOfYear: z.string(),
  isEmailEnabled: z.boolean(),
  defaultProjectId: z.string(),
  nlpEnabled: z.boolean(),
  dateKeptInText: z.boolean(),
  nlpenabled: z.boolean(),
  lunarEnabled: z.boolean(),
  holidayEnabled: z.boolean(),
  pomodoroEnabled: z.boolean(),
  notificationEnabled: z.boolean()
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
