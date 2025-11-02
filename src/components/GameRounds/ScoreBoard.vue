<template>
  <div class="flex flex-col items-center gap-4 mt-4">
    <div class="flex flex-col sm:flex-row justify-between w-full mb-4 items-center sm:items-end gap-4 sm:gap-0">
      <div class="text-center w-full sm:w-auto">
        <h3 class="text-base sm:text-lg font-semibold mb-2">{{ $t("team2Points3") }} {{ team1 }}</h3>
        <div class="flex items-center gap-2 rounded-lg p-2 justify-center">
          <div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2 gap-1">
            <button @click="$emit('inc1')" class="bg-[#6B21A8] font-bold cursor-pointer w-10 h-8 rounded-lg text-white text-sm">+10</button>
            <button @click="$emit('inc1small')" class="bg-[#9747FF] font-bold cursor-pointer w-10 h-8 rounded-lg text-white text-sm">+1</button>
            <span style="color: #24054C;" class="text-center w-12 bg-transparent font-bold">{{ score1 }}</span>
            <button @click="$emit('dec1small')" class="bg-red-600 cursor-pointer w-10 h-8 rounded-lg text-white text-sm">-1</button>
            <button @click="$emit('dec1')" class="bg-red-600 cursor-pointer w-10 h-8 rounded-lg text-white text-sm">-10</button>
          </div>
        </div>
      </div>
      <img src="../../assets/imgs/JAMAAT.svg" alt="Logo" class="mb-2 sm:mb-4 w-20 sm:w-auto" />
      <div class="text-center w-full sm:w-auto">
        <h3 class="text-base sm:text-lg font-semibold mb-2">{{ $t("team2Points3") }} {{ team2 }}</h3>
        <div class="flex items-center gap-2 rounded-lg p-2 justify-center">
          <div class="flex items-center justify-center bg-[#ECE1FB] rounded-lg p-2 gap-1">
            <button @click="$emit('inc2')" class="bg-[#6B21A8] font-bold cursor-pointer w-10 h-8 rounded-lg text-white text-sm">+10</button>
            <button @click="$emit('inc2small')" class="bg-[#9747FF] font-bold cursor-pointer w-10 h-8 rounded-lg text-white text-sm">+1</button>
            <span style="color: #24054C;" class="text-center w-12 bg-transparent font-bold">{{ score2 }}</span>
            <button @click="$emit('dec2small')" class="bg-red-600 cursor-pointer w-10 h-8 rounded-lg text-white text-sm">-1</button>
            <button @click="$emit('dec2')" class="bg-red-600 cursor-pointer w-10 h-8 rounded-lg text-white text-sm">-10</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  score1: { type: Number, default: 0 },
  score2: { type: Number, default: 0 },
  team1: { type: String, default: 'الفريق الأول' },
  team2: { type: String, default: 'الفريق الثاني' }
});
defineEmits(['inc1','inc1small','dec1small','dec1','inc2','inc2small','dec2small','dec2']);
</script>
