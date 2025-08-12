<!-- components/StartGameModal.vue -->
<template>
  <div class="min-h-screen w-full bg-cover bg-center bg-no-repeat" :style="`background-image: url(${bg});`">
        <router-link to="/ChooseGame"
      class="  fixed top-5 left-0 m-4 flex justify-between items-center  text-start bg-[#010035] shadow-lg rounded-lg z-50">
      <img src="../../../assets/imgs/close_btn.svg" alt="Logo" class="w-10 z-10 " />
    </router-link>
    <div
      class=" board fixed top-0 right-0 m-4 flex justify-between items-center  w-[200px] text-start bg-[#010035] shadow-lg rounded-lg z-50">
      <img src="../../../assets/imgs/coin.svg" alt="Logo" class="w-8 z-10 coin-icon" />
      <span class="text-2xl font-bold text-white coin-amount">120</span>
      <img src="../../../assets/imgs/Icon-Buttons.svg" alt="Clock Icon" class="w-8 h-8 add-button" />
    </div>
    <div class=" inset-0  bg-opacity-60 flex justify-center items-center z-50">
      <div class="mt-30 flex flex-col items-center">
        <img src="../../../assets/imgs/Group 12.svg">
        <h2 class="text-[#D9D9D9] text-3xl my-7 font-bold">حدد الفئة</h2>
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
<router-link
  :to="{
    path: '/chooseplayer',
    query: {
      id: gameId,
      categories: selectedCategories.join(',')
    }
  }"
  @click="startGame"
  class="flex justify-center items-center w-full cursor-pointer p-4 mb-5 bg-gradient-to-l from-red-500 to-yellow-400 text-white rounded-lg py-2 font-semibold hover:bg-red-600 transition"
>
  التالي
</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { getCategories } from '../../../services/categoryService'
import bg from '../../../assets/imgs/splash.png'
import { useToast } from 'vue-toastification'
const toast = useToast()
const itemsToShow = ref(10);
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
</script>
<style scoped>
/* خلفية اللوحة */
.board {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  padding: 10px 11px 10px 11px;
  background: #010035;
  border-radius: 12px;
  box-shadow:
    0 0 5px 2px rgba(0, 0, 0, 0.6),
    inset 0 0 8px 2px rgba(255, 255, 255, 0.05);
  font-family: Arial, sans-serif;
  color: white;
  font-weight: 700;
  user-select: none;
  z-index: 1000;
}
/* تصميم شكل الإطار الخارجي مع الأطراف الدائرية والأنبوب */
.board::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 18px;
  pointer-events: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
}
/* أيقونة العملة (العملة الذهبية بالدولار) */
.coin-icon {
  flex-shrink: 0;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #f9d54f 0%, #de8b00 80%);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.6),
    inset 0 -5px 10px #b17d00,
    0 4px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
/* رمز الدولار */
.coin-icon::after {
  content: "$";
  font-weight: 900;
  font-size: 2.2rem;
  color: #fff9d7;
  text-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.4);
  position: relative;
  top: 2px;
}
/* العدد */
.coin-amount {
  margin: 0 12px;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  flex-grow: 1;
  text-align: center;
}
/* زر الإضافة الأخضر */
.add-button {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(180deg, #50f060 0%, #009f2d 100%);
  box-shadow:
    inset 0 4px 5px rgba(255, 255, 255, 0.35),
    0 4px 8px rgba(0, 120, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;
  cursor: pointer;
}
.add-button:hover {
  background: linear-gradient(180deg, #70ff82 0%, #00c03f 100%);
}
/* رمز زائد داخل الزر */
.add-button::before {
  content: "+";
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  line-height: 1;
  user-select: none;
  position: relative;
  top: 1px;
}
</style>
