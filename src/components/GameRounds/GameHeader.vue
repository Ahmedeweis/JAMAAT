<template>
  <nav class="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-3xl bg-white text-black p-4 shadow-md gap-3 sm:gap-0" style="font-family: 'Kufam', 'sans-serif';">
    <button
      @click="$emit('toggle-team')"
      :disabled="selectedRound === 3"
      :class="[
        'relative w-full sm:w-1/4 px-4 py-2 sm:py-3 rounded-full flex items-center justify-center sm:justify-start',
        selectedRound === 3 ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed' : 'bg-[#ECE1FB] border-2 border-[#3F0092] text-[#24054D] font-bold cursor-pointer'
      ]"
    >
      <span class="text-sm sm:text-base font-bold">
        {{ $t("teamTurni") }} {{ currentTeam === 1 ? team1 : team2 }}
      </span>
      <img src="../../assets/imgs/switch.svg" alt="Switch" class="w-8 h-8 sm:w-13 sm:h-13 absolute sm:-left-3 sm:top-1/2 sm:-translate-y-1/2 hidden sm:block" />
    </button>
    <h1 class="text-lg sm:text-xl font-bold text-[#24054D] text-center flex-1 order-first sm:order-none">
      {{ $t("gameThree") }}
    </h1>
    <div class="flex flex-wrap justify-center sm:space-x-4 sm:space-x-reverse gap-2 sm:gap-0">
      <button @click="$emit('go-to', '/main', 'هل تريد الرجوع للوحة؟')" class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base">
        <img src="../../assets/imgs/back.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2">
        <span class="c24054D"> {{ $t("backToBoard") }}</span>
      </button>
      <button @click="$emit('go-to', '/main', 'هل تريد الخروج؟')" class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base">
        <img src="../../assets/imgs/door.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2">
        <span class="c24054D ml-2">{{ $t("exit") }}</span>
      </button>
      <button @click="$emit('end-game')" class="hover:text-orange-400 flex items-center cursor-pointer text-sm sm:text-base">
        <img src="../../assets/imgs/End.svg" alt="Close" class="w-5 h-5 sm:w-6 sm:h-6 ml-2">
        <span class="c24054D"> {{ $t("endGame") }}</span>
      </button>
    </div>
  </nav>
</template>
<script setup>
defineProps({
  team1: String,
  team2: String,
  currentTeam: { type: Number, default: 1 },
  selectedRound: { type: Number, default: 1 }
});
defineEmits(['toggle-team','go-to','end-game']);
</script>
