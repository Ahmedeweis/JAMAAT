<template>
  <div style="font-family: 'Kufam', 'sans-serif';" class=" min-h-screen bg-cover bg-center text-white font-arabic p-4" dir="rtl"
  :style="`background-image: url(${bg});`">
    <!-- Top Navigation Bar -->
 <nav class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 rounded-3xl bg-white text-black p-4 shadow-md gap-3 sm:gap-0">
  <!-- زر دور الفريق -->
  <button @click="toggleTeam"
    class="relative w-full sm:w-1/4 bg-[#ECE1FB] border-2 border-[#3F0092] px-4 py-2 sm:py-3 rounded-full flex items-center justify-center sm:justify-start cursor-pointer">
    <span class="text-[#24054D] font-bold text-sm sm:text-base">
      دور الفريق {{ currentTeam === 1 ? 'الأول' : 'الثاني' }}
    </span>
    <img
      src="../../../assets/imgs/switch.svg"
      alt="Switch"
      class="w-8 h-8 sm:w-13 sm:h-13 absolute sm:-left-3 sm:top-1/2 sm:-translate-y-1/2 hidden sm:block"
    />
  </button>
  <!-- العنوان -->
  <h1 class="text-lg sm:text-xl font-bold text-[#24054D] text-center flex-1 order-first sm:order-none">
    لعبة الذكاء
  </h1>
  <!-- أزرار التحكم -->
<div class="flex flex-wrap justify-center sm:space-x-4 sm:space-x-reverse gap-2 sm:gap-0">
    <!-- زر الرجوع للوحة -->
    <button
      @click="goTo('/main', 'هل تريد الرجوع للوحة؟')"
      class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base"
    >
      <img src="../../../assets/imgs/back.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2">
      <span class="c24054D">الرجوع للوحة</span>
    </button>
    <!-- زر الخروج -->
    <button
      @click="goTo('/main', 'هل تريد الخروج؟')"
      class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base"
    >
      <img src="../../../assets/imgs/door.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2">
      <span class="c24054D ml-2">خروج</span>
    </button>
    <!-- زر إنهاء اللعبة -->
<button
 @click="goToWinGame('/main', 'هل تريد الخروج؟')"
  class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base"
>
  <img src="../../../assets/imgs/End.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2">
  <span class="c24054D">إنهاء اللعبة</span>
</button>
  </div>
</nav>
    <!-- Questions Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
<div
  v-if="gameData && gameData.game_category"
  v-for="(categoryItem, index) in gameData.game_category"
    :key="index"
    class= "bg-white rounded-lg p-2"
  >
    <h3
      class="text-lg font-semibold mb-2 text-center c24054D">
      {{ categoryItem.category.name }}
    </h3>
    <div class="space-y-2">
<button
class="cursor-pointer"
  v-for="(question, qIndex) in categoryItem.category.questions"
  :key="qIndex"
  @click="selectQuestion(question, index + 1)"
  :disabled="answeredQuestions.includes(question.id)"
  :class="[
    'w-full py-2 rounded-lg shadow-sm transition border',
    answeredQuestions.includes(question.id)
      ? 'bg-[#24054D] text-white border-[#3F0092]'
      : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB]'
  ]"
>
  {{ question.points }}
</button>
    </div>
  </div>
</div>
    <!-- Logo and Score Counters -->
    <div class="flex flex-col items-center ">
<div class="flex flex-col sm:flex-row justify-between w-full mb-4 items-center sm:items-end gap-4 sm:gap-0">
  <!-- نقاط الفريق الأول -->
  <div class="text-center w-full sm:w-auto">
    <h3 class="text-base sm:text-lg font-semibold mb-2">نقاط الفريق الأول</h3>
    <div class="flex items-center gap-2 rounded-lg p-2 justify-center">
      <div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2">
        <button @click="increaseScore1" class="bg-[#9747FF] font-bold cursor-pointer w-8 h-8 pt-1 rounded-lg text-white">+</button>
        <span style="color: #24054C;" class="pt-2 text-center w-12 bg-transparent">{{ score1 }}</span>
        <button @click="decreaseScore1" class="bg-[#B984FF] cursor-pointer w-8 h-8 rounded-lg pt-1 hover:bg-gray-400">-</button>
      </div>
    </div>
  </div>
  <!-- اللوجو -->
  <img src="../../../assets/imgs/JAMAAT.svg" alt="Logo" class="mb-2 sm:mb-4 w-20 sm:w-auto" />
  <!-- نقاط الفريق الثاني -->
  <div class="text-center w-full sm:w-auto">
    <h3 class="text-base sm:text-lg font-semibold mb-2">نقاط الفريق الثاني</h3>
    <div class="flex items-center gap-2 rounded-lg p-2 justify-center">
      <div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2">
        <button @click="increaseScore2" class="bg-[#9747FF] font-bold cursor-pointer w-8 h-8 pt-1 rounded-lg text-white">+</button>
        <span style="color: #24054C;" class="pt-2 text-center w-12 bg-transparent">{{ score2 }}</span>
        <button @click="decreaseScore2" class="bg-[#B984FF] cursor-pointer w-8 h-8 rounded-lg pt-1 hover:bg-gray-400">-</button>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
