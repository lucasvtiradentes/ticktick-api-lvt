'use strict';

import ObjectID from 'bson-objectid';
import request from 'request';

import { IProjectGroup } from './types/ProjectGroup';
import { IProject } from './types/Project';
import { ISections } from './types/Project';
import { ITag } from './types/Tag';
import { ITask } from './types/Task';
import { IUpdate } from './types/Task';
import { IFilter } from './types/Filter';
import { IHabit } from './types/Habit';

import { API_ENDPOINTS } from './utils/get-api-endpoints';

const { ticktickApiBaseUrl: TICKTICK_API_URL, TaskEndPoint, updateTaskEndPoint, allTagsEndPoint, generalDetailsEndPoint, allHabitsEndPoint, allProjectsEndPoint, allTasksEndPoint, singnInEndPoint, userPreferencesEndPoint, getSections, getAllCompletedItems } = API_ENDPOINTS;

interface IoptionsProps {
  username: string;
  password: string;
}

export class Tick {
  request: any;
  username: string;
  password: string;
  inboxProperties: {
    id: string;
    sortOrder: number;
  };
  
  constructor({ username, password }: IoptionsProps) {
    this.request = request.defaults({ jar: true });
    this.username = username;
    this.password = password;
    this.inboxProperties = {
      id: '',
      sortOrder: 0
    };
  }
  
  // USER ======================================================================
  
