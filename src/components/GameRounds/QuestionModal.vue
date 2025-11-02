<template>
  <div :class="['fixed inset-0 bg-black/50 flex justify-center z-50 px-2 sm:px-4 py-6 overflow-y-auto', selectedRound === 2 ? 'items-start' : 'items-center']">
    <div class="bg-white rounded-[20px] shadow-lg relative w-full min-h-[400px] sm:w-[90%] max-w-[1100px] p-6 sm:p-8 flex flex-col-reverse lg:flex-row gap-6 border-[4px] border-[#D6B4FF]" :dir="currentLang === 'ar' ? 'ltr' : 'rtl'">
      <button @click="$emit('close')" class="absolute top-4 left-4 cursor-pointer bg-[#FFE4E4] hover:bg-[#ffcccc] text-[#FF4B4B] w-10 h-10 rounded-full flex items-center justify-center shadow-md">✕</button>
      <div class="flex-1 text-center">
        <slot name="body"/>
      </div>
      <aside class="w-full lg:w-[200px] bg-[#F9F5FF] rounded-[20px] p-4 flex flex-col justify-start gap-4">
        <div class="bg-[#000000] text-white text-center rounded-lg py-2 font-bold">{{ currentTeamName }}</div>
        <div>
          <button v-if="showDouble" @click="$emit('toggle-double')" :class="['w-full py-2 rounded-lg font-bold', doublePoints ? 'bg-purple-600 text-white' : 'bg-[#F5E7FF] text-[#8B3DFF]']">
            {{ $t('doublePoints') }}
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  currentLang: { type: String, default: 'ar' },
  currentTeamName: { type: String, default: '' },
  selectedRound: { type: Number, default: 1 },
  doublePoints: { type: Boolean, default: false },
  showDouble: { type: Boolean, default: false }
});
defineEmits(['close','toggle-double']);
</script>
