<!-- components/StartGameModal.vue -->
<template>
   <div class="min-h-screen w-full bg-cover bg-center flex" :style="`background-image: url(${bg});`" >
  <div class="fixed inset-0  bg-opacity-60 flex justify-center items-center z-50">
    <div class="bg-white rounded-2xl p-4 shadow-lg w-full max-w-md relative border border-indigo-200">
      <!-- زر الإغلاق -->
      <router-link to="/main" @click="exitGame"  class="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700">
        <img src="../../../assets/imgs/close.svg" alt="Close" class="w-6 h-6">
      </router-link>
      <h2 class="text-2xl font-bold text-indigo-800 text-center mb-6">ابدأ لعبة الذكاء</h2>
      <!-- محتوى المودال: الفريق الأول -->
      <div class="flex flex-col text-center items-center">
        <label class="text-purple-800 mb-4 font-bold">اسم الفريق الأول</label>
        <input v-model="team1" class="p-2 w-[90%] text-[#24054C] font-bold text-end rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" placeholder="أدخل اسم الفريق الأول" />
      </div>
      <!-- عدد لاعبي الفريق الأول -->
      <div class="mb-4 mt-4 flex flex-col text-center items-center">
        <span class="text-purple-800 mb-2 font-bold">عدد اللاعبين في الفريق</span>
        <div class="flex items-center bg-[#ECE1FB] rounded-lg p-2">
          <button @click="decreasePlayers1" class="bg-gray-300 cursor-pointer w-8 h-8 rounded-lg hover:bg-gray-400">-</button>
          <input v-model="players1"  style="margin-left: 20px;" class="w-12 text-center mx-2 bg-transparent" type="number" readonly />
          <button @click="increasePlayers1" class="bg-[#01004C] font-bold cursor-pointer w-8 h-8 rounded-lg text-white">+</button>
        </div>
      </div>
      <!-- الفريق الثاني -->
      <div class="flex flex-col text-center items-center">
        <label class="text-purple-800 mb-4 font-bold">اسم الفريق الثاني</label>
        <input v-model="team2" class="p-2 w-[90%] text-[#24054C] font-bold text-end rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" placeholder="أدخل اسم الفريق الثاني" />
      </div>
      <!-- عدد لاعبي الفريق الثاني -->
      <div class="mb-4 mt-4 flex flex-col text-center items-center">
        <span class="text-purple-800 mb-2 font-bold">عدد اللاعبين في الفريق</span>
        <div class="flex items-center bg-[#ECE1FB] rounded-lg p-2">
          <button @click="decreasePlayers2" class="bg-gray-300  cursor-pointer w-8 h-8 rounded-lg hover:bg-gray-400">-</button>
          <input v-model="players2" style="margin-left: 20px;" class="w-12 text-center mx-2 bg-transparent" type="number" readonly />
          <button @click="increasePlayers2" class="bg-[#01004C] font-bold cursor-pointer w-8 h-8 rounded-lg text-white">+</button>
        </div>
      </div>
<!-- <button class=""> -->
<router-link :to="{ path: '/Homescreen', query: { id: gameId } }" @click="startGame" class=" flex justify-center items-center cursor-pointer  w-full bg-red-500 text-white rounded-lg py-2 font-semibold  transition mt-4">
  ابدأ اللعبة
</router-link>
<!-- </button> -->
    </div>
  </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import bg from '../../../assets/imgs/splash.png'
import { useRoute ,useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const gameId = route.query.id
console.log('📌 معرف اللعبة:', gameId)
const team1 = ref('')
const team2 = ref('')
const players1 = ref(1)
const players2 = ref(1)
const increasePlayers1 = () => {
  if (players1.value < 10) players1.value++
}
const decreasePlayers1 = () => {
  if (players1.value > 1) players1.value--
}
const increasePlayers2 = () => {
  if (players2.value < 10) players2.value++
}
const decreasePlayers2 = () => {
  if (players2.value > 1) players2.value--
}
const startGame = () => {
  localStorage.setItem('team1Name', team1.value)
  localStorage.setItem('gameId', gameId)
  localStorage.setItem('players1Count', players1.value)
  localStorage.setItem('team2Name', team2.value)
  localStorage.setItem('players2Count', players2.value)
  route.push('/Homescreen')
}
const exitGame = () => {
  localStorage.removeItem('team1Name')
  localStorage.removeItem('gameId')
  localStorage.removeItem('players1Count')
  localStorage.removeItem('team2Name')
  localStorage.removeItem('players2Count')
}
</script>
