import request from 'request';
import { TRouteConfigs, parseRequestOptions } from './api_handler/parse_request_options';
import { handleRequest } from './api_handler/requests_handler';
import { INITIAL_CONFIGS, TAuthData, TRequestConfigs, TTicktickConfigs } from './configs';
import { TAvailableRoutes, availableMethods } from './routes/available_routes';
import { TAddTaskPayload } from './routes/tasks/add_task';
import { TUpdateTaskPayload } from './routes/tasks/update_task';

export default class Ticktick {
  #authData: TAuthData;
  #requestConfigs: TRequestConfigs;

  constructor(configs: TTicktickConfigs) {
    this.#authData = {
      username: configs.username,
      password: configs.password
    };

    this.#requestConfigs = {
      request: request.defaults({ jar: true }),
      ...INITIAL_CONFIGS,
      ...configs?.customConfigs
    };
  }

  // ===========================================================================

  auth = {
    login: () => availableMethods.login(this.#requestConfigs, this.#authData)
  };

  user = {
    getUserInformation: () => availableMethods.getUserInformation(this.#requestConfigs),
    getUserDailyReminder: () => availableMethods.getUserDailyReminder(this.#requestConfigs),
    getUserSettings: () => availableMethods.getUserSettings(this.#requestConfigs)
  };

  data = {
    getUserDataT0: () => availableMethods.getUserDataT0(this.#requestConfigs),
    getUserDataT1: () => availableMethods.getUserDataT1(this.#requestConfigs)
  };

  projects = {
    getProjects: () => availableMethods.getProjects(this.#requestConfigs),
    getProjectSections: (id: string) => availableMethods.getProjectSections(this.#requestConfigs, id)
  };

  tags = {
    getTags: () => availableMethods.getTags(this.#requestConfigs)
  };

  habits = {
    getHabits: () => availableMethods.getHabits(this.#requestConfigs)
  };

  tasks = {
    addTask: (payload: TAddTaskPayload) => availableMethods.addTask(this.#requestConfigs, payload),
    updateTask: (payload: TUpdateTaskPayload) => availableMethods.updateTask(this.#requestConfigs, payload),
    getProjectCompletedTasks: (id: string) => availableMethods.getProjectCompletedTasks(this.#requestConfigs, id),
    getCompletedTasks: () => availableMethods.getCompletedTasks(this.#requestConfigs)
  };

  // ===========================================================================

  async customUrl(routeConfigs: TRouteConfigs & { route: TAvailableRoutes }) {
    const requestOptions = parseRequestOptions(this.#requestConfigs, routeConfigs);
    return handleRequest({ requestConfigs: this.#requestConfigs, requestOptions });
  }
}
