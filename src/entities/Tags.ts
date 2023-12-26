import { getRequestOptions } from 'src/utils/get_request_options';
import { API_ROUTES } from '../utils/api_routes';
import Base from './Base';

type TTag = {
  name: string;
  label: string;
  sortOrder: any;
  sortType: string;
  color: string;
  etag: string;
};

export default class Tags extends Base {
  async getTags(): Promise<TTag[]> {
    return new Promise((resolve) => {
      const url = `${this.configs.apiUrl}/${API_ROUTES.allTagsEndPoint}`;
      const options = getRequestOptions(url);

      this.configs.request(options, (error, response, body) => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
  }
}
