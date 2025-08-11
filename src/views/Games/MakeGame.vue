<template>
  <div class="min-h-screen bg-cover bg-center flex" :style="`background-image: url(${bg});`">
    <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
      <div class="min-h-screen mt-4 mr-[5px] rounded-3xl bg-white flex flex-col items-center justify-start p-3 sm:p-4">
        <h1 class="text-3xl md:text-4xl font-bold pt-4 " style="font-family: 'Kufam', sans-serif;"> إنشاء لعبة </h1>
        <div class="w-full space-y-4 ">
          <div class=" mx-auto bg-white shadow-xl rounded-2xl  space-y-6">
            <!-- إدخال اسم اللعبة -->
            <div class="w-full space-y-4 mt-4" dir="rtl">
              <!-- اسم اللعبة -->
              <div class="flex flex-col text-right">
                <div class="flex justify-between items-center mb-4">
                  <label class="text-[#663D9C] mb-3 text-xl sm:text-3xl  font-bold">إسم اللعبة</label>
                  <!-- زر الإنشاء -->
                  <button @click="createGameHandler" class="cursor-pointer bg-red-500 hover:bg-white hover:text-red-500 text-white py-2 sm:py-3 rounded-xl font-bold text-base sm:text-lg transition duration-300 hover:shadow-lg
                  block shadow-[5px_1px_15px_#FB2C36] px-6">
                    إنشاء اللعبة
                  </button>
                </div>
                <input v-model="gameName" type="text"
                  class="p-2  placeholder-[#291a3c] text-[#24054C]  rounded-lg  bg-purple-100 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right "
                  placeholder="مثال : تحدي لعبة الألوان">
              </div>
            </div>
            <!-- إرشادات -->
            <p class="text-sm text-gray-500 text-end font-bold">: أختر التصنيفات التي ترغب في تضمينها في اللعبة </p>
            <div class="space-y-6 my-3" style="margin: 20px 10px;">
              <!-- لوب على كل مجموعة من 10 -->
              <div v-for="(group, groupIndex) in chunkedCategories" :key="groupIndex" class="bg-white rounded-2xl">
                <div class="grid grid-cols-2 gap-1 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  <div v-for="category in group" :key="category.id" @click="toggleCategory(category.id)" :class="[
                    'rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative group cursor-pointer',
                    selectedCategories.includes(category.id)
                      ? 'border-2 border-purple-600 bg-purple-50'
                      : 'bg-[#FAFBF5] '
                  ]">
                    <!-- صورة -->
                    <img src="../../assets/imgs/upload.png" alt="صورة التصنيف"
                      class="w-full h-28 sm:h-36 object-contain mb-3 rounded-xl" />
                    <!-- عنوان + زر التلميح -->
 <div class="flex items-center justify-between mb-1 p-1 sm:p-2">
                <button @click="toggleHint(category.id)"
                  class="text-white cursor-pointer hover:text-purple-800 text-sm sm:text-xl bg-purple-400 rounded-full px-[13px] py-[2px] font-bold focus:outline-none"
                  title="عرض التلميح">
                  i
                </button>
                <h5
                  class="text-[14px] sm:text-sm font-bold bg-gray-800/60 text-white px-2 sm:px-3 py-1 rounded-lg line-clamp-2 text-end ml-[5px] truncate"
                  dir="rtl">
                  {{ category.name }}
                </h5>
              </div>
                  </div>
                </div>
              </div>
            </div>
             <!-- هذا هو بار التلميح الثابت أسفل الشاشة -->
              <div v-if="activeHintId !== null"
                class="fixed bottom-0 left-0 w-full text-white text-sm p-4 rounded-t-lg shadow-lg z-50 bg-gradient-to-l from-purple-700 to-purple-400"
                dir="rtl">
                <div class="max-w-7xl mx-auto flex justify-between items-center">
                  <div>
                    💡 {{
                      categories.find(cat => cat.id === activeHintId)?.hint || 'لا يوجد تلميح'
                    }}
                  </div>
                  <button @click="activeHintId = null"
                    class="text-purple-white cursor-pointer font-bold px-3 py-1 rounded hover:bg-purple-300 transition">
                    إغلاق
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
import { getCategories } from '../../services/categoryService'
import side from '../../components/side.vue'
import bg from '../../assets/imgs/splash.png'
import { createGame } from '../../services/gameService'
import { useToast } from 'vue-toastification'
const toast = useToast()
const gameName = ref('')
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
  activeHintId.value = activeHintId.value === id ? null : id
}
const chunkedCategories = computed(() => {
  const chunks = []
  for (let i = 0; i < categories.value.length; i += 10) {
    chunks.push(categories.value.slice(i, i + 10))
  }
  return chunks
})
const createGameHandler = async () => {
  if (!gameName.value.trim()) {
    toast.info(' يرجى إدخال اسم اللعبة')
    return
  }
  if (selectedCategories.value.length === 0) {
    toast.info(' يرجى اختيار تصنيف واحد على الأقل')
    return
  }
  try {
    const payload = {
      name: gameName.value,
      categories: selectedCategories.value,
    }
    const response = await createGame(payload)
    console.log(' تم إنشاء اللعبة:', response.data)
    toast.success(' تم إنشاء اللعبة بنجاح!')
    gameName.value = ''
    selectedCategories.value = []
  } catch (error) {
    if (error.response) {
      console.error(' Response error:', error.response.data)
      const errMsg = error.response.data.errors
      if (errMsg === 'you have no remaining games') {
        toast.info('ليس لديك رصيد كافٍ لإنشاء ألعاب جديدة.')
      } else {
        toast.error(errMsg || ' حدث خطأ أثناء إنشاء اللعبة.')
      }
    } else {
      console.error(' Error:', error.message)
      toast.error('لم يتم الاتصال بالسيرفر.')
    }
  }
}
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
</script>
<style scoped></style>
