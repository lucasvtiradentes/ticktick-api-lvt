import { tagSchema } from '../routes/tags/get_tags';
import { z } from 'zod';

// =============================================================================

export const completedTaskSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  sortOrder: z.number(),
  title: z.string(),
  content: z.string().optional(),
  startDate: z.string(),
  dueDate: z.string(),
  timeZone: z.string(),
  isFloating: z.boolean(),
  isAllDay: z.boolean().optional(),
  reminders: z.array(z.any()),
  exDate: z.array(z.any()),
  completedTime: z.string(),
  completedUserId: z.number(),
  priority: z.number(),
  status: z.number(),
  items: z.array(z.any()),
  progress: z.number().optional(),
  modifiedTime: z.string(),
  etag: z.string(),
  deleted: z.number(),
  createdTime: z.string(),
  creator: z.number(),
  columnId: z.string().optional(),
  kind: z.string().nullable()
});

// =============================================================================

const taskReminderSchema = z.object({
  id: z.string(),
  trigger: z.string()
});

const commomAddUpdateTaskSchema = z.object({
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
  reminders: z.array(taskReminderSchema),
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
  createdTime: z.string(),
  kind: z.string().nullable(),
  columnId: z.string().optional()
});

export const addTaskSchema = commomAddUpdateTaskSchema.merge(
  z.object({
    dueDate: z.null(),
    repeatFlag: z.null(),
    assignee: z.null(),
    startDate: z.string(),
    tags: z.array(z.any())
  })
);

export const updateTaskSchema = commomAddUpdateTaskSchema.merge(
  z.object({
    etag: z.string(),
    deleted: z.number(),
    creator: z.number(),
    repeatFrom: z.string().optional(),
    focusSummaries: z.array(z.any()).optional(),
    deletedTime: z.number().optional()
  })
);

export const deleteTaskSchema = z.object({
  taskId: z.string(),
  projectId: z.string()
});

const projectGroupSchema = z.object({
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

const projectSchema = z.object({
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
  kind: z.string().nullable(),
  timeline: z.any(),
  needAudit: z.boolean(),
  openToTeam: z.boolean().nullable(),
  teamMemberPermission: z.null(),
  source: z.number()
});

const filterSchema = z.object({
  id: z.string(),
  name: z.string(),
  rule: z.string(),
  sortOrder: z.number(),
  sortType: z.string(),
  viewMode: z.null(),
  timeline: z.null(),
  etag: z.string(),
  createdTime: z.string(),
  modifiedTime: z.string(),
  sortOption: z.null()
});

export const batchCheckCommonSchema = z.object({
  checkPoint: z.number(),
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
