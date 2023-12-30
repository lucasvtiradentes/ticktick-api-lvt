import dotenv from 'dotenv';
import Ticktick from '../src/index';
dotenv.config();

async function main() {
  const username = process.env.TICK_USERNAME ?? 'your_username';
  const password = process.env.TICK_PASSWORD ?? 'your_password';

  const tickInstance = new Ticktick({ username, password });

  // const chinaTickInstance = new Ticktick({ username, password, customConfigs: { apiUrl: 'https://api.dida365.com/api/v2' } });

  // const developTickInstance = new Ticktick({ username, password, customConfigs: { validateSchema: true } });
  // [validateSchema: true] will throw an error on response in case its content dont follow the specified schema, if is that the case
  // and you want to contribute to the project please update the schema and send a pull request with it.

  // AUTH ======================================================================

  await tickInstance.auth.login();

  // USER ======================================================================

  console.log(await tickInstance.user.getUserInformation());
  console.log(await tickInstance.user.getUserDailyReminder());
  console.log(await tickInstance.user.getUserSettings());

  // TAGS ======================================================================

  console.log(await tickInstance.tags.getTags());

  // HABITS ====================================================================

  console.log(await tickInstance.habits.getHabits());

  // GENERAL ===================================================================

  console.log(await tickInstance.data.getUserDataT0());
  console.log(await tickInstance.data.getUserDataT1());

  // PROJECTS ==================================================================

  console.log(await tickInstance.projects.getProjects());

  // const projectId = '6469009e8f08f0358a6b82d7';
  // console.log(await tickInstance.projects.getProjectSections(projectId));
  // console.log(await tickInstance.projects.getProjectCompletedTasks(projectId));

  // TASKS =====================================================================

  console.log(await tickInstance.tasks.getCompletedTasks());

  // TESTING ===================================================================

  // console.log(await tickInstance.customUrl({ route: '/batch/check/0', method: 'GET' }));
  // console.log(await tickInstance.customUrl({ route: '/batch/check/1', method: 'GET' }));
}

main();
