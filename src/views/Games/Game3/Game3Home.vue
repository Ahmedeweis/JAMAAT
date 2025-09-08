<template>
      <div style=" display: flex ; flex-direction: column; justify-content: space-between; " class="  min-h-screen bg-cover bg-center text-white font-arabic p-4" dir="rtl"
  :style="`background-image: url(${bg});`">
    <!-- Top Navigation Bar -->
<div>
    <nav style="font-family: 'Kufam', 'sans-serif';" class="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-3xl bg-white text-black p-4 shadow-md gap-3 sm:gap-0">
  <!-- زر دور الفريق -->
<button
  @click="toggleTeam"
  :disabled="selectedRound === 3"
  :class="[
    'relative w-full sm:w-1/4 px-4 py-2 sm:py-3 rounded-full flex items-center justify-center sm:justify-start',
    selectedRound === 3
      ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed'
      : 'bg-[#ECE1FB] border-2 border-[#3F0092] text-[#24054D] font-bold cursor-pointer'
  ]"
>
  <span class="text-sm sm:text-base font-bold">
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
              <h2 class="font-bold text-xl">الجولة الحالية  </h2>
<!-- الجولة 1 -->
<button
v-if="selectedRound == 1  "
  :disabled="selectedRound !== 1"
  :class="[
    'px-3 py-2 rounded-lg text-xl font-semibold',
    selectedRound === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
  ]"
>
  بدون كلام
</button>
<!-- الجولة 2 -->
<button
v-if="selectedRound == 2"
  :disabled="!round1Completed"
  :class="[
   'px-3 py-2 rounded-lg text-xl font-semibold',
    selectedRound === 2 ? 'bg-indigo-600 text-white'
      : !round1Completed ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-green-500 text-white animate-bounce'
  ]"
>
  تحدّي الرسم
</button>
<!-- الجولة 3 -->
<button
v-if="selectedRound == 3"
  :disabled="!round2Completed"
  :class="[
    'px-3 py-2 rounded-lg text-xl font-semibold',
    selectedRound === 3 ? 'bg-indigo-600 text-white'
      : !round2Completed ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-green-500 text-white animate-bounce'
  ]"
>
  كلمة السر
</button>
          <div class="ms-auto flex items-center gap-2">
          </div>
        </div>
</div>
</div>
<div v-if="selectedRound === 3" class="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 mb-6">
  <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
    <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">
      الأسئلة المشتركة
    </h3>
    <div class="space-y-2">
      <!-- إذا فيه أسئلة -->
      <template v-if="questionsRound3.length > 0">
<button
  v-for="(question, index) in questionsRound3"
  :key="question.id || index"
  @click="selectQuestion3(question)"
  :class="[
    'w-full py-2 rounded-lg shadow-sm transition border font-bold cursor-pointer',
    answeredQuestionsRound3.includes(question.id)
      ? 'bg-[#24054D] text-white cursor-not-allowed'  // سؤال تم الإجابة عليه
      : currentQuestion3?.id === question.id
        ? 'bg-[#24054D] text-white'  // السؤال الحالي
        : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB]' // باقي الأسئلة
  ]"
>
  أظهر السؤال
</button>
      </template>
      <!-- إذا ما فيهش أسئلة -->
      <template v-else>
        <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">
          لا توجد أسئلة
        </div>
      </template>
    </div>
  </div>
</div>
   <!-- Modal 2 -->
<div>
<div
v-if="showModal2"
  :class="[
    'fixed inset-0 bg-black/50 flex justify-center z-50 px-2 sm:px-4 py-6 overflow-y-auto',
    selectedRound === 3 ? 'items-start' : 'items-center'
  ]"
>
  <div
    class="bg-white rounded-[20px] shadow-lg relative w-full min-h-[400px] sm:w-[90%] max-w-[1100px] p-6 sm:p-8 flex flex-col-reverse lg:flex-row gap-6 border-[4px] border-[#D6B4FF]"
    :dir="currentLang === 'ar' ? 'ltr' : 'rtl'"
  >
    <!-- زر الإغلاق -->
<button
  @click="showModal2 = false; timor = 15; showTimor = false; switchCount = 0; team1Inputs = Array(12).fill(''); team2Inputs = Array(12).fill(''); currentPoints = pointsSteps[0]; isReady3 = false; showAnswer3 = false; questionRevealed3 = false"
  class="absolute top-4 left-4 cursor-pointer bg-[#FFE4E4] hover:bg-[#ffcccc] text-[#FF4B4B] w-10 h-10 rounded-full flex items-center justify-center shadow-md"
