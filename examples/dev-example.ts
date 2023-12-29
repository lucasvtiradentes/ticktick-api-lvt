import Ticktick from '../src/index';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const envUSERNAME = process.env.TICK_USERNAME ?? 'your_username';
  const envPASSWORD = process.env.TICK_PASSWORD ?? 'your_password';

  const tickInstance = new Ticktick({ username: envUSERNAME, password: envPASSWORD, validateSchema: true });
  await tickInstance.auth.login();

  // console.log(await tickInstance.user.getUserInformation());
  // console.log(await tickInstance.user.getUserDailyReminder());
  // console.log(await tickInstance.user.getUserSettings());
  // console.log(await tickInstance.projects.getProjects());

  // console.log(await tickInstance.customUrl('tags'));
  // console.log(await tickInstance.customUrl('habits'));
  // console.log(await tickInstance.customUrl('habits'));
}

main();
