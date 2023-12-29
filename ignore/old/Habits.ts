import { API_ROUTES } from '../utils/api_routes';
import Base from './Base';
import { getRequestOptions } from '../utils/get_request_options';

type THabit = {
  id: string;
  name: string;
  iconRes: string;
  color: string;
  sortOrder: any;
  status: number;
  encouragement: string;
  totalCheckIns: number;
  createdTime: string;
  modifiedTime: string;
  type: string;
  goal: number;
  step: number;
  unit: string;
  etag: string;
  repeatRule: string;
  reminders: string[];
  recordEnable: boolean;
  sectionId: string;
  targetDays: number;
  targetStartDate: number;
  completedCycles: number;
};

export default class Habits extends Base {
  async getHabits(): Promise<THabit[]> {
    return new Promise((resolve) => {
      try {
        const url = `${this.configs.apiUrl}/${API_ROUTES.allHabitsEndPoint}`;
        const options = getRequestOptions({ url, method: 'GET' });

        this.configs.request(options, (error, response, body) => {
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        });
      } catch (e) {
        resolve([]);
      }
    });
  }
}
