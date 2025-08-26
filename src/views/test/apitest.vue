<template>
  <div dir="rtl" class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6">
    <!-- Header -->
    <header class="max-w-6xl mx-auto mb-6">
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-3xl md:text-4xl font-extrabold text-indigo-700">🎮 اللعبة الثالثة</h1>
        <p class="text-gray-600 text-center">3 جولات — إدارة نقاط، مؤقّت، وتبديل الأدوار طبقًا لدليل اللعبة.</p>
      </div>
    </header>
    <main class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Scoreboard -->
      <section class="lg:col-span-1 bg-white rounded-xl shadow border border-indigo-100 p-4">
        <h2 class="text-lg font-semibold text-indigo-700 mb-4">لوحة النقاط</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="inline-block w-2 h-8 rounded bg-blue-500"></span>
              <input v-model="teams.blue.name" class="border rounded px-2 py-1 w-36" />
            </div>
            <div class="text-2xl font-extrabold tabular-nums text-blue-700">{{ teams.blue.score }}</div>
          </div>
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="inline-block w-2 h-8 rounded bg-rose-500"></span>
              <input v-model="teams.red.name" class="border rounded px-2 py-1 w-36" />
            </div>
            <div class="text-2xl font-extrabold tabular-nums text-rose-700">{{ teams.red.score }}</div>
          </div>
          <div class="mt-6 grid grid-cols-2 gap-2">
            <button @click="adjustScore('blue', +5)" class="px-3 py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-700">+5 أزرق</button>
            <button @click="adjustScore('blue', -5)" class="px-3 py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-700">-5 أزرق</button>
            <button @click="adjustScore('red', +5)" class="px-3 py-2 rounded bg-rose-50 hover:bg-rose-100 text-rose-700">+5 أحمر</button>
            <button @click="adjustScore('red', -5)" class="px-3 py-2 rounded bg-rose-50 hover:bg-rose-100 text-rose-700">-5 أحمر</button>
          </div>
          <div class="mt-4 p-3 rounded bg-indigo-50 text-indigo-800 text-sm">
            ✳️ يسمح الدليل بتعديل النقاط يدويًا عند وقوع أخطاء أثناء اللعب. :contentReference[oaicite:10]{index=10}
          </div>
        </div>
      </section>
      <!-- Controls -->
      <section class="lg:col-span-2 bg-white rounded-xl shadow border border-indigo-100 p-4">
        <!-- Round Switcher -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <span class="text-sm text-gray-600">اختر الجولة:</span>
          <button @click="switchRound('acting')" :class="roundBtnClass('acting')">بدون كلام</button>
          <button @click="switchRound('drawing')" :class="roundBtnClass('drawing')">تحدّي الرسم</button>
          <button @click="switchRound('password')" :class="roundBtnClass('password')">كلمة السر</button>
          <div class="ms-auto flex items-center gap-2">
            <span class="text-sm text-gray-600">الدور:</span>
            <span class="px-2.5 py-1 rounded-full text-sm font-semibold"
                  :class="activeTeam === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'">
              {{ activeTeamName }}
            </span>
            <button @click="toggleTurn" class="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">
              تبديل الدور ↔︎
            </button>
          </div>
        </div>
        <!-- ACTING (Round 1) -->
        <div v-if="round === 'acting'" class="space-y-4">
          <div class="rounded-lg border p-4 bg-gray-50">
            <h3 class="font-semibold text-indigo-700 mb-2">الجولة 1 — بدون كلام</h3>
            <p class="text-sm text-gray-600">
              عرض السؤال عبر QR واختيار لاعب ليمثّل بدون كلام/صوت. (نعرض سؤالًا مباشرة الآن؛ نضيف QR لاحقًا). :contentReference[oaicite:11]{index=11}
            </p>
          </div>
          <!-- Question Box -->
          <div class="rounded-xl border p-4 bg-white shadow-sm">
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <div class="text-sm text-gray-500 mb-1">السؤال الحالي</div>
                <div class="text-xl font-bold text-indigo-800 min-h-[2.5rem]">
                  {{ currentQuestion || '—' }}
                </div>
              </div>
              <button @click="drawQuestion('acting')" class="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                🎲 عرض سؤال
              </button>
            </div>
            <!-- Timer -->
            <div class="mt-4 flex items-center gap-3">
              <button @click="startTimer(60)" :disabled="isTiming"
                      class="px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">
                ▶️ بدء 60ث
              </button>
              <button @click="stopTimer" :disabled="!isTiming"
                      class="px-3 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50">
                ⏸️ إيقاف
              </button>
              <div class="ms-auto text-2xl font-extrabold tabular-nums"
                   :class="timeLeft <= 10 ? 'text-rose-600' : 'text-gray-800'">
                ⏳ {{ timeLeft }}ث
              </div>
            </div>
            <!-- Scoring Actions (per PDF rules) -->
            <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <button @click="awardForActing('self')" class="px-3 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                ✅ {{ activeTeamName }} جاوب صح (60)
              </button>
              <button @click="awardForActing('steal_during')" class="px-3 py-3 rounded-lg bg-violet-600 text-white hover:bg-violet-700">
                ⚡ الفريق الآخر خطف أثناء الوقت (27)
              </button>
              <button @click="awardForActing('steal_after')" class="px-3 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700">
                ⌛ بعد انتهاء الوقت (15)
              </button>
            </div>
          </div>
          <!-- Progress -->
          <div class="text-sm text-gray-600">
            سؤالك رقم {{ questionIndex + 1 }} / {{ maxQuestionsPerTeam }} لهذا الفريق (الجولة 1: 4 أسئلة لكل فريق). :contentReference[oaicite:12]{index=12}
          </div>
        </div>
        <!-- Placeholders for next phases -->
