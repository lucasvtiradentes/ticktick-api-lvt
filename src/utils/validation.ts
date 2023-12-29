import { z } from 'zod';

export const tagSchema = z.object({
  name: z.string(),
  rawName: z.string(),
  label: z.string(),
  sortOrder: z.number(),
  sortType: z.string(),
  color: z.string(),
  etag: z.string(),
  type: z.number()
});

export type TTag = z.infer<typeof tagSchema>;

export const projectGroupSchema = z.object({
  id: z.string(),
  etag: z.string(),
  name: z.string(),
  showAll: z.boolean(),
  sortOrder: z.number(),
  viewMode: z.null(),
  deleted: z.number(),
  userId: z.number(),
  sortType: z.string(),
  sortOption: z.null(),
  teamId: z.null(),
  timeline: z.null()
});

export type TProjectGroup = z.infer<typeof projectGroupSchema>;

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  isOwner: z.boolean(),
  color: z.string(),
  inAll: z.boolean(),
  sortOrder: z.number(),
  sortOption: z.any(),
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
  timeline: z.any(),
  needAudit: z.boolean(),
  openToTeam: z.boolean().nullable(),
  teamMemberPermission: z.null(),
  source: z.number()
});

export type TProject = z.infer<typeof projectSchema>;

export const filterSchema = z.object({
  id: z.string(),
  name: z.string(),
  rule: z.string(),
  sortOrder: z.number(),
  sortType: z.string(), // "project"
  viewMode: z.null(),
  timeline: z.null(),
  etag: z.string(),
  createdTime: z.string(),
  modifiedTime: z.string(),
  sortOption: z.null()
});

export type TFilter = z.infer<typeof filterSchema>;

const updateTaskSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  sortOrder: z.number(),
  title: z.string(),
  content: z.string().optional(),
  desc: z.string().optional(),
  timeZone: z.string(),
  isFloating: z.boolean(),
  isAllDay: z.boolean().optional(),
  reminder: z.string().optional(),
  reminders: z.array(z.any()),
  repeatFirstDate: z.string().optional(),
  exDate: z.array(z.any()),
  completedTime: z.string().optional(),
  completedUserId: z.number().optional(),
  repeatTaskId: z.string().optional(),
  priority: z.number(),
  status: z.number(),
  items: z.array(z.any()),
  progress: z.number().optional(),
  modifiedTime: z.string(),
  etag: z.string(),
  deleted: z.number(),
  createdTime: z.string(),
  creator: z.number(),
  repeatFrom: z.string().optional(),
  focusSummaries: z.array(z.any()).optional(),
  columnId: z.string().optional(),
  kind: z.string(),
  deletedTime: z.number().optional()
});

const deleteTaskSchema = z.object({
  taskId: z.string(),
  projectId: z.string()
});

// 'batch/check/0'
export const zodSchema = z.object({
  checkPoint: z.number(),
  syncTaskBean: z.object({
    update: z.array(updateTaskSchema),
    delete: z.array(deleteTaskSchema),
    add: z.array(z.any()),
    empty: z.boolean()
  }),
  projectProfiles: z.array(projectSchema),
  projectGroups: z.array(projectGroupSchema),
  filters: z.array(filterSchema),
  tags: z.array(tagSchema),
  syncTaskOrderBean: z.object({
    taskOrderByDate: z.any(),
    taskOrderByPriority: z.any(),
    taskOrderByProject: z.any()
  }),
  syncOrderBean: z.object({
    orderByType: z.object({
      projectPinned: z.any()
    })
  }),
  syncOrderBeanV3: z.object({
    orderByType: z.any()
  }),
  inboxId: z.string(),
  checks: z.null(),
  remindChanges: z.array(z.any())
});

// =============================================================================

// 'batch/check/1'
export const newZodSchema = z.object({
  checkPoint: z.number(),
  syncTaskBean: z.object({
    update: z.array(updateTaskSchema),
    delete: z.array(deleteTaskSchema),
    add: z.array(z.any()),
    deletedInTrash: z.array(deleteTaskSchema),
    deletedForever: z.array(deleteTaskSchema),
    empty: z.boolean()
  }),
  projectProfiles: z.array(projectSchema),
  projectGroups: z.array(projectGroupSchema),
  filters: z.array(filterSchema),
  tags: z.array(tagSchema),
  syncTaskOrderBean: z.object({
    taskOrderByDate: z.any(),
    taskOrderByPriority: z.any(),
    taskOrderByProject: z.any()
  }),
  syncOrderBean: z.object({
    orderByType: z.object({
      projectPinned: z.any()
    })
  }),
  syncOrderBeanV3: z.object({
    orderByType: z.any()
  }),
  inboxId: z.string(),
  checks: z.null(),
  remindChanges: z.array(z.any())
});