>
  ✕
</button>
    <!-- الجانب الأيسر -->
<!-- داخل المودال -->
<div class="flex-1 text-center w-full " >
  <!-- لو السؤال لسه ما اتكشفش -->
<div v-if="!questionRevealed3" class="flex flex-col justify-center items-center h-full">
    <div class="p-6">
    <h1 class="text-xl font-bold mb-4">أمسح QR Code لعرض الصورة</h1>
    <img v-if="qrCodeData" :src="qrCodeData" alt="QR Code" />
  </div>
    <button
      @click="questionRevealed3 = true"
      class="bg-[#24B758] cursor-pointer hover:bg-green-700 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition">
      أظهر السؤال
    </button>
  </div>
  <!-- لو السؤال اتكشف -->
<div v-else>
  <h2 class="text-2xl font-bold text-[#24054D] mb-6">
    <!-- {{ currentQuestion3?.question_text || $t("noTitle") }} -->
  </h2>
        <div class="media-container mx-auto mb-6">
          <!-- صورة -->
          <img v-if="currentQuestion?.question_image" :src="getMediaUrl(currentQuestion)"
            :alt="$t('questionImage')" class="mx-auto max-h-[150px] rounded-md" />
          <!-- Placeholder -->
          <img v-else :src="placeholderImg" :alt="$t('noMedia')" class="mx-auto max-h-[150px] rounded-md" />
        </div>
<!-- زر جاهز / أظهر الإجابة / تقييم الإجابة -->
<div class="flex justify-center flex-col items-center w-full">
  <!-- زر جاهز -->
  <button
    v-if="!isReady3 && !awaitingValidation3"
    @click="handleReady3"
    class="bg-indigo-600 cursor-pointer hover:bg-indigo-800 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition">
    جاهز ؟
  </button>
  <!-- زر أظهر الإجابة -->
  <button
    v-else-if="isReady3 && !awaitingValidation3"
    @click="handleReveal3"
    class="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition">
    أظهر الإجابة
  </button>
<div v-if="isReady3" class="flex flex-col gap-6 p-4 relative bg-gray-50 w-full rounded-lg">
  <!-- شريط المؤقت والنقاط -->
  <div
    v-if="showTimor"
    class="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white shadow-xl rounded-xl p-4 border-2 border-purple-600 animate-fadeIn w-[90%] max-w-md"
  >
    <!-- المؤقت -->
    <div class="flex items-center gap-2">
      <span class="text-2xl font-extrabold text-red-600 animate-pulse">{{ timor }}s</span>
      <svg class="w-6 h-6 text-red-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke-width="4" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-width="4" stroke-linecap="round"/>
      </svg>
    </div>
    <!-- النقاط -->
    <div class="text-center sm:text-left">
      <p class="text-purple-700 font-semibold text-lg">نقاط: {{ currentPoints }}</p>
    </div>
    <!-- أزرار التحكم -->
    <div class="flex gap-2 sm:gap-4">
      <button
        @click="markCorrect"
        class="bg-green-600 hover:bg-green-700  cursor-pointer text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1"
      >
        إجابة صحيحة
      </button>
      <button
        @click="switchTeam"
        class="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1"
      >
        تبديل الفريق
      </button>
    </div>
  </div>
  <!-- الفرق -->
  <div class="flex flex-col lg:flex-row gap-6">
    <!-- الفريق الثاني -->
    <div class="flex-1 bg-white rounded-lg p-6 shadow-md">
      <h3 class="text-lg font-semibold text-center text-purple-900 mb-4">الفريق الثاني</h3>
      <!-- النقاط الحالية -->
      <!-- <div v-if="currentTeamIndex === 2" class="text-center text-2xl font-bold text-purple-900 mb-4">
        {{ currentPoints }}
      </div> -->
      <!-- الإدخالات -->
      <div class="flex flex-wrap gap-2 justify-start">
        <input
          v-for="(input, idx) in team2Inputs.slice(0, switchCount)"
          :key="idx"
          v-if="input !== ''"
          v-model="team2Inputs[idx]"
          readonly
          class="p-2 border rounded w-[100px]  bg-gray-600 text-white  cursor-not-allowed text-center"
          placeholder="X"
        />
        <div class="flex justify-center items-center">
                                          <button
          v-if="currentTeamIndex === 2"
          @click="submitTeam2"
          class="bg-purple-600 text-white  cursor-pointer px-4 w-[100px] py-2 rounded-lg hover:bg-purple-700 shadow-md transition"
        >
          أرسل
        </button>
        <input
          v-if="currentTeamIndex === 2"
          v-model="team2Inputs[switchCount]"
          class="p-2 border rounded w-[100px] bg-amber-300 text-black  text-center ml-3"
          placeholder="أدخل الإجابة"
        />
        </div>
      </div>
    </div>
        <!-- الفريق الأول -->
    <div class="flex-1  bg-white rounded-lg p-6 shadow-md">
      <h3 class="text-lg font-semibold text-center text-purple-900 mb-4">الفريق الأول</h3>
      <!-- النقاط الحالية -->
      <!-- <div v-if="currentTeamIndex === 1" class="text-center text-2xl font-bold text-purple-900 mb-4">
        {{ currentPoints }}
      </div> -->
      <!-- الإدخالات -->
      <div class="flex flex-wrap gap-2 justify-start">
        <input
          v-for="(input, idx) in team1Inputs.slice(0, switchCount)"
          :key="idx"
          v-if="input !== ''"
          v-model="team1Inputs[idx]"
          readonly
          class="p-2 border rounded w-[100px]  bg-gray-600 text-white  cursor-not-allowed text-center"
          placeholder="X"
        />