<div v-else-if="round === 'drawing'" class="space-y-4">
  <div class="rounded-lg border p-4 bg-gray-50">
    <h3 class="font-semibold text-indigo-700 mb-2">الجولة 2 — تحدّي الرسم ✏️</h3>
    <p class="text-sm text-gray-600">
      اللاعب يرسم فقط لتوصيل المعلومة. لا يُسمح بالكلام أو أي مؤشرات صوتية. :contentReference[oaicite:1]{index=1}
    </p>
  </div>
  <!-- Question Box -->
  <div class="rounded-xl border p-4 bg-white shadow-sm">
    <div class="flex items-start gap-3">
      <div class="flex-1">
        <div class="text-sm text-gray-500 mb-1">السؤال الحالي</div>
        <div class="text-xl font-bold text-indigo-800 min-h-[2.5rem]">
          {{ currentQuestion || '—' }}
        </div>
      </div>
      <button @click="drawQuestion('drawing')" class="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
        🎲 عرض سؤال
      </button>
    </div>
    <!-- Canvas Drawing Board -->
    <div class="mt-4">
      <canvas ref="canvasRef"
              width="500" height="300"
              class="border rounded bg-white shadow-sm cursor-crosshair w-full"
              @mousedown="startDraw"
              @mouseup="endDraw"
              @mousemove="draw"
              @touchstart.prevent="startDraw"
              @touchend.prevent="endDraw"
              @touchmove.prevent="draw"></canvas>
      <div class="mt-2 flex gap-2">
        <button @click="clearCanvas" class="px-3 py-2 rounded bg-rose-50 hover:bg-rose-100 text-rose-700">🧹 مسح</button>
        <button @click="saveCanvas" class="px-3 py-2 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700">💾 حفظ الرسمة</button>
      </div>
    </div>
    <!-- Timer -->
    <div class="mt-4 flex items-center gap-3">
      <button @click="startTimer(60)" :disabled="isTiming"
              class="px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">
        ▶️ بدء 60ث
      </button>
      <button @click="stopTimer" :disabled="!isTiming"
              class="px-3 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50">
        ⏸️ إيقاف
      </button>
      <div class="ms-auto text-2xl font-extrabold tabular-nums"
           :class="timeLeft <= 10 ? 'text-rose-600' : 'text-gray-800'">
        ⏳ {{ timeLeft }}ث
      </div>
    </div>
    <!-- Scoring Actions -->
    <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      <button @click="awardForDrawing('self')" class="px-3 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
        ✅ {{ activeTeamName }} جاوب صح (60)
      </button>
      <button @click="awardForDrawing('steal_during')" class="px-3 py-3 rounded-lg bg-violet-600 text-white hover:bg-violet-700">
        ⚡ الفريق الآخر خطف أثناء الوقت (27)
      </button>
      <button @click="awardForDrawing('steal_after')" class="px-3 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700">
        ⌛ بعد انتهاء الوقت (15)
      </button>
    </div>
  </div>
  <!-- Progress -->
  <div class="text-sm text-gray-600">
    سؤالك رقم {{ questionIndex + 1 }} / {{ maxQuestionsPerTeam }} لهذا الفريق (الجولة 2: 4 أسئلة لكل فريق). :contentReference[oaicite:2]{index=2}
  </div>
