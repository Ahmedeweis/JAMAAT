import { createApp } from "vue";
import { createI18n } from 'vue-i18n'
import Toast from "vue-toastification";
import { createHead } from '@vueuse/head'
import "vue-toastification/dist/index.css";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
// دالة لتحميل ملفات الـJSON من public/locales
async function loadLocaleMessages() {
  const locales = ['ar', 'en'];
  const messages = {};
  for (const locale of locales) {
    const response = await fetch(`/locales/${locale}.json`);
    if (!response.ok) {
      console.error(`Failed to load ${locale} locale`);
      continue;
    }
    messages[locale] = await response.json();
  }
  return messages;
}
// تهيئة التطبيق
async function bootstrap() {
  const messages = await loadLocaleMessages();
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('lang') || 'ar',
    fallbackLocale: 'ar',
    messages
  });
  const app = createApp(App);
  const head = createHead();
  app.use(head);
  app.use(i18n);
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
}
bootstrap();
