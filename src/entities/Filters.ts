import { getRequestOptions } from '../utils/get_request_options';
import { API_ROUTES } from '../utils/api_routes';
import Base from './Base';
import { z } from 'zod';
import { TFilter, filterSchema, zodSchema } from '../utils/validation';

export default class Filters extends Base {
  async getFilters(): Promise<TFilter[]> {
    const url = `${this.configs.apiUrl}/${API_ROUTES.generalDetailsEndPoint}`;
    const options = getRequestOptions({ url, method: 'GET' });

    return new Promise((resolve) => {
      this.configs.request(options, (error, response, body) => {
        const responseData = JSON.parse(body);
        const parsedDataTeste = zodSchema.parse(responseData);
        const parsedData = z.array(filterSchema).parse(responseData.filters);
        resolve(parsedData);
      });
    });
  }
}
