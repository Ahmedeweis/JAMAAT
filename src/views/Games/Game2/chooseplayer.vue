<template>
  <div class="min-h-screen w-full bg-cover bg-center flex" :style="`background-image: url(${bg});`">
    <div class="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white rounded-2xl p-4 shadow-lg w-full max-w-md relative border border-indigo-200">
        <!-- زر الإغلاق -->
        <router-link to="/connectintro" @click="exitGame"
          class="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700">
          <img src="../../../assets/imgs/close.svg" alt="Close" class="w-6 h-6">
        </router-link>
        <h2 class="text-2xl font-bold text-indigo-800 text-center mb-6"> {{ $t('gameConnect') }}</h2>
        <!-- اللاعب الأول -->
        <div class="flex flex-col text-center items-end mb-4"
        :dir="currentLang === 'ar' ? 'ltr' : 'rtl'"
              :class="{
    'text-left': $i18n.locale === 'en',
    'text-right': $i18n.locale === 'ar'
  }">
          <label class="text-purple-800 mb-2 font-bold"
  >{{ $t('player1Label') }}</label>
          <input v-model="player1"
            class="p-2 w-[100%] text-[#24054C] font-bold text-end rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
            :placeholder="$t('player1Placeholder')" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
              :class="{
    'text-left': $i18n.locale === 'en',
    'text-right': $i18n.locale === 'ar'
  }">
        </div>
        <!-- اللاعب الثاني -->
        <div class="flex flex-col text-center items-end mb-4"
        :dir="currentLang === 'ar' ? 'ltr' : 'rtl'"
              :class="{
    'text-left': $i18n.locale === 'en',
    'text-right': $i18n.locale === 'ar'
  }">
          <label class="text-purple-800 mb-2 font-bold"
:dir="currentLang === 'ar' ? 'ltr' : 'rtl'"
              :class="{
    'text-left': $i18n.locale === 'en',
    'text-right': $i18n.locale === 'ar'
  }" >{{ $t('player2Label') }}</label>
          <input v-model="player2"
            class="p-2 w-[100%] text-[#24054C] font-bold text-end rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
            :placeholder="$t('player2Placeholder')" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
              :class="{
    'text-left': $i18n.locale === 'en',
    'text-right': $i18n.locale === 'ar'
  }" />
        </div>
        <!-- زر البدء -->
        <button @click="startGame"
          class="flex justify-center items-center cursor-pointer w-full bg-red-500 text-white rounded-lg py-2 font-semibold transition mt-4">
          {{ $t('startButton') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import bg from '../../../assets/imgs/splash.png'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()
const route = useRoute()
const categories = ref([])
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const currentLang = locale.value
const player1 = ref('')
const player2 = ref('')
onMounted(() => {
  if (route.query.categories) {
    categories.value = route.query.categories.split(',').map(Number)
    console.log(' الفئات المستلمة:', categories.value)
  }
})
const startGame = () => {
  if (!player1.value.trim() || !player2.value.trim()) {
    toast.error(" من فضلك اكتب اسماء اللاعبين  ")
    return
  }
  // حفظ الأسماء
  localStorage.setItem('player1Name', player1.value)
  localStorage.setItem('player2Name', player2.value)
  // الانتقال للعبة مع الكاتيجوريز
  router.push({
    path: '/Homeconnect',
    query: {
      categories: categories.value.join(',')
    }
  })
}
</script>
