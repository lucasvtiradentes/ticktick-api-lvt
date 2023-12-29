import { getRequestOptions } from '../utils/get_request_options';
import { API_ROUTES } from '../utils/api_routes';
import Base from './Base';
import { z } from 'zod';
import { TTag, tagSchema } from '../utils/validation';

export default class Tags extends Base {
  async getTags(): Promise<TTag[]> {
    return new Promise((resolve) => {
      const url = `${this.configs.apiUrl}/${API_ROUTES.allTagsEndPoint}`;
      const options = getRequestOptions({ url, method: 'GET' });

      this.configs.request(options, (error, response, body) => {
        const responseData = JSON.parse(body);
        const parsedData = z.array(tagSchema).parse(responseData);
        resolve(parsedData);
      });
    });
  }
}
