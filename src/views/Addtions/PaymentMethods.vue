<template>
    <div class="min-h-screen bg-cover bg-center flex p-3 flex-row" :style="`background-image: url(${bg});`">
        <div
            class="flex-1 pl-2 pb-2 pr-0 pt-5 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6 flex flex-col pb-6">
            <!-- العنوان -->
            <div class="text-center mb-10 ">
                <h1
                    class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 pb-3">
                  {{ $t("paymeth") }}
                </h1>
            </div>
            <div class="flex gap-8 flex-wrap lg:flex-nowrap w-full flex-row-reverse">
                <!-- طرق الدفع -->
                <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 flex-1 mr-5">
                    <template v-if="loading">
                        <!-- Skeleton للكروت -->
                        <div v-for="n in 3" :key="n" class="h-56 rounded-2xl bg-gray-200 animate-pulse"></div>
                    </template>
                    <template v-else>
                        <div v-for="pm in paymentMethods" :key="pm.PaymentMethodId" @click="selectMethod(pm)"
                            class="relative group cursor-pointer rounded-2xl backdrop-blur-xl bg-white/60 border transition-all p-6 flex flex-col items-center text-center hover:scale-105"
                            :class="selectedMethod?.PaymentMethodId === pm.PaymentMethodId
                                ? 'border-indigo-500 shadow-2xl ring-2 ring-indigo-300'
                                : 'border-white/50 shadow-lg hover:shadow-xl'
                                ">
                            <!-- محتوى الكارت -->
                            <img :src="pm.ImageUrl" alt="payment method" class="w-16 h-16 object-contain mb-4" />
<h3 class="font-bold text-lg text-gray-800">
  {{ locale === 'ar' ? pm.PaymentMethodAr : pm.PaymentMethodEn }}
</h3>
<p class="text-sm text-gray-500">
  {{ locale === 'ar' ? pm.PaymentMethodEn : pm.PaymentMethodAr }}
</p>
                            <p class="mt-2 text-indigo-600 font-semibold">
                              {{ $t("serviceCharge") }}: {{ pm.ServiceCharge }} {{ $t("SAR") }}
                            </p>
                            <!-- زرار -->
                            <button
                                class="mt-4  cursor-pointer w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md hover:opacity-90">
                                  {{ $t("choose") }}
                            </button>
                        </div>
                    </template>
                </div>
                <!-- الفاتورة -->
<div
  class="relative bg-gradient-to-br from-white flex flex-col to-indigo-50 rounded-2xl shadow-xl p-6 border border-indigo-100 w-full lg:w-96 mr-5
         transition-all duration-500 ease-in-out"
  :class="loading ? 'h-64' : 'h-auto'"
>
  <!-- Skeleton -->
  <template v-if="loading">
    <div class="space-y-4 animate-pulse">
      <div class="h-6 bg-gray-200 rounded"></div>
      <div class="h-6 bg-gray-200 rounded"></div>
      <div class="h-6 bg-gray-200 rounded"></div>
      <div class="h-10 bg-gray-300 rounded mt-6"></div>
    </div>
  </template>
  <!-- الفاتورة الحقيقية -->
  <template v-else>
    <div class="flex-1">
      <!-- العنوان -->
      <h3 class="text-2xl font-extrabold text-indigo-700 mb-6 flex items-center gap-2 justify-end  flex-row-reverse">
          {{ $t("invoice") }}
          <img src="../../assets/imgs/done.png" class="w-8">
      </h3>
      <!-- السعر الأساسي -->
<!-- السعر الأساسي -->
<div class="flex justify-between items-center text-gray-700 bg-white/70 p-3 rounded-xl shadow-sm mb-4 flex-row-reverse">
  <span class="font-semibold">{{ price }} {{$t("SAR")}}</span>
  <div class="flex items-center gap-2">
              <img src="../../assets/imgs/reduce-cost.png" class="w-8">
    <span> {{ $t("basePrice") }}</span>
  </div>
</div>
<!-- وسيلة الدفع -->
<div v-if="selectedMethod"
  class="flex justify-between items-center text-gray-700 bg-white/70 p-3 rounded-xl shadow-sm mb-4 flex-row-reverse">
<span class="font-semibold">
  {{ locale === 'ar' ? selectedMethod.PaymentMethodAr : selectedMethod.PaymentMethodEn }}
