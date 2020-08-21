import path from 'path';

// ENV
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '..', '.env') });

// Dependencies
import Koa from 'koa';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';
import logger from 'koa-logger';

import ratelimit from 'koa-ratelimit';
import Redis from 'ioredis';

// Routes
import { productRouter } from './routes/productRoutes/productRouter';

// Main
const main = async () => {
  const app = new Koa();

  app
    .use(helmet())
    .use(ratelimit({
      driver: 'redis',
      db: new Redis(),
      duration: 60000,
      max: 100,
    }))
    .use(logger())
    .use(bodyParser())
    .use(productRouter().routes())
    .listen(7777)
}

main();