</div>
<div v-else-if="round === 'secret'" class="space-y-4">
  <div class="rounded-lg border p-4 bg-gray-50">
    <h3 class="font-semibold text-rose-700 mb-2">الجولة 3 — كلمة السر 🕵️‍♂️</h3>
    <p class="text-sm text-gray-600">
      حاول تخمّن كلمة السر من خلال التلميحات. عندك 15 ثانية والنقاط بتنقص تدريجياً.
    </p>
  </div>
  <!-- Word Hint Box -->
  <div class="rounded-xl border p-4 bg-white shadow-sm">
    <div class="flex items-start gap-3">
      <div class="flex-1">
        <div class="text-sm text-gray-500 mb-1">التلميحات</div>
        <div v-if="currentSecret" class="space-y-2">
          <div v-for="(hint, i) in currentSecret.hints" :key="i" class="px-3 py-2 bg-gray-100 rounded">
            {{ hint }}
          </div>
        </div>
        <div v-else class="italic text-gray-400">— لم يتم اختيار كلمة بعد —</div>
      </div>
      <button @click="drawSecretWord" class="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
        🎲 عرض كلمة سر
      </button>
    </div>
    <!-- Timer + Points -->
    <div v-if="currentSecret" class="mt-4 flex items-center gap-3">
      <button @click="startSecretTimer" :disabled="isTiming"
              class="px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">
        ▶️ بدء 15ث
      </button>
      <button @click="stopSecretTimer" :disabled="!isTiming"
              class="px-3 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50">
        ⏸️ إيقاف
      </button>
      <div class="ms-auto text-xl font-extrabold tabular-nums"
           :class="timeLeft <= 5 ? 'text-rose-600' : 'text-gray-800'">
        ⏳ {{ timeLeft }}ث
      </div>
      <div class="text-lg font-bold text-indigo-700">
        ⭐ {{ secretPoints }} نقطة
      </div>
    </div>
    <!-- Answer Controls -->
    <div v-if="currentSecret" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <button @click="confirmSecretAnswer(true)" class="px-3 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
        ✅ {{ activeTeamName }} جاوب صح ({{ secretPoints }})
      </button>
      <button @click="confirmSecretAnswer(false)" class="px-3 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700">
        ❌ خطأ / الوقت انتهى
      </button>
    </div>
  </div>
