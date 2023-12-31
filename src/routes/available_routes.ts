import { apiMethod as login } from './auth/login';
import { apiMethod as getUserDataT0 } from './data/get_user_data_t0';
import { apiMethod as getUserDataT1 } from './data/get_user_data_t1';
import { apiMethod as getHabits } from './habits/get_habits';
import { apiMethod as getProjectSections } from './projects/get_project_sections';
import { apiMethod as getProjects } from './projects/get_projects';
import { apiMethod as getTags } from './tags/get_tags';
import { apiMethod as addTask } from './tasks/add_task';
import { apiMethod as getCompletedTasks } from './tasks/get_completed_tasks';
import { apiMethod as getProjectCompletedTasks } from './tasks/get_project_completed_tasks';
import { apiMethod as updateTask } from './tasks/update_task';
import { apiMethod as getUserDailyReminder } from './user/get_user_daily_reminder';
import { apiMethod as getUserInformation } from './user/get_user_information';
import { apiMethod as getUserSettings } from './user/get_user_settings';

const availableRoutes = [
  login.route,
  getUserDataT0.route,
  getUserDataT1.route,
  getHabits.route,
  getProjectSections.route,
  getProjects.route,
  getTags.route,
  addTask.route,
  getCompletedTasks.route,
  getProjectCompletedTasks.route,
  updateTask.route,
  getUserDailyReminder.route,
  getUserInformation.route,
  getUserSettings.route
] as const;

export type TAvailableRoutes = (typeof availableRoutes)[number] | (string & {});

export const availableMethods = {
  login: login.method,
  getUserDataT0: getUserDataT0.method,
  getUserDataT1: getUserDataT1.method,
  getHabits: getHabits.method,
  getProjectSections: getProjectSections.method,
  getProjects: getProjects.method,
  getTags: getTags.method,
  addTask: addTask.method,
  getCompletedTasks: getCompletedTasks.method,
  getProjectCompletedTasks: getProjectCompletedTasks.method,
  updateTask: updateTask.method,
  getUserDailyReminder: getUserDailyReminder.method,
  getUserInformation: getUserInformation.method,
  getUserSettings: getUserSettings.method
};
