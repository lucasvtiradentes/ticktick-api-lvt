import dotenv from 'dotenv';
import Ticktick from '../src/index';
dotenv.config();

async function main() {
  const envUSERNAME = process.env.TICK_USERNAME ?? 'your_username';
  const envPASSWORD = process.env.TICK_PASSWORD ?? 'your_password';

  const tickInstance = new Ticktick({ username: envUSERNAME, password: envPASSWORD });

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

  const projectId = '6469009e8f08f0358a6b82d7';
  console.log(await tickInstance.projects.getProjects());
  console.log(await tickInstance.projects.getProjectSections(projectId));
  console.log(await tickInstance.projects.getProjectCompletedTasks(projectId));

  // TASKS =====================================================================

  console.log(await tickInstance.tasks.getCompletedTasks());

  // TESTING ===================================================================

  // console.log(await tickInstance.customUrl({ url: '/batch/check/0', method: 'GET' }));
  // console.log(await tickInstance.customUrl({ url: '/batch/check/1', method: 'GET' }));
}

main();
