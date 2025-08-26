<!-- components/StartGameModal.vue -->
<template>
  <div class="min-h-screen w-full bg-cover bg-center bg-no-repeat" :style="`background-image: url(${bg});`">
    <div @click="confirmExit"
      class="fixed top-5 left-0 m-4 flex justify-between items-center text-start bg-[#010035] shadow-lg rounded-lg z-5 cursor-pointer">
      <img src="../../../assets/imgs/close_btn.svg" alt="Logo" class="w-10 z-5" />
    </div>
    <div @click="resetBoard"
      class=" cursor-pointer fixed top-5 left-15 m-4 flex justify-between items-center  text-start bg-[#010035] shadow-lg rounded-lg z-5">
      <img src="../../../assets/imgs/redo_btn.svg" alt="Logo" class="w-10 z-5 " />
    </div>
    <buy></buy>
    <div class=" inset-0  bg-opacity-60 flex justify-center items-center z-5">
      <div class="mt-30 flex flex-col items-center">
        <div class="flex items-center mb-4 boardII cursor-pointer"
          :class="[{ active: currentPlayer === 'red' }, 'red']">
          <img src="../../../assets/imgs/green.svg">
          <h2 class="text-white text-bold text-3xl">{{ player1 }}</h2>
        </div>
        <div class="flex items-center mb-4 boardII cursor-pointer"
          :class="[{ active: currentPlayer === 'yellow' }, 'yellow']">
          <img src="../../../assets/imgs/yellow.svg">
          <h2 class="text-white text-bold text-3xl">{{ player2 }}</h2>
        </div>
        <div class="space-y-6 my-3" style="margin: 20px 10px;">
          <div class="flex mb-1" style="margin-right: 4px;">
            <div v-for="col in cols" :key="col" class="cell" :style="{
              background: hoverCol === (col - 1) ? '#B0B0B0' : 'transparent',
              opacity: hoverCol === (col - 1) ? 1 : 0,
              pointerEvents: 'none'
            }"></div>
          </div>
          <div class="land">
            <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
              <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell" :class="cell"
                @click="dropDisc(colIndex)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Other template code remains unchanged -->
  <!-- المودال -->
  <div v-if="showModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 px-2 sm:px-4 py-6 overflow-y-auto">
    <div
      class="bg-white rounded-[20px] shadow-lg relative w-full sm:w-[90%] max-w-[500px] h-[600px] p-4 sm:p-6 flex flex-col gap-4 justify-between items-center">
      <!-- زر الإغلاق -->
      <img src="../../../assets/imgs/close_btn.svg" alt="Close" @click="closeModal"
        class="absolute top-[-15px] right-[-15px] cursor-pointer bg-[#FFE4E4] hover:bg-[#ffcccc] text-[#FF4B4B] w-10 h-10 rounded-full flex items-center justify-center shadow-md" />
      <!-- لو مفيش أسئلة متبقية -->
      <div v-if="remainingQuestions.length === 0" class="flex flex-col items-center justify-center h-full gap-6">
        <h2 class="text-red-600 font-bold text-2xl">{{ $t("noQuestions") }}</h2>
        <button @click="router.push('/connectintro')"
          class="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold px-6 py-3 rounded-full shadow-lg transition">
         {{ $t("backHome") }}
        </button>
      </div>
      <!-- الأسئلة العادية -->
      <div v-else-if="currentQuestion" class="modal-container w-full flex flex-col items-center gap-4">
        <h1 class="rounded-3xl self-start text-white text-end p-3 text-2xl bg-[#01004C] w-full"
           :dir="currentLang === 'ar' ? 'ltr' : 'rtl'">
          {{ currentQuestion.category_name || $t("noCategory") }}
        </h1>
<button
  v-if="currentQuestion && currentQuestion.id !== -1 && !showAnswer"
  @click="skipQuestion"
  class="flex items-center gap-2  self-start active:scale-95 cursor-pointer rounded-xl text-black text-lg font-bold px-1   transition-transform duration-200">
  <img src="../../../assets/imgs/skip.png" class="w-12 h-12" alt="skip" />
  <span v-if="currentPlayer === 'red'" class="bg-white/20 px-2 py-0.5 rounded-md t text-lg text-[#01004C]">
    {{ player1Skips }}
  </span>
  <span v-else class="bg-white/20 px-2 py-0.5 rounded-md text-lg text-[#01004C]">
    {{ player2Skips }}
  </span>
