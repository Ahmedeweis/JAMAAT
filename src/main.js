import { createApp } from "vue";
import { createI18n } from 'vue-i18n'
import ar from './locales/ar.json'
import en from './locales/en.json'
const messages = { ar, en }
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('lang') || 'ar',
  fallbackLocale: 'ar',
  messages,
});
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
app.use(i18n)
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
