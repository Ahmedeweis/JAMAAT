<template>
  <div style="
      font-family: 'Kufam', 'sans-serif';
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    " class="min-h-screen bg-cover bg-center text-white font-arabic p-4" dir="rtl"
    :style="`background-image: url(${bg});`">
    <!-- Top Navigation Bar -->
    <nav
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 rounded-3xl bg-white text-black p-4 shadow-md gap-3 sm:gap-0">
      <!-- زر دور الفريق -->
      <button @click="toggleTeam"
        class="relative w-full sm:w-1/4 bg-[#ECE1FB] border-2 border-[#3F0092] px-4 py-2 sm:py-3 rounded-full flex items-center justify-center sm:justify-start cursor-pointer">
        <span class="text-[#24054D] font-bold text-sm sm:text-base">
          {{ $t("teamTurn") }}
          {{ currentTeam === 1 ? $t("first") : $t("second") }}
        </span>
        <img src="../../../assets/imgs/switch.svg" alt="Switch"
          class="w-8 h-8 sm:w-13 sm:h-13 absolute sm:-left-3 sm:top-1/2 sm:-translate-y-1/2 hidden sm:block" />
      </button>
      <!-- العنوان -->
      <h1 class="text-lg sm:text-xl font-bold text-[#24054D] text-center flex-1 order-first sm:order-none">
        {{ $t("gameTitle") }}
      </h1>
      <!-- أزرار التحكم -->
      <div class="flex flex-wrap justify-center sm:space-x-4 sm:space-x-reverse gap-2 sm:gap-0">
        <!-- زر الرجوع للوحة -->
        <button @click="goTo('/main', 'هل تريد الرجوع للوحة؟')"
          class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base">
          <img src="../../../assets/imgs/back.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
          <span class="c24054D"> {{ $t("backToBoard") }}</span>
        </button>
        <!-- زر الخروج -->
        <button @click="goTo('/main', 'هل تريد الخروج؟')"
          class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base">
          <img src="../../../assets/imgs/door.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
          <span class="c24054D ml-2">{{ $t("exit") }}</span>
        </button>
        <!-- زر إنهاء اللعبة -->
        <button @click="goToWinGame('/main', 'هل تريد الخروج؟')"
          class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base">
          <img src="../../../assets/imgs/End.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
          <span class="c24054D"> {{ $t("endGame") }}</span>
        </button>
      </div>
    </nav>
    <!-- Questions Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <div v-if="gameData && gameData.game_category" v-for="(categoryItem, index) in gameData.game_category"
        :key="index" class="bg-white rounded-lg p-2">
        <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">
          {{ categoryItem.category.name }}
        </h3>
        <div class="space-y-2">
          <!-- لو في أسئلة -->
          <template v-if="
            categoryItem.category.questions &&
            categoryItem.category.questions.length
          ">
            <button class="cursor-pointer" v-for="(question, qIndex) in categoryItem.category.questions" :key="qIndex"
              @click="selectQuestion(question, index + 1, (qIndex + 1) * 200)"
              :disabled="answeredQuestions.includes(question.id)" :class="[
                'w-full py-2 rounded-lg shadow-sm transition border',
                answeredQuestions.includes(question.id)
                  ? 'bg-[#24054D] text-white border-[#3F0092]'
                  : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB]',
              ]">
              {{ (qIndex + 1) * 200 }}
            </button>
          </template>
          <!-- لو مفيش أسئلة -->
          <template v-else>
            <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">
              {{ $t("noQuestions") }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- Logo and Score Counters -->
    <div class="flex flex-col items-center">
      <div class="flex flex-col sm:flex-row justify-between w-full mb-4 items-center sm:items-end gap-4 sm:gap-0">
        <!-- نقاط الفريق الأول -->
        <div class="text-center w-full sm:w-auto">
          <h3 class="text-base sm:text-lg font-semibold mb-2">
            {{ $t("team1Points") }}
          </h3>
          <div class="flex items-center gap-2 rounded-lg p-2 justify-center">
            <div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2">
              <button @click="increaseScore1"
                class="bg-[#9747FF] font-bold cursor-pointer w-8 h-8 pt-1 rounded-lg text-white">
                +
              </button>
              <span style="color: #24054c" class="pt-2 text-center w-12 bg-transparent">{{ score1 }}</span>
              <button @click="decreaseScore1"
                class="bg-[#B984FF] cursor-pointer w-8 h-8 rounded-lg pt-1 hover:bg-gray-400">
                -
              </button>
            </div>
          </div>
        </div>
        <!-- اللوجو -->
        <img src="../../../assets/imgs/JAMAAT.svg" alt="Logo" class="mb-2 sm:mb-4 w-20 sm:w-auto" />
        <!-- نقاط الفريق الثاني -->
        <div class="text-center w-full sm:w-auto">
          <h3 class="text-base sm:text-lg font-semibold mb-2">
            {{ $t("team2Points") }}
          </h3>
          <div class="flex items-center gap-2 rounded-lg p-2 justify-center">
            <div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2">
              <button @click="increaseScore2"
                class="bg-[#9747FF] font-bold cursor-pointer w-8 h-8 pt-1 rounded-lg text-white">
                +
              </button>
              <span style="color: #24054c" class="pt-2 text-center w-12 bg-transparent">{{ score2 }}</span>
              <button @click="decreaseScore2"
                class="bg-[#B984FF] cursor-pointer w-8 h-8 rounded-lg pt-1 hover:bg-gray-400">
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div v-if="showModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 sm:px-4 py-6 overflow-y-auto">
    <div
      class="bg-white rounded-[20px] shadow-lg relative items-center w-full sm:w-[90%] max-w-[1100px] p-6 sm:p-8 flex flex-col lg:flex-row gap-6 border-[4px] border-[#D6B4FF]"
      :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">
      <!-- زر الإغلاق -->
      <button @click="confirmAnswer()"
        class="absolute top-4 left-4 cursor-pointer bg-[#FFE4E4] hover:bg-[#ffcccc] text-[#FF4B4B] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
        ✕
      </button>
      <!-- شاشة ما قبل السؤال -->
      <div class="flex-1 text-center" v-if="showPreQuestion">
        <!-- الرسالة -->
        <h2 class="text-xl font-bold text-[#24054D] mb-4">
          {{ $t("doYouWantHelp") }}
        </h2>
        <!-- صورة -->
        <img src="../../../assets/imgs/help.png" alt="Help" class="w-32 h-32 mx-auto mb-6 rounded-full shadow-md" />
        <!-- زر ابدأ السؤال -->
        <button @click="startQuestion()"
          class="bg-[#24054D] hover:bg-[#3F0092] text-white font-bold py-2 px-6 rounded-full shadow-md cursor-pointer transition">
          {{ $t("startQuestion") }}
        </button>
      </div>
      <!-- الجانب الأيسر -->
      <div class="flex-1 text-center" v-if="showQuestionPart">
        <div class="flex justify-center items-center mb-6">
          <div class="bg-[#FFD97B] text-[#24054D] px-6 py-2 rounded-2xl flex items-center gap-3 font-bold text-lg">
            <img :src="isPaused ? playIcon : pauseIcon" class="w-7 h-7 cursor-pointer" @click="togglePause" />
            <span>{{ formatTime(timer) }}</span>
            <img src="../../../assets/imgs/clock.svg" class="w-7 h-7" />
          </div>
        </div>
        <h2 class="text-2xl font-bold text-[#24054D] mb-6">
          {{ currentQuestion?.title || $t("noTitle") }}
        </h2>
        <div class="media-container mx-auto mb-6">
          <!-- فيديو -->
          <video v-if="currentQuestion?.question_video" :src="getMediaUrl(currentQuestion)" controls
            class="max-h-[250px] w-auto mx-auto rounded-md"></video>
          <!-- صورة -->
          <img v-else-if="currentQuestion?.question_image" :src="getMediaUrl(currentQuestion)"
            :alt="$t('questionImage')" class="mx-auto max-h-[150px] rounded-md" />
          <!-- أوديو -->
          <audio v-else-if="currentQuestion?.question_audio" :src="getMediaUrl(currentQuestion)" controls
            class="mx-auto mt-4"></audio>
          <!-- Placeholder -->
          <img v-else :src="placeholderImg" :alt="$t('noMedia')" class="mx-auto max-h-[150px] rounded-md" />
        </div>
        <p class="text-sm text-gray-600 mb-4">
          ({{ currentQuestion?.points }} {{ $t("points") }})
        </p>
        <div class="mt-6">
          <!-- المرحلة 1: زر عرض الإجابة -->
          <button v-if="!showAnswer" @click="showAnswer = true"
            class="bg-[#24B758] cursor-pointer hover:bg-green-700 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition">
            {{ $t("showAnswer") }}
          </button>
          <!-- المرحلة 2: إظهار الإجابة -->
          <div v-else class="animate-fade-in">
            <div
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg text-center text-lg font-bold">
              {{ currentQuestion?.correct_answer || $t("noAnswer") }}
            </div>
            <!-- المرحلة 3: زر اختيار صحيحة أو خاطئة -->
            <div class="flex justify-center gap-4 mt-5">
              <button @click="confirmAnswer(false)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full cursor-pointer">
                {{ $t("wrong") }}
              </button>
              <button @click="confirmAnswer(true)"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full cursor-pointer">
                {{ $t("correct") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- الجانب الأيمن -->
      <div class="w-full lg:w-[220px] bg-[#F9F5FF] rounded-[20px] p-4 flex flex-col gap-6" v-if="showPreQuestion">
        <!-- الفريق الحالي -->
        <div>
          <div class="bg-black text-white text-center rounded-lg py-2 font-bold mb-3">
            {{ $t("team") }}
            {{ currentTeam === 1 ? $t("first") : $t("second") }}
          </div>
          <!-- أزرار الفريق الحالي -->
          <div class="flex flex-col gap-2">
            <!-- المضاعفة (دفاعية) -->
            <button @click="useHelp('double', currentTeam)" :disabled="getHelps(currentTeam).double === 0" :class="[
              'flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-bold transition',
              !doublePoints ? 'bg-purple-100 text-purple-600' : '',
              doublePoints ? 'bg-purple-600 text-white' : '',
              getHelps(currentTeam).double === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'cursor-pointer ',
            ]">
              <img src="../../../assets/imgs/double.svg" class="w-5 h-5" />
              {{ $t("doublePoints") }}
            </button>
          </div>
        </div>
        <!-- الفريق الخصم -->
        <div>
          <div class="bg-black text-white text-center rounded-lg py-2 font-bold mb-3">
            {{ $t("team") }}
            {{ currentTeam === 1 ? $t("second") : $t("first") }}
          </div>
          <!-- أزرار هجومية ضد الخصم -->
          <div class="flex flex-col gap-2">
            <!-- منع الخصم -->
            <button @click="useHelp('block', opponentTeam)" :disabled="getHelps(opponentTeam).block === 0" :class="[
              'flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-bold transition',
              !blockPoints ? 'bg-red-100 text-red-600' : '',
              blockPoints ? 'bg-red-600 text-white' : '',
              getHelps(opponentTeam).block === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'cursor-pointer',
            ]">
              <img src="../../../assets/imgs/block.svg" class="w-5 h-5" />
              {{ $t("blockPoints") }}
            </button>
            <!-- خصم نصف النقاط -->
            <button @click="useHelp('half', opponentTeam)" :disabled="getHelps(opponentTeam).half === 0" :class="[
              // ستايل أساسي ثابت
              'flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-bold transition',
              // الحالة العادية
              'bg-rose-100 text-rose-600',
              // الحالة المفعلة
              halfPoints ? 'bg-rose-600 text-white' : '',
              // الحالة المعطلة
              getHelps(opponentTeam).half === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'cursor-pointer',
            ]">
              <img src="../../../assets/imgs/half.png" class="w-5 h-5" />
              {{ $t("halfPoints") }}
            </button>
          </div>
        </div>
      </div>
      <!-- ------------ -->
      <div class="w-full lg:w-[220px] bg-[#F9F5FF] rounded-[20px] h-full p-4 flex flex-col self-start gap-6"
        v-if="!showPreQuestion">
        <!-- الفريق الحالي -->
        <div>
          <div class="bg-black text-white text-center rounded-lg py-2 font-bold mb-3">
            {{ $t("team") }}
            {{ currentTeam === 1 ? $t("first") : $t("second") }}
          </div>
        </div>
        <!-- رسالة وسيلة المساعدة -->