</div>
<div v-else-if="round === 'final'" class="space-y-4">
  <div class="rounded-lg border p-4 bg-gray-50">
    <h3 class="font-semibold text-purple-700 mb-2">⚡ الجولة 4 — المواجهة النهائية</h3>
    <p class="text-sm text-gray-600">
      أسئلة سريعة وحاسمة، كل إجابة صحيحة تكسب الفريق نقاط إضافية.
    </p>
  </div>
  <!-- سؤال المواجهة -->
  <div class="rounded-xl border p-4 bg-white shadow-sm">
    <div class="flex items-start gap-3">
      <div class="flex-1">
        <div class="text-sm text-gray-500 mb-1">السؤال</div>
        <div v-if="currentFinalQ" class="px-3 py-2 bg-gray-100 rounded text-lg font-bold">
          {{ currentFinalQ.question }}
        </div>
        <div v-else class="italic text-gray-400">— لم يتم اختيار سؤال بعد —</div>
      </div>
      <button @click="drawFinalQ"
              class="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
        🎲 عرض سؤال
      </button>
    </div>
    <!-- Timer -->
    <div v-if="currentFinalQ" class="mt-4 flex items-center gap-3">
      <button @click="startFinalTimer" :disabled="isTiming"
              class="px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">
        ▶️ بدء الوقت
      </button>
      <button @click="stopFinalTimer" :disabled="!isTiming"
              class="px-3 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50">
        ⏸️ إيقاف
      </button>
      <div class="ms-auto text-xl font-extrabold tabular-nums"
           :class="timeLeft <= 5 ? 'text-rose-600' : 'text-gray-800'">
        ⏳ {{ timeLeft }}ث
      </div>
    </div>
    <!-- التحكم في الإجابة -->
    <div v-if="currentFinalQ" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <button @click="finalAnswer(true)" class="px-3 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
        ✅ {{ activeTeamName }} جاوب صح ({{ finalPoints }} نقطة)
      </button>
      <button @click="finalAnswer(false)" class="px-3 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700">
        ❌ خطأ / الوقت انتهى
      </button>
      <div v-if="showFinalAnswer && currentFinalQ" class="mt-4 text-center text-lg text-purple-700 font-bold">
  الإجابة الصحيحة: {{ currentFinalQ.answer }}
</div>
    </div>
  </div>
</div>
      </section>
    </main>
    <!-- Toast -->
    <transition name="fade">
      <div v-if="toast.show"
           class="fixed bottom-6 right-6 bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg">
        {{ toast.text }}
      </div>
    </transition>
  </div>
  <!-- DRAWING (Round 2) -->
