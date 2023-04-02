import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import "./styles/pagination.css";
import "./styles/scrollbars.css";
import { API_CONFIG_KEY, getApiConfig } from "./api";
import { ApiConfig } from "./interfaces/api";

const app = createApp(App).use(router).use(VueAwesomePaginate);

// We need the config to work with the images in the TMDB API
// (https://developers.themoviedb.org/3/configuration/get-api-configuration)
let config: ApiConfig | null = JSON.parse(localStorage.getItem(API_CONFIG_KEY) || "null");
if (!config) {
  // The config is not in the localStorage,so we fetch it and save it
  getApiConfig().then((config) => {
    localStorage.setItem(API_CONFIG_KEY, JSON.stringify(config));
    app.mount("#app");
  });
} else {
  // The config is in the localStorage, no need to fetch it again
  app.mount("#app");
}
