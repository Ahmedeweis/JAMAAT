<template>
  <div class="min-h-screen w-full bg-cover bg-center overflow-auto flex flex-row-reverse" :style="`background-image: url(${bg});`">
    <div class="flex-1 rounded-2xl sm:rounded-3xl">
      <div class="flex flex-col md:flex-row gap-2 sm:gap-4 px-1 sm:px-4">
        <!-- البلوك الأول -->
<div class=" flex flex-1 rounded-2xl mt-3 p-3  bg-white flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 w-full" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
style="  display: flex;
    justify-content: center;
    align-items: center;">
  <!-- Input + Button في صف واحد -->
  <div class="flex w-full sm:max-w-[350px] items-end gap-2">
    <div class="flex flex-col flex-1">
      <div class="flex items-center justify-start  gap-2 mb-2">
        <span class="text-base sm:text-lg font-semibold text-black truncate">{{ $t("activateYourBalance") }}</span>
        <img src="../assets/imgs/lighting.svg" class="w-4 h-4 sm:w-5 sm:h-5">
      </div>
      <input type="tel" v-model="phone"
        class="w-full p-2 text-sm sm:text-base placeholder-[#D5C1EE] border-2 border-solid border-[#3F0092] text-[#24054C] rounded-3xl bg-[#ECE1FB] focus:border-[#3F0092] focus:outline-none"
        :class="{
          'text-left': $i18n.locale === 'en',
          'text-right': $i18n.locale === 'ar'
        }"
        :placeholder="$t('couponCode')">
    </div>
    <button @click="confirmCoupon"
      class="h-10 sm:h-auto flex-shrink-0 bg-red-500 text-white px-3 py-1 sm:px-6 sm:py-2 text-sm sm:text-base rounded-full font-semibold hover:bg-red-600 transition duration-200"
      :disabled="!couponCode">
      {{ $t("confirm") }}
    </button>
  </div>
  <!-- Game Balance -->
  <div class="flex flex-col items-center justify-center gap-2 w-full sm:w-auto min-w-[120px]" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex items-center gap-2 justify-center sm:justify-start">
      <img src="../assets/imgs/coin.svg" class="w-4 h-4 sm:w-5 sm:h-5">
      <span class="text-base sm:text-lg font-semibold text-black truncate">{{ $t("yourGameBalance") }}</span>
    </div>
<div class="relative flex items-center justify-center w-full sm:w-[140px] h-[45px] sm:h-[45px] px-2 sm:px-3 bg-[#ECE1FB] border-4 border-black rounded-full">
  <span class="text-[#AC3F2F] font-semibold text-xs sm:text-base flex justify-center items-center truncate">
    {{ remainig_game }} <span class="mx-1 sm:mx-2">{{ $t("game") }}</span>
  </span>
  <button @click="increaseBalance"
    class="absolute -right-3 sm:-right-4 bg-black text-[#E3614E] font-bold text-base sm:text-lg rounded-3xl border-2 border-black">
    <router-link to="/Payment" class="px-2 sm:px-3 inline-block">+</router-link>
  </button>
</div>
  </div>
</div>
        <!-- البلوك الثاني -->
        <div class="flex-1 bg-white text-gray-800 flex justify-center items-center flex-col mt-2 sm:mt-2 rounded-2xl p-2 sm:p-6 text-center">
          <h2 class="text-base sm:text-2xl font-bold text-red-500"> {{ $t("buyMoreSaveMore") }}</h2>
          <p class="m-2 sm:m-4 text-xs sm:text-base">{{ $t("maxGamesNotice") }}</p>
