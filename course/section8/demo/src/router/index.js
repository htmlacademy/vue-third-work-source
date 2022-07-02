import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/DemoMenu.vue"),
    },
    {
      path: "/counter-0",
      name: "counter-base",
      component: () => import("../demo0/DemoCounter.vue"),
    },
  ],
});

export default router;
