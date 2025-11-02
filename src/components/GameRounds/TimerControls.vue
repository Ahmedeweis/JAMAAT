<template>
  <div class="flex items-center justify-center mb-4 gap-4">
    <span class="text-xl font-bold text-red-600">{{ formatted }}</span>
    <button @click="$emit('toggle-pause')" class="bg-gray-200 hover:bg-gray-300 rounded-full p-2 cursor-pointer flex items-center justify-center shadow-md">
      <img :src="isPaused ? playIcon : pauseIcon" class="w-6 h-6" />
    </button>
  </div>
</template>
<script setup>
import playIcon from '../../../assets/imgs/play.png';
import pauseIcon from '../../../assets/imgs/pause.svg';
const props = defineProps({
  formatted: { type: String, required: true },
  isPaused: { type: Boolean, default: false }
});
defineEmits(['toggle-pause']);
</script>
