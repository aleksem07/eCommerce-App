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

### Структура

- component-name.html: разметка компонента
- component-name.ts: содержит данные компонента, методы, обязательный метод Draw возвращающий разметку
- component-name.test.ts: содержит тесты для компонента
- component-name.scss: стили компонента (необязательно)

### Пример

component-name.html

```handlebars
<div>
  <h2>{{title}}</h2>
  <p>{{content}}</p>
</div>
```

component-name.ts

```ts
import template from "./component-name.html";

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
