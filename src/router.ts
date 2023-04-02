import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import MovieDetailView from "./views/MovieDetailView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView
    },
    {
      path: "/movie/:movieId",
      name: "Movie",
      props: true,
      component: MovieDetailView
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: "Home" }
    }
  ]
});

export default router;
