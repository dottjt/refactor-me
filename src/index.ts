import path from 'path';

// ENV
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '..', '.env') });

// Dependencies
import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-body';
import logger from 'koa-logger';

// Util
// import { logger } from './util/logger';

// Routes
import { productRouter } from './routes/productRoutes/productRouter';

// Main
const main = async () => {
  const app = new Koa();

  app
    .use(logger())
    .use(bodyParser())
    .use(productRouter.routes())
    .listen(7777)
}

main();
