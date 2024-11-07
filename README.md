# Backlogger

Simple game tracker

## Technologies and Tools

- TypeScript
- React
- Express
- PostgreSQL
- Tailwind + shadcn/ui

## REST API Endpoints

Base URL => `/api/v1`

### Genre

| Description    | Method | Endpoint   |
| -------------- | ------ | ---------- |
| All Genre      | GET    | /genre     |
| Games in Genre | GET    | /genre/:id |

### Games

| Description   | Method | Endpoint   |
| ------------- | ------ | ---------- |
| All Games     | GET    | /games     |
| Add Game      | POST   | /games     |
| Single Game   | GET    | /games/:id |
| Delete a Game | DELETE | /games/:id |
| Update a Game | PATCH  | /games/:id |

## Running the Project locally

1. Run the client.

   1. Go to `/client` and run `npm i`
   2. Run dev mode using `npm run dev`

2. Run the server.

   1. Go to `/server` and run `npm i`
   2. Setup .env variables (check below for example)
   3. Run dev mode using `npm run dev`

3. Open client in browser.

## env.example

> [!WARNING]
> Don't recklessly push your env variables to your version control system.

```js
PORT=8080
// dev PG uri
DEV_DB_URL=postgresql://username:password@localhost:PORT/projectnameexample
// production PG uri
DB_URL=productionuri

```
