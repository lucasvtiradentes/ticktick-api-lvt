<a name="TOC"></a>

<h3 align="center">
  TICKTICK API WRAPPER
</h3>

<div align="center">
  <a href="https://www.npmjs.com/package/ticktick-api-lvt"><img src="https://img.shields.io/npm/v/ticktick-api-lvt.svg?style=flat" alt="npm version"></a>
  <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/made%20with-node-1f425f?logo=node.js&.svg" /></a>
  <a href="https://github.com/lucasvtiradentes/ticktick-api-lvt#contributing"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="contributions" /></a>
</div>

<p align="center">
  <a href="#dart-features">Features</a> • <a href="#warning-requirements">Requirements</a> • <a href="#bulb-usage">Usage</a> • <a href="#wrench-development">Development</a> • <a href="#books-about">About</a> • <a href="#family-community">Community</a>
</p>

<details>
  <summary align="center"><span>see <b>table of content</b></span></summary>
  <p align="center">
    <ul>
      <li><a href="#dart-features">Features</a></li>
      <li><a href="#warning-requirements">Requirements</a></li>
      <li><a href="#bulb-usage">Usage</a></li>
      <li>
        <a href="#wrench-development">Development</a>
        <ul>
          <li><a href="#development-setup">Development setup</a></li>
          <li><a href="#used-technologies">Used technologies</a></li>
        </ul>
      </li>
      <li>
        <a href="#books-about">About</a>
        <ul>
          <li><a href="#license">License</a></li>
        </ul>
      </li>
    </ul>
  </p>
</details>

<a href="#"><img src="./.github/images/divider.png" /></a>

## :trumpet: Overview

