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

### Создание файлов (blob)
```shell
1) npm run generate
2) Выбор конечной папки(пример: component)
3) Имя файла в CamelCase(пример: Header)
4) Указать необходимость SCSS файла(пример: y)
5) Указать необходимость *.types.ts файла(пример: y)


```
### Импорт в ts

Пример:

import Login from "@Pages/login/login";

Список всех сокращений:

@Components/* === src/components/*",
@Pages/* === src/pages/*,
@Services/* === src/services/*,
@State/* === src/state/*,
@Utils/* === src//utils/*,

