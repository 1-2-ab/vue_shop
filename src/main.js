import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/global.css";
// import "./plugins/element";
import ElemenePlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { Button, Form, FormItem, Input } from "element-plus";

createApp(App)
  .use(router)
  .use(ElemenePlus)
  .use(Button)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .mount("#app");
