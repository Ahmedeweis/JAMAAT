<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 mb-6" v-if="selectedRound === 1">
      <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
        <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">{{ $t('team') }} {{ team1 }}</h3>
        <div class="space-y-2">
          <template v-if="questions.length >= 1">
            <button v-for="(question, qIndex) in questions.slice(0,4)" :key="qIndex" @click="$emit('select-question', question, 1)"
              :disabled="answeredQuestions.includes(question.id) || currentTeam !== 1"
              :class="[
                'w-full py-2 rounded-lg shadow-sm transition border font-bold',
                answeredQuestions.includes(question.id) ? 'bg-[#24054D] text-white cursor-default' : currentTeam !== 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB] cursor-pointer'
              ]">
              {{ $t("showQuestion") }}
            </button>
          </template>
          <template v-else>
            <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">{{ $t("noQuestions") }}</div>
          </template>
        </div>
      </div>
      <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
        <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">{{ $t('team') }} {{ team2 }}</h3>
        <div class="space-y-2">
          <template v-if="questions.length >= 1">
            <button v-for="(question, qIndex) in questions.slice(4,8)" :key="qIndex" @click="$emit('select-question', question, 2)"
              :disabled="answeredQuestions.includes(question.id) || currentTeam !== 2"
              :class="[
                'w-full py-2 rounded-lg shadow-sm transition border font-bold',
                answeredQuestions.includes(question.id) ? 'bg-[#24054D] text-white cursor-default' : currentTeam !== 2 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB] cursor-pointer'
              ]">
              {{ $t("showQuestion") }}
            </button>
          </template>
          <template v-else>
            <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">{{ $t("noQuestions") }}</div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="selectedRound === 2" class="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 mb-6">
      <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
        <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">فريق {{ team1 }} (رسم)</h3>
        <div class="space-y-2">
          <template v-if="questionsRound2.length >= 4">
            <button v-for="(question, qIndex) in questionsRound2.slice(0,4)" :key="qIndex" @click="$emit('select-question', question, 1)"
              :disabled="answeredQuestionsRound2.includes(question.id) || currentTeam !== 1"
              :class="[
                'w-full py-2 rounded-lg shadow-sm transition border font-bold',
                answeredQuestionsRound2.includes(question.id) ? 'bg-[#24054D] text-white cursor-default' : currentTeam !== 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB] cursor-pointer'
              ]">
              {{ $t("showQuestion") }}
            </button>
          </template>
          <template v-else>
            <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">{{ $t("noQuestions") }}</div>
          </template>
        </div>
      </div>
      <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
        <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">فريق {{ team2 }} (رسم)</h3>
        <div class="space-y-2">
          <template v-if="questionsRound2.length >= 8">
            <button v-for="(question, qIndex) in questionsRound2.slice(4,8)" :key="qIndex" @click="$emit('select-question', question, 2)"
              :disabled="answeredQuestionsRound2.includes(question.id) || currentTeam !== 2"
              :class="[
                'w-full py-2 rounded-lg shadow-sm transition border font-bold',
                answeredQuestionsRound2.includes(question.id) ? 'bg-[#24054D] text-white cursor-default' : currentTeam !== 2 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB] cursor-pointer'
              ]">
              {{ $t("showQuestion") }}
            </button>
          </template>
          <template v-else>
            <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">{{ $t("noQuestions") }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  selectedRound: { type: Number, default: 1 },
  questions: { type: Array, default: () => [] },
  questionsRound2: { type: Array, default: () => [] },
  answeredQuestions: { type: Array, default: () => [] },
  answeredQuestionsRound2: { type: Array, default: () => [] },
  currentTeam: { type: Number, default: 1 },
  team1: { type: String, default: 'الفريق الأول' },
  team2: { type: String, default: 'الفريق الثاني' }
});
defineEmits(['select-question']);
</script>
