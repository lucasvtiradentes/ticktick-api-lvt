import { TProject, TProjectGroup } from 'src/utils/validation';
import { API_ROUTES } from '../utils/api_routes';
import { getRequestOptions } from '../utils/get_request_options';
import Base from './Base';

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
