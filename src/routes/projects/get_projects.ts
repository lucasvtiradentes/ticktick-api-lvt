import { z } from 'zod';
import { parseRequestOptions } from '../../api_handler/parse_request_options';
import { handleRequestWithSchema } from '../../api_handler/requests_handler';
import { TRequestConfigs } from '../../configs';

const route = '/projects' as const;

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  isOwner: z.boolean(),
  color: z.string(),
  inAll: z.boolean(),
  sortOrder: z.number(),
  sortOption: z
    .object({
      groupBy: z.string(),
      orderBy: z.string()
    })
    .nullable(),
  sortType: z.string().nullable(),
  userCount: z.number(),
  etag: z.string(),
  modifiedTime: z.string(),
  closed: z.null(),
  muted: z.boolean(),
  transferred: z.null(),
  groupId: z.string().nullable(),
  viewMode: z.string().nullable(),
  notificationOptions: z.array(z.any()).nullable(),
  teamId: z.null(),
  permission: z.null(),
  kind: z.string(),
  timeline: z
    .object({
      range: z.null(),
      sortType: z.string(),
      sortOption: z.object({
        groupBy: z.string(),
        orderBy: z.string()
      })
    })
    .nullable(),
  needAudit: z.boolean(),
  openToTeam: z.boolean().nullable(),
  teamMemberPermission: z.null(),
  source: z.number()
});

const responseSchema = z.array(projectSchema);

async function method(requestConfigs: TRequestConfigs) {
  const requestOptions = parseRequestOptions(requestConfigs, { route, method: 'GET' });
  return handleRequestWithSchema({ requestConfigs, requestOptions, responseSchema });
}

export const apiMethod = { method, route };
