import Router from '@koa/router';

import { getProductRoutes } from './http/getProductsRoutes';
import { deleteProductRoutes } from './http/deleteProductsRoutes';
import { postProductRoutes } from './http/postProductsRoutes';
import { putProductRoutes } from './http/putProductsRoutes';

export const productRouter = (): Router => {
  const router = new Router();

  router
    .use(getProductRoutes().routes())
    .use(deleteProductRoutes().routes())
    .use(postProductRoutes().routes())
    .use(putProductRoutes().routes())

  return router;
}