  async login(): Promise<boolean> {
    try {
      const url = `${TICKTICK_API_URL}/${singnInEndPoint}`;
      const options = {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://ticktick.com',
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
          "x-device": "{\"platform\":\"web\",\"os\":\"Windows 10\",\"device\":\"Firefox 117.0\",\"name\":\"\",\"version\":4576,\"id\":\"64f9effe6edff918986b5f71\",\"channel\":\"website\",\"campaign\":\"\",\"websocket\":\"\"}",
          
        },
        json: {
          username: this.username,
          password: this.password
        }
      };
      const reqObj = this.request;
      
      return new Promise((resolve) => {
        reqObj(options, async (error: any, request: any, body: any) => {
          let gotInboxProperties = false;
          if (!body || body.errorMessage) {
            console.error(`login error: ${body? body.errorMessage: 'Probably timeout.'}`);
            resolve(false);
          } else {
            await this.getInboxProperties()
            .then((data) => {
              resolve(true);
            })
            .catch((err) => {
              resolve(false);
            });
          }
        });
      });
    } catch (e: any) {
      return false;
    }
  }
  
  async getUserSettings(): Promise<any[]> {
    return new Promise((resolve) => {
      const url = `${TICKTICK_API_URL}/${userPreferencesEndPoint}`;
      this.request(url, (error: any, response: any, body: any) => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
  }
  
  private async getInboxProperties(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const url = `${TICKTICK_API_URL}/${generalDetailsEndPoint}`;
        
        this.request(url, (error: any, response: any, body: any) => {
          if (error) {
            console.error(error);
            resolve(false)
          }
          if (body) {
            body = JSON.parse(body);
            
            this.inboxProperties.id = body.inboxId;
            body.syncTaskBean.update.forEach((task: any) => {
              if (task.projectId == this.inboxProperties.id && task.sortOrder < this.inboxProperties.sortOrder) {
                this.inboxProperties.sortOrder = task.sortOrder;
              }
            });
            this.inboxProperties.sortOrder--;
          }
          resolve(true);
        });
      } catch (e) {
        console.error("Get Inbox Properties failed: ", e)
        resolve(false);
      }
    });
  }
  
  // FILTERS ===================================================================
  
  async getFilters(): Promise<IFilter[]> {
    return new Promise((resolve) => {
      const url = `${TICKTICK_API_URL}/${generalDetailsEndPoint}`;
      
      this.request(url, (error: any, response: any, body: any) => {
        body = JSON.parse(body);
        resolve(body.filters);
      });
    });
  }
  
  // TAGS ======================================================================
  
  async getTags(): Promise<ITag[]> {
    return new Promise((resolve) => {
      const url = `${TICKTICK_API_URL}/${allTagsEndPoint}`;
      this.request(url, (error: any, response: any, body: any) => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
  }
  
  // HABITS ====================================================================
  
  async getHabits(): Promise<IHabit[]> {
    return new Promise((resolve) => {
      try {
        const url = `${TICKTICK_API_URL}/${allHabitsEndPoint}`;
        this.request(url, (error: any, response: any, body: any) => {
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        });
      } catch (e) {
        resolve([]);
      }
    });
  }
  
  // PROJECTS ==================================================================
  
  async getProjectGroups(): Promise<IProjectGroup[]> {
    return new Promise((resolve) => {
      const url = `${TICKTICK_API_URL}/${generalDetailsEndPoint}`;
      
      this.request(url, (error: any, response: any, body: any) => {
        if (error) {
          console.error("Error on getProjectGroups", error);
          resolve([])
        } else {
          body = JSON.parse(body);
          resolve(body.projectGroups);
        }
      });
    });
  }
  
  async getProjects(): Promise<IProject[]> {
    return new Promise((resolve) => {
      try {
        const url = `${TICKTICK_API_URL}/${allProjectsEndPoint}`;
        this.request(url, (error: any, response: any, body: any) => {
          if (error) {
            console.error("Error on getProjects", error);
            resolve([])
          } else {
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
          }
        });
      } catch (e) {
        console.error("did we get a weird body: ",e)
        resolve([]);
      }
    });
  }

  //This may have worked at some point, but it doesn't any more.
  // async getProject(projectId: string) : Promise<ISections[]> {
  //   return new Promise((resolve) => {
  //     try {
  //       const url = `${TICKTICK_API_URL}/${getProject}/${projectId}`;
  //       this.request(url, (error: any, response: any, body: any) => {
  //         if (body !== undefined && body!== null && body.length > 0)
  //         {  
  //           const parsedBody = JSON.parse(body);
  //           resolve(parsedBody);
  //         }
  //       });
  //     } catch (e) {
  //       console.error(e)
  //       resolve([]);
  //     }
  //   });
  // }
  async getProjectSections(projectId: string) : Promise<ISections[]> { 
    return new Promise((resolve) => {
      try {
        const url = `${TICKTICK_API_URL}/${getSections}/${projectId}`;
        this.request(url, (error: any, response: any, body: any) => {
          if (error) {
            console.error("Error on getProjectSections", error);
            resolve([])
          } else {
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
          }
        });
      } catch (e) {
        console.error(e)
        resolve([]);
      }
    });
  }
  
  // RESOURCES =================================================================
  async getAllResources(): Promise<ITask[]> {
    const url = `${TICKTICK_API_URL}/${allTasksEndPoint}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Origin: 'https://ticktick.com'
      }
    };
    
    return new Promise((resolve) => {
      this.request(options, function (error: any, response: any, body: any) {
        if (error) {
          console.error("Get all resources failed: ", error)
          resolve([]);
        } else {
          if (body) {
            body = JSON.parse(body);
          } else {
            console.error("Did not get a response on get all resources.");
            resolve([]);
          }
        }
        //TODO: Do we have to have a finer grained definition, or trust the client?
        resolve(body);
      });
    });
  }
  
  
  // TASKS =====================================================================
    
  async getTasksStatus(): Promise<ITask[]> { 
    const url = `${TICKTICK_API_URL}/${allTasksEndPoint}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Origin: 'https://ticktick.com'
      }
    }; 
    
    return new Promise((resolve) => {
      this.request(options, function (error: any, response: any, body: any) {
        if (body) {
        body = JSON.parse(body);
        const tasks: ITask[] = body['syncTaskBean'];
        resolve(tasks);
        } else {
          console.error("Get Task Status: No body received in response.")
        }
      });
    });
  }

  async getAllTasks(): Promise<ITask[]> { 
    const url = `${TICKTICK_API_URL}/${allTasksEndPoint}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Origin: 'https://ticktick.com'
      }
    }; 
    
    return new Promise((resolve) => {
      this.request(options, function (error: any, response: any, body: any) {
        body = JSON.parse(body);
        const tasks: ITask[] = body['syncTaskBean']['update'];
        resolve(tasks);
      });
    });
  }
  
  async getTasks(): Promise<ITask[]> {
    return new Promise((resolve) => {
      const url = `${TICKTICK_API_URL}/${generalDetailsEndPoint}`;
      
      this.request(url, (error: any, response: any, body: any) => {
        body = JSON.parse(body);
        resolve(body.syncTaskBean.update);
      });
    });
  }
  
  async getTask(taskID: string, projectID: string): Promise<ITask[]> {
    return new Promise((resolve) => {
      const url = `${TICKTICK_API_URL}/${TaskEndPoint}/${taskID}?projectID=${projectID}`;
      
      this.request(url, (error: any, response: any, body: any) => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
  }
  
  async getAllCompletedItems(): Promise<ITask[]> {
    return new Promise((resolve) => {
      const url = `${TICKTICK_API_URL}/${getAllCompletedItems}`;
      
      this.request(url, (error: any, response: any, body: any) => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
  }
  
  addTask(jsonOptions: any): Promise<any> {
    
    const thisTask: ITask = {
      id: jsonOptions.id ? jsonOptions.id : ObjectID(),
      projectId: jsonOptions.projectId ? jsonOptions.projectId : this.inboxProperties.id,
      sortOrder: jsonOptions.sortOrder ? jsonOptions.sortOrder : this.inboxProperties.sortOrder,
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
      childIds: jsonOptions.childIds? jsonOptions.childIds : [],
      parentId: jsonOptions.parentId? jsonOptions.parentId : null
    };
    
    let taskBody: any;
    taskBody =  thisTask;
    
    const options = {
      method: 'POST',
      url: `${TICKTICK_API_URL}/${TaskEndPoint}`,
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://ticktick.com',
        "User-Agent":				"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
        "X-Device":				"{\"platform\":\"web\",\"os\":\"Windows 10\",\"device\":\"Firefox 117.0\",\"name\":\"\",\"version\":4576,\"id\":\"64fc9b22cbb2c305b2df7ad6\",\"channel\":\"website\",\"campaign\":\"\",\"websocket\":\"6500a8a3bf02224e648ef8bd\"}",
      }, 
      json: taskBody
    };
    
    return new Promise((resolve) => {
      this.request(options, (error: any, response: any, body: any) => {
        // console.log("add === ")
        // console.log("\n\nerror: ", error),
        // console.log("\n\nresponse: ", response)
        // console.log("\n\nbody: :",body)
        // console.log("=== add end ")
        if (error) {
          console.error("Error on addTask", error);
          resolve([])
        } else {
          let bodySortOrder
          bodySortOrder = body.sortOrder;
          this.inboxProperties.sortOrder = bodySortOrder  - 1;
          resolve(body);
        }
        
        
      });
    });
  }
  
  updateTask(jsonOptions: any): Promise<any> {
    
    const thisTask: ITask = {
      id: jsonOptions.id ? jsonOptions.id : ObjectID(),
      projectId: jsonOptions.projectId ? jsonOptions.projectId : this.inboxProperties.id,
      sortOrder: jsonOptions.sortOrder ? jsonOptions.sortOrder : this.inboxProperties.sortOrder,
      title: jsonOptions.title,
      content: jsonOptions.content ? jsonOptions.content : '',
      startDate: jsonOptions.startDate ? jsonOptions.startDate : null,
      dueDate: jsonOptions.dueDate ? jsonOptions.dueDate : null,
      timeZone: jsonOptions.timeZone ? jsonOptions.timeZone : 'America/New_York', // This needs to be updated to grab dynamically
      isAllDay: jsonOptions.isAllDay ? jsonOptions.isAllDay : null,
      // reminder: jsonOptions.reminder ? jsonOptions.reminder : null,
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
      childIds: jsonOptions.childIds? jsonOptions.childIds : [],
      parentId: jsonOptions.parentId? jsonOptions.parentId : null
    };
    
    let taskBody: any;
    taskBody  = {
      add: [],
      addAttachments: [],
      delete: [],
      deleteAttachments: [],
      updateAttachments: [],
      update : [thisTask],
    }
    
    
    
    
    const options = {
      method: 'POST',
      url: `${TICKTICK_API_URL}/${updateTaskEndPoint}`,
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://ticktick.com',
        "User-Agent":				"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
        "X-Device":				"{\"platform\":\"web\",\"os\":\"Windows 10\",\"device\":\"Firefox 117.0\",\"name\":\"\",\"version\":4576,\"id\":\"64fc9b22cbb2c305b2df7ad6\",\"channel\":\"website\",\"campaign\":\"\",\"websocket\":\"6500a8a3bf02224e648ef8bd\"}",
      }, 
      json: taskBody
    };
    
    return new Promise((resolve) => {
      this.request(options, (error: any, response: any, body: any) => {
        // console.log("add === ")
        // console.log("\n\nerror: ", error),
        // console.log("\n\nresponse: ", response)
        // console.log("\n\nbody: :",body)
        // console.log("=== add end ")
        if (error) {
          console.error("Error on updateTask", error);
          resolve([])
        } else {
          this.inboxProperties.sortOrder = body.sortOrder - 1;
          resolve(body);
        }
      });
    });
  }
  deleteTask(deleteTaskId: string, deletedTaskprojectId: string): Promise<any> {

    if (!deleteTaskId || !deletedTaskprojectId) {
      throw new Error("Both Task Id and Project ID are required for a delete, otherwise TickTick will fail silently.")
    }
    
    const taskToDelete = {taskId: deleteTaskId, projectId: deletedTaskprojectId}
    
    let taskBody: any;
    taskBody  = {
      add: [],
      addAttachments: [],
      delete: [taskToDelete],
      deleteAttachments: [],
      updateAttachments: [],
      update : [],
    }
    
        
    const options = {
      method: 'POST',
      url: `${TICKTICK_API_URL}/${updateTaskEndPoint}`,
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://ticktick.com',
        "User-Agent":				"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
        "X-Device":				"{\"platform\":\"web\",\"os\":\"Windows 10\",\"device\":\"Firefox 117.0\",\"name\":\"\",\"version\":4576,\"id\":\"64fc9b22cbb2c305b2df7ad6\",\"channel\":\"website\",\"campaign\":\"\",\"websocket\":\"6500a8a3bf02224e648ef8bd\"}",
      }, 
      json: taskBody
    };
    
    return new Promise((resolve) => {
      this.request(options, (error: any, response: any, body: any) => {
        this.inboxProperties.sortOrder = body.sortOrder - 1;
        resolve(body);
      });
    });
  }
}