</button>
        <h2 class="text-[#024E28] text-xl font-bold text-center w-full mb-6">
          {{ currentQuestion.title || $t("noTitle")  }}
        </h2>
        <!-- فيديو -->
        <video v-if="currentQuestion?.question_video" :src="getMediaUrl(currentQuestion)" controls
          class="max-h-[300px] w-auto mx-auto rounded-md" @error="handleVideoError"></video>
        <!-- صورة -->
        <img v-else :src="getMediaUrl(currentQuestion)" alt="صورة السؤال"
          class="max-h-[250px] w-auto mx-auto rounded-md" />
      </div>
      <!-- زر إظهار الإجابة -->
      <button v-if="!showAnswer && currentQuestion && currentQuestion.id !== -1" @click="revealAnswer"
        class="bg-[#24B758] cursor-pointer hover:bg-green-700 text-center w-[200px] text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition mt-2">
        {{ $t("showAnswer") }}
      </button>
      <!-- الإجابة -->
      <div v-else-if="showAnswer && currentQuestion"
        class="mt-4 animate-fade-in w-full flex flex-col items-center gap-4">
        <div
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg text-center text-lg font-bold max-w-[90%]">
          {{ currentQuestion?.correct_answer || $t("noAnswer") }}
        </div>
        <!-- أزرار التقييم -->
        <div class="flex gap-4 mt-4">
          <button @click="handleAnswer(true)"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full cursor-pointer">
            {{ $t("correct") }}
          </button>
          <button @click="handleAnswer(false)"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full cursor-pointer">
          {{ $t("wrong") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- -------------------------------------------------- -->
  <div v-if="winer" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] px-2 sm:px-4 py-6">
    <div class="relative w-full sm:w-[90%] max-w-[500px]">
      <div
        class="bg-white rounded-[20px] shadow-lg relative h-[250px] p-4 sm:p-6 flex flex-col gap-4 justify-between items-center ">
        <!-- التوهج -->
        <img src="../../../assets/imgs/star_ing.svg" alt="Glow"
          class="absolute top-[-150px] left-1/2 -translate-x-1/2 w-64 h-64 animate-pulse opacity-80 z-20" />
        <!-- النجوم -->
        <img src="../../../assets/imgs/stars.svg" alt="Stars"
          class="absolute top-[-120px] left-1/2 -translate-x-1/2 w-72 h-72 animate-spin-slow  z-30" />
        <!-- زر الإغلاق -->
        <img src="../../../assets/imgs/closeo.svg" alt="Close" @click="closeModale"
          class="absolute -top-4 -right-4 cursor-pointer bg-[#FFE4E4] hover:bg-[#ffcccc] text-[#FF4B4B] w-10 h-10 rounded-full flex items-center justify-center shadow-md z-40" />
        <!-- العنوان -->
        <h1 class="text-green-700 font-bold text-4xl mt-14 z-40">  {{ $t("connectwin") }}  </h1>
        <!-- بيانات الفائز -->
        <div class="flex items-center justify-between mt-4 z-40 text-4xl p-2 rounded-xl"
          :class="currentPlayer === 'red' ? ' bg-green-700' : 'bg-amber-400'">
          <img v-if="currentPlayer === 'red'" src="../../../assets/imgs/green.svg" alt="Winner" />
          <img v-else src="../../../assets/imgs/yellow.svg" alt="Winner" />
          <div class="text-white font-bold mx-4">
            {{ wing }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { getCategories } from '../../../services/categoryService';
import buy from '../../../components/buy.vue'
import bg from '../../../assets/imgs/splash.png';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';
import placeholderImg from '../../../assets/imgs/upload.png';
import { useI18n } from 'vue-i18n'
const router = useRouter();
const { t, locale } = useI18n();
const currentLang = locale.value
const hoverCol = ref(null);
const rows = 6;
const cols = 7;
const winer = ref(false);
const wing = ref('');
const player1Score = ref(0);
const player2Score = ref(0);
const toast = useToast();
const route = useRoute();
const pendingCol = ref(null);
const categories = ref([]);
const allQuestions = ref([]);
const remainingQuestions = ref([]);
const loading = ref(true);
const showModal = ref(false);
const currentQuestion = ref(null);
const showAnswer = ref(false);
const player1 = ref(localStorage.getItem('player1Name') || '');
const player2 = ref(localStorage.getItem('player2Name') || '');
const player1Skips = ref(3)
const player2Skips = ref(3)
onMounted(() => {
  player1Skips.value = parseInt(localStorage.getItem("player1Skips")) || 3
  player2Skips.value = parseInt(localStorage.getItem("player2Skips")) || 3
})
const routeCategories = Array.isArray(route.query.categories)
  ? route.query.categories.map(Number)
  : route.query.categories?.split(',').map(Number) || [];
onMounted(async () => {
  if (routeCategories.length === 0) {
    toast.error('لم يتم تحديد أي كاتيجوري في الرابط')
    loading.value = false
    return
  }
  try {
      const currentLang = locale.value
    const res = await getCategories({}, currentLang)
    const apiData = res?.data?.result?.data || res?.data?.data
    if (!apiData) {
      throw new Error('الـ API لم يرجع بيانات صحيحة')
    }
    const allCategories = apiData.map(cat => ({
      ...cat,
      image_url: cat.image?.startsWith('http')
        ? cat.image
        : `http://game-wise.smartleadtech.com/${cat.image?.replace(/^\/+/, '')}`
    }))
    console.log('📌 الكاتيجوريز قبل الفلترة:', allCategories)
    const filteredCategories = allCategories.filter(cat =>
      routeCategories.includes(cat.id)
    )
    categories.value = filteredCategories
    allQuestions.value = filteredCategories.flatMap(cat =>
      (cat.questions || []).map(q => ({
        ...q,
        category_name: cat.name
      }))
    )
    // إضافة السؤال الافتراضي في نهاية القايمة
    const defaultQuestion = {
      id: -1, // ID مميز عشان تميزه
      question_text: 'هل تريد إعادة اللعبة للبداية ؟',
      correct_answer: 'العودة للصفحة الرئيسية',
      category_name: 'افتراضي',
      question_image: null,
      question_video: null
    }
    allQuestions.value.push(defaultQuestion) // إضافة السؤال الافتراضي
    remainingQuestions.value = [...allQuestions.value]
    console.log('📌 الكاتيجوريز بعد الفلترة:', categories.value)
    console.log('📌 الأسئلة:', allQuestions.value)
  } catch (err) {
    console.error('❌ خطأ في جلب الكاتيجوريز:', err)
    toast.error('فشل في تحميل الكاتيجوريز')
  } finally {
    loading.value = false
  }
})
const selectRandomQuestion = () => {
  if (remainingQuestions.value.length === 0) return null
  // لو في سؤال واحد بس وهو الافتراضي
  if (remainingQuestions.value.length === 1 && remainingQuestions.value[0].id === -1) {
    const question = remainingQuestions.value[0]
    remainingQuestions.value.splice(0, 1)
    return question
  }
  // استبعاد السؤال الافتراضي من الاختيار العشوائي لو فيه أسئلة تانية
  const nonDefaultQuestions = remainingQuestions.value.filter(q => q.id !== -1)
  if (nonDefaultQuestions.length === 0) return null // لو مفيش أسئلة غير الافتراضي ومش هو الوقت بتاعه
  const randomIndex = Math.floor(Math.random() * nonDefaultQuestions.length)
  const question = nonDefaultQuestions[randomIndex]
  const indexInRemaining = remainingQuestions.value.findIndex(q => q.id === question.id)
  remainingQuestions.value.splice(indexInRemaining, 1)
  return question
}
const board = ref(
  Array.from({ length: rows }, () => Array(cols).fill(null))
)
const currentPlayer = ref('red')
const dropDisc = (colIndex) => {
  pendingCol.value = colIndex; // نخزن العمود
  currentQuestion.value = selectRandomQuestion();
  showAnswer.value = false;
  showModal.value = true;
};
const resetBoard = () => {
  Swal.fire({
    title: t('resetTitle'),
    text: t('resetText'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: t('yes'),
    cancelButtonText: t('no'),
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      board.value = Array.from({ length: rows }, () => Array(cols).fill(null))
      remainingQuestions.value = [...allQuestions.value]
      player1Score.value = 0;
      player2Score.value = 0;
      currentPlayer.value = 'red'
      player1Skips.value = 3
      player2Skips.value = 3
      localStorage.setItem("player1Skips", 3)
      localStorage.setItem("player2Skips", 3)
      Swal.fire({
        title: t('resetDoneTitle'),
        text: t('resetDoneText'),
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
    }
  })
}
const confirmExit = () => {
  Swal.fire({
    title: t('exitTitle'),
    text: t('exitText'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: t('yes'),
    cancelButtonText: t('cancel')
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/ChooseGame');
    }
  });
};
const closeModal = () => {
  showModal.value = false;
  currentQuestion.value = null;
  showAnswer.value = false;
};
const revealAnswer = () => {
  showAnswer.value = true;
  if (playerAnswer.value === currentQuestion.value?.correct_answer) {
    for (let row = rows - 1; row >= 0; row--) {
      if (!board.value[row][pendingCol.value]) {
        board.value[row][pendingCol.value] = currentPlayer.value;
        break;
      }
    }
  }
};
const getMediaUrl = (question) => {
  if (!question) return placeholderImg;
  if (question.question_video) {
    if (question.question_video.startsWith('http')) {
      return question.question_video;
    }
    return `https://game-wise.smartleadtech.com/${question.question_video.replace(/^\/+/, '')}`;
  }
  if (question.question_image) {
    if (question.question_image.startsWith('http')) {
      return question.question_image;
    }
    return `https://game-wise.smartleadtech.com/${question.question_image.replace(/^\/+/, '')}`;
  }
  return placeholderImg;
};
const handleVideoError = (event) => {
  console.error('Video failed to load:', event);
  toast.error('فشل تحميل الفيديو، تحقق من الرابط أو الملف');
};
// دالة للتحقق من الفوز
const checkWinner = (player) => {
  // أفقي
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      if (
        board.value[r][c] === player &&
        board.value[r][c + 1] === player &&
        board.value[r][c + 2] === player &&
        board.value[r][c + 3] === player
      ) return true;
    }
  }
  // رأسي
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r <= rows - 4; r++) {
      if (
        board.value[r][c] === player &&
        board.value[r + 1][c] === player &&
        board.value[r + 2][c] === player &&
        board.value[r + 3][c] === player
      ) return true;
    }
  }
  // قطري ↘
  for (let r = 0; r <= rows - 4; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      if (
        board.value[r][c] === player &&
        board.value[r + 1][c + 1] === player &&
        board.value[r + 2][c + 2] === player &&
        board.value[r + 3][c + 3] === player
      ) return true;
    }
  }
  // قطري ↗
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      if (
        board.value[r][c] === player &&
        board.value[r - 1][c + 1] === player &&
        board.value[r - 2][c + 2] === player &&
        board.value[r - 3][c + 3] === player
      ) return true;
    }
  }
  return false;
};
// دالة الإجابة
const handleAnswer = (isCorrect) => {
  // إضافة الدائرة في أي حال
  for (let row = rows - 1; row >= 0; row--) {
    if (!board.value[row][pendingCol.value]) {
      board.value[row][pendingCol.value] = isCorrect ? currentPlayer.value : 'gray';
      break;
    }
  }
  if (isCorrect) {
    // زيادة النقاط
    if (currentPlayer.value === 'red') player1Score.value += 10;
    else player2Score.value += 10;
    // التحقق من الفوز
    if (checkWinner(currentPlayer.value)) {
      wing.value = currentPlayer.value === 'red' ? player1.value : player2.value;
      winer.value = true;
      closeModal();
      return;
    }
  }
  // تبديل الدور
  currentPlayer.value = currentPlayer.value === "red" ? "yellow" : "red";
  // غلق المودال
  showModal.value = false;
  currentQuestion.value = null;
  showAnswer.value = false;
};
const closeModale = () => {
  winer.value = false;
  wing.value = '';
};
const skipQuestion = () => {
  if (currentPlayer.value === 'red' && player1Skips.value <= 0) {
    toast.info('لا يوجد تخطي متبقي للاعب 1');
    return;
  }
  if (currentPlayer.value === 'yellow' && player2Skips.value <= 0) {
    toast.info('لا يوجد تخطي متبقي للاعب 2');
    return;
  }
  if (currentPlayer.value === 'red') {
    player1Skips.value--
    localStorage.setItem("player1Skips", player1Skips.value)
  } else {
    player2Skips.value--
    localStorage.setItem("player2Skips", player2Skips.value)
  }
  if (remainingQuestions.value.length === 0) {
    toast.info('لا يوجد أسئلة متبقية للتخطي');
    return;
  }
  currentQuestion.value = selectRandomQuestion();
  showAnswer.value = false;
}
</script>
<style scoped>
/* خلفية اللوحة */
.board {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  padding: 10px 11px 10px 11px;
  background: #010035;
  border-radius: 12px;
  box-shadow:
    0 0 5px 2px rgba(0, 0, 0, 0.6),
    inset 0 0 8px 2px rgba(255, 255, 255, 0.05);
  font-family: Arial, sans-serif;
  color: white;
  font-weight: 700;
  user-select: none;
  z-index: 1000;
}
/* تصميم شكل الإطار الخارجي مع الأطراف الدائرية والأنبوب */
.board::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 18px;
  pointer-events: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
}
/* أيقونة العملة (العملة الذهبية بالدولار) */
.coin-icon {
  flex-shrink: 0;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #f9d54f 0%, #de8b00 80%);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.6),
    inset 0 -5px 10px #b17d00,
    0 4px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
/* رمز الدولار */
.coin-icon::after {
  content: "$";
  font-weight: 900;
  font-size: 2.2rem;
  color: #fff9d7;
  text-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.4);
  position: relative;
  top: 2px;
}
/* العدد */
.coin-amount {
  margin: 0 12px;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  flex-grow: 1;
  text-align: center;
}
/* زر الإضافة الأخضر */
.add-button {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(180deg, #50f060 0%, #009f2d 100%);
  box-shadow:
    inset 0 4px 5px rgba(255, 255, 255, 0.35),
    0 4px 8px rgba(0, 120, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;
  cursor: pointer;
}
.add-button:hover {
  background: linear-gradient(180deg, #70ff82 0%, #00c03f 100%);
}
/* رمز زائد داخل الزر */
.add-button::before {
  content: "+";
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  line-height: 1;
  user-select: none;
  position: relative;
  top: 1px;
}
.boardII {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin-top: 20px;
  padding: 10px 11px 10px 11px;
  background: #010035;
  border-radius: 12px;
  box-shadow:
    0 0 5px 2px rgba(0, 0, 0, 0.6),
    inset 0 0 8px 2px rgba(255, 255, 255, 0.05);
  font-family: Arial, sans-serif;
  color: white;
  font-weight: 700;
  user-select: none;
  z-index: 1000;
}
.land {
  display: flex;
  flex-direction: column;
  background: #F2FCE0;
  padding: 10px;
  border-radius: 30px;
  width: fit-content;
  border: solid 4px #A3611F;
}
.row {
  display: flex;
}
.cell {
  width: clamp(40px, 10vw, 70px);
  /* أصغر 40px، أكبر 70px، تتغير حسب الشاشة */
  height: clamp(40px, 10vw, 70px);
  border-radius: 50%;
  background: #01004C;
  margin: 4px;
  /* قللت المسافة لتناسب الشاشات الصغيرة */
  cursor: pointer;
}
.cell.red {
  background: #66FD84;
}
.cell.yellow {
  background: #FFCE67;
}
.cell.gray {
  background: #B0B0B0;
}
.boardII {
  transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
}
/* اللاعب الأحمر (أخضر في التصميم) */
.boardII.active.red {
  transform: scale(1.2);
  box-shadow: 0 0 15px 5px rgba(102, 253, 132, 0.7);
}
.boardII.active.red h2 {
  color: #66FD84;
  text-shadow: 0 0 8px #66FD84, 0 0 12px #66FD84;
}
/* اللاعب الأصفر */
.boardII.active.yellow {
  transform: scale(1.2);
  box-shadow: 0 0 15px 5px rgba(255, 206, 103, 0.7);
}
.boardII.active.yellow h2 {
  color: #FFCE67;
  text-shadow: 0 0 8px #FFCE67, 0 0 12px #FFCE67;
}
</style>
