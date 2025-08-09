<template>
<div class="min-h-screen w-full bg-cover bg-center relative h-screen flex flex-col items-center pt-16 "
     :style="`background-image: url(${bg});`">
  <h1 class="text-white text-4xl mb-8 z-10">ألعاب</h1>
  <img src="../../assets/imgs/JAMAAT.svg" alt="Logo" class="w-64 mb-6 z-10">
  <p class="text-white text-lg mb-8 z-10">أختر اللعبة</p>
   <div class="space-y-4 z-10 w-full px-4 flex flex-col justify-center  items-center" style="font-family: 'Rubik', sans-serif;">
  <router-link to="/main" class="btn-gradient-border px-6 py-3 text-white font-bold flex items-center justify-between h-16 bg-orange-500 text-2xl rounded-xl shadow-lg hover:bg-orange-600 transition">
    <img src="../../assets/imgs/play.svg" alt="Quiz Icon" class="w-6 h-6 mr-2 mb-[-4px]">
    <span> لعبة 1 </span>
  </router-link>
  <router-link to="" class="btn-gradient-border cursor-not-allowed px-6 py-3 text-white font-bold flex items-center justify-between h-16 bg-orange-500 text-2xl rounded-lg shadow-lg hover:bg-orange-600 transition">
    <img src="../../assets/imgs/play.svg" alt="Quiz Icon" class="w-6 h-6 mr-2 mb-[-4px]">
    <span>جمع أربعة</span>
  </router-link>
  <router-link to="" class="btn-gradient-borderII cursor-not-allowed px-6 py-3 text-white font-bold flex items-center justify-between h-16 bg-yellow-700 text-2xl rounded-lg shadow-lg transition">
    <img src="../../assets/imgs/Lock.svg" alt="Quiz Icon" class="w-6 h-6 mr-2 mb-[-4px]">
    <span> لعبة  3</span>
  </router-link>
</div>
  </div>
</template>
<script setup>
import bg from '../../assets/imgs/splash.png'
import { ref } from 'vue';
</script>
<style scoped>
.btn-gradient-border {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 21rem;
  height: 4rem;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  background:
    linear-gradient(#F9B85E, #E3614E) padding-box, /* لون الخلفية */
    linear-gradient(to bottom, #FFFEBF, #F09174) border-box; /* الجراديانت */
  border: 3px solid transparent;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}
.btn-gradient-borderII {
      display: flex;
  align-items: center;
  justify-content: space-between;
  width: 21rem;
  height: 4rem;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  background:
    linear-gradient(#985637, #985637) padding-box, /* لون الخلفية */
    linear-gradient(to bottom, #FFFEBF, #F09174) border-box; /* الجراديانت */
  border: 3px solid transparent;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}
</style>