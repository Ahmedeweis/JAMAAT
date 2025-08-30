<template>
      <div style=" display: flex ; flex-direction: column; justify-content: space-between; " class="  min-h-screen bg-cover bg-center text-white font-arabic p-4" dir="rtl"
  :style="`background-image: url(${bg});`">
    <!-- Top Navigation Bar -->
<div>
    <nav style="font-family: 'Kufam', 'sans-serif';" class="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-3xl bg-white text-black p-4 shadow-md gap-3 sm:gap-0">
  <!-- زر دور الفريق -->
  <button @click="toggleTeam"
    class="relative w-full sm:w-1/4 bg-[#ECE1FB] border-2 border-[#3F0092] px-4 py-2 sm:py-3 rounded-full flex items-center justify-center sm:justify-start cursor-pointer">
    <span class="text-[#24054D] font-bold text-sm sm:text-base">
      {{ $t("teamTurn") }} {{ currentTeam === 1 ? team1Name : team2Name }}
    </span>
    <img
      src="../../../assets/imgs/switch.svg"
      alt="Switch"
      class="w-8 h-8 sm:w-13 sm:h-13 absolute sm:-left-3 sm:top-1/2 sm:-translate-y-1/2 hidden sm:block"
    />
  </button>
  <!-- العنوان -->
  <h1 class="text-lg sm:text-xl font-bold text-[#24054D] text-center flex-1 order-first sm:order-none">
     {{ $t("gameThree") }}
  </h1>
  <!-- أزرار التحكم -->
<div class="flex flex-wrap justify-center sm:space-x-4 sm:space-x-reverse gap-2 sm:gap-0">
    <!-- زر الرجوع للوحة -->
    <button
      @click="goTo('/main', 'هل تريد الرجوع للوحة؟')"
      class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base"
    >
      <img src="../../../assets/imgs/back.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2">
      <span class="c24054D"> {{ $t("backToBoard") }}</span>
    </button>
    <!-- زر الخروج -->
    <button
      @click="goTo('/main', 'هل تريد الخروج؟')"
      class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base"
    >
      <img src="../../../assets/imgs/door.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2">
      <span class="c24054D ml-2">{{ $t("exit") }}</span>
    </button>
    <!-- زر إنهاء اللعبة -->
<button
 @click="goToWinGame('/main', 'هل تريد الخروج؟')"
  class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base"
>
  <img src="../../../assets/imgs/End.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2">
  <span class="c24054D"> {{ $t("endGame") }}</span>
</button>
  </div>
</nav>
<div class="flex flex-col sm:flex-row items-center  sm:items-center rounded-xl mt-2 mb-3 bg-white text-black p-4 shadow-md gap-3 sm:gap-0">
        <div class="flex flex-wrap items-center gap-2 ">
              <h2 class="font-bold">الجولات : </h2>
<button
      @click="selectedRound = 1"
      :class="[
        'px-3 py-2 rounded-lg text-sm cursor-pointer font-semibold',
        selectedRound === 1
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      ]"
    >
      بدون كلام
    </button>
    <!-- تحدي الرسم -->
<button
  @click="selectedRound = 2"
  :class="[
    'px-3 py-2 rounded-lg text-sm cursor-pointer font-semibold transition',
    selectedRound === 2
      ? 'bg-indigo-600 text-white'
      : round1Completed
        ? 'bg-green-500 text-white animate-bounce'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  ]"
>
  تحدّي الرسم
</button>
    <!-- كلمة السر -->
    <button
      @click="selectedRound = 3"
      :class="[
        'px-3 py-2 rounded-lg text-sm cursor-pointer font-semibold',
        selectedRound === 3
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      ]"
    >
      كلمة السر
    </button>
          <div class="ms-auto flex items-center gap-2">
          </div>
        </div>
</div>
</div>
<div>
    <!-- Questions Grid -->
