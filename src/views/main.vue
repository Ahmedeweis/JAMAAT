<template>
  <div class="min-h-screen w-full bg-cover bg-center  flex flex-row-reverse" :style="`background-image: url(${bg});`">
    <div class="flex-1  rounded-2xl sm:rounded-3xl" :style="`background-image: url(${bg});`">
      <div class="flex flex-col md:flex-row gap-4 px-2 sm:px-4">
        <!--  البلوك الأول -->
        <div
          class="flex-1  flex items-center  justify-center bg-white mt-4  rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg">
          <div class="flex md:flex-row items-center justify-between gap-4">
            <button @click="confirmCoupon"
              class="cursor-pointer bg-red-500 mt-[35px] text-white px-3 py-1 sm:px-6 sm:py-2 text-sm sm:text-base rounded-full font-semibold hover:bg-red-600 transition duration-200"
              :disabled="!couponCode">
              تأكيد
            </button>
            <div class="flex flex-col text-end">
              <div class="flex items-center justify-end space-x-2 mb-2 ">
                <span class="text-lg text-black font-semibold">تفعيل رصيدك</span>
                <img src="../assets/imgs/lighting.svg" class="w-5 h-5">
              </div>
              <input type="tel" v-model="phone"
                class="p-1 sm:p-2 text-sm sm:text-base placeholder-[#D5C1EE] border-2 border-solid border-[#3F0092] text-[#24054C] text-right rounded-3xl bg-[#ECE1FB] focus:border-[#3F0092] focus:outline-none"
                placeholder="كود الكوبون">
            </div>
            <!-- ✅ رصيد الألعاب -->
            <div class="flex items-end justify-center gap-2 flex-col rounded-full p-2 text-white">
              <div class="flex items-center space-x-2">
                <span class="text-lg text-black font-semibold">رصيد ألعابك</span>
                <img src="../assets/imgs/coin.svg" class="w-5 h-5">
              </div>
              <div
                class="flex items-center bg-[#ECE1FB] border-4 border-solid border-[#000000] rounded-full px-1 py-1 relative pr-7 w-[130px] h-[45px] justify-center">
                <span class="text-[#AC3F2F] font-semibold flex justify-end items-start">
                  <span class="mr-[5px]">لعبة</span> {{ remainig_game }}
                </span>
                <button @click="increaseBalance"
                  class="bg-black text-[#E3614E] font-bold text-base absolute right-[-10px] rounded-3xl border-2 border-solid border-black">
                  <router-link to="/Payment" class="text-2xl px-2 mb-[2px] inline-block">+</router-link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--  البلوك الثاني -->
        <div
          class="flex-1 bg-white text-gray-800 flex justify-center items-center flex-col mt-2 sm:mt-4 rounded-2xl p-6 text-center">
          <h2 class="text-lg sm:text-2xl font-bold text-red-500">اشتري أكثر - وفر أكثر</h2>
          <p class="m-4">يمكنك إنشاء حتى 10 ألعاب</p>
          <router-link to="/MakeGame"
            class="w-full md:w-2/3 cursor-pointer bg-[#E3614D] flex justify-center items-center text-white py-3 rounded-4xl font-bold shadow-[5px_5px_15px_#C33520] transition duration-300">
            إنشاء لعبة
          </router-link>
        </div>
      </div>
      <!-- <h1 class="flex justify-center"> <router-link to="/apitest" class="text-white teext-center">api test</router-link></h1> -->
      <div class="bg-white text-gray-800 rounded-2xl p-6 mb-4 text-center"
        style="font-family: 'Kufam', sans-serif;margin: 20px 10px;">
        <router-link to="/GameLib">
          <h2 class="text-2xl font-bold  text-purple-700" style="font-family: 'Rubik';  "> JAMAAT مكتبة ألعاب</h2>
          <p>يمكنك العثور على جميع الالعاب التي قام جامات بإضافتها و شرائها </p>
        </router-link>
      </div>
      <div class="bg-white rounded-2xl p-2 mb-4" style="font-family: 'Kufam', sans-serif;margin: 20px 10px;">
        <div class="flex justify-center font-bold gap-3 text-xl">
          <button @click="setActiveTab('games')" :class="[
            'w-1/2 py-3 rounded-2xl font-bold cursor-pointer transition',
            activeTab === 'games'
              ? 'bg-red-100 text-red-500'
              : 'text-gray-500 hover:bg-red-100'
          ]">
            ألعابي
          </button>
          <button @click="setActiveTab('categories')" :class="[
            'w-1/2 py-3 rounded-2xl font-bold cursor-pointer transition',
            activeTab === 'categories'
              ? 'bg-red-100 text-red-500'
              : 'text-gray-500 hover:bg-red-100'
          ]">
            جميع الفئات
          </button>
        </div>
      </div>
      <div class="space-y-6 my-3" style="margin: 20px 10px;">
