import { getRequestOptions } from '../utils/get_request_options';
import { API_ROUTES } from '../utils/api_routes';
import Base from './Base';

export default class User extends Base {
  async login(): Promise<boolean> {
    try {
      const url = `${this.configs.apiUrl}/${API_ROUTES.login}`;
      const data = {
        username: this.configs.username,
        password: this.configs.password
      };
      const options = getRequestOptions({ url, method: 'POST', payload: data });

      return new Promise((resolve) => {
        this.configs.request(options, async (error, request, body) => {
          if (!body || body.errorMessage) {
            console.error(`login error: ${body ? body.errorMessage : 'Probably timeout.'}`);
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
    } catch (e) {
      return false;
    }
  }

  async getUserSettings(): Promise<any[]> {
    return new Promise((resolve) => {
      const url = `${this.configs.apiUrl}/${API_ROUTES.userPreferencesEndPoint}`;
      const options = getRequestOptions({ url, method: 'GET' });

      this.configs.request(options, (error, response, body) => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
  }

  private async getInboxProperties(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const url = `${this.configs.apiUrl}/${API_ROUTES.generalDetailsEndPoint}`;
        const options = getRequestOptions({ url, method: 'GET' });

        this.configs.request(options, (error, response, body) => {
          if (error) {
            console.error(error);
            resolve(false);
          }
          if (body) {
            body = JSON.parse(body);

            this.configs.inboxProperties.id = body.inboxId;
            body.syncTaskBean?.update.forEach((task: any) => {
              if (task.projectId == this.configs.inboxProperties.id && task.sortOrder < this.configs.inboxProperties.sortOrder) {
                this.configs.inboxProperties.sortOrder = task.sortOrder;
              }
            });
            this.configs.inboxProperties.sortOrder--;
          }
          resolve(true);
        });
      } catch (e) {
        console.error('Get Inbox Properties failed: ', e);
        resolve(false);
      }
    });
  }
}