<router-link
  to="/MakeGame"
  class="w-11/12 sm:w-3/4 md:w-2/3 cursor-pointer bg-[#E3614D]
         flex justify-center items-center text-white
         py-1.5 sm:py-3 rounded-3xl font-bold
         shadow-[3px_3px_10px_#C33520]
         transition duration-300
         text-[13px] sm:text-base"
>
  {{ $t("createGame") }}
</router-link>
        </div>
      </div>
      <div class="bg-white text-gray-800 rounded-2xl p-3 sm:p-6 mb-2 sm:mb-4 text-center"
        style="font-family: 'Kufam', sans-serif;margin: 10px 5px;">
        <router-link to="/GameLib">
<div class="flex justify-center">
            <h2 class="text-lg ml-2 sm:text-2xl font-bold text-purple-700" style="font-family: 'Rubik';">{{ $t("jamaatGameLibrary") }}</h2>
        <h1
        style=" font-family:'Andalus','Kufam', 'sans-serif'"
         class="mb-2 sm:mb-4 text-[#E3614D] text-2xl  tracking-wide select-none">
  جمعات
</h1>
</div>
          <p class="text-xs sm:text-base"> {{ $t("findo") }}</p>
        </router-link>
      </div>
      <div class="bg-white rounded-2xl p-1 sm:p-2 mb-2 sm:mb-4" style="font-family: 'Kufam', sans-serif;margin: 10px 5px;">
        <div class="flex justify-center font-bold gap-2 sm:gap-3 text-base sm:text-xl">
          <button @click="setActiveTab('games')" :class="[
            'w-1/2 py-2 sm:py-3 rounded-2xl font-bold cursor-pointer transition',
            activeTab === 'games'
              ? 'bg-red-100 text-red-500'
              : 'text-gray-500 hover:bg-red-100'
          ]">
            {{ $t("myGames") }}
          </button>
          <button @click="setActiveTab('categories')" :class="[
            'w-1/2 py-2 sm:py-3 rounded-2xl font-bold cursor-pointer transition',
            activeTab === 'categories'
              ? 'bg-red-100 text-red-500'
              : 'text-gray-500 hover:bg-red-100'
          ]">
            {{ $t("type") }}
          </button>
        </div>
      </div>
      <div class="space-y-4 sm:space-y-6 my-2 sm:my-3" style="margin: 10px 5px;">
        <div v-if="activeTab === 'categories'">
          <div v-for="parentName in parentCategories" :key="parentName" class="bg-white p-2 sm:p-3 rounded-2xl mb-2 sm:mb-4">
            <h2
              class="text-base sm:text-2xl font-bold text-purple-700 mb-2 sm:mb-4"
              :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
            >
              {{ parentName }}
            </h2>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4"
              :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
            >
              <div
                v-for="category in categories.filter(c => (c.parent?.name || 'بدون تصنيف رئيسي') === parentName)"
                :key="category.id"
                class="bg-gradient-to-b from-yellow-400 to-red-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-2 sm:p-4"
              >
                <img :src="category.image_url" alt="صورة التصنيف"
                  class="w-full h-24 sm:h-36 object-contain mb-2 sm:mb-3 rounded-xl mt-2 sm:mt-3" />
                <div class="flex items-center justify-between mb-2 sm:mb-4 px-1 sm:px-2">
                  <h5 class="text-xs sm:text-[16px] font-bold text-white truncate line-clamp-2 text-end ml-1 sm:ml-2"
                    dir="rtl">
                    {{ category.name }}
                  </h5>
                  <button @click="toggleHint(category.id)"
                    class="text-amber-700 cursor-pointer text-xs sm:text-sm bg-white rounded-full px-2 sm:px-3 py-1 font-bold hover:bg-yellow-200 focus:outline-none"
                    title="عرض التلميح">
                    i
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="games.length === 0" class="text-center flex flex-col md:flex-row gap-2 sm:gap-4 justify-center items-center bg-white p-3 sm:p-6 rounded-2xl shadow-md h-[180px] sm:h-[300px]">
          <p class="text-gray-500 mb-2 sm:mb-4 text-base sm:text-lg">🚫 لا توجد ألعاب حتى الآن</p>
          <router-link to="/MakeGame"
            class="bg-red-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-md hover:bg-red-600 transition text-xs sm:text-base">
            إنشاء لعبة جديدة
          </router-link>
        </div>
        <div v-else v-for="game in games" :key="game.id" class="mb-3 sm:mb-6 bg-white p-2 sm:p-3 rounded-2xl">
          <div class="bg-[#FEF2E7] p-2 sm:p-4 rounded-2xl shadow-md">
