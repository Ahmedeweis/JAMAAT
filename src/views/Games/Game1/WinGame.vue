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
        حظ سعيد للفريقين
      </h1>
      <!-- الصورة في المنتصف -->
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
          class="bg-[#D5C1EE] rounded-xl px-6 py-4"
          style="width: -webkit-fill-available"
        >
          <p class="text-purple-800 font-semibold mb-2">نقاط الفريق الأول</p>
          <p
            class="text-lg font-bold bg-[#ECE1FB] p-3 rounded-2xl"
          >{{ teamOne }}</p>
        </div>
        <div
          class="bg-[#D5C1EE] rounded-xl px-6 py-4 text-center"
          style="width: -webkit-fill-available"
        >
          <p class="text-purple-800 font-semibold mb-2">نقاط الفريق الثاني</p>
          <p
            class="text-lg font-bold bg-[#ECE1FB] p-3 rounded-2xl"
          >{{ teamTwo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import bg from "../../../assets/imgs/splash.png";
const teamOne = ref(100);
const teamTwo = ref(100);
const router = useRouter();
const goToMain = () => {
  router.push("/main");
};
</script>
