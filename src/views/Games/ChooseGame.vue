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
<div class="grid gap-6 w-full max-w-4xl sm:grid-cols-1 md:grid-cols-2">
  <div
    v-for="(game, index) in games"
    :key="index"
    class="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
  >
    <!-- رابط اللعبة -->
    <router-link :to="game.link" class="block relative">
      <!-- صورة اللعبة -->
      <img :src="game.img" alt="Game Image" class="w-full  object-cover">
      <!-- اسم اللعبة فوق يمين الصورة -->
      <div
        class="absolute top-3 right-3 bg-white/80 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-[2px]"
      >
        {{ $t(game.name) }}
      </div>
    </router-link>
    <!-- أيقونة الاستفهام -->
    <button
      @click.stop="openModal(index)"
      class="absolute top-3 left-3 bg-[#BB4D84] cursor-pointer text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg hover:scale-110 transition"
    >
      ?
    </button>
  </div>
</div>
<transition name="fade">
  <div v-if="modalOpen !== null"
       class="fixed inset-0 flex items-center justify-center z-[999] p-6 bg-black/50">
    <!-- المودال -->
    <div class="relative bg-white rounded-xl max-w-md w-full p-6 shadow-2xl transform transition duration-300 scale-95 animate-fadeIn">
      <!-- زر الغلق -->
      <button @click="closeModal"
              class="absolute top-3 right-3 text-gray-600 cursor-pointer hover:text-gray-900 font-bold text-lg">✕</button>
      <!-- محتوى المودال -->
      <h3 class="text-2xl font-semibold mb-4">{{ $t(games[modalOpen].name) }}</h3>
      <p class="text-gray-700">{{ $t(games[modalOpen].description) }}</p>
    </div>
  </div>
</transition>
  </div>
</template>
<script setup>
import bg from '../../assets/imgs/splash.png'
import { ref } from 'vue';
import game1 from '../../assets/imgs/games/1.png';
import game2 from '../../assets/imgs/games/2.png';
import game3 from '../../assets/imgs/games/3.png';
// Array للألعاب
const games = [
  {
    name: "تحدي الأسئلة",
     img: game1,
    logo: "path/to/logo1.png", // شعار اللعبة لمودال الشرح
    description: `قسم اصدقائك الى مجموعتين وقم بالاختيار من تصنيفات الأسئلة وابدأ اللعب.
احتساب النقاط:
200 سهل
400 متوسط
600 صعب.
استخدم وسائل المساعدة لتعزيز نقاطك أو لتعطيل خصمك.`,
    link: "/main"
  },
  {
    name: "وصل أربعة",
  img: game2,
    logo: "path/to/logo2.png",
    description: `قسم اصدقائك الى مجموعتين واختار تصنيف واحد فقط للعب.
احتساب النقاط:
- هناك طريقتين للفوز، الأولوية أن تقوم بتوصيل 4 قطع من النرد بشكل متتالي.
- في حال لم يقم احد بتوصيلها، يفوز من لديه قطع نرد أكثر على اللوح.`,
    link: "/connectintro"
  },
  {
    name: "بدون كلام",
     img: game3,
    logo: "path/to/logo3.png",
    description: `لديك ثلاثة جولات مختلفة للتنافس، والوقت هو العامل الرئيسي للفوز.
مناسبة لفريقين مكونة من شخصين وأكثر.
- الجولة الأولى (التمثيل)
قم بمسح الباركود الظاهر من جهاز آخر، واشرح لزميلك بالحركات فقط بدون صوت أو كلام أو تلميح.
احتساب النقاط: الثواني هي نقاطك، كلما اجبت بسرعة حصلت على نقاط اكثر.
- الجولة الثانية (الرسم)
قم بمسح الباركود الظاهر من جهاز آخر، واشرح لزميلك بالرسم فقط بدون صوت أو كلام، ولا تستخدم الحروف والارقام في الرسم.
احتساب النقاط: الثواني هي نقاطك، كلما اجبت بسرعة حصلت على نقاط اكثر.
- الجولة الثالثة (كلمة واحدة)
قم بمسح الباركود الظاهر من جهاز آخر، واشرح لزميلك بكلمة واحدة فقط، بدون ذكر اسم الشيء الظاهر في الصورة.
احتساب النقاط: اذا اجبت من كلمات اقل تحصل على نقاط اكثر.`,
    link: "/Game3intro"
  }
];
const modalOpen = ref(null);
function openModal(index) {
  modalOpen.value = index;
}
function closeModal() {
  modalOpen.value = null;
}
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
/* Fade overlay */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
/* Scale animation للكارت */
@keyframes scaleIn {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-scaleIn {
  animation: scaleIn 0.3s ease forwards;
}
</style>