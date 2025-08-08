<template>
  <div class="bg-white rounded-xl p-6 shadow-lg text-center" style="border: 10px solid #1E2A59;">
    <h1 class="text-3xl font-bold text-purple-800 mb-6">حسن التصميم الداخلي</h1>
    <div class="flex justify-center mb-6">
      <div class="relative">
        <div class="bg-yellow-300 rounded-lg p-4">
          <div class="flex justify-center">
            <svg class="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>
        <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div class="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center space-x-4">
      <div class="bg-purple-200 rounded-lg p-4">
        <p class="text-purple-800 font-semibold">التصميم الداخلي</p>
        <p class="text-2xl font-bold">{{ internalScore }}</p>
      </div>
      <div class="bg-purple-200 rounded-lg p-4">
        <p class="text-purple-800 font-semibold">التنفيذ الخارجي</p>
        <p class="text-2xl font-bold">{{ externalScore }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const internalScore = ref(100);
const externalScore = ref(100);
</script>
<style scoped>
/* No additional styles needed as Tailwind handles it */
</style>