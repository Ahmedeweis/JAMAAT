<template>
  <div
    :class="['flex flex-col h-full items-center shadow-md', justifyClass]"
    style="font-family: 'Kufam', sans-serif;"
  >
    <router-link to="/main" class="flex flex-col items-center w-full py-3 px-2">
      <img src="../assets/imgs/side1.png" class="w-8 h-8 mb-1" />
      <h2 class="text-lg text-gray-700 hidden md:block">{{ $t('home') }}</h2>
    </router-link>
    <router-link to="/ChooseGame" class="flex flex-col items-center w-full py-3 px-2">
      <img src="../assets/imgs/side2.png" class="w-8 h-8 mb-1" />
      <h2 class="text-lg text-gray-700 hidden md:block">{{ $t('myGames') }}</h2>
    </router-link>
    <router-link to="/MakeGame" class="flex flex-col items-center bg-amber-500 w-full py-3 px-2">
      <img src="../assets/imgs/side3.png" class="w-6 h-6 mb-1" />
      <h2 class="text-lg text-white font-bold hidden md:block">{{ $t('create') }}</h2>
    </router-link>
    <router-link to="/profile" class="flex flex-col items-center w-full py-3 px-2">
      <img src="../assets/imgs/side4.png" class="w-8 h-8 mb-1" />
      <h2 class="text-lg text-gray-700 hidden md:block">{{ $t('myAccount') }}</h2>
    </router-link>
    <router-link to="/Contact" class="flex flex-col items-center w-full py-3 px-2">
      <img src="../assets/imgs/side5.png" class="w-8 h-8 mb-1" />
      <h2 class="text-lg text-gray-700 hidden md:block">{{ $t('contact') }}</h2>
    </router-link>
    <router-link to="/FAQ" class="flex flex-col items-center w-full py-3 px-2">
      <h2
        class="text-xl text-white font-bold bg-[#010061] flex justify-center items-center rounded-full w-3 h-3"
        style="padding: 16px 14px 12px 14px;"
      >
        ?
      </h2>
    </router-link>
  </div>
</template>
<script setup>
defineProps({
  justifyClass: {
    type: String,
    default: 'justify-center'
  }
})
</script>
