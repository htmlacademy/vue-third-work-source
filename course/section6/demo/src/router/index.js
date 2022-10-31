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
    {
      path: "/counter-1",
      name: "counter-props-events",
      component: () => import("../demo1/DemoCounter.vue"),
    },
    {
      path: "/server",
      name: "server",
      component: () => import("../demo5/Server.vue"),
    },
	  {
      path: "/animation-1",
      name: "animation-one",
      component: () => import("../demo6/AnimationOne.vue"),
    },
	  {
      path: "/animation-2",
      name: "animation-two",
      component: () => import("../demo6/AnimationTwo.vue"),
    },
	  {
      path: "/animation-list",
      name: "animation-list",
      component: () => import("../demo6/AnimationList.vue"),
    },
  ],
});

export default router;
