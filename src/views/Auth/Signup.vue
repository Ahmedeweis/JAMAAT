<template>
  <div class="bg-cover bg-center min-h-screen flex   justify-center items-center"
    :style="`background-image: url(${bg});`">
    <div class="flex items-center flex-row-reverse justify-around w-full pt-[30px]  md:flex-row gap-8 ">
      <div>
        <img src="../../assets/imgs/logo.png">
      </div>
      <div class="rounded-3xl p-6 w-full max-w-md shadow-lg">
        <div class="flex justify-between bg-white text-gray-500 mb-4 p-4 rounded-2xl font-bold"
          style="font-family: 'Kufam', sans-serif;">
          <router-link to="/signup" class="text-[#E3614E]">{{ $t('createAccount') }}</router-link>
          <router-link to="/login">{{ $t('login') }}</router-link>
        </div>
        <form class="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg" style="font-family: 'Cairo', sans-serif;">
          <div class="space-y-4 text-start">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- إسم العائلة -->
              <div class="flex flex-col text-right">
                <label class="text-[#663D9C] mb-1 text-justify">{{ $t('lastName') }}</label>
                <input v-model="lname" type="text"
                  class="p-2 rounded-3xl text-[#24054C] bg-purple-50 border-2 border-purple-50
                         focus:border-[#3F0092] focus:outline-none text-right placeholder-[#D5C1EE]"
                           :class="{
    'placeholder:text-left text-left': $i18n.locale === 'en',
    'placeholder:text-right text-right': $i18n.locale === 'ar'
  }"
                  :placeholder="$t('enterLastName')" />
              </div>
              <!-- الإسم الأول -->
              <div class="flex flex-col text-right">
                <label class="text-[#663D9C] mb-1 text-justify">{{ $t('firstName') }}</label>
<input
  type="text"
  v-model="fname"
  :placeholder="$t('enterFirstName')"
  class="p-2 rounded-3xl bg-purple-50 border-2 border-purple-50
         focus:border-[#3F0092] focus:outline-none
         text-[#24054C]"
  :class="{
    'placeholder:text-left text-left': $i18n.locale === 'en',
    'placeholder:text-right text-right': $i18n.locale === 'ar'
  }"
/>
              </div>
            </div>
            <!-- البريد -->
            <div class="flex flex-col text-right">
              <label class="text-purple-800 mb-1 text-justify">{{ $t('email') }}</label>
              <input type="email" v-model="email"
                class="p-2 placeholder-[#D5C1EE] text-[#24054C] font-bold text-left rounded-3xl
                       bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                :placeholder="$t('enterEmail')" />
            </div>
            <!-- الهاتف -->
            <div class="flex gap-2 w-full justify-between items-center">
              <input type="tel" v-model="phone" :placeholder="$t('phoneNumber')"
                class="p-2 rounded-3xl bg-purple-50 border-2 border-purple-50
                       focus:border-[#3F0092] focus:outline-none flex-1 text-right"
                         :class="{
    'placeholder:text-left text-left': $i18n.locale === 'en',
    'placeholder:text-right text-right': $i18n.locale === 'ar'
  }"
                       />
              <!-- كود الدولة -->
              <div class="relative">
                <div
                  @click="open = !open"
                  class="p-2 w-[80px] bg-purple-50 border-2 border-purple-200 rounded-md cursor-pointer
                         flex justify-between items-center shadow-sm hover:border-purple-400"
                >
                  <span class="truncate">{{ selectedCountry || "+20" }}</span>
                  <svg class="w-4 h-4 ml-2 transform" :class="{'rotate-180': open}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div
                  v-if="open"
                  class="absolute right-0 w-[180px] bg-white border border-gray-200 shadow-lg z-50 mt-1
                         max-h-64 overflow-y-auto rounded-md"
                >
                  <div
                    v-for="country in countries"
                    :key="country.code"
                    @click="selectCountry(country)"
                    class="p-2 hover:bg-purple-100 cursor-pointer flex justify-between items-center"
                  >
                    <span class="font-semibold w-16">{{ country.code }}</span>
                    <span>{{ country.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- كلمة المرور -->
            <div class="flex flex-col text-right">
              <label class="text-purple-800 mb-1 text-justify">{{ $t('password') }}</label>
              <input type="password" v-model="password"
                class="p-2 placeholder-[#D5C1EE] text-[#24054C] text-right rounded-3xl
                       bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                         :class="{
    'placeholder:text-left text-left': $i18n.locale === 'en',
    'placeholder:text-right text-right': $i18n.locale === 'ar'
  }"
                :placeholder="$t('enterPassword')" />
            </div>
            <!-- تأكيد كلمة المرور -->
            <div class="flex flex-col text-right">
              <label class="text-purple-800 mb-1 text-justify">{{ $t('confirmPassword') }}</label>
              <input type="password" v-model="confirmPassword"
                class="p-2 placeholder-[#D5C1EE] text-[#24054C] text-right rounded-3xl
                       bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                         :class="{
    'placeholder:text-left text-left': $i18n.locale === 'en',
    'placeholder:text-right text-right': $i18n.locale === 'ar'
  }"
                :placeholder="$t('confirmPassword')" />
            </div>
          </div>
        </form>
        <button @click="handleRegister"
          class="w-full cursor-pointer bg-[#E3614E] text-white p-3 rounded-4xl mt-6 hover:bg-red-600 transition duration-200">
          {{ $t('createAccount') }}
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
import { countries } from '../../services/countries'
const router = useRouter()
const toast = useToast()
const fname = ref('')
const lname = ref('')
const fullName = computed(() => `${fname.value} ${lname.value}`)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone = ref('')
const selectedCountry = ref(countries[0].code)
const open = ref(false)
const isLoading = ref(false) // <-- هنا حالة التحميل
function selectCountry(country) {
  selectedCountry.value = country.code
  open.value = false
}
const handleRegister = async () => {
  if (isLoading.value) return // منع الضغط المتكرر
  if (password.value !== confirmPassword.value) {
    toast.error('كلمة المرور غير متطابقة')
    return
  }
  isLoading.value = true // بدء التحميل
  try {
    const res = await register({
      name: fullName.value,
      email: email.value,
      phone: phone.value,
      country_code: selectedCountry.value,
      lang: "en",
      password: password.value
    })
    toast.success(res.data.message || 'تم التسجيل بنجاح')
    setTimeout(() => {
      router.push({
        path: '/verify',
        query: { email: email.value },
      })
    }, 2000)
  } catch (err) {
    const errors = err.response?.data
    if (errors && typeof errors === 'object') {
      Object.values(errors).forEach(errorArray => {
        if (Array.isArray(errorArray)) {
          errorArray.forEach(msg => toast.error(` ${msg},`))
        }
      })
    } else {
      toast.error(err.response?.data?.message || 'حدث خطأ في التسجيل')
    }
  } finally {
    isLoading.value = false // انتهاء التحميل
  }
}
</script>