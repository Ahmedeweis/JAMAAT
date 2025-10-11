<template>
  <div class="bg-cover bg-center min-h-screen flex justify-center items-center"
   :style="`background-image: url(${bg});`">
    <div class="flex items-center justify-around w-full pt-[30px] flex-col md:flex-row gap-8">
      <!-- لوجو -->
      <div>
        <img src="../../assets/imgs/logo.png">
      </div>
      <div class="rounded-3xl p-6 w-full max-w-md shadow-lg">
        <div class="flex justify-between bg-white text-gray-500 mb-4 p-4 rounded-2xl font-bold"
            style="font-family: 'Kufam', sans-serif;">
          <router-link to="/signup">{{ $t('signup') }}</router-link>
          <router-link to="/login" class="text-[#E3614E]">
            {{ $t('login') }}
          </router-link>
        </div>
        <form class="bg-white rounded-3xl p-6 w-full h-[300px] md:h-[430px] max-w-md shadow-lg"
              style="font-family: 'Cairo', sans-serif;">
          <div class="flex flex-col ">
      <label
  class="text-purple-800 mb-1"
  :class="{
    'text-left': $i18n.locale === 'en',
    'text-right': $i18n.locale === 'ar'
  }"
>
  {{ $t('emailOrPhone') }}
</label>
<input
  type="text"
  v-model="emailOrPhone"
  class="p-2 placeholder-[#D5C1EE] text-[#24054C] font-bold rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
  placeholder="Ali123@gmail.com"
/>
<!--
  :class="{
    'text-left': $i18n.locale === 'en',
    'text-right': $i18n.locale === 'ar'
  }"
-->
          </div>
          <div class="flex flex-col  mt-[15px]">
            <label class="text-purple-800 mb-1 text-justify"
              :class="{
    'text-left': $i18n.locale === 'en',
    'text-right': $i18n.locale === 'ar'
  }">{{ $t('password') }}</label>
<input
  type="password"
  v-model="password"
  class="p-2 placeholder-[#D5C1EE] text-[#24054C] rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
  :placeholder="$t('passwordPlaceholder')"
/>
<!--
  :class="{
    'text-left': $i18n.locale === 'en',
    'text-right': $i18n.locale === 'ar'
  }"
   -->
          </div>
          <router-link to="/forgetpassword" class="text-[#E3614E] mt-[10px] block text-justify">
            {{ $t('forgetPassword') }}
          </router-link>
        </form>
        <button @click="handleLogin"
          class="w-full cursor-pointer bg-[#E3614E] text-white p-3 rounded-4xl mt-6 hover:bg-red-600 transition duration-200">
          {{ $t('login') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import bg from '../../assets/imgs/splash.png'
import { login } from '../../services/authService'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const toast = useToast()
const password = ref('')
const emailOrPhone = ref('')
const isLoading = ref(false)
const error = ref(null)
const handleLogin = async () => {
    // تحقق من الحقول
  if (!emailOrPhone.value.trim() || !password.value.trim()) {
    toast.info('يرجى إدخال البريد الإلكتروني وكلمة المرور')
    return
  }
  if (isLoading.value) return
  isLoading.value = true
  error.value = null
  try {
    const res = await login({
      emailOrPhone: emailOrPhone.value,
      password: password.value
    })
    const data = res.data
    if (data?.token && data?.user) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.user.id || '')
      localStorage.setItem('name', data.user.name || '')
      localStorage.setItem('email', data.user.email || '')
      localStorage.setItem('imageUrl', data.user.avatar || '')
      localStorage.setItem('userType', data.user.user_type || '')
      localStorage.setItem('phone', data.user.phone || '')
      localStorage.setItem('balance', data.user.balance || '0.00')
      localStorage.setItem('remainig_game', data.user.remainig_game || '0')
      toast.success(' تم تسجيل الدخول بنجاح')
      router.push('/ChooseGame')
    } else {
      throw new Error('الرد من السيرفر غير متوقع')
    }
  } catch (err) {
    console.error(' Login error:', err)
    const errorMessage = err.response?.data?.message || 'فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.'
    error.value = errorMessage
    toast.error(errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>
<style scoped>
/* Additional custom styles if needed */
</style>