</span>
  <div class="flex items-center gap-2">
   <img src="../../assets/imgs/credit-card.png" class="w-8">
    <span> {{ $t("paymentMethod") }}</span>
  </div>
</div>
<!-- رسوم الخدمة -->
<div v-if="selectedMethod"
  class="flex justify-between items-center text-gray-700 bg-white/70 p-3 rounded-xl shadow-sm mb-4 flex-row-reverse">
  <span class="font-semibold">{{ selectedMethod.ServiceCharge }} SAR</span>
  <div class="flex items-center gap-2">
   <img src="../../assets/imgs/thunder.png" class="w-8">
    <span> {{ $t("serviceCharge") }}</span>
  </div>
</div>
      <!-- الإجمالي -->
      <div class="border-t pt-4 flex justify-between items-center font-extrabold text-lg text-indigo-800 flex-row-reverse">
        <span>{{ total }} {{$t("SAR")}}</span>
        <div class="flex items-center gap-2">
             <img src="../../assets/imgs/price-tag.png" class="w-8">
          <span>{{ $t("total") }}</span>
        </div>
      </div>
    </div>
    <!-- زر الدفع -->
<button
 :disabled="!selectedMethod || loading"
  @click="confirmPayment"
  class="mt-6 w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2
  hover:opacity-90
  disabled:opacity-70 disabled:cursor-not-allowed"
>
  <template v-if="loading">
    <svg
      class="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  {{ $t("processing") }}
  </template>
  <template v-else>
       <img src="../../assets/imgs/coin.png" class="w-8">
     {{ $t("confirmPayment") }}
  </template>
</button>
  </template>
</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
const locale = localStorage.getItem("locale") || "en"; // افتراضي "en"
import api from "../../services/axios";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { getAvailablePaymentMethods } from "../../services/paymentService";
import bg from "../../assets/imgs/splash.png";
const router = useRouter();
const route = useRoute();
const price = router.options.history.state.price;
const ide = ref(
  router.options.history.state?.planId ||
  router.options.history.state?.gameId ||
  null
);
const type = ref(router.options.history.state?.type || null)
if (type.value === "game") {
  console.log("النوع Game 🎮")
} else if (type.value === "plane") {
  console.log("النوع Plane ✈️")
} else {
  console.log("غير معروف")
}
const paymentMethods = ref([]);
const selectedMethod = ref(null);
const transactionId = ref(null);
const loading = ref(false);
const total = computed(() => {
  if (!selectedMethod.value) return price;
  return Number(price) + Number(selectedMethod.value.ServiceCharge);
});
const selectMethod = (pm) => {
  selectedMethod.value = pm;
};
const fetchPaymentMethods = async () => {
  if (!price) return;
  loading.value = true;
  try {
    const res = await getAvailablePaymentMethods(price, "SAR");
    paymentMethods.value = res.Data.PaymentMethods;
  } catch (e) {
    console.error("Error fetching payment methods:", e);
  } finally {
    loading.value = false;
  }
};
const confirmPayment = async () => {
  loading.value = true;
  try {
    const res = await api.post("/execute", {
      id: ide.value,
      type: type.value,
      PaymentMethodId: selectedMethod.value.PaymentMethodId,
      InvoiceAmount: total.value
    });
    console.log("API response:", res.data);
    const data = res.data;
if (data.IsSuccess && data.Data?.PaymentURL) {
router.push({
  path: "/PaymentPage",
  query: {
    paymentUrl: data.Data.PaymentURL,
    embedded: selectedMethod.value.IsEmbeddedSupported
  }
});
} else {
  alert(data.Message || "فشل إنشاء الدفع!");
}
  } catch (err) {
    console.error("Error during payment:", err);
    alert("حدث خطأ أثناء العملية");
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  await fetchPaymentMethods();
});
</script>
<style scoped>
@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
.skeleton {
    background: linear-gradient(90deg,
            #e0e0e0 25%,
            #f5f5f5 37%,
            #e0e0e0 63%);
    background-size: 200% 100%;
    /* تمشي بنسبة العنصر */
    background-repeat: no-repeat;
    border-radius: 0.5rem;
    /* نفس الـ rounded بتاعك */
    animation: shimmer 1.2s infinite linear;
}
</style>
