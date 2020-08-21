### Refactor Me

Hello! My name is Julius and this is my refactor! I knocked it up over the weekend and I'm pretty happy with what I managed to achieve.

Ultimately, my intention with this assignment was to demonstrate a high-level understanding of quality, purposeful code. It is by no means production ready, as that would take waaayyyyy too long, as well as significantly increase the complexity of the project i.e. handling secrets, but I've attempted to paint a complete picture with what's here.

## Specs

Language: TypeScript
Server: Koa
Testing: Jest, Supertest
Database: PostgreSQL

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

- Decided to rewrite everything from the ground-up in node.js, since that's what I primarily work with. Also changed the datastore from SQLite to PostgreSQL.
- Decided not to use Object-oriented patterns (classes, services etc.) in favour for more functional patterns. It produces cleaner code, in my opinion.
- My guiding principle whilst building this was to make the code as readable and as searchable as possible. I tried to make everything as explicit as possible.
- I didn't take the commit messages, nor their contents, seriously. At all.

## Improvements

- I basically rewrote everything.
- I changed the way a lot things worked (such as removing the `isNew` flag to determine whether it's a directive to create/update).
- Added some much needed documentation for the routes.
- Added extensive integration testing for the API endpoints.
- Added extensive API validation. Very happy with how this turned out.
- Added linting.
- Added githooks.

## If I Had More Time

- Setup SSL.
- Setup some sort of external error alerting i.e. Sentry.
- Setup Scripts/Docker configurations for a production build.
- Setup some sort of CI/CD i.e. Buildkite.
- Setup some sort of contract testing (technically it would just be the verifier).
- Create etensive fixture files of all the different available products.
- Implement test coverage i.e. NYC, as well as set testing thresholds.
- Write tests specific to the route validation (although technically they're tested via the integration testing).
- Add some form of rate limiting with a Redis cache.
- Add additional JSDoc annotations.

## Discovered Errors

- SSL port number `44335` seemingly wrong?

## Additional

- I probably wouldn't allow the client to fetch products with the direct product database id. It exposes too much information about the database (which additionally, is also cached by logging and the browser). I would much prefer only being able to select objects via the name, or some other kind of identifier which isn't the primary key.
- I have no oversight over the intention of the API. For example, I'm not sure if we want the names to also be unique? Otherwise I can literally just continue .

## Extras

### Migrations

- `npx knex --knexfile ./database/knexfile.ts migrate:make products -x ts`
- `npx knex --knexfile ./database/knexfile.ts migrate:make productOptions -x ts`

### unused

"-- -- -- -- START SCRIPTS PROD -- -- -- -- ": "--",
"start:prod": "NODE_ENV=production npm run knex:migrate:prod && NODE_ENV=production npx ts-node ./src/index.ts",
"start:docker:prod": "NODE_ENV=production npm run docker:build:prod && npm run docker:up:prod",

"docker:up:prod": "docker-compose -f ./deployment/docker/prod/docker-compose.yml up",
"docker:build:prod": "docker-compose -f ./deployment/docker/prod-build/docker-compose.yml build --no-cache"

"-- -- -- -- DATABASE SCRIPTS PROD -- -- -- -- ": "--",
"knex:migrate:prod": "NODE_ENV=production npx knex --knexfile ./database/knexfile.ts migrate:latest",


## Original README

# refactor-this
The attached project is a poorly written products API in C#.

Please evaluate and refactor areas where you think can be improved.

Consider all aspects of good software engineering and show us how you'll make it #beautiful and make it a production ready code.

## Getting started for applicants

There should be these endpoints:

1. `GET /products` - gets all products.
2. `GET /products?name={name}` - finds all products matching the specified name.
3. `GET /products/{id}` - gets the project that matches the specified ID - ID is a GUID.
4. `POST /products` - creates a new product.
5. `PUT /products/{id}` - updates a product.
6. `DELETE /products/{id}` - deletes a product and its options.
7. `GET /products/{id}/options` - finds all options for a specified product.
8. `GET /products/{id}/options/{optionId}` - finds the specified product option for the specified product.
9. `POST /products/{id}/options` - adds a new product option to the specified product.
10. `PUT /products/{id}/options/{optionId}` - updates the specified product option.
11. `DELETE /products/{id}/options/{optionId}` - deletes the specified product option.

All models are specified in the `/Models` folder, but should conform to:

**Product:**
```
{
  "Id": "01234567-89ab-cdef-0123-456789abcdef",
  "Name": "Product name",
  "Description": "Product description",
  "Price": 123.45,
  "DeliveryPrice": 12.34
}
```

**Products:**
```
{
  "Items": [
    {
      // product
    },
    {
      // product
    }
  ]
}
```

**Product Option:**
```
{
  "Id": "01234567-89ab-cdef-0123-456789abcdef",
  "Name": "Product name",
  "Description": "Product description"
}
```

**Product Options:**
```
{
  "Items": [
    {
      // product option
    },
    {
      // product option
    }
  ]
}
```
