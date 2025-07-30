<template>
  <div
    class="bg-cover bg-center min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4"
    :style="`background-image: url(${bg});`"
  >
    <div class="text-center space-y-4">
      <h1 class="text-3xl md:text-4xl font-bold text-white">الصفحة الرئيسية تحت الإنشاء</h1>
      <h2 class="text-white mt-6">نقوم حالياً بتجهيز الصفحة، شكرًا لصبرك ❤️</h2>
      <button @click="handleLogout" class="text-white underline hover:text-yellow-300 transition duration-200">
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
