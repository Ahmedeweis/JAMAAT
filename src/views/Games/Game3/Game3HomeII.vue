<template>
  <div class="game-view bg-cover bg-center min-h-screen" :style="{ backgroundImage: `url(${bg})` }">
    <!-- ✅ رأس اللعبة -->
    <GameHeader
      :team1="team1Name"
      :team2="team2Name"
      :currentTeam="currentTeam"
      @goBack="() => goTo('/categories', 'هل تريد الرجوع إلى الصفحة السابقة؟')"
      @endGame="goToWinGame"
      @toggleHelp="showHelp = !showHelp"
    />
    <!-- ✅ عرض الجولات -->
    <div class="mt-6">
      <!-- الجولة الأولى والثانية -->
      <RoundOneTwo
        v-if="selectedRound === 1 || selectedRound === 2"
        :round="selectedRound"
        :questions="selectedRound === 1 ? questions : questionsRound2"
        :answeredQuestions="selectedRound === 1 ? answeredQuestions : answeredQuestionsRound2"
        :currentTeam="currentTeam"
        :qrCodeData="qrCodeData"
        :showDefaultImage="showDefaultImage"
        @selectQuestion="selectQuestion"
      />
      <!-- الجولة الثالثة -->
      <RoundThree
        v-else-if="selectedRound === 3"
        :questions="questionsRound3"
        :answeredQuestions="answeredQuestionsRound3"
        :currentTeamIndex="currentTeamIndex"
        @markCorrect="markCorrect"
      />
    </div>
        <!-- ✅ لوحة النقاط -->
    <ScoreBoard
      :score1="score1"
      :score2="score2"
      :team1="team1Name"
      :team2="team2Name"
      :currentTeam="currentTeam"
      @inc1="increaseScore1"
      @dec1="decreaseScore1"
      @inc2="increaseScore2"
      @dec2="decreaseScore2"
    />
    <!-- ✅ السبورة للرسم -->
    <DrawingBoardWrapper
      v-if="showDrawingBoard"
      @close="showDrawingBoard = false"
    />
    <!-- ✅ الوسائط النهائية بعد السؤال -->
    <FinalMedia
      v-if="showFinalMedia"
      :type="finalMediaType"
      :url="finalMediaUrl"
      @close="showFinalMedia = false"
    />
    <!-- ✅ مودال نهاية اللعبة -->
    <EndGameModal
      v-if="showEndGameModal"
      :score1="score1"
      :score2="score2"
      :team1="team1Name"
      :team2="team2Name"
      @restart="goTo('/categories', 'هل تريد بدء لعبة جديدة؟')"
      @close="showEndGameModal = false"
    />
    <!-- ✅ المساعدة -->
    <div v-if="showHelp" class="fixed inset-0 bg-black/60 flex items-center justify-center text-white text-xl z-50">
      <div class="bg-white text-black p-6 rounded-xl shadow-xl w-96 text-center">
        <p>اضغط على أي سؤال لبدء الجولة</p>
        <button class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl" @click="showHelp = false">موافق</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from "vue-toastification"