<div class="flex justify-center items-center">
                                  <button
          v-if="currentTeamIndex === 1"
          @click="submitTeam1"
          class="bg-purple-600 text-white px-4 w-[100px]  cursor-pointer py-2 rounded-lg hover:bg-purple-700 shadow-md transition"
        >
          أرسل
        </button>
        <input
          v-if="currentTeamIndex === 1"
          v-model="team1Inputs[switchCount]"
          class="p-2 border rounded w-[100px] bg-amber-300 text-black text-center ml-3"
          placeholder="أدخل الإجابة"
        />
</div>
      </div>
    </div>
  </div>
</div>
  <!-- الإجابة -->
  <div v-if="showAnswer3" class="mt-4 p-4 bg-green-100 text-green-800 rounded-lg font-bold">
    {{ currentQuestion3?.correct_answer || 'لا توجد إجابة' }}
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
  </div>
</div>
    <!-- Questions Grid -->
<!-- الأعمدة للجولة الأولى -->
<div v-if="selectedRound === 1" class="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 mb-6">
  <!-- عمود الفريق الأول -->
  <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
    <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">
      فريق {{ team1Name }}
    </h3>
    <div class="space-y-2">
      <template v-if="questions.length >= 1">
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
      <template v-if="questions.length >= 1">
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
<div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2 gap-1">
  <button
    @click="score1 += 10"
    class="bg-[#6B21A8] font-bold cursor-pointer w-10 h-8 rounded-lg text-white text-sm">
    +10
  </button>
    <button
    @click="score1++"
    class="bg-[#9747FF] font-bold cursor-pointer w-10 h-8 rounded-lg text-white text-sm">
    +1
  </button>
  <span style="color: #24054C;" class="text-center w-12 bg-transparent font-bold">
    {{ score1 }}
  </span>
  <button
    @click="score1 = Math.max(0, score1 - 1)"
    class=" bg-red-600 cursor-pointer w-10 h-8 rounded-lg text-white text-sm ">
    -1
  </button>
  <button
    @click="score1 = Math.max(0, score1 - 10)"
    class="bg-red-600 cursor-pointer w-10 h-8 rounded-lg text-white text-sm ">
    -10
  </button>
</div>
    </div>
  </div>
  <!-- اللوجو -->
  <img src="../../../assets/imgs/JAMAAT.svg" alt="Logo" class="mb-2 sm:mb-4 w-20 sm:w-auto" />
  <!-- نقاط الفريق الثاني -->
  <div class="text-center w-full sm:w-auto">
    <h3 class="text-base sm:text-lg font-semibold mb-2"> {{ $t("team2Points3") }}   {{ team2Name }} </h3>
    <div class="flex items-center gap-2 rounded-lg p-2 justify-center">
