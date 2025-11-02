<template>
  <div class="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 mb-6">
    <div class="bg-white rounded-lg p-4 shadow-md w-full sm:w-[30%]">
      <h3 class="text-lg font-semibold mb-2 text-center text-[#24054D]">{{ $t('sharedQuestions') }}</h3>
      <div class="space-y-2">
        <template v-if="questions.length > 0">
          <button v-for="(question, index) in questions" :key="question.id || index" @click="$emit('select-question-3', question)"
            :class="[
              'w-full py-2 rounded-lg shadow-sm transition border font-bold cursor-pointer',
              answeredQuestions.includes(question.id) ? 'bg-[#24054D] text-white cursor-not-allowed' : currentQuestionId === question.id ? 'bg-[#24054D] text-white' : 'bg-[#FCFAFF] text-[#B984FF] border-[#ECE1FB]'
            ]">
            {{ $t('showQuestion') }}
          </button>
        </template>
        <template v-else>
          <div class="w-full py-2 rounded-lg shadow-sm border text-center text-sm italic text-gray-400 bg-[#F9F9F9]">{{ $t('noQuestions') }}</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  questions: { type: Array, default: () => [] },
  answeredQuestions: { type: Array, default: () => [] },
  currentQuestionId: { type: [Number,String,null], default: null }
});
defineEmits(['select-question-3']);
</script>
