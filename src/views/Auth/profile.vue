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
<input
  v-model="lname"
  type="text"
  :placeholder="$t('enterName')"
  :class="[
    'p-2 rounded-3xl text-[#24054C] bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none',
  ]"
/>
            </div>
            <div class="flex flex-col text-right">
              <label class="text-[#663D9C] mb-1  text-justify"> {{ $t('lastName') }}</label>
<input
  v-model="fname"
  type="text"
  :placeholder="$t('enterName')"
  :class="[
    'p-2 rounded-3xl text-[#24054C] bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none',
  ]"
/>
            </div>
          </div>
          <div class="flex flex-col text-right">
            <label class="text-purple-800 mb-1  text-justify">{{ $t('email') }}</label>
            <input type="email" v-model="email" :placeholder="$t('pleaseEnterEmail')"
              class="p-2 placeholder-[#D5C1EE] text-[#24054C] font-bold  rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" />
          </div>
          <div class="flex flex-col text-right">
            <label class="text-purple-800 mb-1  text-justify">{{ $t('phone') }}</label>
            <input type="tel" v-model="phone" :placeholder="$t('pleaseEnterPhone')"
              class="p-2 placeholder-[#D5C1EE] text-[#24054C]  rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" />
          </div>
          <!-- حقل كلمة المرور الجديدة -->
          <div class="flex flex-col text-right">
            <label class="text-purple-800 mb-1 text-justify">{{ $t('newPassword') }}</label>
            <input type="password" v-model="password" placeholder="********"
              class="p-2 placeholder-[#D5C1EE] text-[#24054C]  rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none" />
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
          <button @click="handleUpdateProfile" class="w-full mb-0 cursor-pointer bg-[#E3614D] text-white py-3 rounded-4xl font-bold
         shadow-[5px_5px_15px_#C33520]
         transition duration-300">
            {{ $t('saveChanges') }}
          </button>
<div class="flex flex-col sm:flex-row gap-4 mt-6 justify-center items-center">
  <!-- زر تسجيل الخروج -->
  <button
    @click="handleLogout"
    class="flex items-center justify-center cursor-pointer gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3
           bg-gradient-to-r from-pink-100 to-red-100 text-red-700 font-semibold
           rounded-lg sm:rounded-xl shadow
           hover:from-pink-200 hover:to-red-200
           transition-all duration-300 text-sm sm:text-base"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
    </svg>
    {{ $t('logout') }}
  </button>
  <!-- زر حذف الحساب -->
  <button
    @click="showDeleteModal = true"
    class="flex items-center justify-center cursor-pointer gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3
           bg-red-500 text-white font-semibold rounded-lg sm:rounded-xl
           shadow hover:bg-red-600 transition-all duration-300 text-sm sm:text-base"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3" />
    </svg>
    {{ $t('deleteAccount') }}
  </button>
  <!-- ✅ مودال تأكيد حذف الحساب -->
  <div
    v-if="showDeleteModal"
    class="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 px-4"
  >
    <div
      class="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md text-center space-y-4"
    >
      <h2 class="text-lg sm:text-xl font-bold text-red-600">
        {{ $t('confirmDeleteAccount') }}
      </h2>
      <p class="text-gray-700 text-sm sm:text-base">
         {{ $t('areYouSureToDeleteAccount') }}
      </p>
      <!-- تحذير الاشتراك -->
      <div
        v-if="hasPaidSubscription"
        class="bg-yellow-100 text-yellow-800 p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-semibold"
      >
        <p>{{ $t('paidSubscriptionWarning') }}</p>
      </div>
      <!-- حقل التأكيد -->
      <div class="flex flex-col text-right">
        <label class="text-gray-600 text-xs sm:text-sm mb-1">
          {{ $t('typeDeleteToConfirm') }}
        </label>
        <input
          type="text"
          v-model="confirmationText"
          :placeholder="$t('typeDeletePlaceholder')"
          class="p-2 sm:p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
        />
      </div>
      <!-- الأزرار -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center mt-3">
        <button
          @click="confirmDelete"
          :disabled="!['حذف', 'Delete'].includes(confirmationText.trim())"
          class="px-4 sm:px-5 py-2 cursor-pointer bg-red-500 text-white rounded-lg
                 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base"
        >
          {{ $t('deleteAccount') }}
        </button>
        <button
          @click="showDeleteModal = false"
          class="px-4 sm:px-5 py-2 cursor-pointer bg-gray-200 rounded-lg
                 hover:bg-gray-300 transition text-sm sm:text-base"
        >
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
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import side from '../../components/side.vue'
import bg from '../../assets/imgs/splash.png'
import profileImg from '../../assets/imgs/profile.png'
import { updateProfile, uploadAvatar, deleteAccount } from '../../services/authService'
const { locale } = useI18n()
const router = useRouter()
const toast = useToast()
// reactive state
const fname = ref('')
const lname = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const imageUrl = ref(profileImg)
const showDeleteModal = ref(false)
const country_code = '+20'
// ✅ عند تحميل الصفحة
onMounted(() => {
  // ضبط اللغة من localStorage أول مرة
  const savedLang = localStorage.getItem('locale') || 'ar'
  locale.value = savedLang
  document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
  // جلب بيانات البروفايل من localStorage
  const name = localStorage.getItem('name') || ''
  const nameParts = name.split(' ')
  fname.value = nameParts[0] || ''
  lname.value = nameParts[1] || ''
  email.value = localStorage.getItem('email') || ''
  phone.value = localStorage.getItem('phone') || ''
  imageUrl.value = localStorage.getItem('imageUrl') || profileImg
})
// ✅ تغيير اللغة
const changeLang = (lang) => {
  locale.value = lang               // تحديث Vue I18n reactive
  localStorage.setItem('locale', lang) // حفظ اللغة في localStorage
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  toast.info(lang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English')
}
// ✅ رفع صورة جديدة
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  try {
    const previewImage = URL.createObjectURL(file)
    imageUrl.value = previewImage
    const res = await uploadAvatar(file)
    const avatar = res.data?.avatar
    if (avatar) {
      imageUrl.value = avatar
      localStorage.setItem('imageUrl', avatar)
    } else {
      throw new Error('❌ لم يتم استلام رابط الصورة من السيرفر')
    }
    toast.success('تم رفع الصورة بنجاح')
  } catch (err) {
    toast.error(err.response?.data?.message || err.message || 'فشل رفع الصورة')
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
      lang: locale.value
    }
    if (password.value.trim()) payload.password = password.value.trim() // ✅ إرسال كلمة المرور الجديدة فقط إذا تم إدخالها
    const res = await updateProfile(payload)
    toast.success(res.data.message || 'تم تحديث بياناتك بنجاح')
    // تحديث localStorage
    localStorage.setItem('name', payload.name)
    localStorage.setItem('email', payload.email)
    localStorage.setItem('phone', payload.phone)
    password.value = '' // مسح الحقل بعد التحديث
  } catch (err) {
    toast.error(err.response?.data?.message || 'فشل التحديث')
  }
}
// ✅ تسجيل الخروج
const handleLogout = () => {
  const savedLang = localStorage.getItem('locale') || 'ar'
  localStorage.clear()
  localStorage.setItem('locale', savedLang) // نحتفظ باللغة
  toast.info('تم تسجيل الخروج')
  router.push('/login')
}
// ✅ حذف الحساب
const confirmationText = ref('')
const confirmDelete = async () => {
  // ✅ تحقق من النص
  if (!['حذف', 'Delete'].includes(confirmationText.value.trim())) {
    toast.error('يجب كتابة "حذف" أو "Delete" لتأكيد العملية')
    return
  }
  try {
    loadingDelete.value = true
    // ✅ استدعاء الخدمة
    const response = await deleteAccount()
    toast.success(
      response.data?.message ||
      (locale.value === 'en' ? 'Account deleted successfully' : 'تم حذف الحساب بنجاح')
    )
    // 🧹 تنظيف البيانات وتوجيه المستخدم
    localStorage.clear()
    showDeleteModal.value = false
    confirmationText.value = ''
    router.push('/signup')
  } catch (err) {
    console.error(err)
    toast.error(
      err.response?.data?.message ||
      (locale.value === 'en'
        ? 'An error occurred while deleting your account'
        : 'حدث خطأ أثناء حذف الحساب')
    )
  } finally {
    loadingDelete.value = false
  }
}
</script>