<!-- Modal -->
<div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 sm:px-4 py-6 overflow-y-auto">
  <div class="bg-white rounded-[20px] shadow-lg relative w-full sm:w-[90%] max-w-[1100px] p-6 sm:p-8 flex flex-col lg:flex-row gap-6 border-[4px] border-[#D6B4FF]">
    <!-- زر الإغلاق -->
    <button
      @click="closeModal"
      class="absolute top-4 left-4 cursor-pointer bg-[#FFE4E4] hover:bg-[#ffcccc] text-[#FF4B4B] w-10 h-10 rounded-full flex items-center justify-center shadow-md"
    >
      ✕
    </button>
    <!-- الجانب الأيسر -->
    <div class="flex-1 text-center">
      <div class="flex justify-center items-center mb-6">
        <div class="bg-[#FFD97B] text-[#24054D] px-6 py-2 rounded-2xl flex items-center gap-3 font-bold text-lg">
          <img
            :src="isPaused ? playIcon : pauseIcon"
            class="w-7 h-7 cursor-pointer"
            @click="togglePause"
          />
          <span>{{ formatTime(timer) }}</span>
          <img src="../../../assets/imgs/clock.svg" class="w-7 h-7" />
        </div>
      </div>
      <h2 class="text-2xl font-bold text-[#24054D] mb-6">
        {{ currentQuestion?.title || 'لا يوجد عنوان' }}
      </h2>
      <img
        :src="currentQuestion?.question_image || placeholderImg"
        alt="صورة السؤال"
        class="mx-auto max-h-[150px] mb-6"
      />
      <p class="text-sm text-gray-600 mb-4">
        ({{ currentQuestion?.points }} نقطة)
      </p>
      <button
        v-if="!showAnswer"
        @click="revealAnswer"
        class="bg-[#24B758]  cursor-pointer hover:bg-green-700 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition"
      >
        أظهر الإجابة
      </button>
      <div v-else class="mt-6 animate-fade-in">
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-xl font-bold">
          {{ currentQuestion?.correct_answer || 'لا توجد إجابة' }}
        </div>
      </div>
    </div>
    <!-- الجانب الأيمن -->
    <div class="w-full lg:w-[200px] bg-[#F9F5FF] rounded-[20px] p-4 flex flex-col justify-start gap-4">
      <div class="bg-[#000000] text-white text-center rounded-lg py-2 font-bold">
        الفريق {{ currentTeam === 1 ? 'الأول' : 'الثاني' }}
      </div>
<!-- الزرارين -->
<!-- مضاعفة النقاط -->
<button
  @click="doublePoints = !doublePoints"
  class="cursor-pointer"
  :class="[
    'font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition',
    doublePoints ? 'bg-purple-600 text-white' : 'bg-[#F5E7FF] text-[#8B3DFF]'
  ]"
>
  <img src="../../../assets/imgs/double.svg" class="w-5 h-5" />
  مضاعفة النقاط
</button>
<!-- منع النقاط -->
<button
  @click="blockPoints = !blockPoints"
   class="cursor-pointer"
  :class="[
    'font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition',
    blockPoints ? 'bg-red-600 text-white' : 'bg-[#FFE4E4] text-[#FF4B4B]'
  ]"
>
  <img src="../../../assets/imgs/block.svg" class="w-5 h-5" />
  منع النقاط
</button>
    </div>
  </div>
