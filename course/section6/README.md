# HTML Academy. Учебный проект «VueWork»

## Начальные требования
- Docker
- Docker-compose
- NodeJS 16+

## Docker установка
https://docs.docker.com/get-docker/

https://dker.ru/docs/ (рус)

## Docker-compose установка
https://docs.docker.com/compose/install/

## Node js установка
https://nodejs.org/en/download/

## Frontend установка

- Перейдите в директорию

`cd src/frontend`

- Установите зависимости

`$ npm install`

## Backend установка

- Перейдите в директорию

`cd src/backend`

- Установите зависимости

`$ npm install`

## Docker настройка

- Сборка проекта

`$ docker-compose build`

- Запуск проекта

`$ make start_project`

- Сервер запуститься по адресу localhost:3000 и клиент по адресу localhost:8080

## Вход в приложение

Мы подготовили несколько готовых пользователей в базе данных.
Список пользователей, электронные почты и пароли для входа доступны здесь
```
src/backend/src/factory/dummy-users.json
```

## API документация (OpenAPI)
Документация доступна по адресу

```
http://localhost:3000/explorer/
```

## Запуск и просмотр готовой верстки проекта

Перейтите в директорию
```
template/
```

Установите зависимости выполнив команду

```
npm install
```

Запустите проект командой

```
npm start
```

Шаблон и вёрстка будут доступны по адресу `http://localhost:9999`

Вёрстку можно посмотреть в директории `template/src`
