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

3. Укажите необходимость *.types.ts файла напечатав y(нужны) или n(не нужны)

4. Папка с файлами появится в src/componets
## Страницы

Папка: `pages`

Импорт алиас: `@Pages`

### Генерация файлов

1. Введите команду в терминале:

```shell
npm run generate page PageName
```

4. Укажите необходимость SCSS файла напечатав y(нужны) или n(не нужны)

5. Укажите необходимость *.types.ts файла напечатав y(нужны) или n(не нужны)

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

3. Укажите необходимость *.types.ts файла напечатав y(нужны) или n(не нужны)

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

3. Укажите необходимость *.types.ts файла напечатав y(нужны) или n(не нужны)

4. Папка с файлами появится в src/utils

## State

Папка: `state`

Импорт алиас: `@State`

------------------

## Bootstrap 

### Style

Подключить стили:

```shell
@import "bootstrap/scss/bootstrap";
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
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
```

Вставить:

```shell
<i class="bi bi-icon-name">
```

где .bi - используется для всех элементов иконок,
bi-icon-name - имя конкретной иконки.
Размер по умолчанию - 1em. Рекомендуется использовать ширину: 1em (и, при желании, высоту: 1em) для удобного изменения размера с помощью font-size.
Доступные иконки: https://icons.getbootstrap.com/#icons
