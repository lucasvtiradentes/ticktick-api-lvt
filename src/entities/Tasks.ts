import ObjectID from 'bson-objectid';
import { API_ROUTES } from '../utils/api_routes';
import Base from './Base';
import { getRequestOptions } from '../utils/get_request_options';

export type TTask = {
  id: string;
  projectId: string;
  sortOrder: any;
  title: string;
  content: string;
  startDate: string;
  dueDate: string;
  timeZone: string;
  isFloating?: boolean;
  isAllDay: boolean;
  reminder: string; // we only get a set
  reminders: any[];
  repeatFirstDate?: string;
  repeatFlag: string;
  exDate?: any[];
  completedTime?: string;
  completedUserId?: any;
  repeatTaskId?: string;

  priority: number;
  status: number;
  items: any[];
  progress: number;
  modifiedTime: string;
  etag?: string;
  deleted: number;
  createdTime?: string;
  creator?: any;
  repeatFrom?: string;
  focusSummaries?: any[];
  columnId?: string;
  kind?: string;

  assignee?: any;
  isDirty?: boolean;
  local?: boolean;
  remindTime?: any;
  tags?: any[];
  childIds: string[];
  parentId: string;
};

export default class Tasks extends Base {
  async getTasksStatus(): Promise<TTask[]> {
    const url = `${this.configs.apiUrl}/${API_ROUTES.allTasksEndPoint}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Origin: 'https://ticktick.com'
      }
    };

    return new Promise((resolve) => {
      this.configs.request(options, function (error, response, body) {
        if (body) {
          body = JSON.parse(body);
          const tasks: TTask[] = body['syncTaskBean'];
          resolve(tasks);
        } else {
          console.error('Get Task Status: No body received in response.');
        }
      });
    });
  }

  async getAllTasks(): Promise<TTask[]> {
    const url = `${this.configs.apiUrl}/${API_ROUTES.allTasks}`;
    const options = getRequestOptions(url);

    return new Promise((resolve) => {
      this.configs.request(options, (error, response, body) => {
        body = JSON.parse(body);
        const tasks: TTask[] = body['syncTaskBean']['update'];
        resolve(tasks);
      });
    });
  }

  async getTasks(): Promise<TTask[]> {
    return new Promise((resolve) => {
      const url = `${this.configs.apiUrl}/${API_ROUTES.generalDetailsEndPoint}`;
      const options = getRequestOptions(url);

      this.configs.request(options, (error, response, body) => {
        body = JSON.parse(body);
        resolve(body.syncTaskBean.update);
      });
    });
  }

  async getTask(taskID: string, projectID: string): Promise<TTask[]> {
    return new Promise((resolve) => {
      const url = `${this.configs.apiUrl}/${API_ROUTES.TaskEndPoint}/${taskID}?projectID=${projectID}`;
      const options = getRequestOptions(url);

      this.configs.request(options, (error, response, body) => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
  }

  async getAllCompletedItems(): Promise<TTask[]> {
    return new Promise((resolve) => {
      const url = `${this.configs.apiUrl}/${API_ROUTES.getAllCompletedItems}`;
      const options = getRequestOptions(url);

      this.configs.request(options, (error, response, body) => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
  }

  addTask(jsonOptions: any): Promise<any> {
    const thisTask: TTask = {
      id: jsonOptions.id ? jsonOptions.id : ObjectID(),
      projectId: jsonOptions.projectId ? jsonOptions.projectId : this.configs.inboxProperties.id,
      sortOrder: jsonOptions.sortOrder ? jsonOptions.sortOrder : this.configs.inboxProperties.sortOrder,
      title: jsonOptions.title,
      content: jsonOptions.content ? jsonOptions.content : '',
      startDate: jsonOptions.startDate ? jsonOptions.startDate : null,
      dueDate: jsonOptions.dueDate ? jsonOptions.dueDate : null,
      timeZone: jsonOptions.timeZone ? jsonOptions.timeZone : 'America/New_York', // This needs to be updated to grab dynamically
      isAllDay: jsonOptions.isAllDay ? jsonOptions.isAllDay : null,
      reminder: jsonOptions.reminder ? jsonOptions.reminder : null,
      reminders: jsonOptions.reminders ? jsonOptions.reminders : [{ id: ObjectID(), trigger: 'TRIGGER:PT0S' }],
      repeatFlag: jsonOptions.repeatFlag ? jsonOptions.repeatFlag : null,
      priority: jsonOptions.priority ? jsonOptions.priority : 0,
      status: jsonOptions.status ? jsonOptions.status : 0,
      items: jsonOptions.items ? jsonOptions.items : [],
      progress: jsonOptions.progress ? jsonOptions.progress : 0,
      modifiedTime: jsonOptions.modifiedTime ? jsonOptions.modifiedTime : new Date().toISOString().replace('Z', '+0000'), //"2017-08-12T17:04:51.982+0000",
      deleted: jsonOptions.deleted ? jsonOptions.deleted : 0,
      assignee: jsonOptions.assignee ? jsonOptions.assignee : null,
      isDirty: jsonOptions.isDirty ? jsonOptions.isDirty : true,
      local: jsonOptions.local ? jsonOptions.local : true,
      remindTime: jsonOptions.remindTime ? jsonOptions.remindTime : null,
      tags: jsonOptions.tags ? jsonOptions.tags : [],
      childIds: jsonOptions.childIds ? jsonOptions.childIds : [],
      parentId: jsonOptions.parentId ? jsonOptions.parentId : null
    };

    let taskBody: any;
    taskBody = thisTask;

    const options = {
      method: 'POST',
      url: `${this.configs.apiUrl}/${API_ROUTES.TaskEndPoint}`,
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://ticktick.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
        'X-Device': '{"platform":"web","os":"Windows 10","device":"Firefox 117.0","name":"","version":4576,"id":"64fc9b22cbb2c305b2df7ad6","channel":"website","campaign":"","websocket":"6500a8a3bf02224e648ef8bd"}'
      },
      json: taskBody
    };

    return new Promise((resolve) => {
      this.configs.request(options, (error, response, body) => {
        if (error) {
          console.error('Error on addTask', error);
          resolve([]);
        } else {
          let bodySortOrder;
          bodySortOrder = body.sortOrder;
          this.configs.inboxProperties.sortOrder = bodySortOrder - 1;
          resolve(body);
        }
      });
    });
  }

  updateTask(jsonOptions: any): Promise<any> {
    const thisTask: TTask = {
      id: jsonOptions.id ? jsonOptions.id : ObjectID(),
      projectId: jsonOptions.projectId ? jsonOptions.projectId : this.configs.inboxProperties.id,
      sortOrder: jsonOptions.sortOrder ? jsonOptions.sortOrder : this.configs.inboxProperties.sortOrder,
      title: jsonOptions.title,
      content: jsonOptions.content ? jsonOptions.content : '',
      startDate: jsonOptions.startDate ? jsonOptions.startDate : null,
      dueDate: jsonOptions.dueDate ? jsonOptions.dueDate : null,
      timeZone: jsonOptions.timeZone ? jsonOptions.timeZone : 'America/New_York', // This needs to be updated to grab dynamically
      isAllDay: jsonOptions.isAllDay ? jsonOptions.isAllDay : null,
      reminder: jsonOptions.reminder ? jsonOptions.reminder : null,
      reminders: jsonOptions.reminders ? jsonOptions.reminders : [{ id: ObjectID(), trigger: 'TRIGGER:PT0S' }],
      repeatFlag: jsonOptions.repeatFlag ? jsonOptions.repeatFlag : null,
      priority: jsonOptions.priority ? jsonOptions.priority : 0,
      status: jsonOptions.status ? jsonOptions.status : 0,
      items: jsonOptions.items ? jsonOptions.items : [],
      progress: jsonOptions.progress ? jsonOptions.progress : 0,
      modifiedTime: jsonOptions.modifiedTime ? jsonOptions.modifiedTime : new Date().toISOString().replace('Z', '+0000'), //"2017-08-12T17:04:51.982+0000",
      deleted: jsonOptions.deleted ? jsonOptions.deleted : 0,
      assignee: jsonOptions.assignee ? jsonOptions.assignee : null,
      isDirty: jsonOptions.isDirty ? jsonOptions.isDirty : true,
      local: jsonOptions.local ? jsonOptions.local : true,
      remindTime: jsonOptions.remindTime ? jsonOptions.remindTime : null,
      tags: jsonOptions.tags ? jsonOptions.tags : [],
      childIds: jsonOptions.childIds ? jsonOptions.childIds : [],
      parentId: jsonOptions.parentId ? jsonOptions.parentId : null
    };

    let taskBody: any;
    taskBody = {
      add: [],
      addAttachments: [],
      delete: [],
      deleteAttachments: [],
      updateAttachments: [],
      update: [thisTask]
    };

    const options = {
      method: 'POST',
      url: `${this.configs.apiUrl}/${API_ROUTES.updateTaskEndPoint}`,
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://ticktick.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
        'X-Device': '{"platform":"web","os":"Windows 10","device":"Firefox 117.0","name":"","version":4576,"id":"64fc9b22cbb2c305b2df7ad6","channel":"website","campaign":"","websocket":"6500a8a3bf02224e648ef8bd"}'
      },
      json: taskBody
    };

    return new Promise((resolve) => {
      this.configs.request(options, (error, response, body) => {
        if (error) {
          console.error('Error on updateTask', error);
          resolve([]);
        } else {
          this.configs.inboxProperties.sortOrder = body.sortOrder - 1;
          resolve(body);
        }
      });
    });
  }

  deleteTask(deleteTaskId: string, deletedTaskprojectId: string): Promise<any> {
    if (!deleteTaskId || !deletedTaskprojectId) {
      throw new Error('Both Task Id and Project ID are required for a delete, otherwise TickTick will fail silently.');
    }

    const taskToDelete = { taskId: deleteTaskId, projectId: deletedTaskprojectId };

    let taskBody: any;
    taskBody = {
      add: [],
      addAttachments: [],
      delete: [taskToDelete],
      deleteAttachments: [],
      updateAttachments: [],
      update: []
    };

    const options = {
      method: 'POST',
      url: `${this.configs.apiUrl}/${API_ROUTES.updateTaskEndPoint}`,
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://ticktick.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
        'X-Device': '{"platform":"web","os":"Windows 10","device":"Firefox 117.0","name":"","version":4576,"id":"64fc9b22cbb2c305b2df7ad6","channel":"website","campaign":"","websocket":"6500a8a3bf02224e648ef8bd"}'
      },
      json: taskBody
    };

    return new Promise((resolve) => {
      this.configs.request(options, (error, response, body) => {
        this.configs.inboxProperties.sortOrder = body.sortOrder - 1;
        resolve(body);
      });
    });
  }
}
