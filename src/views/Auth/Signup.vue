<template>
  <div class="bg-cover bg-center min-h-screen"
   :style="`background-image: url(${bg});`">
<div
  class="  flex items-center justify-around  w-full  pt-[30px] flex-col md:flex-row  gap-8"
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
        <router-link to="/signup" class="text-[#E3614E]">إنشاء حساب</router-link>
        <router-link to="/login" >تسجيل الدخول</router-link>
      </div>
              <form class="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg"
               style="font-family: 'Cairo', sans-serif;">
      <div class="space-y-4 text-start">
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- الاسم الأخير -->
  <div class="flex flex-col text-right">
    <label class="text-[#663D9C] mb-1">إسم العائلة</label>
<input
v-model="fname"
  type="text"
  class="p-2 rounded-3xl text-[#24054C] bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right placeholder-[#D5C1EE]"
  placeholder="سجل الإسم"
/>
  </div>
  <!-- الاسم الأول -->
  <div class="flex flex-col text-right">
    <label class="text-[#663D9C] mb-1">الإسم الأول</label>
    <input v-model="lname" type="text"  class="p-2  placeholder-[#D5C1EE] text-[#24054C]  rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right" placeholder="سجل الإسم">
  </div>
</div>
  <div class="flex flex-col text-right">
          <label class="text-purple-800 mb-1">البريد الإلكتروني</label>
  <input type="email" v-model="email" class="p-2  placeholder-[#D5C1EE] text-[#24054C] font-bold text-left rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" placeholder="Mayada123@gmail.com" value="Mayada123@gmail.com">
        </div>
                <div class="flex flex-col text-right">
          <label class="text-purple-800 mb-1">رقم الجوال</label>
          <input type="tel" v-model="phone" class="p-2 placeholder-[#D5C1EE] text-[#24054C]  text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" placeholder="رقم الجوال">
        </div>
          <div class="flex flex-col text-right">
          <label class="text-purple-800 mb-1">كلمة المرور</label>
          <input type="password" v-model="password" class="p-2 placeholder-[#D5C1EE] text-[#24054C] text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" placeholder="كلمة المرور">
        </div>
        <div class="flex flex-col text-right">
          <label class="text-purple-800 mb-1">تأكيد كلمة المرور</label>
          <input type="password" v-model="confirmPassword" class="p-2 placeholder-[#D5C1EE] text-[#24054C]  text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"placeholder="تأكيد كلمة المرور">
        </div>
      </div>
    </form>
        <button @click="handleRegister" class="w-full cursor-pointer bg-[#E3614E] text-white p-3 rounded-4xl mt-6 hover:bg-red-600 transition duration-200">
          إنشاء حساب
        </button>
    </div>
  </div>
   </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import bg from '../../assets/imgs/splash.png'
import { useToast } from 'vue-toastification'
import { register } from '../../services/authService'
const router = useRouter()
const toast = useToast()
const fname = ref('')
const lname = ref('')
const fullName = computed(() => `${fname.value} ${lname.value}`)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone = ref('')
const country_code = "+20"
const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    toast.error('كلمة المرور غير متطابقة')
    return
  }
  try {
    const res = await register({
      name: fullName.value,
      email: email.value,
      phone: phone.value,
      country_code: country_code,
      lang: "en",
      password: password.value
    })
    toast.success(res.data.message || 'تم التسجيل بنجاح')
    setTimeout(() => {
      router.push({
      path: '/verify',
      query: { email: email.value }
    })
    }, 2000)
  } catch (err) {
    toast.error(err.response?.data?.message || 'حدث خطأ في التسجيل')
  }
}
</script>
<style scoped>
/* Additional custom styles if needed */
</style>