<template>
      <div class="min-h-screen bg-cover bg-center flex flex-row-reverse" :style="`background-image: url(${bg});`">
    <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
        <div class="min-h-screen mt-4 mr-[5px] rounded-3xl bg-white flex flex-col items-end justify-center p-4">
                   <h1 class="text-3xl md:text-4xl font-bold mb-8 self-center mt-6" style="font-family: 'Kufam', sans-serif;">
          {{$t("gameLibrary")}}  </h1>
            <div v-if="loading" class="text-center text-gray-500">{{$t("loading")}}</div>
            <div v-else>
                <div v-if="!games || games.length === 0" class="text-center text-gray-500"> {{$t("noGames")}}</div>
              <div class="flex flex-wrap justify-end items-center gap-x-[20px] gap-y-[50px]">
<div v-for="game in games" :key="game.id" @click="selectGame(game)"
  :class="[
    'bg-white rounded-3xl shadow-lg w-72 h-[400px] cursor-pointer transition-all flex flex-col justify-between',
    selectedGame && selectedGame.id === game.id ? 'ring-4 ring-[#9747FF]' : ''
  ]"
  style="font-family: 'Kufam', sans-serif;"
>
  <!-- صورة -->
  <div class="bg-[#E3614E] h-30 rounded-t-2xl flex items-center justify-center">
    <img :src="game.image_url" alt="Game" class="object-cover rounded-t-2xl w-full h-40" />
  </div>
  <!-- الاسم -->
  <div class="mt-4 px-3">
    <div class="h-16 text-xl flex font-bold items-center justify-center text-[#24054D] text-center">
      {{ game.name }}
    </div>
  </div>
  <!-- التصنيفات -->
  <div class="mt-2 flex flex-wrap justify-center gap-2 px-3">
    <span v-for="cat in game.game_category" :key="cat.category.id"
      class="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
      {{ cat.category.name }}
    </span>
  </div>
  <!-- السعر -->
  <div class="mt-auto flex justify-between items-center p-4">
    <p class="text-lg font-semibold text-[#B984FF]">  {{$t("priceLabel")}}</p>
    <p class="text-3xl font-medium text-[#9747FF]">   {{ game.price }}  {{ $t("SAR") }} </p>
  </div>
</div>
                </div>
                <!-- تفاصيل الشراء -->
                <div v-if="selectedGame" class="w-full max-w-xl mx-auto mt-10 bg-white rounded-xl  p-6">
                    <h3 class="text-2xl font-bold text-[#24054C] mb-6 text-center tracking-wide"
                        style="font-family: 'Kufam', sans-serif;">
                      {{$t("selectedGameDetails")}}
                    </h3>
                    <div class="flex justify-between items-center w-full   rounded-xl ">
                        <p class="text-2xl font-extrabold text-[#663D9C] flex items-baseline gap-1">
                            <span>{{ $t("SAR") }} &nbsp;</span>
                            <span class="text-2xl">{{ selectedGame.price }}</span>
                        </p>
                        <p class="text-lg font-semibold text-[#24054C]">
                            {{ selectedGame.name }}
                        </p>
                    </div>
                </div>
                        <div class="flex justify-evenly w-full gap-4 mt-3">
                        <button
                            class="w-1/3 border border-gray-300 cursor-pointer text-gray-700 py-2.5 rounded-md font-medium hover:bg-gray-100 transition text-sm sm:text-base"
                            @click="selectedGame = null">
                         {{$t("cancel")}}
                        </button>
                        <button @click="goToPayment"
                            class="w-1/3 bg-gradient-to-r from-[#FB2C36] to-[#D91E2C] text-white py-2.5 rounded-md font-semibold text-sm sm:text-base cursor-pointer shadow-md hover:from-white hover:to-white hover:text-red-500 hover:shadow-lg transition duration-300">
                          {{$t("choosePaymentMethod")}}
                        </button>
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
import { ref, onMounted } from 'vue'
import { getGames } from '../../services/gameService'
import side from "../../components/side.vue";
import bg from "../../assets/imgs/splash.png";
const locale = ref(localStorage.getItem("locale") || "ar");
import { useRouter } from 'vue-router'
const games = ref([])
const loading = ref(true)
const error = ref(null)
const selectedGame = ref(null)
const router = useRouter()
onMounted(async () => {
  console.log("localStorage locale:", localStorage.getItem("locale"));
  try {
    console.log("Reactive locale value:", locale.value); // نتاكد من القيمة قبل النداء
    const res = await getGames(locale.value); // استخدم reactive locale
    console.log("API Response:", res); // نطبع كل response من الـ API
    if (res.data && res.data.data) {
      games.value = res.data.data;
      console.log("Games loaded:", games.value); // نتاكد من البيانات
    } else {
      games.value = [];
      error.value = "لا توجد بيانات ألعاب متاحة";
      console.warn("No data returned from API");
    }
  } catch (err) {
    games.value = [];
    error.value = err.message || "فشل في جلب الألعاب";
    console.error("فشل في جلب الألعاب:", err);
  } finally {
    loading.value = false;
  }
});
const selectGame = (game) => {
    selectedGame.value = game
}
const goToPayment = () => {
    if (!selectedGame.value) return
    router.push({
        path: '/PaymentMethods',
        state: {
            type: "game",
            price: selectedGame.value.price,
            gameId: selectedGame.value.id,
            name: selectedGame.value.name
        }
    })
}
</script>
<style scoped>
/* يمكنك إضافة تنسيقات إضافية حسب الحاجة */
</style>