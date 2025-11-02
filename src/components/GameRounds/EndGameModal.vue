<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-11/12 sm:w-96 text-center">
      <h3 class="text-2xl font-bold mb-4">{{ $t('gameOver') }}</h3>
      <p class="mb-6">{{ $t('finalScores') }}</p>
      <button @click="$emit('close')" class="bg-indigo-600 text-white px-4 py-2 rounded-lg">{{ $t('close') }}</button>
    </div>
  </div>
</template>
<script setup>
defineEmits(['close']);
</script>