import { useI18n } from 'vue-i18n'
import QRCode from 'qrcode'
import bg from '../../../assets/imgs/splash.png'
import { getCategoryQuestions } from '../../../services/categoryServicee'
// import DrowBoard from '../../../components/DrowBoard.vue'
import GameHeader from '../../../components/GameRounds/GameHeader.vue'
import ScoreBoard from '../../../components/GameRounds/ScoreBoard.vue'
import RoundOneTwo from '../../../components/GameRounds/RoundOneTwo.vue'
import RoundThree from '../../../components/GameRounds/RoundThree.vue'
import FinalMedia from '../../../components/GameRounds/FinalMedia.vue'
import DrawingBoardWrapper from '../../../components/GameRounds/DrawingBoardWrapper.vue'
import EndGameModal from '../../../components/GameRounds/EndGameModal.vue'
const { locale } = useI18n()
const toast = useToast()
const route = useRoute()
const router = useRouter()
/* ========= الحالة العامة ========= */
const showHelp = ref(false)
const selectedRound = ref(1)
const currentTeam = ref(1)
const score1 = ref(0)
const score2 = ref(0)
const showDrawingBoard = ref(false)
const showEndGameModal = ref(false)
/* ========= الفرق ========= */
const team1Name = ref(localStorage.getItem("team1Name") || "الفريق الأول")
const team2Name = ref(localStorage.getItem("team2Name") || "الفريق الثاني")
/* ========= الأسئلة ========= */
const questions = ref([])
const questionsRound2 = ref([])
const questionsRound3 = ref([])
const answeredQuestions = ref([])
const answeredQuestionsRound2 = ref([])
const answeredQuestionsRound3 = ref([])
/* ========= وسائط الأسئلة ========= */
const qrCodeData = ref('')
const showDefaultImage = ref(false)
const finalMediaType = ref('')
const finalMediaUrl = ref('')
const showFinalMedia = ref(false)
/* ========= تحكم اللعبة ========= */
const currentTeamIndex = ref(1)
const round3Completed = ref(false)
/* ========= وظائف اللعبة ========= */
function increaseScore1() { score1.value += 10 }
function decreaseScore1() { score1.value = Math.max(0, score1.value - 10) }
function increaseScore2() { score2.value += 10 }
function decreaseScore2() { score2.value = Math.max(0, score2.value - 10) }
function toggleTeam() { currentTeam.value = currentTeam.value === 1 ? 2 : 1 }
function goTo(path, message) {
  if (confirm(message)) router.push(path)
}
function goToWinGame() {
  if (confirm("هل أنت متأكد من إنهاء اللعبة؟")) {
    router.push({
      path: '/WinGame',
      query: { score1: score1.value, score2: score2.value }
    })
  }
}
/* ========= تحميل الأسئلة من الـ API ========= */
async function loadQuestions(categoryId) {
  try {
    const res = await getCategoryQuestions(categoryId)
    const all = (res?.data || res)?.map((q) => ({
      id: q.id,
      title: q.title,
      question_text: q.question_text,
      question_image: q.question_image,
      question_video: q.question_video,
      question_audio: q.question_audio,
      correct_answer: q.correct_answer,
      points: q.points,
    })) || []
    const total = all.length
    questions.value = all.slice(0, Math.min(8, total))
    questionsRound2.value = all.slice(8, Math.min(16, total))
    questionsRound3.value = all.slice(16, Math.min(22, total))
  } catch (error) {
    console.error("❌ Error loading questions:", error)
  }
}
/* ========= اختيار سؤال ========= */
async function selectQuestion(question) {
  console.log("✅ السؤال:", question)
  const hasMedia = question.question_image || question.question_video || question.question_audio
  if (hasMedia) {
    try {
      const mediaUrl = getMediaUrl(question)
      // توليد QR Code لو متاح
      qrCodeData.value = await QRCode.toDataURL(mediaUrl)
      showDefaultImage.value = false
      // فتح الميديا (الصورة / الفيديو / الصوت)
      finalMediaUrl.value = mediaUrl
      if (question.question_video) finalMediaType.value = 'video'
      else if (question.question_audio) finalMediaType.value = 'audio'
      else finalMediaType.value = 'image'
      showFinalMedia.value = true  // ✅ دا اللي بيظهر المكون FinalMedia
    } catch (err) {
      console.error(err)
      showDefaultImage.value = true
      qrCodeData.value = null
    }
  } else {
    // سؤال بدون ميديا → عرض صورة افتراضية أو مودال بسيط
    qrCodeData.value = null
    showDefaultImage.value = true
    showFinalMedia.value = true
    finalMediaType.value = 'none'
    finalMediaUrl.value = ''
  }
}
function getMediaUrl(question) {
  const baseUrl = 'https://game-wise.smartleadtech.com/'
  if (question.question_image) return baseUrl + question.question_image
  if (question.question_video) return baseUrl + question.question_video
  if (question.question_audio) return baseUrl + question.question_audio
  return null
}
/* ========= مراقبات ========= */
const round1Completed = computed(() => answeredQuestions.value.length >= questions.value.length)
const round2Completed = computed(() => answeredQuestionsRound2.value.length >= questionsRound2.value.length)
watch(round1Completed, val => { if (val) selectedRound.value = 2 })
watch(round2Completed, val => { if (val) selectedRound.value = 3 })
/* ========= بداية التشغيل ========= */
onMounted(() => {
  const categoryId = route.query.categories?.split(',').map(Number)[0] || 1
  loadQuestions(categoryId)
})
</script>
<style scoped>
.game-view {
  font-family: "Cairo", sans-serif;
  direction: rtl;
  color: #fff;
  padding: 20px;
}
</style>
