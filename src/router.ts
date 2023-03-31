import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: "Home" }
    }
  ]
});

export default router;
