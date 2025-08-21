<template>
  <div class="min-h-screen bg-cover bg-center flex flex-row-reverse" :style="`background-image: url(${bg});`">
    <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
      <div class="min-h-screen mt-4 mr-[5px] rounded-3xl bg-white flex flex-col items-center justify-start p-4">
        <h1 class="text-3xl md:text-4xl font-bold mb-8">{{ $t('profile') }}</h1>
        <div class="relative w-32 h-32 mx-auto">
          <!-- الصورة الشخصية -->
          <img :src="imageUrl" alt="الصورة الشخصية"
            class="w-full h-full object-cover rounded-full border-4 border-purple-400" />
          <label for="avatarUpload"
            class="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-105 transition text-justify">
            <img src="../../assets/imgs/camera.svg" class="w-4 h-4" />
          </label>
          <input id="avatarUpload" type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
        </div>
        <div class="w-full max-w-md space-y-4 ">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="flex flex-col text-right">
              <label class="text-[#663D9C] mb-1  text-justify">{{ $t('firstName') }}</label>
              <input v-model="lname" type="text" :placeholder="$t('pleaseEnterUserName')"
                class="p-2 rounded-3xl text-[#24054C] bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right placeholder-[#D5C1EE]" />
            </div>
            <div class="flex flex-col text-right">
              <label class="text-[#663D9C] mb-1  text-justify"> {{ $t('lastName') }}</label>
              <input v-model="fname" type="text"
                class="p-2 rounded-3xl text-[#24054C] bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right placeholder-[#D5C1EE]"
                placeholder="سجل الإسم" />
            </div>
          </div>
          <div class="flex flex-col text-right">
            <label class="text-purple-800 mb-1  text-justify">{{ $t('email') }}</label>
            <input type="email" v-model="email" :placeholder="$t('pleaseEnterEmail')"
              class="p-2 placeholder-[#D5C1EE] text-[#24054C] font-bold text-left rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" />
          </div>
          <div class="flex flex-col text-right">
            <label class="text-purple-800 mb-1  text-justify">{{ $t('phone') }}</label>
            <input type="tel" v-model="phone" :placeholder="$t('pleaseEnterPhone')"
              class="p-2 placeholder-[#D5C1EE] text-[#24054C] text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" />
          </div>
          <div class="flex justify-center items-center gap-3 mt-6">
            <button @click="changeLang('ar')" :class="`px-4 py-2 rounded-full font-semibold transition-all duration-300   cursor-pointer ${$i18n.locale === 'ar'
                ? 'bg-[#663D9C] text-white shadow-md'
                : 'bg-purple-100 text-[#663D9C] hover:bg-purple-200'
              }`">
              🇪🇬 العربية
            </button>
            <button @click="changeLang('en')" :class="`px-4 py-2 rounded-full font-semibold transition-all duration-300  cursor-pointer ${$i18n.locale === 'en'
                ? 'bg-[#663D9C] text-white shadow-md'
                : 'bg-purple-100 text-[#663D9C] hover:bg-purple-200'
              }`">
              🇺🇸 English
            </button>
          </div>
          <!-- <div class="flex flex-col text-right">
                        <input type="password"  v-model="password"
                            class="p-2 placeholder-[#D5C1EE] text-[#24054C]  text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                            placeholder="كلمة المرور (ضروري عند الحفظ)">
                    </div> -->
          <button @click="handleUpdateProfile" class="w-full cursor-pointer bg-[#E3614D] text-white py-3 rounded-4xl font-bold
         shadow-[5px_5px_15px_#C33520]
         transition duration-300">
            {{ $t('saveChanges') }}
          </button>
          <div class="flex flex-col sm:flex-row gap-4 mt-6 justify-center items-center">
            <!-- زر تسجيل الخروج -->
            <button @click="handleLogout"
              class="flex items-center justify-center cursor-pointer gap-2 px-6 py-3 bg-gradient-to-r from-pink-100 to-red-100 text-red-700 font-semibold rounded-xl shadow hover:from-pink-200 hover:to-red-200 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              {{ $t('logout') }}
            </button>
            <!-- زر حذف الحساب -->
            <button @click="showDeleteModal = true"
              class="flex items-center justify-center cursor-pointer gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3" />
              </svg>
              {{ $t('deleteAccount') }}
            </button>
            <!-- البوب أب -->
            <div v-if="showDeleteModal" class="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <h2 class="text-lg font-bold mb-4 text-red-600"> {{ $t('confirmDeleteAccount') }}</h2>
                <p class="mb-6 text-gray-600">
                  {{ $t('areYouSureToDeleteAccount') }}
                </p>
                <div class="flex gap-4 justify-center">
                  <button @click="confirmDelete"
                    class="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    {{ $t('deleteAccount') }}
                  </button>
                  <button @click="showDeleteModal = false"
                    class="px-4 py-2 cursor-pointer  bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    {{ $t('cancel') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white bg-opacity-90 shadow-lg my-4 mx-0 sm:mx-4 rounded-4xl overlay flex flex-col items-center justify-between">
      <side />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { updateProfile, uploadAvatar } from '../../services/authService'
import bg from '../../assets/imgs/splash.png'
import profileImg from '../../assets/imgs/profile.png'
import side from '../../components/side.vue'
import { deleteAccount } from '../../services/authService'
const showDeleteModal = ref(false)
const changeLang = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}
const confirmDelete = async () => {
  try {
    const res = await deleteAccount()
    toast.success(res.data.message || 'تم حذف الحساب بنجاح')
    localStorage.clear()
    router.push('/signup')
  } catch (err) {
    toast.error(err.response?.data?.message || 'فشل حذف الحساب')
  } finally {
    showDeleteModal.value = false
  }
}
const router = useRouter()
const toast = useToast()
// البيانات
const fname = ref('')
const lname = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const imageUrl = ref('')
const defaultAvatar = profileImg
const country_code = '+20'
// ✅ عند تحميل الصفحة، نجيب البيانات من localStorage
onMounted(() => {
  const name = localStorage.getItem('name') || ''
  const nameParts = name.split(' ')
  fname.value = nameParts[0] || ''
  lname.value = nameParts[1] || ''
  email.value = localStorage.getItem('email') || ''
  phone.value = localStorage.getItem('phone') || ''
  imageUrl.value = localStorage.getItem('imageUrl') || defaultAvatar
})
// ✅ رفع صورة جديدة
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  try {
    const previewImage = URL.createObjectURL(file)
    imageUrl.value = previewImage
    const res = await uploadAvatar(file)
    console.log("✅ Avatar upload response:", res.data)
    if (avatar) {
      // Update UI & localStorage
      imageUrl.value = avatar
      localStorage.setItem('imageUrl', avatar)
      const profileRes = await getProfile()
      console.log("📥 Fetched profile:", profileRes.data)
    }
    else {
      throw new Error('❌ لم يتم استلام رابط الصورة من السيرفر')
    }
  } catch (err) {
    toast.success(err.response?.data?.message || ' تم رفع الصورة بنجاح  ')
  }
}
// ✅ حفظ التعديلات على البيانات
const handleUpdateProfile = async () => {
  try {
    const payload = {
      name: `${fname.value} ${lname.value}`,
      email: email.value,
      phone: phone.value,
      country_code,
      lang: 'en'
    }
    if (password.value.trim()) {
      payload.password = password.value.trim()
    }
    const res = await updateProfile(payload)
    let msg = res.data.message
    if (msg === 'Profile updated successfully') {
      msg = ' تم تحديث بياناتك بنجاح'
    }
    toast.success(msg)
    // تحديث البيانات في localStorage
    localStorage.setItem('name', payload.name)
    localStorage.setItem('email', payload.email)
    localStorage.setItem('phone', payload.phone)
  } catch (err) {
    toast.error(err.response?.data?.message || ' فشل التحديث')
  }
}
// ✅ تسجيل الخروج
const handleLogout = () => {
  const savedLang = localStorage.getItem('lang') || 'ar'
  localStorage.clear()
  localStorage.setItem('lang', savedLang)
  toast.info('تم تسجيل الخروج')
  router.push('/login')
}
</script>
