<template>
  <div class="min-h-screen bg-cover bg-center flex flex-row-reverse" :style="`background-image: url(${bg});`">
    <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
      <div class="min-h-screen mt-4 mr-[5px] rounded-3xl bg-white flex flex-col items-center justify-start p-4">
        <h1 class="text-3xl md:text-4xl font-bold mb-8" style="font-family: 'Kufam', sans-serif;">{{ $t("faq") }}</h1>
        <div class="w-full max-w-md space-y-4 ">
          <section class="mt-4">
            <div class="space-y-4 ">
              <div v-for="(faq, index) in faqs" :key="index"
                class="bg-white  rounded-xl shadow-md border border-purple-700">
                <button @click="toggleFAQ(index)"
                  class="w-full text-xl cursor-pointer flex justify-between items-start text-right font-semibold rounded-xl focus:outline-none px-3 pb-4 pt-4 transition-colors duration-300"
                  :class="faq.open ? 'bg-[#01004C] text-white' : 'text-[#3F0092] bg-white'">
                  <span :class="{ 'rotate-180': faq.open }" class="inline-block mr-2 transition-transform">
                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  {{ faq.question }}
                </button>
                <div v-if="faq.open" class=" mb-4 p-4 pb-0 text-[#24054D] font-bold text-lg text-right leading-relaxed">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </section>
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
import bg from '../../assets/imgs/splash.png'
import side from '../../components/side.vue'
import { GetFAQ } from '../../services/supportService'
const faqs = ref([])
const { locale } = useI18n() // 👈 هنا بنجيب اللغة الحالية من i18n
onMounted(async () => {
  try {
    const currentLang = locale.value || 'ar' // 👈 fallback للغة افتراضية لو فاضية
    console.log('🟢 اللغة المرسلة:', currentLang)
    const res = await GetFAQ(currentLang) // 👈 نبعت اللغة الحالية
    faqs.value = res.data.data.map(item => ({
      ...item,
      open: false
    }))
  } catch (error) {
    console.error('❌ حدث خطأ أثناء تحميل الأسئلة:', error)
  }
})
const toggleFAQ = (index) => {
  faqs.value = faqs.value.map((item, i) => ({
    ...item,
    open: i === index ? !item.open : false
  }))
}
</script>
