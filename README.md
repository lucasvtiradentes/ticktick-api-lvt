<h1 align="center">
  tick tick api wrapper
</h1>

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/lucasvtiradentes/tick-tick-api.svg">
  <a href="https://github.com/lucasvtiradentes/tick-tick-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucasvtiradentes/tick-tick-api.svg">
  </a>
  <a href="https://github.com/lucasvtiradentes/tick-tick-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lucasvtiradentes/tick-tick-api.svg">
  </a>
</p>

<p align="center">
  <a href="#information_source-description">Description</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="#information_source-features">Features</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-edit-it">How to edit it?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use-it">How to use it?</a>
</p>

## :information_source: Description

This is tick-tick api wrapper to be used in javascript and typescript, since there is no official package.

## :information_source: Features

- [x] Login into ticktick
- [x] Get user tasks
- [x] Get user projects
- [x] Get user tags
- [x] Get user filters
- [x] Add task

## :information_source: Technologies

This project uses the following technologies:

<div align="center" style="text-align: center;">
  <table>
    <tr>
      <th>Scope</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td>engine</td>
      <td align="center">
        <a target="_blank" href="https://nodejs.org"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td>secondary</td>
      <td align="center">
        <a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td>dev tools</td>
      <td align="center">
        <a target="_blank" href="https://eslint.org/"><img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white"></a>
        <a target="_blank" href="https://prettier.io/"><img src="https://img.shields.io/badge/prettier-black?style=for-the-badge&logo=prettier&logoColor=white"></a>
        <a target="_blank" href="https://github.com/typicode/husky"><img src="https://img.shields.io/badge/🐶husky-green?style=for-the-badge&logo=husky&logoColor=white"></a>
        <a target="_blank" href="https://editorconfig.org/"><img src="https://img.shields.io/badge/editorconfig-gray?style=for-the-badge&logo=editorconfig&logoColor=white"></a>
      </td>
    </tr>
  </table>
</div>

## :information_source: How to edit it

To clone this repository and make changes in the source code, you'll need [Git](https://git-scm.com) and [Nodejs](https://nodejs.org/en/).

```bash
# Clone this repository
$ git clone https://github.com/lucasvtiradentes/lvt-tick-tick-api

# Go into the repository
$ cd lvt-tick-tick-api

# Install dependencies
$ npm install

# Run the code in development mode
$ npm run dev
```

## :information_source: How to use it

To use it from the registry, first install the npm package:

```bash
# Clone this repository
npm install lvt-tick-tick-api
```

And you can normally use it in your code as it follows:

```typescript
import { Tick } from 'lvt-tick-tick-api';

async function main() {
  const USERNAME = 'username';
  const PASSWORD = 'password';

  const tickSession = new Tick({ username: USERNAME, password: PASSWORD });
  const hasLoggedIn = await tickSession.login();
  if (!hasLoggedIn) {
    throw new Error('Coudnt login with this username/password.');
  }

  // const userPreferences = await tickSession.getUserSettings()
  // console.log(Object.keys(userPreferences))

  // const allAllTasks = await tickSession.getAllTasks();
  // console.log(allAllTasks.map((item) => item.title));

  // const tasks = await tickSession.getTasks();
  // console.log(tasks.map((item) => item.title));

  // const filters = await tickSession.getFilters();
  // console.log(filters.map((item) => item.name));

  // const projectGroups = await tickSession.getProjectGroups();
  // console.log(projectGroups.map((item) => item.name));

  // const projects = await tickSession.getProjects();
  // console.log(projects.map((item) => item.name));

  // const habits = await tickSession.getHabits();
  // console.log(habits.map((item) => item.name));

  // const tags = await tickSession.getTags();
  // console.log(tags);

  // uncomment the methods you want to see ;)
}

main();
```

---

Made with ♥ by Lucas Vieira.

Get it touch: [github](https://github.com/lucasvtiradentes) | [linkedin](https://www.linkedin.com/in/lucasvtiradentes) | lucasvtiradentes@gmail.com
