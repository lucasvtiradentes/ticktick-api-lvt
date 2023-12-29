import Ticktick from '../src/index';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const envUSERNAME = process.env.TICK_USERNAME ?? 'your_username';
  const envPASSWORD = process.env.TICK_PASSWORD ?? 'your_password';

  const tickInstance = new Ticktick({ username: envUSERNAME, password: envPASSWORD });
  await tickInstance.user.login();

  // FILTERS ===================================================================

  async function execFiltersMethods() {
    console.log(await tickInstance.filters.getFilters());
  }

  // HABITS ====================================================================

  async function execHabitsMethods() {
    console.log(await tickInstance.habits.getHabits());
  }

  // PROJECTS ==================================================================

  async function execProjectsMethods() {
    console.log(await tickInstance.projects.getProjects());
    console.log(await tickInstance.projects.getProjectGroups());

    const projectId = '';
    console.log(await tickInstance.projects.getProjectSections(projectId));
  }

  // TAGS ======================================================================

  async function execTagsMethods() {
    console.log(await tickInstance.tags.getTags());
  }

  // TASKS =====================================================================

  async function execTasksMethods() {
    const taskToDelete = {
      id: '',
      projectId: ''
    };
    // console.log(await tickInstance.tasks.deleteTask(taskToDelete.id, taskToDelete.projectId));
    // console.log(await tickInstance.tasks.getAllCompletedItems());
    // console.log(await tickInstance.tasks.getAllTasks());

    const taskToView = {
      id: '',
      projectId: ''
    };
    // console.log(await tickInstance.tasks.getTask(taskToView.id, taskToView.projectId));
    console.log(await tickInstance.tasks.getTasks());
    // console.log(await tickInstance.tasks.getTasksStatus());

    const updatedTaskData = {};
    // console.log(await tickInstance.tasks.updateTask(updatedTaskData));
  }

  // USER ======================================================================

  async function execUserMethods() {
    console.log(await tickInstance.user.getUserSettings());
  }

  // EXEC METHODS ==============================================================

  // await execFiltersMethods();
  // await execHabitsMethods();
  // await execProjectsMethods();
  // await execTagsMethods();
  await execTasksMethods();
  // await execUserMethods();
}

main();
