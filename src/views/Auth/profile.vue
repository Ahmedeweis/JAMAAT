<template>
    <div class="min-h-screen bg-cover bg-center flex" :style="`background-image: url(${bg});`">
        <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
            <div class="min-h-screen mt-4  rounded-3xl bg-white flex flex-col items-center justify-start p-4">
                <h1 class="text-3xl md:text-4xl font-bold mb-8">حسابي</h1>
                <div class="relative w-32 h-32 mx-auto">
                    <!-- الصورة الشخصية -->
                    <img :src="imageUrl" alt="الصورة الشخصية"
                        class="w-full h-full object-cover rounded-full border-4 border-purple-400" />
                    <label for="avatarUpload"
                        class="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-105 transition">
                        <img src="../../assets/imgs/camera.svg" class="w-4 h-4" />
                    </label>
                    <input id="avatarUpload" type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
                </div>
                <div class="w-full max-w-md space-y-4 ">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="flex flex-col text-right">
                            <label class="text-[#663D9C] mb-1">الإسم الأول</label>
                            <input v-model="lname" type="text"
                                class="p-2  placeholder-[#D5C1EE] text-[#24054C]  rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right "
                                placeholder="سجل الإسم">
                        </div>
                        <div class="flex flex-col text-right">
                            <label class="text-[#663D9C] mb-1">إسم العائلة</label>
                            <input v-model="fname" type="text"
                                class="p-2 rounded-3xl text-[#24054C] bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right placeholder-[#D5C1EE]"
                                placeholder="سجل الإسم" />
                        </div>
                    </div>
                    <div class="flex flex-col text-right">
                        <label class="text-purple-800 mb-1">البريد الإلكتروني</label>
                        <input type="email" v-model="email"
                            class="p-2 placeholder-[#D5C1EE] text-[#24054C] font-bold text-left rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                            placeholder="example@gmail.com" />
                    </div>
                    <div class="flex flex-col text-right">
                        <label class="text-purple-800 mb-1">رقم الجوال</label>
                        <input type="tel" v-model="phone"
                            class="p-2 placeholder-[#D5C1EE] text-[#24054C]  text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                            placeholder="رقم الجوال">
                    </div>
                    <!-- <div class="flex flex-col text-right">
                        <input type="password"  v-model="password"
                            class="p-2 placeholder-[#D5C1EE] text-[#24054C]  text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                            placeholder="كلمة المرور (ضروري عند الحفظ)">
                    </div> -->
                    <button @click="handleUpdateProfile" class="w-full cursor-pointer bg-[#E3614D] text-white py-3 rounded-4xl font-bold
         shadow-[5px_5px_15px_#C33520]
         transition duration-300">
                        حفظ التغييرات
                    </button>
                    <button @click="handleLogout" class="p-4 text-center bg-[#FEC8C8] cursor-pointer text-[#BA2828] font-bold py-2 rounded-4xl mt-4
         w-1/2 md:w-1/3 mx-auto block">
                        تسجيل الخروج
                    </button>
                </div>
            </div>
        </div>
        <div class=" bg-white bg-opacity-90 shadow-lg m-4 rounded-4xl overlay flex flex-col items-center justify-between">
            <side />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { updateProfile } from '../../services/authService'
import bg from '../../assets/imgs/splash.png'
import profileImg from '../../assets/imgs/profile.png'
import side from '../../components/side.vue'
import { useUserStore } from '../../stores/user.js'
import { uploadAvatar } from '../../services/authService'
import { storeToRefs } from 'pinia'
// المتغيرات والمخازن
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const router = useRouter()
const toast = useToast()
// البيانات المُعروضة في الفورم
const fname = ref('')
const lname = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const imageUrl = ref('')
const defaultAvatar = profileImg
const country_code = '+20'
onMounted(() => {
  if (!user.value) {
    userStore.setUserData({
      token: localStorage.getItem('token') || '',
      user: {
        id: localStorage.getItem('userId') || '',
        name: localStorage.getItem('name') || '',
        email: localStorage.getItem('email') || '',
        phone: localStorage.getItem('phone') || '',
        user_type: localStorage.getItem('userType') || '',
        avatar: localStorage.getItem('imageUrl') || ''
      }
    })
  }
  const nameParts = (user.value?.name || '').split(' ')
  fname.value = nameParts[0] || ''
  lname.value = nameParts[1] || ''
  email.value = user.value?.email || ''
  phone.value = user.value?.phone || ''
  // استخدم الرابط من Pinia مباشرة
  imageUrl.value = user.value?.avatar || defaultAvatar
})
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  try {
    // عرض مؤقت للصورة أثناء الرفع
    const previewImage = URL.createObjectURL(file)
    imageUrl.value = previewImage
    const res = await uploadAvatar(file)
    // نحصل على الرابط الحقيقي من الريسبونس
    const uploadedUrl = res.data.avatar_url
    if (uploadedUrl) {
const cleanUrl = uploadedUrl.replace(/([^:]\/)\/+/g, "$1")
imageUrl.value = cleanUrl
localStorage.setItem('imageUrl', cleanUrl)
      localStorage.setItem('imageUrl', uploadedUrl)
      userStore.setUserData({
        token: userStore.token,
        user: {
          ...user.value,
          avatar: uploadedUrl
        }
      })
      toast.success('✅ تم رفع الصورة بنجاح')
    } else {
      throw new Error('❌ لم يتم استلام رابط الصورة من السيرفر')
    }
  } catch (err) {
    toast.error(err.response?.data?.message || '❌ فشل رفع الصورة')
  }
}
const handleUpdateProfile = async () => {
  try {
    const payload = {
      name: `${fname.value} ${lname.value}`,
      email: email.value,
      phone: phone.value,
      country_code,
      lang: 'en'
    }
    // إضافة الباسورد فقط لو المستخدم كتبه
    if (password.value.trim()) {
      payload.password = password.value.trim()
    }
    const res = await updateProfile(payload)
    toast.success(res.data.message || '✅ تم تحديث بياناتك بنجاح')
    // تحديث البيانات في Pinia
    userStore.setUserData({
      token: userStore.token,
      user: {
        ...user.value,
        name: payload.name,
        email: payload.email,
        phone: payload.phone
      }
    })
  } catch (err) {
    toast.error(err.response?.data?.message || '❌ فشل التحديث')
  }
}
// تسجيل الخروج
const handleLogout = () => {
  localStorage.clear()
  userStore.clearUserData()
  toast.info('تم تسجيل الخروج')
  router.push('/login')
}
</script>
