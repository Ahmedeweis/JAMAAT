<template>
  <div class="bg-cover bg-center min-h-screen w-full  flex flex-col items-center justify-center p-4 text-white relative"
   :style="`background-image: url(${bg});`">
          <div class="text-center mb-6">
      <div class="flex justify-center mb-2">
        <img src="../../assets/imgs/image.png" class="w-[150px]">
      </div>
      <p class="text-2xl mb-5">التحقق من البريد الإلكتروني</p>
      <p class="text-lg"> {{ email }}  تم إرسال رسالة نصية إلى </p>
      <p class="text-lg"> أدخل الرمز المكون من 4 أرقام</p>
      <div class="flex gap-3 justify-center mb-2">
  <input
    v-for="(digit, index) in code"
    :key="index"
    v-model="code[index]"
    :id="`code-${index}`"
    maxlength="1"
    type="text"
    inputmode="numeric"
    class="w-12 h-12  mt-[30px] text-center text-2xl bg-white text-blue-900 rounded-lg border border-purple-300 focus:outline-none"
    @input="(e) => focusNext(e, index)"
  />
</div>
  <p class="text-sm text-gray-300 mb-2">
     إعادة الإرسال بعد <span class="font-bold text-white">{{ formattedTimer }}</span>
  </p>
  <button
    class="px-4 py-2 cursor-pointer   bg-white text-[#3F0092] font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
    :disabled="isWaiting"
    @click="handleResend"
  >
    إعادة إرسال الرمز
  </button>
  <div class="text-center mt-4 mb-8 w-full">
      <button @click="handleResend()" class="w-1/2 cursor-pointer bg-[#E3614E] text-white p-3 rounded-4xl mt-6 hover:bg-red-600 transition duration-200">
        تأكيد
      </button>
</div>
    </div>
   </div>
</template>
<script setup>
import { ref, computed, onMounted  } from 'vue'
import { useToast } from 'vue-toastification'
import bg from '../../assets/imgs/splash.png'
import { useRoute } from 'vue-router'
import { resendVerificationCode , verifyOTP} from '../../services/authService'
const route = useRoute()
const email = route.query.email || ''
const code = ref(['', '', '', ''])
const timer = ref(2)
const isWaiting = computed(() => timer.value > 0)
const handleVerify = async () => {
  try {
    await verifyOTP({
      email,
      otp: verificationCode.value
    })
    toast.success('✅ تم التحقق بنجاح')
    router.push('/main') // أو أي صفحة رئيسية
  } catch (err) {
    toast.error(err.response?.data?.message || '❌ رمز التحقق غير صحيح')
  }
}
const formattedTimer = computed(() => {
  const minutes = String(Math.floor(timer.value / 60)).padStart(2, '0')
  const seconds = String(timer.value % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
})
const startTimer = () => {
  const countdown = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(countdown)
    }
  }, 1000)
}
const handleResend = async () => {
  try {
    await resendVerificationCode(email)
    toast.success('✅ تم إرسال الكود مرة أخرى إلى بريدك الإلكتروني')
    timer.value = 60
    startTimer()
  } catch (err) {
    toast.error('❌ حدث خطأ أثناء إعادة الإرسال')
  }
}
onMounted(() => {
  startTimer()
})
const focusNext = (event, index) => {
  const input = event.target
  if (input.value.length === 1 && index < code.value.length - 1) {
    const nextInput = document.getElementById(`code-${index + 1}`)
    nextInput?.focus()
  }
}
const verificationCode = computed(() => code.value.join(''))
</script>
