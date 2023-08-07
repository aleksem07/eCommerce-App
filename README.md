# eCommerce-Application 2023Q1

by **random team #19**

## Table of Contents
1. [Description](#Description)
2. [Install](#install)
3. [Avilable scripts](#Avilable-scripts)
4. [Code Guide](#Code-Guide)
5. [Contribute](#Contribute)
6. [Tools / Plugins](#Tools-/-Plugins)
   * [Bootstrap](#Bootstrap)
   * [Husky](#Husky)
   * [Jest](#Jest)
   * [Plugins](#VS-Code-Plugins)
7. [Modules](#Modules)
   * [Components](#Components)
   * [Pages](#Pages)
   * [Services](#Services)
   * [Utilities](#Utilities)
   * [State](#State)
   
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

### Building the Project (Production)

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

### Name conventions

#### Cody style

* Typescript usage is required
* Use class oriented code style
* Follow eslint recommended rules
* Follow stylelint recommended rules

#### Files

* Use dash-case for file and folder names, e.g. auth, product-card
* Locate folders and files appropriately according to [Folder Structure](#Folder-Structure)
* Use `generate` command to follow this convention easily
* Add new modules if necessary
* Follow folder aliases approach, see tsconfig.json for examples
* Edit file generation templates if necessary

#### Classes

* Each class in specific module has suffix with module name, e.g. AuthService, ProductCardComponent, LoginPage, DOMUtil

### Folder Structure

Follow agreed folder structure:

* [components: Reusable interface elements.](#Components)
* [pages: Separate app pages and routes.](#Pages)
* [services: Logic and data interaction.](#Services)
* [utilities: Helper functions and tools.](#Utilities)
* [state: Application state management.](#State)

### Code Review

Follow Google recommendations for Code Review:

* <https://habr.com/ru/articles/473308/>
* <https://habr.com/ru/articles/474334/>

## Contribute

1. Clone repository `git clone https://github.com/NikitaStarmoussov/eCommerce-Application.git`
2. Install dependencies with `npm intstall`
3. Run development service `npm run start`
4. Make changes
5. Verify your changes:
  * Build is successful `npm run build:dev` or `npm run build:prod`
  * There are no eslint errors `npm run lint`
  * Code is formatted `npm run format`
  * Tests are passed successfully `npm run test`
  * Test coverage is not less than 35% `npm run test:coverage`
6. Create pull request to `develop`
7. Pass code review
  * Fix comments
  * Refactor
  * Get approvals from team
8. Merge pull request
9. Wait for deploy and release

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

where `.bi` is the class used for all Bootstrap icons, and 
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

### Components

Folder: `src/components`

Import Alias: `@Components`

#### Generating Files

1. To generate a new component, use the following command in the terminal:

```shell
npm run generate component ComponentName
```

2. Specify if SCSS files are needed by typing "y" or "n".

3. Specify if `*.types.ts` files are needed by typing "y" or "n".

4. The folder with the files will be created in `src/components`.

#### Structure

* `component-name.view.ts`: This file contains the component's layout, creation of DOM elements, and event binding.
* `component-name.ts`: This file contains the component's data, methods, and event handlers.
* `component-name.test.ts`: contains tests for the component
* `component-name.scss`: component styles (optional)

### Example

#### Creating a Component and its Elements

component-name.view.ts

```ts
import { ViewBuilder } from "@Interfaces/view-builder";

export default class ComponentNameView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
```

component-name.ts

```ts
import ComponentNameView from "./component-name.view";

export default class ComponentName {
  private view: ComponentNameView;

  constructor() {
    this.view = new ComponentNameView();
  }

  init() {
    this.view.render();
  }
}
```

#### Event Binding

<details>
<summary>Code Example</summary>

component-name.view.ts

```ts
import { ViewBuilder } from "@Interfaces/view-builder";

export default class ComponentNameView extends ViewBuilder {
  element: HTMLElement;
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.element = this.createElement("div");

    this.button = this.createElement("button");
    this.element.appendChild(this.button);
  }

  buttonClickListener(handler: () => void) {
    this.button.addEventListener("click", handler);
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
```

component-name.ts

```ts
import ComponentNameView from "./component-name.view";

export default class ComponentName {
  private view: ComponentNameView;

  constructor() {
    this.view = new ComponentNameView();
    this.view.buttonClickListener(this.buttonClickHandler.bind(this));
  }

  buttonClickHandler() {
    // any logic here
  }

  init() {
    this.view.render();
  }
}
```

</details>

#### Calling API Services

<details>
<summary>Code Example</summary>

component-name.view.ts

```ts
import { ViewBuilder } from "@Interfaces/view-builder";

export default class ComponentNameView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
  }

  displayProducts(products: Product) {
    // create elements for products displaying
    // append them to this.element
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
```

component-name.ts

```ts
import ComponentNameView from "./component-name.view";

export default class ComponentName {
  private view: ComponentNameView;
  private service: ProductsAPIService;

  private products: Product[] = [];

  constructor() {
    this.view = new ComponentNameView();
    this.service = new ProductsAPIService();

    this.fetchProducts();
  }

  async fetchProducts() {
    this.products = await this.service.fetchProducts();
    this.view.displayProducts(this.products);
  }

  init() {
    this.view.render();
  }
}
```

</details>

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