<!-- الأعمدة للجولة الأولى -->
<div v-if="selectedRound === 1" class="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 mb-6">
  <!-- عمود الفريق الأول -->
  <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
    <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">
      فريق {{ team1Name }}
    </h3>
    <div class="space-y-2">
      <template v-if="questions.length >= 4">
        <button
          v-for="(question, qIndex) in questions.slice(0, 4)"
          :key="qIndex"
          @click="selectQuestion(question, 1)"
          :disabled="answeredQuestions.includes(question.id) || currentTeam !== 1"
          :class="[
            'w-full py-2 rounded-lg shadow-sm transition border font-bold',
            answeredQuestions.includes(question.id)
              ? 'bg-[#24054D] text-white cursor-default'
              : currentTeam !== 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB] cursor-pointer'
          ]"
        >
          أظهر السؤال
        </button>
      </template>
      <template v-else>
        <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">
          لا توجد أسئلة
        </div>
      </template>
    </div>
  </div>
  <!-- عمود الفريق الثاني -->
  <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
    <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">
      فريق {{ team2Name }}
    </h3>
    <div class="space-y-2">
      <template v-if="questions.length >= 8">
        <button
          v-for="(question, qIndex) in questions.slice(4, 8)"
          :key="qIndex"
          @click="selectQuestion(question, 2)"
          :disabled="answeredQuestions.includes(question.id) || currentTeam !== 2"
          :class="[
            'w-full py-2 rounded-lg shadow-sm transition border font-bold',
            answeredQuestions.includes(question.id)
              ? 'bg-[#24054D] text-white cursor-default'
              : currentTeam !== 2
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB] cursor-pointer'
          ]"
        >
          أظهر السؤال
        </button>
      </template>
      <template v-else>
        <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">
          لا توجد أسئلة
        </div>
      </template>
    </div>
  </div>
</div>
<!-- الأعمدة للجولة الثانية (تحدي الرسم) -->
<div v-if="selectedRound === 2" class="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 mb-6">
  <!-- عمود الفريق الأول تحدي الرسم -->
  <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
    <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">
      فريق {{ team1Name }} (رسم)
    </h3>
    <div class="space-y-2">
      <template v-if="questionsRound2.length >= 4">
        <button
          v-for="(question, qIndex) in questionsRound2.slice(0, 4)"
          :key="qIndex"
          @click="selectQuestion(question, 1)"
          :disabled="answeredQuestionsRound2.includes(question.id) || currentTeam !== 1"
          :class="[
            'w-full py-2 rounded-lg shadow-sm transition border font-bold',
            answeredQuestionsRound2.includes(question.id)
              ? 'bg-[#24054D] text-white cursor-default'
              : currentTeam !== 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB] cursor-pointer'
          ]"
        >
          أظهر السؤال
        </button>
      </template>
      <template v-else>
        <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">
          لا توجد أسئلة
        </div>
      </template>
    </div>
  </div>
  <!-- عمود الفريق الثاني تحدي الرسم -->
  <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
    <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">
      فريق {{ team2Name }} (رسم)
    </h3>
    <div class="space-y-2">
      <template v-if="questionsRound2.length >= 8">
        <button
          v-for="(question, qIndex) in questionsRound2.slice(4, 8)"
          :key="qIndex"
          @click="selectQuestion(question, 2)"
          :disabled="answeredQuestionsRound2.includes(question.id) || currentTeam !== 2"
          :class="[
            'w-full py-2 rounded-lg shadow-sm transition border font-bold',
            answeredQuestionsRound2.includes(question.id)
              ? 'bg-[#24054D] text-white cursor-default'
              : currentTeam !== 2
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB] cursor-pointer'
          ]"
        >
          أظهر السؤال
        </button>
      </template>
      <template v-else>
        <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">
          لا توجد أسئلة
        </div>
      </template>
    </div>
  </div>
</div>
    <!-- Logo and Score Counters -->
    <div class="flex flex-col items-center ">
