<!-- components/StartGameModal.vue -->
<template>
  <div class="min-h-screen w-full bg-cover bg-center flex" :style="`background-image: url(${bg});`">
  </div>
</template>
<script setup>
import { ref } from 'vue'
import bg from '../../../assets/imgs/splash.png'
import { useRoute ,useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
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
