# Description

Full stack Asteroids App.
- Client: Vite + React + Typescript
- Server: NestJS + Typescript

# Server
## Installation and running

```bash
$ cd server

$ yarn install

$ yarn dev
```
This will start NestJS app at http://localhost:8080

OpenAPI docs is available at http://localhost:8080/api/#

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Client
## Installation and running

```bash
$ cd client

$ yarn install

$ yarn dev
```
This will start frontend server at http://localhost:5173.

Enjoy using the app.

### Test

```bash
# first start dev server
$ yarn dev

# then open  cypress app, there you can select desired test to run
$ yarn run cypress:open
```

