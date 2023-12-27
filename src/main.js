import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import "@arco-design/web-vue/dist/arco.min.css"
const app = createApp(App);
app.use(router);
app.mount("#app");
