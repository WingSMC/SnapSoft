# SnapSoft homework - Gergely Dremák

Disclaimer: The .env is only included for development purposes.

## Prerequisites

- Node.js & npm/pnpm/yarn to
  - download development dependencies
  - run commands from package.json
  - run the actual server
- Docker for a convenient build process
- Docker-compose to setup a PostgreSQL database fast
  - or running a PostgreSQL database

## DB Schema setup

If you don't have a database already corresponding to the schemas described in [schema.prisma](./prisma/schema.prisma) you have to setup yours with `npx prisma db push`. Make sure the [.env](./.env) has a valid database connection string in it. If you need a running PostgreSQL database use `docker-compose up -d` (make sure to delete/comment out the api server related lines).

## Dev

First install all the dependencies with `npm i` then generate ORM related files with `npx prisma generate` run the server with `npm run dev`. No build needed.

## Build

Just run `npm i` to install the all dependencies then run `npm run build` to transpile the typescript to JS.

## Start

If you completed the `DB Schema setup` and the `Build` steps you should be able to run the server in production mode with `npm start`. You may want to change the `NODE_ENV` to `production` in [.env](./.env) (although it doesn't do anything in this case).

## Docker build

After you completed the `Build` step use `npm run docker-build` to create a docker image. If you want to change the default image name of `wingsmc/snapsoft:latest` you have to edit the [package.json](./package.json)'s `docker-build` script.

## Docker compose

Edit the [docker-compose.yml](./docker-compose.yml) to your needs then use the command `docker-compose up -d`

- You may want to edit the PostgreSQL authentication settings.
- Make sure the `DATABASE_URL` environment variable is defined for the `api` because the .env file is not copied into the docker image, if you don't define it the default is `postgres://postgres:postgres@postgres:5432/postgres`

## Input / Output formats

### /api/calculate/[abc]

Request body:

```json
{
  "input": [1,2,3,4],
  "comment": "some comment"
}
```

Response body:

```json
{
  "output": [24,12,8,6]
}
```

### Example /api/history

Request url:

```
http://localhost:3000/api/history?filter=test
```

Response body:

```json
[
  {
    "id": 10,
    "timestamp": "2022-08-10T11:39:45.499Z",
    "comment": "test3",
    "input": [
      9,
      10,
      11,
      12
    ],
    "output": [
      1320,
      1188,
      1080,
      990
    ]
  }
]
```

The filtering mechanism used returns true, if the given comment has the filter's value as a substring.
The endpoint returns an array of calculations satisfying the filter.

## Testing

I made some primitive manual tests in [this file](./test/integration/test.rest).
