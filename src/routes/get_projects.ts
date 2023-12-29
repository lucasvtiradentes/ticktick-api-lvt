import { z } from 'zod';
import { TApiMethod, getRequestOptions } from '../utils/get_request_options';

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
type TResponse = z.infer<typeof responseSchema>;

async function getProjects({ apiUrl, request, validateSchema }: TApiMethod): Promise<TResponse> {
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

export { getProjects, responseSchema, route };
