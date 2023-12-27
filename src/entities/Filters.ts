import { getRequestOptions } from '../utils/get_request_options';
import { API_ROUTES } from '../utils/api_routes';
import Base from './Base';

type TFilter = {
  id: string;
  name: string;
  rule: string;
  sortOrder: any;
  sortType: string;
  viewMode: any;
  timeline: any;
  etag: string;
  createdTime: string;
  modifiedTime: string;
};

export default class Filters extends Base {
  async getFilters(): Promise<TFilter[]> {
    return new Promise((resolve) => {
      const url = `${this.configs.apiUrl}/${API_ROUTES.generalDetailsEndPoint}`;
      const options = getRequestOptions({ url, method: 'GET' });

      this.configs.request(options, (error, response, body) => {
        body = JSON.parse(body);
        resolve(body.filters);
      });
    });
  }
}
