# WEBPACK

Для установки пакетов используйте команду npm install

## Команды

### Запуск сервера для разработки (порт 3000)

```shell
npm run start
```

### Сборка проекта без оптимизации

```shell
npm run build:dev
```

### Сборка проекта с оптимизацией

```shell
npm run build:prod
```

### Очистка папки dist

//unix (linux, macOS)

```shell
npm run clear:unix
```

//windows

```shell
npm run clear:windows

```

### Запуск линтера

```shell
npm run lint
```

### Запуск линтера (исправление ошибок)

```shell
npm run lint:fix

```

### Запуск prettier

```shell
npm run format

```

# Модули

## Компоненты

Папка: `src/components`

Импорт алиас: `@Components`

### Генерация файлов

1. Введите команду в терминале:

```shell
npm run generate component ComponentName
```

2. Укажите необходимость SCSS файла напечатав y(нужны) или n(не нужны)

3. Укажите необходимость \*.types.ts файла напечатав y(нужны) или n(не нужны)

4. Папка с файлами появится в src/componets

### Структура

- component-name.view.ts: содержит разметку компонента, создание DOM елементов и привязку событий
- component-name.ts: содержит данные компонента, методы и обработчик событий
- component-name.test.ts: содержит тесты для компонента
- component-name.scss: стили компонента (необязательно)

### Пример

#### Создание компонента и его элементов

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

#### Привязка событий

<details>
<summary>Пример кода</summary>

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

#### Вызов API сервисов

<details>
<summary>Пример кода</summary>

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

## Страницы

Папка: `pages`

Импорт алиас: `@Pages`

### Генерация файлов

1. Введите команду в терминале:

```shell
npm run generate page PageName
```

4. Укажите необходимость SCSS файла напечатав y(нужны) или n(не нужны)

5. Укажите необходимость \*.types.ts файла напечатав y(нужны) или n(не нужны)

6. Папка с файлами появится в src/pages

## Сервисы

Папка: `services`

Импорт алиас: `@Services`

### Генерация файлов

1. Введите команду в терминале:

```shell
npm run generate service ServiceName
```

2. Укажите необходимость SCSS файла напечатав y(нужны) или n(не нужны)

3. Укажите необходимость \*.types.ts файла напечатав y(нужны) или n(не нужны)

4. Папка с файлами появится в src/services

## Утилиты

Папка: `utils`

Импорт алиас: `@Utils`

### Генерация файлов

1. Введите команду в терминале:

```shell
npm run generate util UtilName
```

2. Укажите необходимость SCSS файла напечатав y(нужны) или n(не нужны)

3. Укажите необходимость \*.types.ts файла напечатав y(нужны) или n(не нужны)

4. Папка с файлами появится в src/utils

## State

Папка: `state`

Импорт алиас: `@State`

------------------

## Bootstrap 

### Style

Подключить стили:

```shell
import "bootstrap/scss/bootstrap.scss";
```

### JS

Подключить весь JS: 

```shell
import * as bootstrap from 'bootstrap'
```

Подключить только необходимые JS плагины: 

```shell
import Alert from 'bootstrap/js/dist/alert'
import { Tooltip, Toast, Popover } from 'bootstrap'
```

### Icons

Подключить: 

```shell
import "bootstrap-icons/font/bootstrap-icons.scss";
```

Вставить:

```shell
<i class="bi bi-icon-name">
```

где .bi - используется для всех элементов иконок,
bi-icon-name - имя конкретной иконки.
Размер по умолчанию - 1em. Рекомендуется использовать ширину: 1em (и, при желании, высоту: 1em) для удобного изменения размера с помощью font-size.
Доступные иконки: https://icons.getbootstrap.com/#icons

## Husky

Перед коммитом автоматически запускает форматирование и проверку кода, и запрещает коммит по найденным ошибкам

prepare - служебная команда установки при выполнении npm install

## Jest

- test - команда для запуска всех тестов.
- test:coverage - это метрика, которая показывает, какой процент кода вашего приложения исполняется при запуске тестов.
  1. Строки (Lines): Это процент строк кода, которые были выполнены. Если у вас есть строка кода, которая не была выполнена во время тестов, это будет показано в отчете.
  2. Функции (Functions): Это процент функций, которые были вызваны во время тестов. Если есть функция, которая ни разу не вызывалась во время тестов, это будет указано в отчете.
  3. Ветвления (Branches): Это процент ветвлений (if/else, switch, тернарные операторы и т.д.) в вашем коде, которые были проверены. Если у вас есть ветвление, которое не было выполнено во время тестов, это будет показано в отчете.
  4. Утверждения (Statements): Это процент инструкций (или выражений), которые были выполнены во время тестов.
