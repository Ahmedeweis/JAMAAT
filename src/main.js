import { createApp } from "vue";
import Toast from "vue-toastification";
import { createHead } from '@vueuse/head'
import "vue-toastification/dist/index.css";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
const app = createApp(App);
const head = createHead()
app.use(head)
app.use(createPinia());
app.use(router);
app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
});
app.mount("#app");
