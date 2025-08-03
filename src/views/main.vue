<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4"
    :style="`background-image: url(${bg}); background-size: cover; background-position: center;`"
  >
    <div
      class="text-center backdrop-blur-sm bg-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fade-in space-y-6 max-w-md w-full"
    >
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md">
        الصفحة الرئيسية تحت الإنشاء
      </h1>
      <h2 class="text-white text-lg sm:text-xl">
        نقوم حالياً بتجهيز الصفحة، شكرًا لصبرك
      </h2>
      <div class="flex justify-center gap-4 flex-wrap">
        <router-link
          to="/profile"
          class="bg-white text-purple-800 font-semibold px-4 py-2 rounded-full shadow hover:bg-purple-100 transition"
        >
          البروفايل
        </router-link>
        <router-link
          to="/Contact"
          class="bg-white text-purple-800 font-semibold px-4 py-2 rounded-full shadow hover:bg-purple-100 transition"
        >
          تواصل معنا
        </router-link>
      </div>
      <button
        @click="handleLogout"
        class="mt-4 text-white underline hover:text-yellow-300 transition duration-200"
      >
        تسجيل الخروج
      </button>
    </div>
  </div>
</template>
<script setup>
import bg from '../assets/imgs/splash.png'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()
const handleLogout = () => {
  localStorage.clear()
  userStore.clearUserData()
  toast.info('تم تسجيل الخروج')
  router.push('/login')
}
</script>
<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.8s ease-out both;
}
</style>