</div>
</template>
<script setup>
/* -------------------- 1. الإستيراد -------------------- */
import { ref, onMounted } from 'vue';
import { useRoute , useRouter} from 'vue-router';
import { getUserGames } from '../../../services/gameService.js';
import placeholderImg from '../../../assets/imgs/upload.png';
import playIcon from '../../../assets/imgs/play.png';
import pauseIcon from '../../../assets/imgs/pause.svg';
import bg from '../../../assets/imgs/splash.png';
/* -------------------- 2. المتغيرات -------------------- */
// أزرار التحكم بالنقاط
const doublePoints = ref(false);
const blockPoints = ref(false);
// بيانات اللعبة
const router = useRouter();
const route = useRoute();
const gameId = route.query.id;
const gameData = ref(null);
const games = ref([]);
const loading = ref(true);
const error = ref(null);
// عرض السؤال والإجابة
const showModal = ref(false);
const currentQuestion = ref(null);
const answeredQuestions = ref([]);
const showAnswer = ref(false);
// المؤقت
const timer = ref(30);
const isPaused = ref(false);
let countdownInterval = null;
// الفرق والنقاط
const currentTeam = ref(1);
const selectedQuestion = ref(null);
const selectedColumn = ref(null);
const score1 = ref(0);
const score2 = ref(0);
/* -------------------- 3. الدوال -------------------- */
const goToWinGame = () => {
  router.push({
    path: '/WinGame',
    query: { score1: score1.value, score2: score2.value }
  });
};
// بدء المؤقت
const startTimer = () => {
  clearInterval(countdownInterval);
  timer.value = 30;
  isPaused.value = false;
  countdownInterval = setInterval(() => {
    if (!isPaused.value && timer.value > 0) {
      timer.value--;
    }
    if (timer.value === 0) {
      clearInterval(countdownInterval);
      revealAnswer();
    }
  }, 1000);
};
// إيقاف/تشغيل المؤقت
const togglePause = () => {
  isPaused.value = !isPaused.value;
};
// تنسيق الوقت
const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};
// تبديل دور الفريق
const toggleTeam = () => {
  currentTeam.value = currentTeam.value === 1 ? 2 : 1;
};
// اختيار سؤال
const selectQuestion = (question, column) => {
  selectedQuestion.value = question.points;
  selectedColumn.value = column;
  currentQuestion.value = question;
  showModal.value = true;
  doublePoints.value = false;
  blockPoints.value = false;
  startTimer();
};
// إظهار الإجابة
const revealAnswer = () => {
  showAnswer.value = true;
  setTimeout(() => {
    closeModal();
    showAnswer.value = false;
  }, 3000);
};
// إغلاق المودال وحساب النقاط
const closeModal = () => {
  showModal.value = false;
  answeredQuestions.value.push(currentQuestion.value.id);
  let pointsToAdd = currentQuestion.value.points || 0;
  if (blockPoints.value) {
    pointsToAdd = 0;
  } else if (doublePoints.value) {
    pointsToAdd *= 2;
  }
  if (currentTeam.value === 1) {
    score1.value += pointsToAdd;
  } else {
    score2.value += pointsToAdd;
  }
  toggleTeam();
};
const goTo = (path, message) => {
  if (confirm(message)) {
    router.push(path);
  }
};
// التحكم اليدوي بالنقاط
const increaseScore1 = () => score1.value += 10;
const decreaseScore1 = () => score1.value = Math.max(0, score1.value - 10);
const increaseScore2 = () => score2.value += 10;
const decreaseScore2 = () => score2.value = Math.max(0, score2.value - 10);
/* -------------------- 4. عند التحميل -------------------- */
onMounted(async () => {
  try {
    const res = await getUserGames();
    games.value = res.data.data || [];
    const idFromRoute = Number(gameId);
    const foundGame = games.value.find(item => item.game?.id === idFromRoute);
    if (foundGame) {
      gameData.value = foundGame.game;
      console.log("✅ تم العثور على اللعبة:", foundGame.game);
    } else {
      console.warn("⚠️ لم يتم العثور على اللعبة بالمعرف:", gameId);
    }
  } catch (error) {
    console.error('❌ فشل جلب الألعاب:', error);
    error.value = 'حدث خطأ أثناء تحميل الألعاب';
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped>
.font-arabic {
  font-family: 'Tajawal', sans-serif;
}
.c24054D {
  color: #24054D;
}
.bg24054D {
  background-color: #24054D;
}
.cB984FF {
  color: #B984FF;
}
</style>