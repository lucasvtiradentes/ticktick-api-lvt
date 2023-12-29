'use strict';

import request from 'request';
import { getProjects } from './routes/get_projects';
import { getUserDailyReminder } from './routes/get_user_daily_reminder';
import { getUserInformation } from './routes/get_user_information';
import { getUserSettings } from './routes/get_user_settings';
import { login } from './routes/login';
import { INITIAL_CONFIGS, TExtendedConfigs, TTicktickConfigs } from './utils/configs';
import { getRequestOptions } from './utils/get_request_options';

// =============================================================================

export default class Ticktick {
  private loginData: Pick<TTicktickConfigs, 'username' | 'password'>;
  private configs: TExtendedConfigs;

  constructor(configs: TTicktickConfigs) {
    this.loginData = {
      username: configs.username,
      password: configs.password
    };

    this.configs = {
      request: request.defaults({ jar: true }),
      apiUrl: configs.apiUrl ?? INITIAL_CONFIGS.api_url,
      validateSchema: configs.validateSchema ?? false
    };
  }

  auth = {
    login: () => login({ ...this.configs, ...this.loginData })
  };

  user = {
    getUserDailyReminder: () => getUserDailyReminder(this.configs),
    getUserSettings: () => getUserSettings(this.configs),
    getUserInformation: () => getUserInformation(this.configs)
  };

  projects = {
    getProjects: () => getProjects(this.configs)
  };

  async customUrl(route: string) {
    const url = `${this.configs.apiUrl}/${route}`;
    const options = getRequestOptions({ url, method: 'GET' });

    return new Promise((resolve) => {
      this.configs.request(options, (error, response, body) => {
        const responseData = JSON.parse(body);

        resolve(responseData);
      });
    });
  }
}