<div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2 gap-1">
  <button
    @click="score2 += 10"
    class="bg-[#6B21A8] font-bold cursor-pointer w-10 h-8 rounded-lg text-white text-sm">
    +10
  </button>
    <button
    @click="score2++"
    class="bg-[#9747FF] font-bold cursor-pointer w-10 h-8 rounded-lg text-white text-sm">
    +1
  </button>
  <span style="color: #24054C;" class="text-center w-12 bg-transparent font-bold">
    {{ score2 }}
  </span>
  <button
    @click="score2 = Math.max(0, score2 - 1)"
    class="bg-red-600 cursor-pointer w-10 h-8 rounded-lg text-white text-sm ">
    -1
  </button>
  <button
    @click="score2 = Math.max(0, score2 - 10)"
    class="bg-red-600 cursor-pointer w-10 h-8 rounded-lg text-white text-sm ">
    -10
  </button>
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
<div v-if="!questionRevealed" class="flex flex-col justify-center items-center h-full text-center px-4">
  <h2 class="text-xl sm:text-2xl font-semibold text-[#24054D] mb-4 leading-relaxed">
    جهّز هاتف آخر لمسح الباركود<br />
    ثم اضغط على <span class="font-bold text-green-600">أظهر السؤال</span>
  </h2>
  <img :src="scan" alt="scan" class="h-64 w-64 mb-6 rounded-lg shadow-md" />
  <button
    @click="questionRevealed = true"
    class="bg-[#24B758] hover:bg-green-700 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
  >
    أظهر السؤال
  </button>
</div>
  <!-- لو السؤال اتكشف -->
<div v-else>
  <h2 class="text-2xl font-bold text-[#24054D] mb-6">
    <!-- {{ currentQuestion?.question_text || $t("noTitle") }} -->
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
               <div class="p-6 text-center flex flex-col justify-center items-center">
    <h1 class="text-xl font-bold mb-4">أمسح الصورة لعرض QR Code</h1>
    <img v-if="qrCodeData" :src="qrCodeData" alt="QR Code" />
  </div>
          <!-- صورة -->
          <!-- <img v-if="currentQuestion?.question_image" :src="getMediaUrl(currentQuestion)"
            :alt="$t('questionImage')" class="mx-auto max-h-[150px] rounded-md" /> -->
          <!-- Placeholder -->
          <!-- <img v-else :src="placeholderImg" :alt="$t('noMedia')" class="mx-auto max-h-[150px] rounded-md" /> -->
        </div>
