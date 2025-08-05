<template>
    <div class="min-h-screen w-full bg-cover bg-center flex" :style="`background-image: url(${bg});`">
<div class="flex-1  rounded-2xl sm:rounded-3xl"  :style="`background-image: url(${bg});`">
<div class="flex flex-col md:flex-row gap-4 px-2 sm:px-4">
  <!--  البلوك الأول -->
  <div class="flex-1  flex items-center  justify-center bg-white mt-4  rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg">
    <div class="flex md:flex-row items-center justify-between gap-4">
      <button
        @click="confirmCoupon"
        class="bg-red-500 mt-[35px] text-white px-3 py-1 sm:px-6 sm:py-2 text-sm sm:text-base rounded-full font-semibold hover:bg-red-600 transition duration-200"
      >
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
          class="flex items-center bg-[#ECE1FB] border-2 border-solid border-[#000000] rounded-full px-1 py-1 relative pr-7 w-[130px] h-[45px] justify-center">
          <span class="text-[#AC3F2F] font-semibold flex justify-end items-start">
            <span class="mr-[5px]">ريال</span> {{ balance }}
          </span>
          <button
            @click="increaseBalance"
            class="bg-black text-[#E3614E] font-bold text-base absolute right-[-10px] rounded-3xl border-2 border-solid border-black">
            <router-link to="/" class="text-2xl px-2 mb-[2px] inline-block">+</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--  البلوك الثاني -->
  <div class="flex-1 bg-white text-gray-800 flex justify-center items-center flex-col mt-2 sm:mt-4 rounded-2xl p-6 text-center">
    <h2 class="text-lg sm:text-2xl font-bold text-red-500">اشتري أكثر - وفر أكثر</h2>
    <p class="m-4">يمكنك إنشاء حتى 10 ألعاب</p>
    <router-link to="/MakeGame"
      class="w-full md:w-2/3 cursor-pointer bg-[#E3614D] flex justify-center items-center text-white py-3 rounded-4xl font-bold shadow-[5px_5px_15px_#C33520] transition duration-300">
      إنشاء لعبة
    </router-link>
  </div>
</div>
        <!-- <h1 class="flex justify-center"> <router-link to="/apitest" class="text-white teext-center">api test</router-link></h1> -->
        <div class="bg-white text-gray-800 rounded-2xl p-6 mb-4 text-center"  style="margin: 20px 10px;">
          <router-link to="">
                      <h2 class="text-2xl font-bold  text-purple-700" style="font-family: 'Rubik';  "> JAMAAT مكتبة ألعاب</h2>
          <p>يمكنك العثور على جميع الالعاب التي قام جامات بإضافتها و شرائها </p>
          </router-link>
        </div>
        <div class="bg-white rounded-2xl p-2 mb-4"  style="margin: 20px 10px;">
          <div class="flex justify-center font-bold gap-3">
            <button class="w-1/2 text-gray-500 py-3 rounded-2xl cursor-pointer hover:bg-red-100">ألعابي</button>
            <button class="w-1/2 bg-red-100 text-red-500 py-3 rounded-2xl font-bold cursor-pointer">جميع الفئات</button>
          </div>
        </div>
 <div class="space-y-6 my-3" style="margin: 20px 10px;">
    <!-- لوب على كل مجموعة من 10 -->
    <div v-for="(group, groupIndex) in chunkedCategories" :key="groupIndex" class="bg-white p-3 rounded-2xl">
      <div class="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <!-- لوب على العناصر داخل كل مجموعة -->
        <div
          v-for="category in group"
          :key="category.id"
          class="bg-[#FAFBF5] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative group"
        >
          <!-- صورة -->
          <img
            :src="category.image_url"
            alt="صورة التصنيف"
            class="w-full h-36 object-contain mb-4 rounded-xl"
          />
          <!-- عنوان + زر التلميح -->
          <div class="flex items-center justify-between mb-2 p-2">
            <button
              @click="toggleHint(category.id)"
              class="text-white cursor-pointer hover:text-purple-800 text-xl bg-purple-400 rounded-full px-[10px] font-bold focus:outline-none"
              title="عرض التلميح"
            >
              i
            </button>
            <h5
              class="text-xg font-bold bg-gray-800/60 text-white px-3 py-1 rounded-lg line-clamp-2 text-end ml-[5px] truncate"
              dir="rtl"
            >
              {{ category.name }}
            </h5>
          </div>
          <!-- التلميح -->
          <div
            v-if="activeHintId === category.id"
            class="bg-purple-100 text-purple-800 text-sm mt-2 p-2 rounded"
          >
            💡 {{ category.hint }}
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
import { ref, onMounted ,computed} from 'vue'
import { getCategories } from '../services/categoryService'
import side from '../components/side.vue'
import bg from '../assets/imgs/splash.png'
const balance = ref(10000);
const couponCode = ref('');
const categories = ref([]);
const activeHintId = ref(null);
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
    const res = await getCategories()
    categories.value = res.data.data
  } catch (err) {
    console.error("فشل في جلب التصنيفات", err)
  }
})
const increaseBalance = () => {
  balance.value += 1000;
};
const confirmCoupon = () => {
  if (couponCode.value) {
    alert(`تم تفعيل الكوبون: ${couponCode.value}`);
    couponCode.value = '';
  } else {
    alert('يرجى إدخال كوبون صالح');
  }
};
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
