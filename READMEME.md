### Xero Application

Welcome! My name is Julius and this is my codebase.

## Specifications

Language: TypeScript
Server Framework: Koa
CI/CD: Buildkite

- Docker

## How To Run

- `npm install`
- `npm run start:dev`

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

## Found Errors

- SSL port number `44335` seemingly wrong?
-




- I would have liked to have used GraphQL but it was clear that this was a rest API.
