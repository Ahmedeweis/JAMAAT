<template>
  <div
    class="min-h-screen bg-cover bg-center  flex flex-row-reverse"
    :style="`background-image: url(${bg});`"
    :dir="dir"
  >
    <!-- Main Content -->
    <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
      <div class="min-h-screen mt-4 mr-[5px] rounded-3xl bg-white flex flex-col justify-center p-4">
        <!-- Page Title -->
        <h1 class="text-3xl md:text-4xl font-bold mb-8 self-center mt-6" style="font-family: 'Kufam', sans-serif;">
          {{$t("createGame")}}
        </h1>
        <!-- Game Selection -->
<div
  class="w-full space-y-4 flex flex-col justify-center"
  :class="locale.value === 'ar' ? 'items-end text-right' : 'items-start text-left'"
>
          <h2 class="text-black text-2xl mb-2 pr-3" style="font-family: 'Kufam', sans-serif;">
            {{$t("numberOfGames")}}
          </h2>
          <!-- First Plan -->
          <div v-if="firstPlan" @click="selectedPlan = firstPlan.id"
               class="plan-card bg-white rounded-3xl shadow-lg w-47 text-center pb-5 cursor-pointer transition-all"
               :class="selectedPlan === firstPlan.id ? 'ring-4 ring-[#9747FF] scale-105' : ''"
               dir="ltr"
               style="margin: 20px 10px; font-family: 'Kufam', sans-serif;">
            <div class="bg-[#E3614E] h-30 rounded-t-2xl flex items-center justify-center"></div>
            <div class="mt-4 h-16 text-xl flex font-bold items-center justify-center text-[#24054D]">
                              <h2 class="text-xl font-bold">
  {{ locale === 'ar' ?  firstPlan.name :  firstPlan.name_en }}
</h2>
            </div>
            <div class="mt-4">
              <p class="text-lg font-semibold text-[#B984FF]">{{$t("price")}}</p>
              <p class="text-3xl font-medium text-[#9747FF] mt-2">{{ firstPlan.price }} {{$t('SAR')}}</p>
            </div>
          </div>
          <!-- Other Plans -->
        <div class="flex flex-wrap justify-center sm:justify-start items-center">
            <div  v-for="plan in plans" :key="plan.id" @click="selectedPlan = plan.id"
                 class="bg-white rounded-3xl shadow-lg w-50 text-center pb-5 cursor-pointer transition-all"
                 :class="selectedPlan === plan.id ? 'ring-4 ring-[#9747FF] scale-105' : ''"
                 dir="ltr"
                 style="margin: 20px 10px; font-family: 'Kufam', sans-serif;">
              <div class="h-30 rounded-t-2xl flex items-center justify-center">
                <img src="../../assets/imgs/present.svg" alt="Payment Image" class="object-cover rounded-t-2xl">
              </div>
              <div class="mt-4 h-16 text-xl flex font-bold items-center justify-center text-[#24054D]">
<h2 class="text-xl font-bold">
  {{ locale === 'ar' ? plan.name : plan.name_en }}
</h2>
              </div>
              <div class="mt-4">
                <p class="text-lg font-semibold text-[#B984FF]">{{$t("price")}}</p>
                <p class="text-3xl font-medium text-[#9747FF] mt-2">{{ plan.price }} {{$t('SAR')}}</p>
              </div>
            </div>
          </div>
          <!-- Divider -->
          <div class="flex items-center justify-center my-10 w-full">
            <span class="w-2 h-2 bg-[#663D9C] rounded-full"></span>
            <span class="flex-1 h-[1.5px] bg-gradient-to-r from-[#663D9C]/60 to-[#24054C]/60 mx-2"></span>
            <span class="w-2 h-2 bg-[#663D9C] rounded-full"></span>
          </div>
          <!-- Payment Details -->
          <h3 class="text-2xl font-bold text-[#24054C] mb-6 text-center tracking-wide" style="font-family: 'Kufam', sans-serif;">
            {{$t("paymentDetails")}}
          </h3>
          <div class="flex justify-between items-center w-full mb-8 bg-gray-50 rounded-xl p-4 shadow-sm">
                        <p class="text-lg font-semibold text-[#24054C]">
              {{ selectedPlan ? getPlanName(selectedPlan) : $t("noPlanSelected") }}
            </p>
            <p class="text-2xl font-extrabold text-[#663D9C] flex items-baseline gap-1">
              <span class="text-2xl">{{ selectedPlan ? getPlanPrice(selectedPlan) : "—" }}</span>
              <span>{{$t('SAR')}}&nbsp;</span>
            </p>
          </div>
          <!-- Buttons -->
          <div class="flex justify-evenly w-full gap-4">
                        <button @click="goToPayment"
                    class="w-1/3 bg-gradient-to-r from-[#FB2C36] to-[#D91E2C] text-white py-2.5 rounded-md font-semibold
                           text-sm sm:text-base cursor-pointer shadow-md hover:from-white hover:to-white
                           hover:text-red-500 hover:shadow-lg transition duration-300">
              {{$t("choosePaymentMethod")}}
            </button>
            <button class="w-1/3 border border-gray-300 cursor-pointer text-gray-700 py-2.5 rounded-md font-medium
                           hover:bg-gray-100 transition text-sm sm:text-base">
              {{$t("cancle")}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Side Component -->
    <div class="bg-white bg-opacity-90 shadow-lg my-4 mx-0 sm:mx-4 rounded-4xl overlay flex flex-col items-center justify-between">
      <side />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
import bg from "../../assets/imgs/splash.png";
import side from "../../components/side.vue";
import { getPlans } from "../../services/plans";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const router = useRouter();
const toast = useToast();
const selectedPlan = ref(null);
const plans = ref([]);
const firstPlan = ref(null);
onMounted(async () => {
  try {
    const lang = localStorage.getItem("locale") || "ar";
    const data = await getPlans(lang); // نبعت اللغة كـ بارامتر
    firstPlan.value = data.data[0];
    plans.value = data.data.slice(1);
  } catch (err) {
    console.error("Failed to load plans:", err);
  }
});
const getPlanName = (id) => {
  if (firstPlan.value && firstPlan.value.id === id)
    return locale.value === 'ar' ? firstPlan.value.name : firstPlan.value.name_en;
  const plan = plans.value.find((p) => p.id === id);
  return plan ? (locale.value === 'ar' ? plan.name : plan.name_en) : "";
};
const getPlanPrice = (id) => {
  if (firstPlan.value && firstPlan.value.id === id) return firstPlan.value.price;
  const plan = plans.value.find((p) => p.id === id);
  return plan ? plan.price : "";
};
const goToPayment = () => {
  if (!selectedPlan.value) {
    toast.error("Please select a plan first", {
      position: "top-right",
      timeout: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return;
  }
  const selectedPlanPrice =
    firstPlan.value && firstPlan.value.id === selectedPlan.value
      ? firstPlan.value.price
      : plans.value.find((p) => p.id === selectedPlan.value)?.price;
  router.push({
    path: "/PaymentMethods",
    state: {
      type: "plan",
      price: selectedPlanPrice,
      planId: selectedPlan.value,
    },
  });
};
</script>
<style scoped>
@media (max-width: 640px) {
  .plan-card {
    align-self: center;
  }
}
</style>
