import { createRouter, createWebHistory } from "vue-router";
import routes from './routes'
import { middlewarePipeline } from '@/middlewares'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares;
  if (!middlewares?.length) {
    return next();
  }

  // Запускаем обход по цепочке проверок
  const context = { to, from, next };
  const firstMiddlewareIndex = 0;
  const nextMiddlewareIndex = 1;
  return middlewares[firstMiddlewareIndex]({
    ...context,
    nextMiddleware: middlewarePipeline(
      context,
      middlewares,
      nextMiddlewareIndex
    )
  });
});

export default router;
