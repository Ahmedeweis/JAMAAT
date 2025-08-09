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
                    <form class="bg-white rounded-3xl p-6 w-[full] h-[300px] max-w-md shadow-lg "
                    style="font-family: 'Cairo', sans-serif;">
                              <div class="flex flex-col text-right mb-5">
          <label class="text-purple-800 mb-1">كلمة المرور الجديدة</label>
          <input type="password" v-model="password" class="p-2 placeholder-[#D5C1EE] text-[#24054C] text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" placeholder="كلمة المرور">
        </div>
        <div class="flex flex-col text-right mb-5">
          <label class="text-purple-800 mb-1">تأكيد كلمة المرور الجديدة</label>
          <input type="password" v-model="confirmPassword" class="p-2  placeholder-[#D5C1EE] text-[#24054C]  text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"placeholder="تأكيد كلمة المرور">
        </div>
                </form>
      <button @click="handleSetNewPassword" class="w-[300px] cursor-pointer bg-[#E3614E] text-white p-3 rounded-4xl mt-6 hover:bg-red-600 transition duration-200">
        إرسال
      </button>
</div>
    </div>
   </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { updateProfile } from '../../services/authService'
import { useRouter } from 'vue-router'
import bg from '../../assets/imgs/splash.png'
const password = ref('')
const confirmPassword = ref('')
const toast = useToast()
const router = useRouter()
// هنجيب بيانات اليوزر من localStorage بدل الـ store
const user = ref(null)
const handleSetNewPassword = async () => {
  if (!password.value || password.value.length < 6) {
    toast.error(" كلمة المرور ضعيفة أو غير مكتوبة")
    return
  }
  if (password.value !== confirmPassword.value) {
    toast.error(" كلمة المرور غير متطابقة")
    return
  }
  const payload = {
    name: user.value.name,
    email: user.value.email,
    phone: user.value.phone,
    country_code: user.value.country_code || '+20',
    lang: user.value.lang || 'en',
    password: password.value
  }
  try {
    await updateProfile(payload)
    toast.success(" تم تحديث كلمة المرور")
    router.push('/main')
  } catch (err) {
    toast.error(err.response?.data?.message || ' فشل التحديث')
  }
}
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  if (savedUser && token) {
    user.value = JSON.parse(savedUser)
  } else {
    toast.error(" لم يتم تحميل بيانات المستخدم")
    router.push('/login')
  }
})
</script>