<div v-if="activeTab === 'categories'">
  <div v-for="parentName in parentCategories" :key="parentName" class="bg-white p-3 rounded-2xl mb-4">
    <h2 class="text-xl sm:text-2xl font-bold text-purple-700 mb-4" dir="rtl">{{ parentName }}</h2>
    <div class="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" dir="rtl">
      <div v-for="category in categories.filter(c => (c.parent?.name || 'بدون تصنيف رئيسي') === parentName)" :key="category.id"
        class="grid grid-cols-1 gap-2 sm:gap-4 bg-gradient-to-b from-yellow-400 to-red-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative group">
        <img :src="category.image_url" alt="صورة التصنيف"
          class="w-full h-36 object-contain mb-3 rounded-xl mt-3" />
        <div class="flex items-center justify-between mb-4 px-2 ">
          <h5 class="text-[16px] font-bold text-white truncate text-end ml-2 line-clamp-2"
            dir="rtl">
            {{ category.name }}
          </h5>
                    <button @click="toggleHint(category.id)"
            class="text-amber-700 cursor-pointer text-sm bg-white rounded-full px-3 py-1 font-bold hover:bg-yellow-200 focus:outline-none"
            title="عرض التلميح">
            i
          </button>
        </div>
        <div v-if="activeHintId !== null"
          class="fixed bottom-0 left-0 w-full text-white text-sm p-4 rounded-t-lg z-50
                bg-gradient-to-l from-red-500 to-yellow-400 "
          dir="rtl">
          <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              💡
              {{
                categories.find(cat => cat.id === activeHintId)?.hint || 'لا يوجد تلميح'
              }}
            </div>
            <button @click="activeHintId = null"
              class="text-white cursor-pointer font-bold px-3 py-1 rounded  transition">
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <div v-if="games.length === 0" class="text-center flex flex-col justify-center items-center bg-white p-6 rounded-2xl shadow-md h-[300px]">
    <p class="text-gray-500 mb-4 text-lg">🚫 لا توجد ألعاب حتى الآن</p>
    <router-link to="/MakeGame"
      class="bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-red-600 transition">
      إنشاء لعبة جديدة
    </router-link>
  </div>
        <div v-else v-for="game in games" :key="game.id" class="mb-6 bg-white p-3 rounded-2xl">
          <div class="  bg-[#FEF2E7] p-4 rounded-2xl shadow-md ">
            <div class="flex items-center justify-between mb-4">
              <router-link :to="{
                name: 'StartGame',
                query: { id: game.game.id }
              }" class="cursor-pointer bg-red-500 w-25 text-center text-white px-3 py-1 sm:px-6 sm:py-2 text-sm sm:text-base rounded-full font-semibold hover:text-red-600 hover:bg-white transition duration-200">
                ابدأ
              </router-link>
              <h2 class="text-2xl font-bold mb-4 text-purple-700 text-end"> {{ game.game.name }}</h2>
            </div>
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" dir="rtl">
  <div v-for="categoryWrapper in game.game.game_category" :key="categoryWrapper.category.id"
       class="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative group p-4
              bg-gradient-to-b from-yellow-400 to-red-500">
    <img :src="categoryWrapper.category.image_url" alt="صورة التصنيف"
         class="w-full h-36 object-contain mb-3 rounded-xl mt-3" />
    <div class="flex items-center justify-between mb-1 px-2">
      <h5 class="text-[16px] font-bold text-white truncate line-clamp-2 text-end ml-2"
          dir="rtl">
        {{ categoryWrapper.category.name }}
      </h5>
      <button @click="toggleHint(categoryWrapper.category.id)"
              class="text-amber-700 cursor-pointer text-sm bg-white rounded-full px-3 py-1 font-bold hover:bg-yellow-200 focus:outline-none"
              title="عرض التلميح">
        i
      </button>
    </div>
    <div v-if="activeHintId !== null"
         class="fixed bottom-0 left-0 w-full text-white text-sm p-4 rounded-t-lg shadow-lg z-50
                bg-gradient-to-l from-red-500 to-yellow-400 "
         dir="rtl">
      <div class="max-w-7xl mx-auto flex justify-between items-center ">
        <div>
          💡
          {{
            categories.find(cat => cat.id === activeHintId)?.hint || 'لا يوجد تلميح'
          }}
        </div>
        <button @click="activeHintId = null"
                class="text-white cursor-pointer font-bold px-3 py-1 rounded transition">
          إغلاق
        </button>
      </div>
    </div>
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
import { getCategories } from '../services/categoryService'
import { getUserGames } from '../services/gameService'
import side from '../components/side.vue'
import bg from '../assets/imgs/splash.png'
const activeTab = ref('categories')
const setActiveTab = (tabName) => {
  activeTab.value = tabName
}
const remainig_game = localStorage.getItem('remainig_game') || 0;
const couponCode = ref('');
const categories = ref([]);
const activeHintId = ref(null);
const toggleHint = (id) => {
  activeHintId.value = activeHintId.value === id ? null : id
}
// دالة استخراج أسماء التصنيفات الرئيسية (parent)
const parentCategories = computed(() => {
  const parents = categories.value.map(c => c.parent?.name || 'بدون تصنيف رئيسي')
  return [...new Set(parents)]
})
onMounted(async () => {
  try {
    const res = await getCategories({}, "ar")
    categories.value = res.data.data
  } catch (err) {
    console.error("فشل في جلب التصنيفات", err)
  }
})
const confirmCoupon = () => {
  if (couponCode.value) {
    alert(`تم تفعيل الكوبون: ${couponCode.value}`);
    couponCode.value = '';
  } else {
    alert('يرجى إدخال كوبون صالح');
  }
};
const games = ref([])
onMounted(async () => {
  try {
    const res = await getUserGames()
    games.value = res.data.data || []
  } catch (error) {
    console.error('❌ فشل جلب الألعاب:', error)
  }
})
</script>
<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.8s ease-out both;
}
.material-icons {
  font-size: 1.5rem;
}
</style>