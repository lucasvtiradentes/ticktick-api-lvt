import { Tick } from 'lvt-tick-tick-api'

async function main() {
  try {
    const USERNAME = 'USERNAME';
    const PASSWORD = 'PASSWORD';

    const tickSession = new Tick({ username: USERNAME, password: PASSWORD });
    const hasLoggedIn = await tickSession.login();
    if (!hasLoggedIn) {
      throw new Error('Coudnt login with this username/password.');
    }

    const userPreferences = await tickSession.getUserSettings()
    console.log(Object.keys(userPreferences))

    const allAllTasks = await tickSession.getAllTasks();
    console.log(allAllTasks.map((item) => item.title));

    const tasks = await tickSession.getTasks();
    console.log(tasks.map((item) => item.title));

    const filters = await tickSession.getFilters();
    console.log(filters.map((item) => item.name));

    const projectGroups = await tickSession.getProjectGroups();
    console.log(projectGroups.map((item) => item.name));

    const projects = await tickSession.getProjects();
    console.log(projects.map((item) => item.name));

    const habits = await tickSession.getHabits();
    console.log(habits.map((item) => item.name));

    const tags = await tickSession.getTags();
    console.log(tags);

  } catch (e: any) {
    console.log(e.message);
  }
}

main();
