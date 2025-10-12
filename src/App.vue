<template>
  <div :dir="dir">
    <router-view />
  </div>
</template>
<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
// كل ما اللغة تتغير، الاتجاه يتحدث فوراً
const dir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))
watch(locale, (newLang) => {
  document.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLang
})
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
