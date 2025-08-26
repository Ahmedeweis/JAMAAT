<template>
  <div
    class="min-h-screen w-full bg-cover bg-center relative h-screen flex flex-col justify-center items-center"
    :style="`background-image: url(${bg});`"
  >
    <div
      class="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md relative"
      style="font-family: 'Kufam', sans-serif;"
    >
      <!-- زرار X -->
      <button
        @click="goToMain"
        class="absolute top-7 left-4 cursor-pointer bg-[#FFE4E4] hover:bg-[#ffcccc] text-[#FF4B4B] pt-2 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
      >
        ✕
      </button>
      <!-- العنوان -->
      <h1 class="text-3xl font-bold text-purple-800 mb-8 mt-2 text-center">
        {{ titleText }}
      </h1>
      <!-- الصورة -->
      <div class="flex justify-center mb-8">
        <img
          src="../../../assets/imgs/threestar.svg"
          alt="نجوم وتيك"
          class="w-40 h-auto"
        />
      </div>
      <!-- النقاط -->
      <div class="flex justify-between gap-4 text-center">
        <div
          :class="[teamTwoBg, 'rounded-xl px-6 py-4 text-center']"
          style="width: -webkit-fill-available"
        >
          <p class="text-white font-semibold mb-2">  {{ $t("team2Points") }}</p>
          <p class="text-lg font-bold bg-[#ECE1FB] p-3 rounded-2xl">
            {{ teamTwo }}
          </p>
        </div>
                <div
          :class="[teamOneBg, 'rounded-xl px-6 py-4']"
          style="width: -webkit-fill-available"
        >
          <p class="text-white font-semibold mb-2">  {{ $t("team1Points") }}</p>
          <p class="text-lg font-bold bg-[#ECE1FB] p-3 rounded-2xl">
            {{ teamOne }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import bg from "../../../assets/imgs/splash.png";
const router = useRouter();
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const route = useRoute();
const teamOne = ref(Number(route.query.score1) || 0);
const teamTwo = ref(Number(route.query.score2) || 0);
const goToMain = () => {
  router.push("/main");
};
// تحديد الفائز أو التعادل
const winner = computed(() => {
  if (teamOne.value > teamTwo.value) return 1;
  if (teamTwo.value > teamOne.value) return 2;
  return 0; // تعادل
});
// نص العنوان
const titleText = computed(() => {
  if (winner.value === 0) return t("titleDraw");
  const team = winner.value === 1 ? t("first") : t("second");
  return t("titleWin", { team });
});
// ألوان الباكجراوند
const teamOneBg = computed(() => {
  if (winner.value === 1) return "bg-green-300";
  if (winner.value === 2) return "bg-red-300";
  return "bg-[#D5C1EE]";
});
const teamTwoBg = computed(() => {
  if (winner.value === 2) return "bg-[#f4567f]";
  if (winner.value === 1) return "bg-red-500";
  return "bg-[#D5C1EE]";
});
</script>