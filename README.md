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

- component-name.mst: разметка компонента
- component-name.ts: содержит данные компонента, методы, обязательный метод Draw возвращающий разметку
- component-name.test.ts: содержит тесты для компонента
- component-name.scss: стили компонента (необязательно)

### Пример

component-name.mst

```handlebars
<div>
  <h2>{{title}}</h2>
  <p>{{content}}</p>
</div>
```

component-name.ts

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

Использование компонента

```ts
import ComponentName from "./component-name";

const element = new ComponentName();

document.body.innerHTML = element.draw();
```

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

---
