import request from 'request';
import { INITIAL_CONFIGS, TAuthData, TRequestConfigs, TTicktickConfigs } from './configs';
import { availableMethods } from './routes/available_routes';
import { TAddTaskPayload } from './routes/tasks/add_task';
import { TUpdateTaskPayload } from './routes/tasks/update_task';
import { TRouteConfigs, parseRequestOptions } from './api_handler/parse_request_options';

export default class Ticktick {
  private authData: TAuthData;
  private requestConfigs: TRequestConfigs;

  constructor(configs: TTicktickConfigs) {
    this.authData = {
      username: configs.username,
      password: configs.password
    };

    this.requestConfigs = {
      request: request.defaults({ jar: true }),
      ...INITIAL_CONFIGS,
      ...configs?.customConfigs
    };
  }

  // ===========================================================================

  auth = {
    login: () => availableMethods.login(this.requestConfigs, this.authData)
  };

  user = {
    getUserDailyReminder: () => availableMethods.getUserDailyReminder(this.requestConfigs),
    getUserSettings: () => availableMethods.getUserSettings(this.requestConfigs),
    getUserInformation: () => availableMethods.getUserInformation(this.requestConfigs)
  };

  data = {
    getUserDataT0: () => availableMethods.getUserDataT0(this.requestConfigs),
    getUserDataT1: () => availableMethods.getUserDataT1(this.requestConfigs)
  };

  projects = {
    getProjects: () => availableMethods.getProjects(this.requestConfigs),
    getProjectSections: (id: string) => availableMethods.getProjectSections(this.requestConfigs, id),
    getProjectCompletedTasks: (id: string) => availableMethods.getProjectCompletedTasks(this.requestConfigs, id)
  };

  tags = {
    getTags: () => availableMethods.getTags(this.requestConfigs)
  };

  habits = {
    getHabits: () => availableMethods.getHabits(this.requestConfigs)
  };

  tasks = {
    getCompletedTasks: () => availableMethods.getCompletedTasks(this.requestConfigs),
    addTask: (payload: TAddTaskPayload) => availableMethods.addTask(this.requestConfigs, payload),
    updateTask: (payload: TUpdateTaskPayload) => availableMethods.updateTask(this.requestConfigs, payload)
  };

  // ===========================================================================

  async customUrl(routeConfigs: TRouteConfigs) {
    const options = parseRequestOptions(this.requestConfigs, routeConfigs);

    return new Promise((resolve) => {
      this.requestConfigs.request(options, (error, response, body) => {
        const responseData = JSON.parse(body);
        resolve(responseData);
      });
    });
  }
}
