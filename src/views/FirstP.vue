<!-- src/views/FirstP.vue -->
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white text-center px-4">
    <!-- عنوان -->
    <h1 class="text-4xl sm:text-5xl font-bold mb-4">مرحبًا بك في عالم الألعاب</h1>
    <!-- وصف -->
    <p class="text-lg sm:text-xl mb-8 text-gray-300">
      جرب المتعة والتحدي في لعبتين مشوّقتين 👾!
    </p>
    <!-- زر CTA -->
    <router-link to="/signup" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
      ابدأ اللعب الآن
    </router-link>
  </div>
</template>
<script setup>
// لا حاجة لأي منطق هنا الآن
</script>
