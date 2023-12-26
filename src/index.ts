'use strict';

import request from 'request';
import Filters from './entities/Filters';
import Habits from './entities/Habits';
import Projects from './entities/Projects';
import Tags from './entities/Tags';
import Tasks from './entities/Tasks';
import User from './entities/User';
import { TTicktickConfigs, TExtendedConfigs, INITIAL_CONFIGS } from './utils/configs';

// =============================================================================

export default class Ticktick {
  filters: Filters;
  habits: Habits;
  projects: Projects;
  tags: Tags;
  tasks: Tasks;
  user: User;

  constructor(configs: TTicktickConfigs) {
    const extendedConfigs: TExtendedConfigs = {
      ...configs,
      request: request.defaults({ jar: true }),
      apiUrl: configs.apiUrl ?? INITIAL_CONFIGS.api_url,
      inboxProperties: {
        id: '',
        sortOrder: 0
      }
    };

    this.filters = new Filters(extendedConfigs);
    this.habits = new Habits(extendedConfigs);
    this.tags = new Tags(extendedConfigs);
    this.user = new User(extendedConfigs);
    this.tasks = new Tasks(extendedConfigs);
    this.projects = new Projects(extendedConfigs);
  }
}