<div v-if="currentHelpMessage"
     class="bg-purple-50 border border-purple-300 rounded-lg p-3 text-center text-sm font-semibold text-purple-800 shadow-sm animate-fade-in">
  {{ currentHelpMessage }}
</div>
      </div>
      <!-- ----------------------- -->
    </div>
  </div>
</template>
<script setup>
/* -------------------- 1. الإستيراد -------------------- */
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUserGames } from '../../../services/gameService.js';
import placeholderImg from '../../../assets/imgs/upload.png';
import playIcon from '../../../assets/imgs/play.png';
import pauseIcon from '../../../assets/imgs/pause.svg';
import bg from '../../../assets/imgs/splash.png';
/* -------------------- 2. التوجيه (Router) -------------------- */
const router = useRouter();
const route = useRoute();
const gameId = route.query.id;
/* -------------------- 3. بيانات اللعبة -------------------- */
const gameData = ref(null);
const games = ref([]);
const loading = ref(true);
const error = ref(null);
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
  } catch (err) {
    console.error('❌ فشل جلب الألعاب:', err);
    error.value = 'حدث خطأ أثناء تحميل الألعاب';
  } finally {
    loading.value = false;
  }
});
/* -------------------- 4. عرض السؤال والإجابة -------------------- */
const showModal = ref(false);
const currentQuestion = ref(null);
const answeredQuestions = ref([]);
const showAnswer = ref(false);
const answerResult = ref(null); // "correct" أو "wrong"
const selectedQuestion = ref(null);
const selectedColumn = ref(null);
const selectQuestion = (question, column, customPoints) => {
  selectedQuestion.value = customPoints;
  selectedColumn.value = column;
  currentQuestion.value = { ...question, points: customPoints };
  showModal.value = true;
  doublePoints.value = false;
  blockPoints.value = false;
  halfPoints.value = false;
  showPreQuestion.value = true;   // 🟢 أول ما يختار سؤال يبدأ بمرحلة التحضير
  showQuestionPart.value = false; // ❌ السؤال لسه مش ظاهر
};
const startQuestion = () => {
  showPreQuestion.value = false;  // ❌ نخفي التحضير
  showQuestionPart.value = true;  // 🟢 نعرض السؤال
  startTimer();                   // ⏱ يبدأ العداد
};
const revealAnswer = () => {
  showAnswer.value = true;
  answerResult.value = null;
  clearInterval(countdownInterval);
  if (currentQuestion.value && !answeredQuestions.value.includes(currentQuestion.value.id)) {
    answeredQuestions.value.push(currentQuestion.value.id);
  }
  setTimeout(() => {
    showModal.value = false;
    showAnswer.value = false;
    toggleTeam();
  }, 2000);
};
const confirmAnswer = (isCorrect) => {
  showModal.value = false;
  showAnswer.value = false;
  let pointsToAdd = 0;
  if (isCorrect) {
    pointsToAdd = currentQuestion.value.points || 0;
    if (blockPoints.value) {
      pointsToAdd = 0;
    } else if (doublePoints.value) {
      pointsToAdd *= 2;
    }
    // 🟢 لو الخصم فعل خصم نصف النقاط
    if (halfPoints.value) {
      pointsToAdd = Math.floor(pointsToAdd / 2);
    }
  }
  if (currentTeam.value === 1) score1.value += pointsToAdd;
  else score2.value += pointsToAdd;
  answeredQuestions.value.push(currentQuestion.value.id);
  answerResult.value = isCorrect ? "correct" : "wrong";
  toggleTeam();
};
const closeModal = () => {
  showModal.value = false;
  answeredQuestions.value.push(currentQuestion.value.id);
  let pointsToAdd = currentQuestion.value.points || 0;
  if (blockPoints.value) pointsToAdd = 0;
  else if (doublePoints.value) pointsToAdd *= 2;
  if (currentTeam.value === 1) score1.value += pointsToAdd;
  else score2.value += pointsToAdd;
  toggleTeam();
};
/* -------------------- 5. المؤقت -------------------- */
const timer = ref(30);
const isPaused = ref(false);
let countdownInterval = null;
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
const togglePause = () => {
  isPaused.value = !isPaused.value;
};
const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};
/* -------------------- 6. الفرق والنقاط -------------------- */
const currentTeam = ref(1);
const showPreQuestion = ref(false);
const showQuestionPart = ref(false);
showQuestionPart.value = true;  // يظهر
showQuestionPart.value = false; // يختفي
const score1 = ref(0);
const score2 = ref(0);
const doublePoints = ref(false);
const blockPoints = ref(false);
const halfPoints = ref(false);
const team1Helps = ref({ double: 1, block: 1, half: 1 });
const team2Helps = ref({ double: 1, block: 1, half: 1 });
const opponentTeam = computed(() => (currentTeam.value === 1 ? 2 : 1));
const getHelps = (team) => (team === 1 ? team1Helps.value : team2Helps.value);
const useHelp = (type, team) => {
  const helps = getHelps(team);
  if (helps[type] > 0) {
    helps[type] -= 1;
    if (type === "double") doublePoints.value = true;
    if (type === "block") blockPoints.value = true;
    if (type === "half") halfPoints.value = true;
  }
};
const toggleTeam = () => {
  currentTeam.value = currentTeam.value === 1 ? 2 : 1;
};
const increaseScore1 = () => score1.value += 10;
const decreaseScore1 = () => score1.value = Math.max(0, score1.value - 10);
const increaseScore2 = () => score2.value += 10;
const decreaseScore2 = () => score2.value = Math.max(0, score2.value - 10);
/* -------------------- 7. الميديا -------------------- */
const getMediaUrl = (question) => {
  if (!question) return placeholderImg;
  if (question.question_video) {
    return question.question_video.startsWith('http')
      ? question.question_video
      : `https://game-wise.smartleadtech.com/${question.question_video}`;
  }
  if (question.question_image) {
    return question.question_image.startsWith('http')
      ? question.question_image
      : `https://game-wise.smartleadtech.com/${question.question_image}`;
  }
  if (question.question_audio) {
    return question.question_audio.startsWith('http')
      ? question.question_audio
      : `https://game-wise.smartleadtech.com/${question.question_audio}`;
  }
  return placeholderImg;
};
/* -------------------- 8. التنقل -------------------- */
const goToWinGame = () => {
  router.push({
    path: '/WinGame',
    query: { score1: score1.value, score2: score2.value }
  });
};
const goTo = (path, message) => {
  if (confirm(message)) {
    router.push(path);
  }
};
const currentHelpMessage = computed(() => {
  if (doublePoints.value) return 'تم مضاعفة نقاط السؤال';
  if (blockPoints.value) return 'تم منعك من الإجابة';
  if (halfPoints.value) return 'تم خصم نصف نقاط السؤال';
  return '';
});
</script>
<style scoped>
.font-arabic {
  font-family: "Tajawal", sans-serif;
}
.c24054D {
  color: #24054d;
}
.bg24054D {
  background-color: #24054d;
}
.cB984FF {
  color: #b984ff;
}
</style>