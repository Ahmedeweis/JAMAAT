<template>
  <div class="min-h-screen w-full bg-cover bg-center relative h-screen flex flex-col items-center justify-center"
       :style="`background-image: url(${bg});`">
    <!-- زر الإغلاق -->
    <router-link to="/main"
      class="fixed top-5 left-0 m-4 flex justify-between items-center text-start bg-[#010035] shadow-lg rounded-lg z-50">
      <img src="../../assets/imgs/close_btn.svg" alt="Logo" class="w-10 z-10" />
    </router-link>
    <!-- العنوان -->
    <h1 class="text-white text-4xl mb-8 z-10">{{ $t("games") }}</h1>
    <img src="../../assets/imgs/JAMAAT.svg" alt="Logo" class="w-64 mb-6 z-10">
    <p class="text-white text-lg mb-8 z-10">{{ $t("chooseGame") }}</p>
    <!-- الألعاب -->
    <div class="space-y-4 z-10 w-full px-4 flex flex-col justify-center items-center" style="font-family: 'Rubik', sans-serif;">
      <router-link to="/main"
        class="btn-gradient-border px-6 py-3 text-white font-bold flex items-center justify-between h-16 bg-orange-500 text-2xl rounded-xl shadow-lg hover:bg-orange-600 transition">
        <img src="../../assets/imgs/play.svg" alt="Quiz Icon" class="w-6 h-6 mr-2 mb-[-4px]">
        <span>{{ $t("game1") }}</span>
      </router-link>
      <router-link to="/connectintro"
        class="btn-gradient-border cursor-pointer px-6 py-3 text-white font-bold flex items-center justify-between h-16 bg-orange-500 text-2xl rounded-lg shadow-lg hover:bg-orange-600 transition">
        <img src="../../assets/imgs/play.svg" alt="Quiz Icon" class="w-6 h-6 mr-2 mb-[-4px]">
        <span>{{ $t("connectFour") }}</span>
      </router-link>
      <router-link to="/Game3intro"
        class="btn-gradient-borderII px-6 py-3 text-white font-bold flex items-center justify-between h-16 bg-yellow-700 text-2xl rounded-lg shadow-lg transition">
        <img src="../../assets/imgs/Lock.svg" alt="Quiz Icon" class="w-6 h-6 mr-2 mb-[-4px]">
        <span>{{ $t("game3") }}</span>
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