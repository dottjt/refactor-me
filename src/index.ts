import path from 'path';

// ENV
import { config } from 'dotenv-flow';
config({ path: path.resolve(__dirname, '..', 'environment'), silent: true });

// Dependencies
import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-body';
import logger from 'koa-logger';

// Routes
import { productRouter } from './routes/productRoutes/productRouter';

export const app =
  new Koa()
    .use(helmet())
    .use(bodyParser())
    .use(logger())
    .use(productRouter().routes())
    .listen(4000)

console.log('app listening on port 4000');
