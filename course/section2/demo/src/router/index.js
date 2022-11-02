import { createRouter, createWebHistory } from "vue-router";
import routes from '../routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/DemoMenu.vue"),
    },
    ...routes,
  ],
});

export default router;