</template>
<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
/* ========== State ========== */
const teams = ref({
  blue: { name: 'الفريق الأزرق', score: 0 },
  red: { name: 'الفريق الأحمر', score: 0 }
})
const activeTeam = ref('blue') // 'blue' | 'red'
const round = ref('acting') // 'acting' | 'drawing' | 'password'
const maxQuestionsPerTeam = 4 // طبقًا للجولة 1 & 2 في الدليل
const askedCount = ref({ blue: 0, red: 0 })
/* الأسئلة التجريبية */
const bank = {
  acting: [
    'اسم مسلسل مشهور من 3 كلمات',
    'حادثة تاريخية معروفة',
    'اسم لاعب كرة عالمي',
    'عنوان كتاب معروف',
    'فيلم أكشن أيقوني',
    'اختراع شهير'
  ],
  drawing: [
    'ارسم قطة',
    'ارسم شجرة نخيل',
    'ارسم سيارة سباق',
    'ارسم كوب شاي',
    'ارسم هاتف محمول',
    'ارسم كرة قدم'
  ],
  password: [
    { word: "كرة القدم", hints: ["رياضة", "شعبية", "ملعب", "11 لاعب"] },
    { word: "البيتزا", hints: ["طعام", "إيطاليا", "دائري", "جبن"] },
    { word: "الهاتف", hints: ["اتصال", "ذكي", "شاشة", "تطبيقات"] }
  ],
  final: [
    { question: "ما هي عاصمة اليابان؟", answer: "طوكيو" },
    { question: "كم عدد قارات العالم؟", answer: "7" },
    { question: "من هو مكتشف قانون الجاذبية؟", answer: "نيوتن" }
  ]
}
/* ========== UI helpers ========== */
const activeTeamName = computed(() => teams.value[activeTeam.value].name)
const currentQuestion = ref('')
const questionIndex = computed(() => askedCount.value[activeTeam.value])
/* ========== Timer ========== */
const timeLeft = ref(0)
let timerId = null
const isTiming = computed(() => !!timerId)
function startTimer(seconds) {
  stopTimer()
  timeLeft.value = seconds
  timerId = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      stopTimer()
    }
  }, 1000)
}
function stopTimer() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}
onBeforeUnmount(stopTimer)
/* ========== Toast ========== */
const toast = ref({ show: false, text: '' })
function showToast(msg) {
  toast.value = { show: true, text: msg }
  setTimeout(() => (toast.value.show = false), 1800)
}
/* ========== Round switching ========== */
function switchRound(r) {
  round.value = r
}
/* ========== Round button classes ========== */
function roundBtnClass(selectedRound) {
  return [
    'px-3',
    'py-2',
    'rounded-lg',
    'text-sm',
    'font-semibold',
    round.value === selectedRound
      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  ]
}
/* ========== Scoreboard helpers ========== */
function adjustScore(team, delta) {
  teams.value[team].score = Math.max(0, teams.value[team].score + delta)
}
function toggleTurn() {
  activeTeam.value = activeTeam.value === 'blue' ? 'red' : 'blue'
}
/* ========== Questions ========== */
function drawQuestion(mode) {
  if (mode === 'acting' || mode === 'drawing') {
    const pool = bank[mode]
    currentQuestion.value = pool[Math.floor(Math.random() * pool.length)]
    showToast('🎲 تم عرض سؤال')
  }
}
/* ========== Round 1 scoring (بدون كلام) ========== */
function awardForActing(type) {
  const owner = activeTeam.value
  const opponent = owner === 'blue' ? 'red' : 'blue'
  if (type === 'self') {
    adjustScore(owner, 60)
    showToast(`✅ ${teams.value[owner].name} +60`)
    nextQuestionAfter(owner, true)
    return
  }
  if (type === 'steal_during') {
    if (!isTiming.value) {
      showToast('ℹ️ الخطف أثناء الوقت — ابدأ المؤقّت أولًا')
    }
    adjustScore(opponent, 27)
    showToast(`⚡ ${teams.value[opponent].name} +27 (خطف أثناء الوقت)`)
    nextQuestionAfter(owner, false, /*switchTurnImmediately*/true)
    return
  }
  if (type === 'steal_after') {
    if (isTiming.value) {
      showToast('ℹ️ بعد انتهاء الوقت — أوقِف المؤقّت أولًا أو انتظر انتهاءه')
    }
    adjustScore(opponent, 15)
    showToast(`⌛ ${teams.value[opponent].name} +15 (بعد انتهاء الوقت)`)
    nextQuestionAfter(owner, false, true)
    return
  }
}
/* الانتقال للسؤال التالي وتحديث العدّادات */
function nextQuestionAfter(ownerTeam, answeredByOwner, switchTurnImmediately = false) {
  stopTimer()
  currentQuestion.value = ''
  askedCount.value[ownerTeam] = Math.min(
    maxQuestionsPerTeam,
    askedCount.value[ownerTeam] + 1
  )
  // إذا انتهت الأسئلة للجميع انتقل للجولة التالية
  if (askedCount.value.blue >= maxQuestionsPerTeam && askedCount.value.red >= maxQuestionsPerTeam) {
    if (round.value === 'acting') {
      round.value = 'drawing'
      askedCount.value = { blue: 0, red: 0 }
    } else if (round.value === 'drawing') {
      round.value = 'secret'
      askedCount.value = { blue: 0, red: 0 }
    } else if (round.value === 'secret') {
      round.value = 'final'
    }
  } else if (switchTurnImmediately) {
    toggleTurn()
  }
}
import { onMounted } from 'vue'
const canvasRef = ref(null)
let ctx = null
let drawing = false
onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#1e40af' // أزرق غامق
  }
})
function getPos(e) {
  const rect = canvasRef.value.getBoundingClientRect()
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    }
  }
  return { x: e.clientX - rect.left, y: e.clientY - rect.top }
}
function startDraw(e) {
  drawing = true
  ctx.beginPath()
  const { x, y } = getPos(e)
  ctx.moveTo(x, y)
}
function draw(e) {
  if (!drawing) return
  const { x, y } = getPos(e)
  ctx.lineTo(x, y)
  ctx.stroke()
}
function endDraw() {
  drawing = false
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}
function saveCanvas() {
  const url = canvasRef.value.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = 'drawing.png'
  a.click()
}
function awardForDrawing(type) {
  const owner = activeTeam.value
  const opponent = owner === 'blue' ? 'red' : 'blue'
  if (type === 'self') {
    adjustScore(owner, 60)
    showToast(`✅ ${teams.value[owner].name} +60`)
    nextQuestionAfter(owner, true)
    return
  }
  if (type === 'steal_during') {
    adjustScore(opponent, 27)
    showToast(`⚡ ${teams.value[opponent].name} +27 (خطف أثناء الوقت)`)
    nextQuestionAfter(owner, false, true)
    return
  }
  if (type === 'steal_after') {
    adjustScore(opponent, 15)
    showToast(`⌛ ${teams.value[opponent].name} +15 (بعد الوقت)`)
    nextQuestionAfter(owner, false, true)
    return
  }
}
const secretWords = ref([
  { word: "كرة القدم", hints: ["رياضة", "شعبية", "ملعب", "11 لاعب"] },
  { word: "البيتزا", hints: ["طعام", "إيطاليا", "دائري", "جبن"] },
  { word: "الهاتف", hints: ["اتصال", "ذكي", "شاشة", "تطبيقات"] },
])
const currentSecret = ref(null)
const secretPoints = ref(60)
function drawSecretWord() {
  currentSecret.value = secretWords.value[Math.floor(Math.random() * secretWords.value.length)]
  secretPoints.value = 60
  timeLeft.value = 15
  stopTimer() // تأكد إن المؤقت الأساسي واقف
}
const secretPointsTable = [60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0]
function startSecretTimer() {
  if (!currentSecret.value) return
  isTiming.value = true
  timeLeft.value = 15
  secretPoints.value = 60
  let tick = 0
  timerInterval.value = setInterval(() => {
    timeLeft.value--
    tick++
    secretPoints.value = secretPointsTable[tick] ?? 0
    if (timeLeft.value <= 0) {
      stopSecretTimer()
      showToast("⌛ انتهى الوقت! 0 نقطة")
    }
  }, 1000)
}
function stopSecretTimer() {
  isTiming.value = false
  clearInterval(timerInterval.value)
}
function confirmSecretAnswer(correct) {
  const owner = activeTeam.value
  if (correct) {
    adjustScore(owner, secretPoints.value)
    showToast(`✅ ${teams.value[owner].name} حصل على ${secretPoints.value} نقطة!`)
  } else {
    showToast(`❌ ${teams.value[owner].name} لم ينجح!`)
  }
  stopSecretTimer()
  nextQuestionAfter(owner, correct)
}
const finalQuestions = ref([
  { question: "ما هي عاصمة اليابان؟", answer: "طوكيو" },
  { question: "كم عدد قارات العالم؟", answer: "7" },
  { question: "من هو مكتشف قانون الجاذبية؟", answer: "نيوتن" },
])
const currentFinalQ = ref(null)
const finalPoints = ref(60)
function drawFinalQ() {
  currentFinalQ.value = finalQuestions.value[Math.floor(Math.random() * finalQuestions.value.length)]
  finalPoints.value = 60
  timeLeft.value = 15
  stopTimer()
}
const finalPointsTable = [60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0]
function startFinalTimer() {
  if (!currentFinalQ.value) return
  isTiming.value = true
  timeLeft.value = 15
  finalPoints.value = 60
  let tick = 0
  timerInterval.value = setInterval(() => {
    timeLeft.value--
    tick++
    finalPoints.value = finalPointsTable[tick] ?? 0
    if (timeLeft.value <= 0) {
      stopFinalTimer()
      showToast("⌛ انتهى الوقت! 0 نقطة")
    }
  }, 1000)
}
function stopFinalTimer() {
  isTiming.value = false
  clearInterval(timerInterval.value)
}
const showFinalAnswer = ref(false)
function finalAnswer(correct) {
  const owner = activeTeam.value
  if (correct) {
    adjustScore(owner, finalPoints.value)
    showToast(`✅ ${teams.value[owner].name} حصل على ${finalPoints.value} نقطة!`)
    showFinalAnswer.value = false
  } else {
    showToast(`❌ ${teams.value[owner].name} لم ينجح!`)
    showFinalAnswer.value = true
  }
  stopFinalTimer()
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>