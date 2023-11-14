export { API_ENDPOINTS };

const API_ENDPOINTS = {
  ticktickApiBaseUrl: 'https://api.ticktick.com/api/v2',
  singnInEndPoint: 'user/signon?wc=true&remember=true',
  userPreferencesEndPoint: 'user/preferences/settings',
  generalDetailsEndPoint: 'batch/check/0',
  allProjectsEndPoint: 'projects',
  allHabitsEndPoint: 'habits',
  allTagsEndPoint: 'tags',
  allTasksEndPoint: 'batch/check/1',
  TaskEndPoint: 'task',
  updateTaskEndPoint: 'batch/task',
  //If this ever existed, it's gone now. use getSections. That's the only project detail anyway.
  //getProject: 'project/',
  getSections: 'column/project/',
  getAllCompletedItems: "project/all/completedInAll/"
};

/*
/batch/taskProject
/batch/task
/task?+query
/projects
/user/status
/project/all/trash/pagination?start=
/project/all/completedInAll/
/habits/batch
*/
