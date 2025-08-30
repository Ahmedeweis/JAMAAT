<template>
  <div class="min-h-screen w-full bg-cover bg-center flex" :style="`background-image: url(${bg});`">
      <div class="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white rounded-2xl p-4 shadow-lg w-full max-w-md relative border border-indigo-200">
        <!-- زر الإغلاق -->
        <router-link to="/main" @click="exitGame"
          class="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700">
          <img src="../../../assets/imgs/close.svg" alt="Close" class="w-6 h-6">
        </router-link>
        <h2 class="text-2xl font-bold text-indigo-800 text-center mb-6">{{ $t("startGameTitle") }}</h2>
        <!-- الفريق الأول -->
        <div class="flex flex-col text-center items-center">
          <label class="text-purple-800 mb-4 font-bold">{{ $t("team1Name") }}</label>
          <input v-model="team1"
            class="p-2 w-[90%] text-[#24054C] font-bold text-end rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
            :placeholder="$t('enterTeam1Name')"
              :style="{ textAlign: currentLang === 'ar' ? 'right' : 'left' }" />
        </div>
        <!-- عدد لاعبي الفريق الأول -->
         <div class="mb-4 mt-4 flex flex-col items-center w-1/2 max-w-xs mx-auto">
  <span class="text-purple-800 mb-2 font-bold text-lg sm:text-xl">{{ $t("playersCount") }}</span>
  <div class="flex items-center justify-between bg-[#ECE1FB] rounded-xl p-3 w-full">
    <!-- زر ناقص -->
    <button @click="decreasePlayers1"
            class="bg-gray-300 cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-2xl font-bold hover:bg-gray-400">
      -
    </button>
    <!-- الرقم -->
    <input  v-model="players1"
           type="number"
           readonly
           class="w-16 sm:w-20 text-center text-xl sm:text-2xl font-semibold bg-transparent border-none focus:outline-none" style="margin-left: 10px;" />
    <!-- زر زائد -->
    <button @click="increasePlayers1"
            class="bg-[#01004C] cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-2xl font-bold text-white hover:bg-[#000080]">
      +
    </button>
  </div>
</div>
        <!-- الفريق الثاني -->
        <div class="flex flex-col text-center items-center">
          <label class="text-purple-800 mb-4 font-bold">{{ $t("team2Name") }}</label>
          <input v-model="team2"
            class="p-2 w-[90%] text-[#24054C] font-bold text-end rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
            :placeholder="$t('enterTeam2Name')"
              :style="{ textAlign: currentLang === 'ar' ? 'right' : 'left' }" />
        </div>
        <!-- عدد لاعبي الفريق الثاني -->
<div class="mb-4 mt-4 flex flex-col items-center w-1/2 max-w-xs mx-auto">
  <span class="text-purple-800 mb-2 font-bold text-lg sm:text-xl">{{ $t("playersCount") }}</span>
  <div class="flex items-center justify-between bg-[#ECE1FB] rounded-xl p-3 w-full">
    <!-- زر ناقص -->
    <button @click="decreasePlayers2"
            class="bg-gray-300 cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-2xl font-bold hover:bg-gray-400">
      -
    </button>
    <!-- الرقم -->
    <input v-model="players2"
           type="number"
           readonly
           class="w-16 sm:w-20 text-center text-xl sm:text-2xl font-semibold bg-transparent border-none focus:outline-none" />
    <!-- زر زائد -->
    <button @click="increasePlayers2"
            class="bg-[#01004C] cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-2xl font-bold text-white hover:bg-[#000080]">
      +
    </button>
  </div>
</div>
<!-- زر بدء اللعبة -->
<button
  @click="startGame"
  class="flex justify-center items-center cursor-pointer w-full bg-red-500 text-white rounded-lg py-2 font-semibold transition mt-4"
>
  {{ $t("startButton") }}
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
const team1 = ref('')
const team2 = ref('')
const players1 = ref(2)
const players2 = ref(2)
const increasePlayers1 = () => {
  if (players1.value < 10) players1.value++
}
const decreasePlayers1 = () => {
  if (players1.value > 2) players1.value--
}
const increasePlayers2 = () => {
  if (players2.value < 10) players2.value++
}
const decreasePlayers2 = () => {
  if (players2.value > 2) players2.value--
}
onMounted(() => {
  if (route.query.categories) {
    categories.value = route.query.categories.split(',').map(Number)
    console.log(' الفئات المستلمة:', categories.value)
  }
})
const startGame = () => {
  if (!team1.value.trim() || !team2.value.trim()) {
    toast.error("من فضلك اكتب أسماء الفرق");
    return;
  }
  localStorage.setItem('team1Name', team1.value)
  localStorage.setItem('team2Name', team2.value)
  router.push({
    path: '/Game3Home',
    query: {
      categories: categories.value.join(','),
      players1: players1.value,
      players2: players2.value
    }
  })
}
</script>
