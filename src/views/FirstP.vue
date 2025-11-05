<template>
  <div class="font-sans text-white bg-cover bg-center" :style="`background-image: url(${bg});`">
    <!-- Hero Section -->
<section class="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
  <!-- Hero Content -->
  <img src="../assets/imgs/JAMAAT.svg" alt="JAMAAT Logo" class="w-36 mb-6 animate-bounce z-10" />
  <h1 class="text-5xl sm:text-6xl font-extrabold mb-4 leading-snug z-10">
    مرحبًا بك في عالم <span class="text-[#E3614D] "  style=" font-family:'Andalus','Kufam', 'sans-serif'">جمعات</span>
  </h1>
  <p class="text-lg sm:text-xl mb-8 text-gray-300 max-w-2xl mx-auto z-10">
    جرب المتعة والتحدي في 3 ألعاب مشوقة 👾
  </p>
  <div class="flex flex-col sm:flex-row gap-4 z-10 relative">
    <router-link
      to="/signup"
      class="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      أنشئ حسابك الآن
    </router-link>
    <router-link
      to="/login"
      class="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      تسجيل الدخول
    </router-link>
  </div>
  <!-- Animated Background Circles -->
  <div class="absolute top-0 left-0 w-full h-full overflow-hidden ">
    <span class="circle animate-ping-slow bg-yellow-400 opacity-20"></span>
    <span class="circle animate-ping-slow bg-blue-500 opacity-20"></span>
  </div>
</section>
  </div>
</template>
<script setup>
import { useHead } from '@vueuse/head'
import bg from '../assets/imgs/splash.png'
useHead({
  title: 'JAMAAT - منصة الألعاب الممتعة',
  meta: [
    { name: 'description', content: 'مرحبًا بك في JAMAAT! جرب المتعة والتحدي في لعبتين مشوّقتين. انضم الآن واستمتع بعالم الألعاب!' },
    { name: 'keywords', content: 'JAMAAT, ألعاب, لعبتين, منصة ألعاب, ألعاب أونلاين' },
    { property: 'og:title', content: 'JAMAAT - منصة الألعاب الممتعة' },
    { property: 'og:description', content: 'مرحبًا بك في JAMAAT! جرب المتعة والتحدي في لعبتين مشوّقتين. انضم الآن واستمتع بعالم الألعاب!' },
    { property: 'og:image', content: 'https://jamaat-gilt.vercel.app/src/assets/imgs/j.png' },
    { property: 'og:url', content: 'https://jamaat-gilt.vercel.app/' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'JAMAAT - منصة الألعاب الممتعة' },
    { name: 'twitter:description', content: 'مرحبًا بك في JAMAAT! جرب المتعة والتحدي في لعبتين مشوّقتين. انضم الآن واستمتع بعالم الألعاب!' },
    { name: 'twitter:image', content: 'https://jamaat-gilt.vercel.app/src/assets/imgs/j.png' }
  ]
})
</script>
<style scoped>
.feature-card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(8px);
  padding: 2rem;
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.game-card {
  background: rgba(0,0,0,0.3);
  padding: 2rem;
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.game-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}
.circle {
  position: absolute;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
}
@keyframes ping-slow {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.5); opacity: 0; }
}
.animate-ping-slow {
  animation: ping-slow 6s linear infinite;
}
.animate-fade-in {
  animation: fadeIn 1.5s ease forwards;
  opacity: 0;
}
@keyframes fadeIn {
  to { opacity: 1; }
}
</style>