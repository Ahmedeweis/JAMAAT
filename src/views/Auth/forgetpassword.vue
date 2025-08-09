<template>
  <div class="bg-cover bg-center min-h-screen w-full  flex flex-col items-center justify-center p-4 text-white relative"
   :style="`background-image: url(${bg});`">
          <div class="text-center mb-6">
      <div class="flex justify-center mb-2">
        <img src="../../assets/imgs/lock.png" class="w-[150px]">
      </div>
      <p class="text-4xl mb-5">نسيت كلمة المرور</p>
      <p class="text-lg">  قم بإدخال بريدك الالكتروني</p>
      <div class="flex gap-3 justify-center mb-2">
</div>
  <div class="text-center mt-4 mb-8 w-full">
                    <form class="bg-white rounded-3xl p-6 w-[full] h-[200px] max-w-md shadow-lg"
                    style="font-family: 'Cairo', sans-serif;">
                    <div class="flex flex-col text-right">
                        <label class="text-purple-800 mb-5">البريد الإلكتروني  </label>
                        <input type="text" v-model="email"
                            class="p-2  placeholder-[#D5C1EE]  text-[#24054C] font-bold text-left rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                            placeholder="Mayada123@gmail.com">
                    </div>
                </form>
      <button @click="handleForgotPassword" class="w-[300px] cursor-pointer bg-[#E3614E] text-white p-3 rounded-4xl mt-6 hover:bg-red-600 transition duration-200">
        إرسال
      </button>
</div>
    </div>
   </div>
</template>
<script setup>
import {resendOTP } from '../../services/authService.js'
import { ref } from 'vue'
import bg from '../../assets/imgs/splash.png'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()
const email = ref('')
const handleForgotPassword = async () => {
  try {
    if (!email.value) {
  toast.error(' يرجى إدخال بريد إلكتروني أولاً')
  return
}
    await resendOTP(email.value)
    toast.success(' تم إرسال كود التحقق إلى بريدك الإلكتروني')
    router.push({
      path: '/verify-otp',
      query: { email: email.value, from: 'forgot' }
    })
  } catch (err) {
    toast.error(err.response?.data?.message || ' فشل في إرسال الكود')
  }
}
</script>