<div class="flex flex-col sm:flex-row justify-between w-full mb-4 items-center sm:items-end gap-4 sm:gap-0 justify-self-end">
  <!-- نقاط الفريق الأول -->
  <div class="text-center w-full sm:w-auto">
    <h3 class="text-base sm:text-lg font-semibold mb-2">{{ $t("team2Points3") }}  {{ team1Name }} </h3>
    <div class="flex items-center gap-2 rounded-lg p-2 justify-center">
      <div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2">
        <button @click="increaseScore1" class="bg-[#9747FF] font-bold cursor-pointer w-8 h-8 pt-1 rounded-lg text-white" style="padding-bottom: 4px;">+</button>
        <span style="color: #24054C;" class=" text-center w-12 bg-transparent">{{ score1 }}</span>
        <button @click="decreaseScore1" class="bg-[#B984FF] cursor-pointer w-8 h-8 rounded-lg pt-1 hover:bg-gray-400" style="padding-bottom: 4px;">-</button>
      </div>
    </div>
  </div>
  <!-- اللوجو -->
  <img src="../../../assets/imgs/JAMAAT.svg" alt="Logo" class="mb-2 sm:mb-4 w-20 sm:w-auto" />
  <!-- نقاط الفريق الثاني -->
  <div class="text-center w-full sm:w-auto">
    <h3 class="text-base sm:text-lg font-semibold mb-2"> {{ $t("team2Points3") }}   {{ team2Name }} </h3>
    <div class="flex items-center gap-2 rounded-lg p-2 justify-center">
      <div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2">
        <button @click="increaseScore2" class="bg-[#9747FF] font-bold cursor-pointer w-8 h-8 pt-1 rounded-lg text-white" style="padding-bottom: 4px;">+</button>
        <span style="color: #24054C;" class=" text-center w-12 bg-transparent">{{ score2 }}</span>
        <button @click="decreaseScore2" class="bg-[#B984FF] cursor-pointer w-8 h-8 rounded-lg pt-1 hover:bg-gray-400" style="padding-bottom: 4px;">-</button>
      </div>
    </div>
  </div>
</div>
    </div>
</div>
  </div>
<!-- Modal -->
<div
  v-if="showModal"
  :class="[
    'fixed inset-0 bg-black/50 flex justify-center z-50 px-2 sm:px-4 py-6 overflow-y-auto',
    selectedRound === 2 ? 'items-start' : 'items-center'
  ]"
>
  <div
    class="bg-white rounded-[20px] shadow-lg relative w-full min-h-[400px] sm:w-[90%] max-w-[1100px] p-6 sm:p-8 flex flex-col-reverse lg:flex-row gap-6 border-[4px] border-[#D6B4FF]"
    :dir="currentLang === 'ar' ? 'ltr' : 'rtl'"
  >
    <!-- زر الإغلاق -->
    <button
      @click="confirmAnswer()"
      class="absolute top-4 left-4 cursor-pointer bg-[#FFE4E4] hover:bg-[#ffcccc] text-[#FF4B4B] w-10 h-10 rounded-full flex items-center justify-center shadow-md"
    >
      ✕
    </button>
    <!-- الجانب الأيسر -->
<!-- داخل المودال -->
<div class="flex-1 text-center " >
  <!-- لو السؤال لسه ما اتكشفش -->
<div v-if="!questionRevealed" class="flex flex-col justify-between items-center h-full">
    <img src="../../../assets/imgs/scan.png" class="w-64 h-64 mx-auto mb-4" />
    <button
      @click="questionRevealed = true"
      class="bg-[#24B758] cursor-pointer hover:bg-green-700 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition">
      أظهر السؤال
    </button>
  </div>
  <!-- لو السؤال اتكشف -->
<div v-else>
  <h2 class="text-2xl font-bold text-[#24054D] mb-6">
    {{ currentQuestion?.question_text || $t("noTitle") }}
  </h2>
<!-- المؤقت -->
<div v-if="isReady || awaitingValidation" class="flex items-center justify-center mb-4 gap-4">
  <!-- عرض الوقت -->
  <span class="text-xl font-bold text-red-600">{{ formatTime(timer) }}</span>
  <!-- زر التحكم في المؤقت -->
  <button
    @click="togglePause"
    class="bg-gray-200 hover:bg-gray-300 rounded-full p-2 cursor-pointer flex items-center justify-center shadow-md"
  >
    <img :src="isPaused ? playIcon : pauseIcon" class="w-6 h-6" />
  </button>
</div>
   <div class="media-container mx-auto mb-6">
    <video
      v-if="currentQuestion?.question_video"
      :src="getMediaUrl(currentQuestion)"
      controls
      class="max-h-[250px] w-auto mx-auto rounded-md"
    ></video>
    <img
      v-else
      :src="getMediaUrl(currentQuestion)"
      alt="صورة السؤال"
      class="mx-auto max-h-[150px] rounded-md"
    />
  </div>
