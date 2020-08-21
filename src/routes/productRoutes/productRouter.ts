import Router from '@koa/router';

import { getProductRoutes } from './http/getProducts';
import { deleteProductRoutes } from './http/deleteProducts';
import { postProductRoutes } from './http/postProducts';
import { putProductRoutes } from './http/putProducts';

export const productRouter = (): Router => {
  const router = new Router();

  router
    .use(getProductRoutes().routes())
    .use(deleteProductRoutes().routes())
    .use(postProductRoutes().routes())
    .use(putProductRoutes().routes())

  return router;
}