<div class="flex flex-row items-center justify-between mb-2 sm:mb-4">
  <router-link
    :to="{
      name: 'StartGame',
      query: { id: game.game.id }
    }"
    class="cursor-pointer bg-red-500 w-20 sm:w-28 text-center text-white px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-base rounded-full font-semibold hover:text-red-600 hover:bg-white transition duration-200"
  >
    {{ $t("start") }}
  </router-link>
  <h2 class="text-sm sm:text-2xl font-bold text-purple-700 text-end truncate max-w-[70%]">
    {{ game.game.name }}
  </h2>
</div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4" dir="rtl">
  <div
    v-for="categoryWrapper in game.game.game_category"
    :key="categoryWrapper.category.id"
    class="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative group p-2 sm:p-4
           bg-gradient-to-b from-yellow-400 to-red-500"
  >
    <img
      :src="categoryWrapper.category.image_url"
      alt="صورة التصنيف"
      class="w-full h-24 sm:h-36 object-contain mb-2 sm:mb-3 rounded-xl mt-2 sm:mt-3"
    />
    <div class="flex items-center justify-between mb-1 sm:mb-4 px-1 sm:px-2">
      <h5
        class="text-xs sm:text-[16px] font-bold text-white truncate line-clamp-2 text-end ml-1 sm:ml-2"
        dir="rtl"
      >
        {{ categoryWrapper.category.name }}
      </h5>
      <button
        @click="toggleHint(categoryWrapper.category.id)"
        class="text-amber-700 cursor-pointer text-xs sm:text-sm bg-white rounded-full px-2 sm:px-3 py-1 font-bold hover:bg-yellow-200 focus:outline-none"
        title="عرض التلميح"
      >
        i
      </button>
    </div>
    <div
      v-if="activeHintId !== null"
      class="fixed bottom-0 left-0 w-full text-white text-xs sm:text-sm p-2 sm:p-4 rounded-t-lg shadow-lg z-50
             bg-gradient-to-l from-red-500 to-yellow-400"
      dir="rtl"
    >
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          💡
          {{
            categories.find(cat => cat.id === activeHintId)?.hint || 'لا يوجد تلميح'
          }}
        </div>
        <button
          @click="activeHintId = null"
          class="text-white cursor-pointer font-bold px-2 sm:px-3 py-1 rounded transition"
        >
          {{ $t("close") }}
        </button>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
    <!-- جانب الصفحة (side) -->
    <div class="bg-white bg-opacity-90 shadow-lg my-2 sm:my-4 mx-0 sm:mx-4 rounded-4xl overlay flex flex-col pt-10 sm:pt-64 ">
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
const { locale } = useI18n()
 const currentLang = locale.value
import { useI18n } from 'vue-i18n'
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
  // اجلب جميع أسماء التصنيفات الرئيسية
  const parentsWithCategory = categories.value
    .filter(c => c.parent?.name) // لديهم تصنيف رئيسي
    .map(c => c.parent.name);
  // اجلب التصنيفات التي ليس لها parent
  const parentsWithoutCategory = categories.value
    .filter(c => !c.parent?.name)
    .map(() => 'بدون تصنيف رئيسي');
  // دمجهم بحيث الأول لديهم parent ثم بدون parent
  return [...new Set([...parentsWithCategory, ...parentsWithoutCategory])];
});
onMounted(async () => {
  try {
    const currentLang = locale.value
    const res = await getCategories({ game : 1}, currentLang)
    categories.value = res.data.data
  } catch (err) {
    console.error("Failed to fetch categories", err)
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
    const currentLang = locale.value;
    const res = await getUserGames(currentLang);
    games.value = res.data.data || [];
  } catch (error) {
    console.error('❌ فشل جلب الألعاب:', error);
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