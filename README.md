# Xero Coding Exercise

Hello! My name is Julius and this is my refactor! I knocked it up over the weekend and I'm pretty happy with what I managed to achieve. I hope you like it too!

It is by no means production ready, nor complete, as that would take weeks given the required functionality, as well as significantly increase the complexity of the project i.e. handling secrets, but I've attempted to paint a complete picture with what's here.

## Specs

- Language: TypeScript
- Server: Node.js, Koa
- Testing: Jest, Supertest
- Database: PostgreSQL

## How To Run

### Application

The application has been setup to run locally within docker. This is so you don't have to handle the database yourself. It also handles hot-reloading as well.

- Change `environment/.env.example` to `environment/.env`
- `npm install`
- `npm run start:docker:dev`

You may then listen to the application on port `4000`. i.e. `http://localhost:4000`

The application has also been pre-populated with seed data for testing purposes. Just head to `./database/seeds/dev/development_seed_data.ts` or `./database/seeds/test/test_seed_data.ts` if you'd like to see those values.

Here are some random GET endpoints you can try in your browser, although the integration tests prove that all HTTP endpoints are correct and functioning.

- `http://localhost:4000/products`
- `http://localhost:4000/products?name=Amazing Product Name One`
- `http://localhost:4000/products?name=%22Amazing%20Product%20Name%20One%22`
- `http://localhost:4000/products/8659a37b-738d-489b-bc2b-a3b0d99bb517`
- `http://localhost:4000/products/invalid-guid`
- `http://localhost:4000/products/8659a37b-738d-489b-bc2b-a3b0d99bb517/options`
- `http://localhost:4000/products/8659a37b-738d-489b-bc2b-a3b0d99bb517/options/1ed606ed-6bfc-4198-92a5-a9577028da5a`
- `http://localhost:4000/products/invalid-guid/options/1ed606ed-6bfc-4198-92a5-a9577028da5a`
- `http://localhost:4000/products/invalid-guid/options/invalid-guid`

### Testing

The integration testing also uses docker because they heavily interface with the database.

- `npm run start:docker:test`

If the integration tests don't work, it's most likely because the development server is still running. You may need to go into `docker ps` and remove those instances.

## Decisions

- Decided to rewrite everything from the ground-up (in node.js) since that's what I'm most experienced with. Also changed the datastore from SQLite to PostgreSQL so the application can be more extensible in future.
- Decided not to use Object-oriented patterns (classes, services etc.) in favour for more functional patterns. It produces cleaner code, in my opinion.
- My guiding principle whilst building this was to make the code as readable and as searchable as possible. Basically, making everything as explicit as possible. i.e. `export` instead of `default export`.
- Decided to make the API more permissible, meaning to return empty objects, rather than errors if things didn't exist.
- Please disregard the commit messages, they are neither meaningful, nor meaningful.

## Improvements

- I changed the way a lot things worked (such as removing the `isNew` flag to determine whether it's a directive to create/update).
- Added extensive integration testing for the API endpoints.
- Added extensive API validation. Very happy with how this turned out.
- Added some much needed documentation for the routes.
- Added linting.
- Added githooks.
- Blessed the codebase with holy water to ensure it's protected from demon hackers.

## If I Had More Time

- Setup SSL.
- Setup scripts/Docker configurations for production.
- Setup some sort of external error alerting i.e. Sentry.
- Setup some sort of CI/CD i.e. Buildkite.
- Setup some sort of contract testing (technically it would just be the verifier).
- Setup some kind of unit testing.
- Some kind of user authentication on the routes, since I imagine you wouldn't want anyone to upload/delete products.
- Create extensive fixture files of all the different available products.
- Implement test coverage i.e. NYC, as well as set testing thresholds.
- Test logging is a mess.
- Write tests specific to the route validation (even though technically they're tested via the integration testing of the routes).
- Rewrite the way secrets/environments are being handled, it's a bit of a mess. Or use some sort of external service like Vault.
- Create a bash scripts folder to handle the different flows, rather than jamming everything into the package.json.
- Add some form of rate limiting with a Redis cache.
- Optimise the integration test queries, as well group them into logical components.
- Have the application generate log files.
- Add additional JSDoc annotations.
- Get Docker tests to output some colours.
- Make it either `dev` or `development`, not both.
- Rename `knex` references to `db`.
- Fix up the README documentation and clean up a heap of stuff.
- Maybe use yarn.
- Maybe create some sort of `constants` file.
- Fix some of the legacy redundancy, especially in regards to the seeding during testing.

## Additional

- I probably wouldn't allow the client to fetch products with the direct product database id. It exposes too much information about the database (which additionally, is also cached via external logging and even the browser). I would much prefer only being able to select objects via the name, or some other kind of identifier which isn't the primary key.
- I have no oversight over the intention of the API, so for example, I'm not sure if the product names should have also been unique? Otherwise I can literally just continue to create products infinitely with the same data. But I'm guessing you'd probably only let a logged in user delete/create products, but that's a huge undertaking well-beyond the scope of this assignment.
- SSL port number `44335` seemingly wrong?
