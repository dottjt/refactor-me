### Refactor Me

Hello! My name is Julius and this is my refactor! I knocked it up over a weekend and I'm pretty happy with how it turned out. I hope you like it too!

It is by no means production ready, nor complete, as that would take weeks, as well as significantly increase the complexity of the project i.e. handling secrets, but I've attempted to paint a complete picture with what's here.

## Specs

Language: TypeScript
Server: Node.js, Koa
Testing: Jest, Supertest
Database: PostgreSQL

## How To Run

### Application

The application has been setup to run locally within docker. This is so you don't have to handle the database yourself.

- `environment/.env.example` to `environment/.env`
- `npm install`
- `npm run start:docker:dev`

It listens on port `4000`. i.e. `http://localhost:4000`

The application is also pre-populated with seed data for testing purposes. Just head to `./database/seeds/dev/development_seed_data.ts` or `./database/seeds/test/test_seed_data.ts` if you'd like to see the pre-defined values.

### Testing

I also setup integration testing. It's been setup exclusively in docker for reasons of idempotency, in part because they're integration tests which rely on the database. It might work in local, but I haven't really tested it.

- `npm run start:docker:test`

## Decisions

- Decided to rewrite everything from the ground-up in node.js, since that's what I primarily work with. Also changed the datastore from SQLite to PostgreSQL.
- Decided not to use Object-oriented patterns (classes, services etc.) in favour for more functional patterns. It produces cleaner code, in my opinion.
- My guiding principle whilst building this was to make the code as readable and as searchable as possible. This included making everything as explicit as possible.
- Decided to make the API more permissible, meaning to return empty objects, rather than errors if things didn't exist.
- I didn't take the commit messages, nor their contents seriously. Like, at all.

## Improvements

- I changed the way a lot things worked (such as removing the `isNew` flag to determine whether it's a directive to create/update).
- Added some much needed documentation for the routes.
- Added extensive integration testing for the API endpoints.
- Added extensive API validation. Very happy with how this turned out.
- Added linting.
- Added githooks.

## If I Had More Time

- Setup SSL.
- Setup production scripts/Docker configurations.
- Setup some sort of external error alerting i.e. Sentry.
- Setup some sort of CI/CD i.e. Buildkite.
- Setup some sort of contract testing (technically it would just be the verifier).
- Create extensive fixture files of all the different available products.
- Implement test coverage i.e. NYC, as well as set testing thresholds.
- Write tests specific to the route validation (even though technically they're tested via the integration testing of the routes).
- Rewrite the way secrets/environments are being handled, it's a bit of a mess. Or use some sort of external service like Vault.
- Create a bash scripts folder to handle the different flows, rather than jamming everything into the package.json.
- Add some form of rate limiting with a Redis cache.
- Have the application generate log files.
- Add additional JSDoc annotations.
- Get Docker tests to output some colours.
- Make it either `dev` or `development`, not both.
- Fix up the README documentation and clean up a heap of stuff.
- Maybe use Yarn?
- Fix some of the redundancy, especially with the seeding.

## Discovered Errors

- SSL port number `44335` seemingly wrong?

## Additional

- I probably wouldn't allow the client to fetch products with the direct product database id. It exposes too much information about the database (which additionally, is also cached via external logging and even the browser). I would much prefer only being able to select objects via the name, or some other kind of identifier which isn't the primary key.
- I have no oversight over the intention of the API, so for example, I'm not sure if the product names should have also been unique? Otherwise I can literally just continue to create products infinitely with the same data. Which I dunno, may be exactly what you want.

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
