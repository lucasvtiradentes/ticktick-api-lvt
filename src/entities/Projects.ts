import Base from './Base';
import { API_ROUTES } from '../utils/api_routes';
import { getRequestOptions } from '../utils/get_request_options';
import { z } from 'zod';

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

type TProjectGroup = z.infer<typeof projectGroupSchema>;

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  isOwner: z.boolean(),
  color: z.string(),
  inAll: z.boolean(),
  sortOrder: z.number(),
  sortOption: z.any(),
  sortType: z.string(),
  userCount: z.number(),
  etag: z.string(),
  modifiedTime: z.string(),
  closed: z.null(),
  muted: z.boolean(),
  transferred: z.null(),
  groupId: z.null(),
  viewMode: z.string(),
  notificationOptions: z.array(z.any()),
  teamId: z.null(),
  permission: z.null(),
  kind: z.string(),
  timeline: z.any(),
  needAudit: z.boolean(),
  openToTeam: z.null(),
  teamMemberPermission: z.null(),
  source: z.number()
});

type TProject = z.infer<typeof projectSchema>;

type TSections = {
  id: number;
  projectId: number;
  name: string;
  sortOrder: number;
};

export default class Projects extends Base {
  async getProjectGroups(): Promise<TProjectGroup[]> {
    return new Promise((resolve) => {
      const url = `${this.configs.apiUrl}/${API_ROUTES.generalDetailsEndPoint}`;
      const options = getRequestOptions({ url, method: 'GET' });

      this.configs.request(options, (error, response, body) => {
        if (error) {
          console.error('Error on getProjectGroups', error);
          resolve([]);
        } else {
          body = JSON.parse(body);
          resolve(body.projectGroups);
        }
      });
    });
  }

  async getProjects(): Promise<TProject[]> {
    return new Promise((resolve) => {
      try {
        const url = `${this.configs.apiUrl}/${API_ROUTES.allProjectsEndPoint}`;
        const options = getRequestOptions({ url, method: 'GET' });

        this.configs.request(options, (error, response, body) => {
          if (error) {
            console.error('Error on getProjects', error);
            resolve([]);
          } else {
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
          }
        });
      } catch (e) {
        console.error('did we get a weird body: ', e);
        resolve([]);
      }
    });
  }

  async getProjectSections(projectId: string): Promise<TSections[]> {
    return new Promise((resolve) => {
      try {
        const url = `${this.configs.apiUrl}/${API_ROUTES.getSections}/${projectId}`;
        const options = getRequestOptions({ url, method: 'GET' });

        this.configs.request(options, (error, response, body) => {
          if (error) {
            console.error('Error on getProjectSections', error);
            resolve([]);
          } else {
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
          }
        });
      } catch (e) {
        console.error(e);
        resolve([]);
      }
    });
  }

  //This may have worked at some point, but it doesn't any more.
  // async getProject(projectId: string) : Promise<TSections[]> {
  //   return new Promise((resolve) => {
  //     try {
  //       const url = `${this.apiUrl}/${getProject}/${projectId}`;
  //       this.request(url, (error, response, body) => {
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
}