<DrowBoard v-if="selectedRound === 2 && showDrawingBoard" />
<!-- زر جاهز / أظهر الإجابة / تقييم الإجابة -->
<div class="flex justify-center flex-col items-center ">
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
<!-- ---------- -->
</template>
<script setup>
/* -------------------- 1. الإستيراد -------------------- */
import { ref, onMounted ,watch ,computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import data from './sports-category.json';
import playIcon from '../../../assets/imgs/play.png';
import scan from '../../../assets/imgs/scan.png';
import pauseIcon from '../../../assets/imgs/pause.svg';
import bg from '../../../assets/imgs/splash.png';
import placeholderImg from '../../../assets/imgs/upload.png';
import { useToast } from "vue-toastification"
import DrowBoard from '../../../components/DrowBoard.vue';
import { getCategoryById } from '../../../services/categoryService';
import QRCode from 'qrcode';
const qrCodeData = ref('');
onMounted(async () => {
  const imageUrl = 'https://game-wise.smartleadtech.com/images/questions/1757344336.jpg';
  try {
    qrCodeData.value = await QRCode.toDataURL(imageUrl);
  } catch (err) {
    console.error('خطأ في توليد QR code:', err);
  }
});
/* ----------------  Round 3 ----------------------  */
const changer = ref(false);
// بيانات الفريقين
const team1Inputs = ref(Array(12).fill(''));
const team2Inputs = ref(Array(12).fill(''));
const pointsSteps = [60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5,0];
const switchCount = ref(0);
const currentTeamIndex = ref(1); // الفريق الحالي (1 أو 2)
const showTimor = ref(false);
const timor = ref(15);
const currentPoints = ref(60); // مهم جدا
let timerInterval = null;
// دالة بدء المؤقت
const startTimor = (points) => {
  showTimor.value = true;
  currentPoints.value = points;
  timor.value = 15;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timor.value > 0 && currentPoints.value > 0) { // شرط جديد
      timor.value--;
    } else {
      clearInterval(timerInterval);
      // الوقت انتهى أو النقاط وصلت 0 → بدّل الفريق أو انهي السؤال
      if (currentPoints.value <= 0) {
        endQuestion3(); // ننهي السؤال فورًا
      } else {
        switchTeam();
      }
    }
  }, 1000);
};
// إرسال الفريق الأول
const submitTeam1 = () => {
  startTimor(currentPoints.value);
};
const submitTeam2 = () => {
  startTimor(currentPoints.value);
};
// دالة لإنهاء السؤال وإعادة كل شيء للديفولت
const endQuestion3 = () => {
  timor.value = 15;
  showTimor.value = false;
  switchCount.value = 0;
  team1Inputs.value = Array(12).fill('');
  team2Inputs.value = Array(12).fill('');
  currentPoints.value = pointsSteps[0];
  isReady3.value = false;
  showAnswer3.value = false;
  questionRevealed3.value = false;
  showModal2.value = false;
  // يمكن إضافة أي عمليات إضافية عند انتهاء السؤال
  toast.info('انتهى السؤال ');
};
// تعديل switchTeam لتتحقق من النقاط
const switchTeam = () => {
  switchCount.value++;
  if (switchCount.value >= pointsSteps.length) {
    endQuestion3();
    return;
  }
  currentPoints.value = pointsSteps[switchCount.value];
  currentTeamIndex.value = currentTeamIndex.value === 1 ? 2 : 1;
  timor.value = 15;
  showTimor.value = false;
};
const currentQuestion3 = ref(null);
const questionsRound3 = ref([]);
const qrCodes = ref({}); // { [questionId]: qrCodeData }
const answeredQuestionsRound3 = ref([]);
const questionRevealed3 = ref(false);
const showModal2 = ref(false);
const isReady3 = ref(false);
const awaitingValidation3 = ref(false);
const showAnswer3 = ref(false);
const selectQuestion3 = async (question) => {
  if (!answeredQuestionsRound3.value.includes(question.id)) {
    answeredQuestionsRound3.value.push(question.id);
    currentQuestion3.value = question;
    questionRevealed3.value = false;
    isReady3.value = false;
    awaitingValidation3.value = false;
    showAnswer3.value = false;
    showTimor.value = false;
    timor.value = 15;
    currentPoints.value = pointsSteps[0];
    team1Inputs.value = Array(12).fill('');
    team2Inputs.value = Array(12).fill('');
    switchCount.value = 0;
    showModal2.value = true;
    try {
      qrCodeData.value = await QRCode.toDataURL(getMediaUrl(question)); // توليد QR للصورة الخاصة بالسؤال
    } catch (err) {
      console.error('خطأ في توليد QR code:', err);
    }
  }
};
const handleReady3 = () => {
  isReady3.value = true;
};
const handleReveal3 = () => {
  showAnswer3.value = true;
  awaitingValidation3.value = false;
};
const markCorrect = () => {
  if (!currentQuestion3.value) return;
  const points = currentPoints.value || 0;
  // إضافة النقاط للفريق الحالي
  if (currentTeamIndex.value === 1) {
    score1.value += points;
  } else {
    score2.value += points;
  }
  toast.success(`تم إضافة ${points} نقطة للفريق ${currentTeamIndex.value === 1 ? team1Name.value : team2Name.value}`);
  // أعد ضبط القيم قبل تبديل الفريق
  timor.value = 15;
  showTimor.value = false;
  switchCount.value = 0;
  team1Inputs.value = Array(12).fill('');
  team2Inputs.value = Array(12).fill('');
  currentPoints.value = pointsSteps[0];
  isReady3.value = false;
  showAnswer3.value = false;
  questionRevealed3.value = false;
  // بدل الفريق تلقائيًا
  currentTeamIndex.value = currentTeamIndex.value === 1 ? 2 : 1;
  // ابقي المودال مفتوحًا للفريق التالي
  showModal2.value = false;
};
/*  -------------------- Round 3 ------------------------- */
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
const answeredQuestions = ref([]);
const answeredQuestionsRound2 = ref([]);
import { getCategories } from '../../../services/categoryService';
const loadQuestions = async (categoryId, currentLang) => {
  try {
    const res = await getCategories({ game: 2 }, currentLang);
    const categoriesData = res?.data?.result?.data || res?.data?.data;
    if (!categoriesData) {
      console.error("No categories data received from API");
      return;
    }
    const category = categoriesData.find(cat => cat.id === categoryId);
    if (!category || !category.questions) {
      console.error("No questions found for this category");
      return;
    }
    const all = category.questions.map(q => ({
      id: q.id,
      title: q.title,
      question_text: q.question_text,
      question_image: q.question_image,
      question_video: q.question_video,
      question_audio: q.question_audio,
      correct_answer: q.correct_answer,
      points: q.points
    }));
    // slice مع التحقق من عدد الأسئلة المتوفرة
    questions.value = all.slice(0, Math.min(8, all.length));
    questionsRound2.value = all.slice(8, Math.min(16, all.length));
    questionsRound3.value = all.slice(16); // لو ما فيش حاجه هتكون فاضية تلقائياً
  } catch (error) {
    console.error("Error loading questions from API:", error);
  }
};
/*------------------------------------------*/
/* -------------------- 5. عرض السؤال والإجابة -------------------- */
const showModal = ref(false);
const currentQuestion = ref(null);
const showAnswer = ref(false);
const answerResult = ref(null);
const selectedQuestion = ref(null);
const selectedColumn = ref(null);
const doublePoints = ref(false);
const blockPoints = ref(false);
const currentLang = ref('ar');
const selectQuestion = async (question, column) => {
  if (selectedRound.value === 1) {
    if (!answeredQuestions.value.includes(question.id)) {
      selectedQuestion.value = question.points;
      selectedColumn.value = column;
      currentQuestion.value = question;
      showModal.value = true;
      doublePoints.value = false;
      blockPoints.value = false;
      questionRevealed.value = false;
      // توليد QR ديناميكي للصورة أو الرابط الخاص بالسؤال
      try {
        qrCodeData.value = await QRCode.toDataURL(getMediaUrl(question));
      } catch (err) {
        console.error('خطأ في توليد QR code:', err);
      }
    }
  } else if (selectedRound.value === 2) {
    if (!answeredQuestionsRound2.value.includes(question.id)) {
      answeredQuestionsRound2.value.push(question.id);
      selectedQuestion.value = question.points;
      selectedColumn.value = column;
      currentQuestion.value = question;
      showModal.value = true;
      doublePoints.value = false;
      blockPoints.value = false;
      questionRevealed.value = false;
      try {
        qrCodeData.value = await QRCode.toDataURL(getMediaUrl(question));
      } catch (err) {
        console.error('خطأ في توليد QR code:', err);
      }
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
        answeredQuestions.value.push(currentQuestion.value.id);
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
          answeredQuestions.value.push(currentQuestion.value.id);
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
  const baseUrl = 'https://game-wise.smartleadtech.com/';
  if (question.question_image) return baseUrl + question.question_image;
  if (question.question_video) return baseUrl + question.question_video;
  if (question.question_audio) return baseUrl + question.question_audio;
  return '';
};
const revealAnswer = () => {
  showAnswer.value = true;
  answerResult.value = null;
  clearInterval(countdownInterval);
};
const confirmAnswer = (isCorrect) => {
      answeredQuestions.value.push(currentQuestion.value.id);
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
const team1Name = ref(localStorage.getItem("team1Name") || "الفريق الأول")
const team2Name = ref(localStorage.getItem("team2Name") || "الفريق الثاني")
});
onMounted(() => {
  const categoryId = categories[0] || 1; // الكاتيجوري الافتراضي أو من الـ query
  loadQuestions(categoryId);
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
    toast.success("✅ أحسنت! الانتقال للجولة الثانية...", {
      timeout: 3000,
      position: "top-center",
    })
    selectedRound.value = 2
  }
})
const round2Completed = computed(() => {
  return answeredQuestionsRound2.value.length >= questionsRound2.value.length;
});
watch(round2Completed, (completed) => {
  if (completed) {
    toast.success("✅ أحسنت! اضغط على 'كلمة السر' للانتقال للجولة الثالثة", {
      timeout: 4000,
      position: "top-center",
    });
  }
});
const round3Completed  = ref(true);
watch(round1Completed, (val) => {
  if (val) selectedRound.value = 2
})
watch(round2Completed, (val) => {
  if (val) selectedRound.value = 3
})
watch(round3Completed, (val) => {
  if (val) {
    showEndGameModal.value = true
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