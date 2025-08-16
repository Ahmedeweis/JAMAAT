<template>
    <div class="min-h-screen bg-cover bg-center flex" :style="`background-image: url(${bg});`">
        <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
            <div class="min-h-screen mt-4 mr-[5px] rounded-3xl bg-white flex flex-col items-end justify-center p-4">
                <h1 class="text-3xl md:text-4xl font-bold mb-8 self-center mt-6" style="font-family: 'Kufam', sans-serif;">
                    إنشاء لعبة </h1>
                <div class="w-full space-y-4 flex flex-col items-end justify-center">
                    <h2 class="text-black text-2xl mr-3" style="font-family: 'Kufam', sans-serif;">عدد الألعاب</h2>
                    <div>
                        <div class="bg-white rounded-3xl shadow-lg w-47 text-center pb-5" dir="rtl"
                            style="font-family: 'Kufam', sans-serif;margin: 20px 10px;"
                            v-if="firstPlan">
                            <div class="bg-[#E3614E] h-30   rounded-t-2xl flex items-center justify-center">
                                <!-- Top solid color section -->
                            </div>
                            <div class="mt-4">
                                <div class="h-16 text-xl flex font-bold items-center justify-center text-[#24054D]">
                                {{ firstPlan.name  }}
                                </div>
                                <!-- <p class="text-3xl font-medium text-[#24054D] "> </p> -->
                            </div>
                            <div class="mt-4">
                                <p class="text-lg font-semibold text-[#B984FF]">السعر</p>
                                <p class="text-3xl font-medium text-[#9747FF] mt-2">{{ firstPlan.price }} ريال</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex flex-wrap justify-start items-center flex-row-reverse ">
                        <div class="bg-white rounded-3xl shadow-lg w-50 text-center pb-5" dir="rtl"
                        v-for="plan in plans" :key="plan.id"
                            style="font-family: 'Kufam', sans-serif;margin: 20px 10px;">
                            <div class=" h-30 rounded-t-2xl flex items-center justify-center ">
                                <img src="../../assets/imgs/present.svg" alt="Payment Image"
                                    class=" object-cover rounded-t-2xl">
                            </div>
                            <div class="mt-4">
                                <div class="h-16 text-xl flex font-bold items-center justify-center text-[#24054D]">
                                    {{ plan.name }}
                                </div>
                            </div>
                            <div class="mt-4">
                                <p class="text-lg font-semibold text-[#B984FF]">السعر</p>
                                <p class="text-3xl font-medium text-[#9747FF] mt-2">{{ plan.price }} ريال</p>
                            </div>
                        </div>
                    </div>
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
import { ref, onMounted } from "vue";
import bg from '../../assets/imgs/splash.png'
import side from '../../components/side.vue'
import { getPlans } from "../services/plans.js";
const plans = ref([]);
const firstPlan = ref(null);
onMounted(async () => {
  try {
    const data = await getPlans();
    firstPlan.value = data.data[0];
    plans.value = data.data.slice(1);
  } catch (err) {
    console.error("Failed to load plans:", err);
  }
});
</script>