<DrowBoard v-if="selectedRound === 2 && showDrawingBoard" />
<!-- زر جاهز / أظهر الإجابة / تقييم الإجابة -->
<div class="flex justify-center flex-col items-center">
  <!-- زر جاهز -->
  <button
    v-if="!isReady && !awaitingValidation"
    @click="handleReady"
    class="bg-indigo-600 cursor-pointer hover:bg-indigo-800 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition">
    جاهز ؟
  </button>
  <!-- زر أظهر الإجابة -->
  <button
    v-else-if="isReady && !awaitingValidation"
    @click="handleReveal"
    class="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition">
    أظهر الإجابة
  </button>
<!-- الإجابة -->
<div v-if="showAnswer" class="mt-4 p-4 bg-green-100 text-green-800 rounded-lg font-bold">
  {{ currentQuestion?.correct_answer || 'لا توجد إجابة' }}
</div>
<!-- تقييم الإجابة -->
<div v-if="awaitingValidation" class="flex flex-col items-center gap-4 mt-4">
  <!-- النص التوضيحي -->
<p class="text-lg font-semibold text-[#24054D]">
  هل أجاب الفريق
  <span dir="auto" class="font-bold text-indigo-700">
    {{ currentTeam === 1 ? team1Name : team2Name }}
  </span>
  الإجابة الصحيحة؟
</p>
  <!-- الأزرار -->
  <div class="flex gap-4">
    <button
      @click="validateAnswer(true)"
      class="bg-green-600 cursor-pointer hover:bg-green-700 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition">
     {{ $t("correct") }}
    </button>
    <button
      @click="validateAnswer(false)"
      class="bg-red-600 cursor-pointer hover:bg-red-700 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition">
    {{ $t("wrong") }}
    </button>
  </div>
</div>
</div>
</div>
</div>
    <!-- الجانب الأيمن -->
    <div class="w-full lg:w-[200px] bg-[#F9F5FF] rounded-[20px] p-4 flex flex-col justify-start gap-4">
<div class="bg-[#000000] text-white text-center rounded-lg py-2 font-bold">
  {{ currentTeam === 1 ? team1Name : team2Name }}
</div>
<!-- <button
  @click="doublePoints = !doublePoints"
  class="cursor-pointer"
  :class="[
    'font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition',
    doublePoints ? 'bg-purple-600 text-white' : 'bg-[#F5E7FF] text-[#8B3DFF]'
  ]"
>
  <img src="../../../assets/imgs/double.svg" class="w-5 h-5" />
 {{ $t("doublePoints") }}
</button> -->
<!-- <button
  @click="blockPoints = !blockPoints"
   class="cursor-pointer"
  :class="[
    'font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition',
    blockPoints ? 'bg-red-600 text-white' : 'bg-[#FFE4E4] text-[#FF4B4B]'
  ]"
>
  <img src="../../../assets/imgs/block.svg" class="w-5 h-5" />
 {{ $t("blockPoints") }}
</button> -->
    </div>
  </div>
