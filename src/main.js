import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/global.css";
// import "./plugins/element";
import ElemenePlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "element-plus/lib/index.full.js";
// 导入中文
import locale from "element-plus/lib/locale/lang/zh-cn";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElHeader,
  ElAside,
  ElContainer,
  ElMain,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElMenu,
} from "element-plus";

import axios from "axios";
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/";
axios.interceptors.request.use((config) => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
const app = createApp(App)
  .use(router)
  .use(ElemenePlus, { locale });
app.component(
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElHeader,
  ElAside,
  ElContainer,
  ElMain,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElMenu
);
// 将属性存放在全局属性中 调用就用this.$message
app.config.globalProperties.$message = ElMessage;
app.config.globalProperties.$axios = axios;

app.mount("#app");
