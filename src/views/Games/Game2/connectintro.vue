<!-- components/StartGameModal.vue -->
<template>
  <div class="min-h-screen w-full bg-cover bg-center bg-no-repeat" :style="`background-image: url(${bg});`">
        <router-link to="/ChooseGame"
      class="  fixed top-5 left-0 m-4 flex justify-between items-center  text-start bg-[#010035] shadow-lg rounded-lg z-50">
      <img src="../../../assets/imgs/close_btn.svg" alt="Logo" class="w-10 z-10 " />
    </router-link>
    <buy></buy>
    <div class=" inset-0  bg-opacity-60 flex justify-center items-center z-50">
      <div class="mt-30 flex flex-col items-center">
        <img src="../../../assets/imgs/Group 12.svg">
        <h2 class="text-[#D9D9D9] text-3xl mt-7 font-bold">{{ $t("cat") }}</h2>
<div class="space-y-6 my-3" style="margin: 20px 10px;"
  >
  <!-- عرض الفئات حسب التصنيف الرئيسي -->
  <div v-for="parentName in parentCategories" :key="parentName">
    <h2 class="text-xl sm:text-2xl font-bold text-white mb-4" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">{{ parentName }}</h2>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"   :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">
      <div
        v-for="category in visibleCategories.filter(c => (c.parent?.name || 'بدون تصنيف رئيسي') === parentName)"
        :key="category.id"
        @click="toggleCategory(category.id)"
        :class="[
          'rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative group cursor-pointer flex flex-col items-center p-3',
          selectedCategories.includes(category.id)
            ? 'border-2 border-purple-600 bg-purple-50'
            : canSelectMore
              ? 'border border-transparent bg-transparent'
              : 'opacity-50 cursor-not-allowed',
        ]"
        class="bg-gradient-to-b from-yellow-400 to-red-500"
      >
        <img :src="category.image_url" alt="صورة التصنيف"
          class="w-full h-28 object-contain mb-3 rounded-xl mt-3.5" />
        <div class="flex items-center justify-between w-full mb-1 px-1"
        >
          <button @click.stop="toggleHint(category.id)"
            class="text-amber-700 cursor-pointer text-sm bg-white rounded-full px-3 py-1 font-bold focus:outline-none"
            title="عرض التلميح">
            i
          </button>
          <h5 class="text-[18px] font-bold text-white truncate text-end ml-2" dir="rtl">
            {{ category.name }}
          </h5>
        </div>
      </div>
    </div>
  </div>
                        <button v-if="itemsToShow < categories.length" @click="itemsToShow += 10"
      class="px-6 py-3  self-end mx-2 text-white rounded-lg shadow-lg cursor-pointer bg-gradient-to-l from-red-500 to-yellow-400 transition font-semibold">
      {{ $t("loadmore") }}
    </button>
  <!-- زر تحميل المزيد -->
  <div class="load-more-container mt-8 flex h-fit items-center  justify-around self-center">
    <button
  @click="startGame"
 class="px-6 py-3 w-full mx-2 text-white rounded-lg shadow-lg cursor-pointer bg-gradient-to-l from-red-500 to-yellow-400 transition font-semibold">
 {{ $t("next") }}
</button>
  </div>
</div>
        <!-- هذا هو بار التلميح الثابت أسفل الشاشة -->
        <div v-if="activeHintId !== null"
          class="fixed bottom-0 left-0 w-full text-white text-sm p-4 rounded-t-lg shadow-lg z-50 bg-gradient-to-l from-red-500 to-yellow-400 "
          dir="rtl">
          <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              💡 {{
                categories.find(cat => cat.id === activeHintId)?.hint || 'لا يوجد تلميح'
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getCategories } from '../../../services/categoryService'
import buy from '../../../components/buy.vue'
import bg from '../../../assets/imgs/splash.png'
import { useToast } from 'vue-toastification'
const { locale } = useI18n()
const currentLang = locale.value
const toast = useToast()
const router = useRouter()
// 🟡 عدد العناصر اللي بتظهر كل مرة
const itemsToShow = ref(10)
const activeHintId = ref(null)
const categories = ref([])
const selectedCategories = ref([])
// ✅ تحميل الفئات مرة واحدة
onMounted(async () => {
  try {
    const res = await getCategories({ game: 2 }, currentLang)
    const data = res.data?.result?.data || res.data?.data || []
    categories.value = data.map(cat => {
      const imageSrc =
        cat.image_url ||
        cat.image ||
        cat.image_path ||
        cat?.media?.original_url ||
        null
      const fullImage = imageSrc
        ? imageSrc.startsWith('http')
          ? imageSrc
          : `https://game-wise.smartleadtech.com/${imageSrc.replace(/^\/+/, '')}`
        : '/default-placeholder.png'
      return { ...cat, image_url: fullImage }
    })
  } catch (err) {
    console.error('فشل في جلب التصنيفات:', err)
    toast.error('حدث خطأ أثناء تحميل التصنيفات')
  }
})
// ✅ فصل التصنيفات: اللي ليها Parent واللي بدون
const withParent = computed(() => categories.value.filter(c => c.parent?.name))
const withoutParent = computed(() => categories.value.filter(c => !c.parent?.name))
// ✅ ترتيب العرض: كل اللي ليهم Parent فوق، واللي بدون Parent يظهر 10 10
const visibleCategories = computed(() => [
  ...withParent.value,
  ...withoutParent.value.slice(0, itemsToShow.value)
])
// ✅ ترتيب أسماء التصنيفات الرئيسية بحيث "بدون تصنيف رئيسي" ييجي في الآخر
const parentCategories = computed(() => {
  const parents = visibleCategories.value.map(c => c.parent?.name || 'بدون تصنيف رئيسي')
  const uniqueParents = [...new Set(parents)]
  return uniqueParents.sort((a, b) =>
    a === 'بدون تصنيف رئيسي' ? 1 : b === 'بدون تصنيف رئيسي' ? -1 : 0
  )
})
// ✅ زرار تحميل المزيد يزود من اللي بدون Parent فقط
const loadMore = () => {
  if (itemsToShow.value < withoutParent.value.length) {
    itemsToShow.value += 10
  }
}
// ✅ اختيار تصنيف واحد فقط
const toggleCategory = (id) => {
  if (selectedCategories.value.includes(id)) {
    selectedCategories.value = []
  } else {
    selectedCategories.value = [id]
    toast.success('اضغط زر "التالي" للمتابعة', {
      timeout: 4000,
      position: 'top-right',
    })
  }
}
// ✅ عرض التلميح لمدة 5 ثواني
const toggleHint = (id) => {
  if (activeHintId.value === id) {
    activeHintId.value = null
  } else {
    activeHintId.value = id
    setTimeout(() => {
      if (activeHintId.value === id) {
        activeHintId.value = null
      }
    }, 5000)
  }
}
// ✅ بدء اللعبة
const startGame = () => {
  if (selectedCategories.value.length === 0) {
    toast.error('اختر فئة واحدة للمتابعة')
    return
  }
  router.push({
    path: '/chooseplayer',
    query: { categories: selectedCategories.value.join(',') }
  })
}
</script>
