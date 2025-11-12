<template>
  <div class="min-h-screen bg-cover bg-center flex flex-row-reverse" :style="`background-image: url(${bg});`" :dir="dir">
    <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
      <div class="min-h-screen mt-4 mr-[5px] rounded-3xl bg-white flex flex-col items-center justify-start p-3 sm:p-4">
        <h1 class="text-3xl md:text-4xl font-bold pt-4 " style="font-family: 'Kufam', sans-serif;"> {{ $t("createGame")
          }} </h1>
        <div class="w-full space-y-4">
          <div class="mx-auto bg-white  rounded-2xl space-y-6">
            <!-- إدخال اسم اللعبة -->
            <div class="w-full space-y-4 mt-4" :dir="dir">
              <div class="flex flex-col" :class="dir === 'rtl' ? 'text-right' : 'text-left'">
                <div class="flex justify-between items-center mb-4"
                     >
                                      <label class="text-[#663D9C] mb-3 text-xl sm:text-3xl font-bold text-justify">
                    {{ $t("gameName") }}
                  </label>
                                       <button @click="createGameHandler"
                          class="cursor-pointer bg-red-500 hover:bg-white hover:text-red-500 text-white py-2 sm:py-3 rounded-xl font-bold text-base sm:text-lg transition duration-300 hover:shadow-lg block shadow-[5px_1px_15px_#FB2C36] px-6">
                    {{ $t("createBtn") }}
                  </button>
                </div>
                <input v-model="gameName" type="text"
                       :class="['p-2 placeholder-[#291a3c] text-[#24054C] rounded-lg bg-purple-100 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none', dir === 'rtl' ? 'text-right' : 'text-left']"
                       :placeholder="$t('enterGameName')">
              </div>
            </div>
            <!-- إرشادات -->
            <p class="text-lg text-black font-bold"  style="margin-bottom: 0;">
              {{ $t("chooseCategories") }}
            </p>
            <div class="space-y-6 my-3" >
              <!-- عرض حسب parent -->
              <div v-for="parentName in parentCategories" :key="parentName" class="bg-white rounded-2xl p-4 " style="margin-bottom: 0;">
                <!-- عنوان التصنيف الأب -->
                <h2 class="text-xl sm:text-2xl font-bold text-purple-700 mb-4"
                    :class="dir === 'rtl' ? 'text-right' : 'text-left'">
                  {{ parentName }}
                </h2>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                  <div v-for="category in categories.filter(c => (c.parent?.name || 'بدون تصنيف رئيسي') === parentName)"
                       :key="category.id"
                       @click="toggleCategory(category.id)"
                       :class="[
                         'rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative group cursor-pointer flex flex-col items-center p-3 transform',
                         selectedCategories.includes(category.id)
                           ? 'border-4 border-purple-600 bg-gradient-to-r from-yellow-400 to-red-500 shadow-[0_0_15px_rgba(102,61,156,0.8)]'
                           : 'bg-gradient-to-b opacity-50 from-yellow-400 to-red-500'
                       ]">
                    <img :src="category.image_url" alt="صورة التصنيف"
                         class="w-full h-28 sm:h-36 object-contain mb-3 rounded-xl mt-3" />
                    <div class="flex items-center justify-between w-full mb-1 px-1 sm:px-2"
                         :class="dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'">
                      <h5 class="text-[16px] sm:text-[18px] font-bold text-white truncate line-clamp-2 ml-2"
                          :class="dir === 'rtl' ? 'text-right' : 'text-left'">
                        {{ category.name }}
                      </h5>
                      <button @click.stop="toggleHint(category.id)"
                              class="text-amber-700 cursor-pointer text-sm sm:text-base bg-white rounded-full px-[10px] font-bold focus:outline-none"
                              :title="$t('hint')">
                        i
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- بار التلميح الثابت أسفل الشاشة -->
            <div v-if="activeHintId !== null"
                 class="fixed bottom-0 left-0 w-full text-white text-sm p-4 rounded-t-lg shadow-lg z-50 bg-gradient-to-l from-red-500 to-yellow-400"
                 :dir="dir">
              <div class="max-w-7xl mx-auto flex justify-between items-center">
                <div>
                  💡 {{ categories.find(cat => cat.id === activeHintId)?.hint || $t("noHint") }}
                </div>
                <button @click="activeHintId = null"
                        class="text-purple-white cursor-pointer font-bold px-3 py-1 rounded transition">
                  {{ $t("close") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white bg-opacity-90 shadow-lg my-4 mx-0 sm:mx-4 rounded-4xl overlay flex flex-col pt-64">
      <side justifyClass="justify-start" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from "vue-i18n"
const { t, locale } = useI18n()
const currentLang = localStorage.getItem('locale') || locale.value || 'ar'
import { getCategories } from '../../services/categoryService'
import side from '../../components/side.vue'
import bg from '../../assets/imgs/splash.png'
import { createGame } from '../../services/gameService'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
const router = useRouter()
const toast = useToast()
const gameName = ref('')
const activeHintId = ref(null)
const categories = ref([])
const selectedCategories = ref([])
// دالة اختيار التصنيف
const toggleCategory = (id) => {
  if (selectedCategories.value.includes(id)) {
    selectedCategories.value = selectedCategories.value.filter(i => i !== id)
  } else {
    if (selectedCategories.value.length < 6) selectedCategories.value.push(id)
    else toast.info(
      currentLang === 'ar'
        ? 'لا يمكنك اختيار أكثر من 6 تصنيفات'
        : 'You cannot select more than 6 categories'
    )
  }
}
// دالة تفعيل/إخفاء التلميح
const toggleHint = (id) => {
  activeHintId.value = activeHintId.value === id ? null : id
}
// إنشاء اللعبة
const createGameHandler = async () => {
  if (!gameName.value.trim()) {
    toast.info(t("requiredGameName"))
    return
  }
  if (selectedCategories.value.length === 0) {
    toast.info(t("requiredCategory"))
    return
  }
  try {
    const payload = {
      name: gameName.value,
      categories: selectedCategories.value,
      language: currentLang
    }
    const response = await createGame(payload)
    console.log('تم إنشاء اللعبة:', response.data)
    toast.success(t("gameCreated"))
    gameName.value = ''
    selectedCategories.value = []
  } catch (error) {
    if (error.response) {
      console.error('Response error:', error.response.data)
      const errMsg = error.response.data.errors
      if (errMsg === 'you have no remaining games') {
        toast.info(t("noCredits"))
        setTimeout(() => {
          router.push('/Payment')
        }, 1500)
      } else {
        toast.error(errMsg || t("errorCreating"))
      }
    } else {
      console.error('Error:', error.message)
      toast.error(t("serverError"))
    }
  }
}
onMounted(async () => {
  try {
    const lang = localStorage.getItem('locale') || locale.value || 'ar'
    const res = await getCategories(
      { no_pagination: true, game : 1 },
      lang
    )
    console.log('📦 Categories response:', res.data)
    // تأكد إذا كانت البيانات داخل data أو data.data
    const cats = res.data.data || res.data
    categories.value = cats.map(cat => ({
      ...cat,
      image_url: cat.image_url
    }))
  } catch (err) {
    console.error("⚠️ فشل في جلب التصنيفات", err)
  }
})
// حساب parentCategories
const parentCategories = computed(() => {
  // التصنيفات التي لها parent
  const withParent = categories.value
    .filter(c => c.parent?.name)
    .map(c => c.parent.name);
  // التصنيفات التي بدون parent
  const withoutParent = categories.value
    .filter(c => !c.parent?.name)
    .map(() => 'بدون تصنيف رئيسي');
  // دمج مع إزالة التكرار
  return [...new Set([...withParent, ...withoutParent])];
});
// تحديد اتجاه الصفحة حسب اللغة
const dir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"))
</script>
<style scoped></style>
