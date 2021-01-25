import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ElementPlugin from "./plugins/element";
import AxiosPlugin from "./plugins/axios";
import EchartsPlugin from "./plugins/echarts";
import MomentPlugin from "./plugins/moment";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlugin)
  .use(AxiosPlugin)
  .use(EchartsPlugin)
  .use(MomentPlugin)
  .mount("#app");