This is a [ticktick](ticktick.com) api wrapper developed to be used on [Node.js](https://nodejs.org/en) based projects.

> :warning: **warning**: As of Jan 2024 Ticktick requires a captcha token in order to authenticate user on login. I'm working in order to implement it on this package, but have not yet succeeded. More details on [this issue](https://github.com/lucasvtiradentes/ticktick-api-lvt/issues/13).

## :dart: Features<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

&nbsp;&nbsp;&nbsp;✔️ type safe api methods by using [zod](https://github.com/colinhacks/zod) validation;<br>
&nbsp;&nbsp;&nbsp;✔️ methods for common actions, find more [here](./src/routes/);<br>
&nbsp;&nbsp;&nbsp;✔️ support to china [api version](https://api.dida365.com) [thanks to [@quanru](https://github.com/quanru)];<br>
&nbsp;&nbsp;&nbsp;✔️ custom headers required in order to make api calls [thanks to [@thesamim](https://github.com/thesamim)].<br>

## :warning: Requirements<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

In order to use this project in your computer, you need to have the following items:

- [npm](https://www.npmjs.com/): To install the package. Npm is installed alongside nodejs;
- [nodejs](https://nodejs.org/en/): To actually run the package.

## :bulb: Usage<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

To use it from the registry, first install the npm package:

```bash
# Install the package
npm install ticktick-api-lvt
```

And you can normally use it in your code as it follows:

```typescript
import { Tick } from 'ticktick-api-lvt';

async function main() {
  const username = 'your_username';
  const password = 'your_password';

  const tickInstance = new Ticktick({ username, password });

  // LOGIN =====================================================================

  await tickInstance.auth.login();

  // METHODS ===================================================================

  console.log(await tickInstance.user.getUserInformation());
  console.log(await tickInstance.user.getUserDailyReminder());
  console.log(await tickInstance.user.getUserSettings());
  console.log(await tickInstance.tags.getTags());
  console.log(await tickInstance.tasks.getCompletedTasks());

}

main();
```

To see further usage, check out the provided [example](./examples/dev-example.ts).

## :wrench: Development<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

### Development setup

To setup this project in your computer, download it in this link or run the following commands:

```bash
# Clone this repository
$ git clone https://github.com/lucasvtiradentes/ticktick-api-lvt

# Go into the repository
$ cd ticktick-api-lvt
```

After download it, go to the project folder and run these commands:

```bash
# Install dependencies using npm
$ npm install

# Run the typescript code in development mode
$ npm run dev
```

If you want to contribute to the project, after you make the necessary changes, run these commands to check if everything is working fine:

```bash
# Compile the code into javascript
$ npm run build

# Run the compiled code in production mode
$ npm run start
```

### Used technologies

This project uses the following thechnologies:

<div align="center">
  <table>
    <tr>
      <th>Scope</th>
      <th>Subject</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td rowspan="1">Project</td>
      <td>Main</td>
      <td align="center">
        <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white"></a>
        <a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td rowspan="3">Setup</td>
      <td>Code linting</td>
      <td align="center">
        <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/prettier-1A2C34?logo=prettier&logoColor=F7BA3E"></a>
        <a href="https://github.com/eslint/eslint"><img src="https://img.shields.io/badge/eslint-3A33D1?logo=eslint&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <!-- <td rowspan="3">Setup</td> -->
      <td>Commit linting</td>
      <td align="center">
      <a target="_blank" href="https://github.com/conventional-changelog/commitlint"><img src="https://img.shields.io/badge/commitlint-red?logo=commitlint&logoColor=white"></a>
      <a target="_blank" href="https://github.com/commitizen/cz-cli"><img src="https://img.shields.io/badge/commitizen-pink?logo=conventionalcommits&logoColor=white"></a>
      <!-- <a href="https://gitmoji.dev"><img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji"/></a> -->
      </td>
    </tr>
    <tr>
      <!-- <td rowspan="1">Setup</td> -->
      <td>Other</td>
      <td align="center">
        <a href="https://editorconfig.org/"><img src="https://img.shields.io/badge/Editor%20Config-E0EFEF?logo=editorconfig&logoColor=000"></a>
        <a target="_blank" href="https://github.com/typicode/husky"><img src="https://img.shields.io/badge/🐶%20husky-green?logo=husky&logoColor=white"></a>
        <!-- <a target="_blank" href="https://github.com/okonet/lint-staged"><img src="https://img.shields.io/badge/🚫%20lint%20staged-yellow?&logoColor=white"></a> -->
      </td>
    </tr>
  </table>
</div>

<a href="#"><img src="./.github/images/divider.png" /></a>

## :books: About<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

## License

This project is distributed under the terms of the MIT License Version 2.0. A complete version of the license is available in the [LICENSE](LICENSE) file in this repository. Any contribution made to this project will be licensed under the MIT License Version 2.0.

<a href="#"><img src="./.github/images/divider.png" /></a>

<div align="center">
  <p>
    <a target="_blank" href="https://www.linkedin.com/in/lucasvtiradentes/"><img src="https://img.shields.io/badge/-linkedin-blue?logo=Linkedin&logoColor=white" alt="LinkedIn"></a>
    <a target="_blank" href="mailto:lucasvtiradentes@gmail.com"><img src="https://img.shields.io/badge/gmail-red?logo=gmail&logoColor=white" alt="Gmail"></a>
    <a target="_blank" href="https://discord.com/users/262326726892191744"><img src="https://img.shields.io/badge/discord-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
    <a target="_blank" href="https://github.com/lucasvtiradentes/"><img src="https://img.shields.io/badge/github-gray?logo=github&logoColor=white" alt="Github"></a>
  </p>
  <p>Made with ❤️ by <strong>Lucas Vieira</strong></p>
  <p>👉 See also all <a href="https://github.com/lucasvtiradentes/lucasvtiradentes/blob/master/portfolio/PROJECTS.md#TOC">my projects</a></p>
  <p>👉 See also all <a href="https://github.com/lucasvtiradentes/my-tutorials#readme">my articles</a></p>
</div>
