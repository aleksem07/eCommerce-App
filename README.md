# eCommerce-Application 2023Q1

by **random team #19**

## Table of Contents
1. [Description](#Description)
2. [Install](#install)
3. [Avilable scripts](#Avilable-scripts)
4. [Code Guide](#Code-Guide)
5. [Contribute](#Contribute)
6. [Tools / Plugins](#Tools-/-Plugins)
   - [Bootstrap](#Bootstrap)
   - [Husky](#Husky)
   - [Jest](#Jest)
   - [Plugins](#VS-Code-Plugins)
7. [Modules](#Modules)
   - [Components](#Components)
   - [Pages](#Pages)
   - [Services](#Services)
   - [Utilities](#Utilities)
   - [State](#State)
   
## Description

The app is a Single Page Application (SPA) powered by CommerceTools, a leading provider of commercial solutions for B2C and B2B businesses.

## Install

```shell
git clone https://github.com/NikitaStarmoussov/eCommerce-Application.git
cd project
npm install
```

## Avilable scripts

### Running the Development Server

```shell
npm run start
```

Starts the development server on port 3000 for local development.

### Building the Project (Development)

```shell
npm run build:dev
```

Builds the project without optimization for development purposes.

### Building the Project (Production)й

```shell
npm run build:prod
```

Builds the project with optimization for production deployment.

### Clearing the Dist Folder

#### unix (Linux, macOS)

```shell
npm run clear:unix
```

Clears the contents of the "dist" folder on Unix-based systems.

#### windows

```shell
npm run clear:windows
```

Clears the contents of the "dist" folder on Windows.

### Running the Linter

```shell
npm run lint
```

Runs the linter to check for code style and formatting issues.

### Running the Linter (Fixing Errors)

```shell
npm run lint:fix
```

Runs the linter and automatically fixes code style and formatting issues.

### Running Prettier

```shell
npm run format
```

Runs Prettier to format the code according to defined rules.

## Code Guide

## Contribute

## Tools / Plugins

### Bootstrap

#### Style

To include Bootstrap styles, import the SCSS file in your project:

```shell
import "bootstrap/scss/bootstrap.scss";
```

#### JS

To include all Bootstrap JavaScript components, import the entire library like this:

```shell
import * as bootstrap from 'bootstrap'
```

To include only specific Bootstrap JavaScript plugins, you can import them individually like this:

```shell
import Alert from 'bootstrap/js/dist/alert'
import { Tooltip, Toast, Popover } from 'bootstrap'
```

#### Icons

To use Bootstrap icons, first, import the icon font:

```shell
import "bootstrap-icons/font/bootstrap-icons.scss";
```

Then, you can use the icons in your HTML code as follows:

```shell
<i class="bi bi-icon-name">
```

Where `.bi` is the class used for all Bootstrap icons, and 
`.bi-icon-name` is the specific icon's name. 
By default, the icon size is set to `1em`. It is recommended to use `width: 1em` (and optionally `height: 1em`) to easily adjust the icon's size using the `font-size` property.

### Husky

Husky runs automatic formatting and code checking before committing and prohibits commits with errors.

The `prepare` script is used for setup when running `npm install`.

### Jest

- `test`: runs all tests.
- `test:coverage`: displays code coverage metrics showing the percentage of code executed during tests.

1. Lines: The percentage of code lines that were executed during tests. Any unexecuted code lines will be shown in the report.
2. Functions: The percentage of functions that were called during tests. Functions that were not called during tests will be indicated in the report.
3. Branches: The percentage of branches (if/else, switch, ternary operators, etc.) in your code that were covered by tests. Any branches that were not executed during tests will be shown in the report.
4. Statements: The percentage of instructions (or expressions) that were executed during tests.

### VS Code Plugins

- [Orta.vscode-jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Modules

### Компоненты

Folder: `src/components`

Import Alias: `@Components`

#### Генерация файлов

1. To generate a new component, use the following command in the terminal:

```shell
npm run generate component ComponentName
```

2. Specify if SCSS files are needed by typing "y" or "n".

3. Specify if `*.types.ts` files are needed by typing "y" or "n".

4. The folder with the files will be created in `src/components`.

#### Structure

- `component-name.mst`: component markup
- `component-name.ts`: contains component data, methods, and a mandatory `draw` method returning the markup
- `component-name.test.ts`: contains tests for the component
- `component-name.scss`: component styles (optional)

#### Example

`component-name.mst`

```handlebars
<div>
  <h2>{{title}}</h2>
  <p>{{content}}</p>
</div>
```

`component-name.ts`

```ts
import template from "./component-name.mst";

export default class ComponentName {
  data = {
    title: "Component title",
    content: "text",
  };

  draw() {
    return template(this.data);
  }
}
```

Usage of the component:

```ts
import ComponentName from "./component-name";

const element = new ComponentName();

document.body.innerHTML = element.draw();
```

### Pages

Folder: `pages`

Import Alias: `@Pages`

#### Generating Files

1. To generate a new page, use the following command in the terminal:

```shell
npm run generate page PageName
```

2. Specify if SCSS files are needed by typing "y" or "n".

3. Specify if `*.types.ts` files are needed by typing "y" or "n".

4. The folder with the files will be created in src/pages.

### Services

Folder: `services`

Import Alias: `@Services`

#### Generating Files

1. To generate a new service, use the following command in the terminal:

```shell
npm run generate service ServiceName
```

2. Specify if SCSS files are needed by typing "y" or "n".

3. Specify if `*.types.ts` files are needed by typing "y" or "n".

4. The folder with the files will be created in src/services.

### Utilities

Folder: `utils`

Import Alias: `@Utils`

#### Generating Files

1. To generate a new utility, use the following command in the terminal:

```shell
npm run generate util UtilName
```

2. Specify if SCSS files are needed by typing "y" or "n".

3. Specify if `*.types.ts` files are needed by typing "y" or "n".

4. The folder with the files will be created in src/utils.

### State

Folder: `state`

Import Alias: `@State`
