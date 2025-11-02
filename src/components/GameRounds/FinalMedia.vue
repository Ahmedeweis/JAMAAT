<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl text-center relative w-[80%] max-w-lg">
      <button class="absolute top-2 right-2 text-black text-2xl" @click="emit('close')">✕</button>
      <div v-if="type === 'image'">
        <img :src="url" class="rounded-lg mx-auto max-h-[400px]" />
      </div>
      <div v-else-if="type === 'video'">
        <video controls class="rounded-lg mx-auto max-h-[400px]">
          <source :src="url" type="video/mp4" />
        </video>
      </div>
      <div v-else-if="type === 'audio'">
        <audio controls class="w-full mt-4">
          <source :src="url" type="audio/mpeg" />
        </audio>
      </div>
      <div v-else>
        <p class="text-black">لا توجد وسائط متاحة لهذا السؤال</p>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  type: String,
  url: String
})
const emit = defineEmits(['close'])
</script>
