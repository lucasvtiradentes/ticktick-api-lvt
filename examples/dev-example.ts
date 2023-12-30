import dotenv from 'dotenv';
import Ticktick from '../src/index';
import { TAddTaskPayload } from '../src/routes/tasks/add_task';
dotenv.config();

function generateId(): string {
  let id = '';
  const characters = '0123456789abcdef';

  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
}

async function main() {
  const envUSERNAME = process.env.TICK_USERNAME ?? 'your_username';
  const envPASSWORD = process.env.TICK_PASSWORD ?? 'your_password';

  const tickInstance = new Ticktick({ username: envUSERNAME, password: envPASSWORD, validateSchema: true });

  // AUTH ======================================================================

  await tickInstance.auth.login();

  // USER ======================================================================

  console.log(await tickInstance.user.getUserInformation());
  // console.log(await tickInstance.user.getUserDailyReminder());
  // console.log(await tickInstance.user.getUserSettings());

  // TAGS ======================================================================

  // console.log(await tickInstance.tags.getTags());

  // HABITS ====================================================================

  // console.log(await tickInstance.habits.getHabits());

  // TASKS =====================================================================

  // console.log(await tickInstance.tasks.getCompletedTasks());
  // const taskInfo = {
  //   name: 'Testando parada',
  //   projectId: '6469009e8f08f0358a6b82d7',
  //   sectionId: '64c5024b204a3b492bc42205',
  //   id: generateId()
  // } as const;

  // const taskPayload: TAddTaskPayload = {
  //   add: [
  //     {
  //       items: [],
  //       reminders: [
  //         {
  //           id: '659010db748778334f389454',
  //           trigger: 'TRIGGER:-PT5M'
  //         }
  //       ],
  //       exDate: [],
  //       dueDate: null,
  //       priority: 0,
  //       isAllDay: false,
  //       repeatFlag: null,
  //       progress: 0,
  //       assignee: null,
  //       sortOrder: -58823872413696,
  //       startDate: '2023-12-30T14:00:00.000+0000',
  //       isFloating: false,
  //       columnId: taskInfo.sectionId, // '64c5024b204a3b492bc42205'
  //       status: 0,
  //       projectId: taskInfo.projectId, // '6469009e8f08f0358a6b82d7',
  //       kind: null,
  //       createdTime: '2023-12-30T12:45:22.000+0000',
  //       modifiedTime: '2023-12-30T12:45:22.000+0000',
  //       title: taskInfo.name,
  //       tags: [],
  //       timeZone: 'America/Belem',
  //       content: '',
  //       id: taskInfo.id // '659010e2748778334f389455'
  //     }
  //   ],
  //   update: [],
  //   delete: [],
  //   addAttachments: [],
  //   updateAttachments: [],
  //   deleteAttachments: []
  // };
  // console.log(await tickInstance.tasks.addTask(taskPayload));

  // PROJECTS ==================================================================

  // const projectId = '6469009e8f08f0358a6b82d7';
  // console.log(await tickInstance.projects.getProjects());
  // console.log(await tickInstance.projects.getProjectSections(projectId));
  // console.log(await tickInstance.projects.getProjectCompletedTasks(projectId));

  // GENERAL ===================================================================

  // console.log(await tickInstance.user.getUserDataT0());
  // console.log(await tickInstance.user.getUserDataT1());

  // TESTING ===================================================================

  // console.log(await tickInstance.customUrl({ url: '/batch/check/0', method: 'GET' }));
  // console.log(await tickInstance.customUrl({ url: '/batch/check/1', method: 'GET' }));
}

main();