</div>
</template>
<script setup>
/* -------------------- 1. الإستيراد -------------------- */
import { ref, onMounted ,watch ,computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import data from './sports-category.json';
import playIcon from '../../../assets/imgs/play.png';
import pauseIcon from '../../../assets/imgs/pause.svg';
import bg from '../../../assets/imgs/splash.png';
import placeholderImg from '../../../assets/imgs/upload.png';
import { useToast } from "vue-toastification"
import DrowBoard from '../../../components/DrowBoard.vue';
const toast = useToast()
const selectedRound = ref(1);
/* -------------------- 2. التوجيه (Router + Params) -------------------- */
const route = useRoute();
const router = useRouter();
const categories = route.query.categories?.split(',').map(Number) || [];
const players1 = Number(route.query.players1) || 2;
const players2 = Number(route.query.players2) || 2;
/* -------------------- 3. الفرق والنقاط -------------------- */
const currentTeam = ref(1);
const score1 = ref(0);
const score2 = ref(0);
// ✅ أسماء الفرق من localStorage
const team1Name = ref(localStorage.getItem("team1Name") || "الفريق الأول")
const team2Name = ref(localStorage.getItem("team2Name") || "الفريق الثاني")
const toggleTeam = () => {
  currentTeam.value = currentTeam.value === 1 ? 2 : 1;
};
const increaseScore1 = () => score1.value += 10;
const decreaseScore1 = () => score1.value = Math.max(0, score1.value - 10);
const increaseScore2 = () => score2.value += 10;
const decreaseScore2 = () => score2.value = Math.max(0, score2.value - 10);
/* -------------------- 4. الأسئلة -------------------- */
const questions = ref([]);
const questionsRound2 = ref([]);
const questionsRound3 = ref([]);
const answeredQuestions = ref([]);
const answeredQuestionsRound2 = ref([]);
const answeredQuestionsRound3 = ref([]);
const loadQuestions = () => {
  if (data && data.data && data.data.length > 0) {
    const all = data.data[0].questions.map(question => ({
      id: question.id,
      title: question.title,
      question_text: question.question_text,
      question_image: question.question_image,
      question_video: question.question_video,
      question_audio: question.question_audio,
      correct_answer: question.correct_answer,
      points: question.points
    }));
    questions.value = all.slice(0, 8);
    questionsRound2.value = all.slice(8, 16);
    questionsRound3.value = all.slice(16);
    console.log('Loaded questions:', questions.value);
    console.log('Loaded questionsRound2:', questionsRound2.value);
    console.log('Loaded questionsRound3:', questionsRound3.value);
  } else {
    console.error('No questions loaded from JSON');
  }
};
/* -------------------- 5. عرض السؤال والإجابة -------------------- */
const showModal = ref(false);
const currentQuestion = ref(null);
const showAnswer = ref(false);
const answerResult = ref(null);
const selectedQuestion = ref(null);
const selectedColumn = ref(null);
const doublePoints = ref(false);
const blockPoints = ref(false);
const currentLang = ref('ar'); // افتراضيًا اللغة العربية
const selectQuestion = (question, column) => {
  if (selectedRound.value === 1) {
  if (!answeredQuestions.value.includes(question.id)) {
    answeredQuestions.value.push(question.id);
    selectedQuestion.value = question.points;
    selectedColumn.value = column;
    currentQuestion.value = question;
    showModal.value = true;
    doublePoints.value = false;
    blockPoints.value = false;
    questionRevealed.value = false;
  }
 }else if (selectedRound.value === 2) {
    if (!answeredQuestionsRound2.value.includes(question.id)) {
      answeredQuestionsRound2.value.push(question.id);
     selectedQuestion.value = question.points;
    selectedColumn.value = column;
    currentQuestion.value = question;
    showModal.value = true;
    doublePoints.value = false;
    blockPoints.value = false;
    questionRevealed.value = false;
    }
  }
};
/*---------------------- أول م يدوس جاهز يبدا المؤفت ------------------------------- */
const questionRevealed = ref(false);
const isReady = ref(false);
const handleReady = () => {
  isReady.value = true;
  startTimer();
};
const handleReveal = () => {
  clearInterval(countdownInterval);
  isPaused.value = true;
  revealAnswer();
  isReady.value = false;
  awaitingValidation.value = true;
};
const isTransferred = ref(false)
const validateAnswer = (isCorrect) => {
  if (isCorrect) {
    if (isTransferred.value) {
      // ✅ لو السؤال منقول → الفريق الثاني ياخد 15 نقطة ثابتة
      if (currentTeam.value === 1) {
        score1.value += 15
         toggleTeam();
      } else {
        score2.value += 15
         toggleTeam();
      }
    } else {
      // ✅ لو الفريق الأساسي جاوب صح → ياخد عدد الثواني المتبقية
      if (currentTeam.value === 1) {
        score1.value += timer.value
      } else {
        score2.value += timer.value
      }
    }
    isTransferred.value = false
    awaitingValidation.value = false
    showAnswer.value = false
    isPaused.value = true
    timer.value = 0
    toggleTeam();
    showModal.value = false
  } else {
    if (!isTransferred.value) {
      // ❌ الفريق الأساسي جاوب غلط → ننقل السؤال
      isTransferred.value = true
      currentTeam.value = currentTeam.value === 1 ? 2 : 1
     toast.info("تم نقل السؤال للفريق الآخر ✅", { timeout: 3000 })
    } else {
      isTransferred.value = false
      awaitingValidation.value = false
      showAnswer.value = false
      isPaused.value = true
      timer.value = 0
      showModal.value = false
      currentTeam.value = currentTeam.value === 1 ? 2 : 1
      toggleTeam();
    }
  }
}
/* ---------------------------------------------- */
const awaitingValidation = ref(false);
/*----------------------------------------------------- */
/* -------------------- 7. الميديا -------------------- */
const getMediaUrl = (question) => {
  if (!question) return placeholderImg;
  if (question.question_video) {
    if (question.question_video.startsWith('http')) {
      return question.question_video;
    }
    return `https://game-wise.smartleadtech.com/${question.question_video}`;
  }
  if (question.question_image) {
    if (question.question_image.startsWith('http')) {
      return question.question_image;
    }
    return `https://game-wise.smartleadtech.com/${question.question_image}`;
  }
  return placeholderImg;
};
const revealAnswer = () => {
  showAnswer.value = true;
  answerResult.value = null;
  clearInterval(countdownInterval);
};
const confirmAnswer = (isCorrect) => {
  showModal.value = false;
  showAnswer.value = false;
  let pointsToAdd = 0;
  if (isCorrect) {
    pointsToAdd = currentQuestion.value.points || 0;
    if (blockPoints.value) pointsToAdd = 0;
    else if (doublePoints.value) pointsToAdd *= 2;
  }
  if (currentTeam.value === 1) score1.value += pointsToAdd;
  else score2.value += pointsToAdd;
  answerResult.value = isCorrect ? "correct" : "wrong";
  toggleTeam();
};
/* -------------------- 6. المؤقت -------------------- */
const timer = ref(60);
const isPaused = ref(false);
let countdownInterval = null;
const startTimer = () => {
    if (countdownInterval) clearInterval(countdownInterval);
    timer.value = 60;
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
const togglePause = () => {
  isPaused.value = !isPaused.value;
  if (!isPaused.value && timer.value > 0) {
    countdownInterval = setInterval(() => {
      if (!isPaused.value && timer.value > 0) {
        timer.value--;
      }
      if (timer.value === 0) {
        clearInterval(countdownInterval);
        revealAnswer();
      }
    }, 1000);
  } else {
    clearInterval(countdownInterval);
  }
};
const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};
/* -------------------- 7. التنقل -------------------- */
const goTo = (path, message) => {
  if (confirm(message)) {
    router.push(path);
  }
};
const goToWinGame = () => {
  if (confirm("هل أنت متأكد من إنهاء اللعبة؟")) {
    router.push({
      path: '/WinGame',
      query: { score1: score1.value, score2: score2.value }
    })
  }
}
/* -------------------- 8. عند التحميل -------------------- */
onMounted(() => {
  loadQuestions();
const team1Name = ref(localStorage.getItem("team1Name") || "الفريق الأول")
const team2Name = ref(localStorage.getItem("team2Name") || "الفريق الثاني")
});
/* ----------------------------------------------- */
const showDrawingBoard = ref(false)
// نراقب isReady
watch(isReady, (newVal, oldVal) => {
  if (newVal === true) {
    // أول مرة بس يبدأ، نفعّل اللوحة
    showDrawingBoard.value = true
  }
})
// نراقب إغلاق المودال
watch(showModal, (newVal) => {
  if (newVal === false) {
    // لما المودال يتقفل نخفي اللوحة
    showDrawingBoard.value = false
  }
})
const round1Completed = computed(() => {
  return answeredQuestions.value.length >= questions.value.length
})
watch(round1Completed, (completed) => {
  if (completed) {
    toast.success("✅ أحسنت! اضغط على 'تحدي الرسم' للانتقال للجولة الثانية", {
      timeout: 4000,
      position: "top-center",
    })
  }
})
</script>
<style scoped>
/* .rouned {
    padding: ;
}
.active-round {
    background-color: #4F39F6;
    color: white;
} */
</style>