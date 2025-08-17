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
        <h2 class="text-[#D9D9D9] text-3xl mt-7 font-bold">حدد الفئة</h2>
        <div class="space-y-6 my-3" style="margin: 20px 10px;">
          <!-- لوب على كل مجموعة من 10 -->
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="category in visibleCategories" :key="category.id" @click="toggleCategory(category.id)" :class="[
              'rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative group cursor-pointer flex flex-col items-center p-3',
              selectedCategories.includes(category.id)
                ? 'border-2 border-purple-600 bg-purple-50'
                : canSelectMore
                  ? 'border border-transparent bg-transparent'
                  : 'opacity-50 cursor-not-allowed',
            ]" class="bg-gradient-to-b from-yellow-400 to-red-500">
              <img :src="category.image_url" alt="صورة التصنيف"
                class="w-full h-28 object-contain mb-3 rounded-xl mt-3.5" />
              <div class="flex items-center justify-between w-full mb-1 px-1">
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
                      <div class="load-more-container mt-8 flex h-fit  justify-center self-center">
            <button v-if="itemsToShow < categories.length" @click="itemsToShow += 10"
              class="px-6 py-3  text-white rounded-lg shadow-lg cursor-pointer bg-gradient-to-l from-red-500 to-yellow-400 transition font-semibold">
              تحميل المزيد
            </button>
          </div>
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
<button
  @click="startGame"
  class="flex justify-center items-center w-full cursor-pointer p-4 mx-4 mb-5 bg-gradient-to-l from-red-500 to-yellow-400 text-white rounded-lg py-2 font-semibold hover:bg-red-600 transition"
>
  التالي
</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getCategories } from '../../../services/categoryService'
import buy from '../../../components/buy.vue'
import bg from '../../../assets/imgs/splash.png'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()
const itemsToShow = ref(10);
// const gameName = ref('')
const activeHintId = ref(null);
const categories = ref([])
const selectedCategories = ref([])
const toggleCategory = (id) => {
  if (selectedCategories.value.includes(id)) {
    selectedCategories.value = selectedCategories.value.filter((i) => i !== id)
  } else {
    if (selectedCategories.value.length < 6) {
      selectedCategories.value.push(id)
    } else {
      toast.info('لا يمكنك اختيار أكثر من 6 تصنيفات')
    }
  }
}
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
// const chunkedCategories = computed(() => {
//   const chunks = []
//   for (let i = 0; i < categories.value.length; i += 10) {
//     chunks.push(categories.value.slice(i, i + 10))
//   }
//   return chunks
// })
onMounted(async () => {
  try {
    const res = await getCategories();
    categories.value = res.data.result.data.map(cat => ({
      ...cat,
      image_url: cat.image.startsWith('http')
        ? cat.image
        : `http://game-wise.smartleadtech.com/${cat.image.replace(/^\/+/, '')}`
    }));
  } catch (err) {
    console.error("فشل في جلب التصنيفات", err);
  }
});
onMounted(async () => {
  const res = await getCategories()
  categories.value = res.data.data
})
const visibleCategories = computed(() => categories.value.slice(0, itemsToShow.value));
const startGame = () => {
  if (selectedCategories.value.length === 0) {
    toast.error('اختر فئة واحدة على الأقل للمتابعة')
    return
  }
  router.push({
    path: '/chooseplayer',
    query: {
      categories: selectedCategories.value.join(',')
    }
  })
}
</script>
