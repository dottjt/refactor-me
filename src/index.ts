import path from 'path';

// ENV
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '..', '.env') });

// Dependencies
import Koa from 'koa';
import helmet from 'koa-helmet';
import ratelimit from 'koa-ratelimit';
import bodyParser from 'koa-body';
import logger from 'koa-logger';

// Routes
import { productRouter } from './routes/productRoutes/productRouter';

// Main
const main = async () => {
  const app = new Koa();

  app
    .use(helmet())
    // .use(ratelimit({
    //   db: 'memory',
    //   duration: 60000,
    //   max: 100,
    // }))
    .use(logger())
    .use(bodyParser())
    .use(productRouter().routes())
    .listen(4000)

  console.log('app listening on port 4000');
}

main();
