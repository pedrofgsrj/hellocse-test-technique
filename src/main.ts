import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import "./styles/pagination.css";
import "./styles/scrollbars.css";

createApp(App).use(router).use(VueAwesomePaginate).mount("#app");
