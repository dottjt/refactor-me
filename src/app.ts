import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-body';
import logger from 'koa-logger';

import { productRouter } from './routes/productRoutes/productRouter';

export const app =
  new Koa()
    .use(helmet())
    .use(bodyParser())
    .use(logger())
    .use(productRouter().routes())

