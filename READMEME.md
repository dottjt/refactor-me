### Xero Application

Welcome! My name is Julius and this is my refactor!

Ultimately, my intention with this assignment is to demonstrate that I have a high-level understanding of how to write quality code. It is by no means production ready, as that would take weeks of my time, as well as significantly increase the complexity of the project i.e. handling secrets, but I try and paint a complete picture.

I've also gone and changed a number of conventions to make it more of a node.js project i.e. snakeCase, so please keep that in mind!

## Specifications

Language: TypeScript
Server Framework: Koa

## How To Run

You can either run this locally or within docker. I recommend Docker since it setups up the Postgres database for you:

- `.env.example` to `.env`
- `npm install`
- `npm run start:docker:dev`

Alternatively if you'd like to run it locally:

- `.env.example` to `.env`
- `npm install`
- `psql -U postgres`
- `CREATE DATABASE refactor_me;`
- `CREATE USER refactor_me_user WITH ENCRYPTED PASSWORD 'refactor_me_password';`
- `GRANT ALL PRIVILEGES ON DATABASE refactor_me TO refactor_me_user;`
- `npm run start:dev`

The application is also pre-populated with seed data for testing purposes. Just head to `./database/seeds/development_seed_data.ts` if you'd like to see the pre-defined values.

## Decisions

- Decided to rewrite everything from the ground-up in node.js, since that's what I primarily work with.
- Decided not to use Object-oriented patterns (classes, services etc.) in favour for more functional patterns. It produces cleaner code, in my opinion.
- My guiding principle whilst building this was to make the code as readable and as searchable as possible. I tried to make everything as explicit as possible.
- I didn't take the commits seriously, at all.

## If I Had More Time

- Setup SSL.
- Setup some sort of external error alerting i.e. Sentry.
- Setup Docker configurations for both testing and production.
- Setup some sort of contract testing (technically it would just be the verifier).
- Setup some sort of CI/CD i.e. Buildkite.
- Setup some sort of integration testing with the database.
- Fixtures file of all the different available products for testing purposes.
- Implement
- Add test coverage

## Improvements

- Added some much needed documentation.
- Added API validation.
- Added githooks.

## Discovered Errors

- SSL port number `44335` seemingly wrong?

## Opinions

- I probably wouldn't allow the client to fetch products with the direct product database id. It exposes too much information about the database, I would much prefer only being able to select objects via the name, or some other kind of identifier.

## Extras

### Migrations

- `npx knex --knexfile ./database/knexfile.ts migrate:make products -x ts`
- `npx knex --knexfile ./database/knexfile.ts migrate:make product_options -x ts`

### unused

"-- -- -- -- START SCRIPTS PROD -- -- -- -- ": "--",
"start:prod": "NODE_ENV=production npm run knex:migrate:prod && NODE_ENV=production npx ts-node ./src/index.ts",
"start:docker:prod": "NODE_ENV=production npm run docker:build:prod && npm run docker:up:prod",

"docker:up:prod": "docker-compose -f ./deployment/docker/prod/docker-compose.yml up",
"docker:build:prod": "docker-compose -f ./deployment/docker/prod-build/docker-compose.yml build --no-cache"

"-- -- -- -- DATABASE SCRIPTS PROD -- -- -- -- ": "--",
"knex:migrate:prod": "NODE_ENV=production npx knex --knexfile ./database/knexfile.ts migrate:latest",
