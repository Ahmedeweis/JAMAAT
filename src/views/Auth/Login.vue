<template>
  <div class="bg-cover bg-center min-h-screen"
   :style="`background-image: url(${bg});`">
<div
  class="  flex items-center justify-around  w-full  pt-[15px]  flex-col md:flex-row  gap-8"
>
    <!-- <h1 class="text-5xl md:text-6xl font-bold text-yellow-500 mb-8">JAMAAT</h1> -->
    <div >
      <img src="../../assets/imgs/logo.png">
    </div>
<div
  class="rounded-3xl p-6 w-full max-w-md shadow-lg"
>
      <div class="flex justify-between bg-white text-gray-500 mb-4 p-4 rounded-2xl font-bold"
        style="font-family: 'Kufam', sans-serif;">
        <router-link to="/signup" >إنشاء حساب</router-link>
        <router-link to="/login" class="text-[#E3614E]">تسجيل الدخول</router-link>
      </div>
              <form class="bg-white rounded-3xl p-6 w-[full] h-[430px] max-w-md shadow-lg"
               style="font-family: 'Cairo', sans-serif;">
  <div class="flex flex-col text-right">
          <label class="text-purple-800 mb-1">البريد الإلكتروني</label>
  <input type="text"  class="p-2  placeholder-[#D5C1EE] text-[#24054C] font-bold text-left rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" placeholder="Mayada123@gmail.com">
        </div>
          <div class="flex flex-col text-right mt-[15px]">
          <label class="text-purple-800 mb-1">كلمة المرور</label>
          <input type="password" class="p-2 placeholder-[#D5C1EE] text-[#24054C] text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" placeholder="كلمة المرور">
        </div>
<router-link to="forgetPassword" class="text-[#E3614E]  mt-[10px] block text-right">
  هل نسيت كلمة المرور ؟
</router-link>
    </form>
    <router-link to="/dashboard">
        <button class="w-full bg-[#E3614E] text-white p-3 rounded-4xl mt-6 hover:bg-red-600 transition duration-200">
         تسجيل الدخول
        </button>
      </router-link>
    </div>
  </div>
   </div>
</template>
<script setup>
import bg from '../../assets/imgs/splash.png'
</script>
<style scoped>
/* Additional custom styles if needed */
</style>