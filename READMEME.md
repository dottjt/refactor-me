### Xero Application

Welcome! My name is Julius and this is my refactor!

Ultimately my intention with this assignment is to demonstrate that I have a high-level understanding of how to write quality code. It is by no means production ready, as that would take weeks as well as significantly increase the complexity of the project i.e. handling secrets, but I try and paint a complete picture.

I've also gone and changed a number of conventions to make it more of a node.js project i.e. snakeCase, so please keep that in mind! 

## Specifications

Language: TypeScript
Server Framework: Koa

## How To Run

You can either run this locally or within docker. I recommend Docker since it setups up the Postgres database for you:

- change `.env.example` to `.env`
- `npm install`
- `npm run start:docker:dev`

## Decisions

- Decided to rewrite everything from the ground-up in node.js, since that's what I primarily work with and enjoy the most.
- Decided not to use Object-oriented patterns (classes, services etc.) in favour for more functional patterns. In my opinion it produces cleaner code.
- Optimised the codebase around searchability. I believe this is important and it reduces the mental overloading of writing code.
- General use of `export` instead of `export default` in order to maintain explicit relations.

## If I Had More Time

- Setup some sort of error alerting i.e. Sentry.
- Setup Docker configurations for both testing and production to work with CI/CD.
- Setup some sort of contract testing (technically it would just be the verifier).
- Setup some sort of CI/CD i.e. Buildkite.
- Setup some sort of integration testing with the database.


## Improvements

- Added validation.
-

## Discovered Errors

- SSL port number `44335` seemingly wrong?

## Migrations

- `npx knex --knexfile ./database/knexfile.ts migrate:make products -x ts`
- `npx knex --knexfile ./database/knexfile.ts migrate:make product_options -x ts`





- I would have liked to have used GraphQL but it was clear that this was a rest API.


// unused

"-- -- -- -- START SCRIPTS PROD -- -- -- -- ": "--",
"start:prod": "NODE_ENV=production npm run knex:migrate:prod && NODE_ENV=production npx ts-node ./src/index.ts",
"start:docker:prod": "NODE_ENV=production npm run docker:build:prod && npm run docker:up:prod",

"docker:up:prod": "docker-compose -f ./deployment/docker/prod/docker-compose.yml up",
"docker:build:prod": "docker-compose -f ./deployment/docker/prod-build/docker-compose.yml build --no-cache"

"-- -- -- -- DATABASE SCRIPTS PROD -- -- -- -- ": "--",
"knex:migrate:prod": "NODE_ENV=production npx knex --knexfile ./database/knexfile.ts migrate:latest",
