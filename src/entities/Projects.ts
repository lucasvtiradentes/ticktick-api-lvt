import Base from './Base';
import { API_ROUTES } from '../utils/api_routes';
import { getRequestOptions } from 'src/utils/get_request_options';

type TProjectGroup = {
  id: string;
  etag: string;
  name: string;
  showAll: boolean;
  sortOrder: any;
  viewMode: any;
  deleted: number;
  userId: number;
  sortType: string;
  teamId: any;
  timeline: any;
};

type TProject = {
  id: string;
  name: string;
  isOwner: boolean;
  color: string;
  inAll: boolean;
  sortOrder: any;
  sortType: string;
  userCount: number;
  etag: string;
  modifiedTime: string;
  closed: any;
  muted: boolean;
  transferred: any;
  groupId: any;
  viewMode: string;
  notificationOptions: any;
  teamId: any;
  permission: any;
  kind: string;
  timeline: any;
};

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
      const options = getRequestOptions(url);

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
        const options = getRequestOptions(url);

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
        const options = getRequestOptions(url);

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
