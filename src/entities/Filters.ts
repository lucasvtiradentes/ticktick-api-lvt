import { getRequestOptions } from '../utils/get_request_options';
import { API_ROUTES } from '../utils/api_routes';
import Base from './Base';
import { z } from 'zod';

const filterSchema = z.object({
  id: z.string(),
  name: z.string(),
  rule: z.string(),
  sortOrder: z.number(),
  sortType: z.string(), // "project"
  viewMode: z.null(),
  timeline: z.null(),
  etag: z.string(),
  createdTime: z.string(),
  modifiedTime: z.string(),
  sortOption: z.null()
});

type TFilter = z.infer<typeof filterSchema>;

export default class Filters extends Base {
  async getFilters(): Promise<TFilter[]> {
    const url = `${this.configs.apiUrl}/${API_ROUTES.generalDetailsEndPoint}`;
    const options = getRequestOptions({ url, method: 'GET' });

    return new Promise((resolve) => {
      this.configs.request(options, (error, response, body) => {
        const responseData = JSON.parse(body);
        const parsedData = z.array(filterSchema).parse(responseData.filters);
        resolve(parsedData);
      });
    });
  }
}
