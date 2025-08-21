<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-pink-50"
  >
    <h2
      class="text-3xl md:text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500"
    >
      {{ $t("completePayment") }}
    </h2>
    <div class="w-full max-w-5xl">
      <div v-if="paymentUrl" class="flex flex-col items-center">
        <!-- iframe -->
        <iframe
          :src="iframeSrc"
          class="w-full h-[80vh] rounded-xl shadow-lg border border-gray-200"
          frameborder="0"
        ></iframe>
        <!-- رسالة للبوابة غير مدعومة -->
        <div
          v-if="!isEmbeddedSupported"
          class="text-center mt-4 bg-white/90 p-6 rounded-xl shadow-md border border-gray-200 w-full"
        >
          <p class="mb-3 text-red-600 font-semibold">
             {{ $t("gatewayNotSupported") }}
          </p>
          <p class="mb-4 text-gray-700">
            {{ $t("clickToRedirect") }}
          </p>
          <button
            @click="startPayment"
            class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all"
          >
            {{ $t("clickToRedirect") }}
          </button>
        </div>
      </div>
      <div v-else class="text-center p-6 bg-white/70 rounded-xl shadow-md">
        <p class="text-gray-700 text-lg" > {{ $t("clickToRedirect") }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const paymentUrl = ref("");
const iframeSrc = ref("");
const isEmbeddedSupported = ref(false);
onMounted(() => {
  paymentUrl.value = route.query.paymentUrl || "";
  isEmbeddedSupported.value = route.query.embedded === "true";
  if (isEmbeddedSupported.value) {
    iframeSrc.value = paymentUrl.value;
  } else {
    window.location.href = paymentUrl.value;
  }
});
const startPayment = () => {
  iframeSrc.value = paymentUrl.value;
};
</script>
