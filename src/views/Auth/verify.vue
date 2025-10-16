<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4 text-white relative"
    :style="`background-image: url(${bg});`"
  >
    <div class="text-center rounded-2xl p-8 w-full max-w-md text-white">
      <div class="flex justify-center mb-4">
        <img src="../../assets/imgs/image.png" alt="Logo" class="w-[120px]" />
      </div>
      <h2 class="text-2xl font-semibold text-white mb-4">التحقق من البريد الإلكتروني</h2>
      <p class="text-white mb-1">
        تم إرسال رمز مكون من 6 أرقام إلى البريد الإلكتروني:
      </p>
      <p class="font-semibold text-[#E3614E] mb-4">{{ email }}</p>
      <!-- OTP Inputs -->
      <div
        class="flex justify-center gap-3 mb-6"
        dir="ltr"
      >
        <input
          v-for="(digit, index) in code"
          :key="index"
          v-model="code[index]"
          :id="`otp-${index}`"
          maxlength="1"
          type="text"
          inputmode="numeric"
          class="w-12 h-12 text-center text-2xl font-bold rounded-lg border border-gray-300 text-[#1d3557] bg-white focus:ring-2 focus:ring-[#E3614E] outline-none"
          @input="onInput($event, index)"
          @keydown.backspace="onBackspace($event, index)"
        />
      </div>
      <button
        @click="handleVerify"
        class="w-1/2 cursor-pointer bg-[#E3614E] text-white p-3 rounded-4xl mt-6 hover:bg-red-600 transition duration-200"
      >
        تأكيد
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import bg from "../../assets/imgs/splash.png";
import { verifyOTP } from "../../services/authService";
const router = useRouter();
const route = useRoute();
const toast = useToast();
const email = route.query.email || "";
const code = ref(["", "", "", "", "", ""]);
const verificationCode = computed(() => code.value.join(""));
// 🧩 عند الكتابة ينتقل للفيلد التالي
const onInput = (event, index) => {
  const input = event.target;
  const value = input.value.replace(/[^0-9]/g, ""); // يمنع الحروف
  code.value[index] = value;
  if (value && index < code.value.length - 1) {
    const next = document.getElementById(`otp-${index + 1}`);
    next?.focus();
  }
};
// 🧩 عند الحذف يرجع للخانة السابقة
const onBackspace = (event, index) => {
  if (!code.value[index] && index > 0) {
    const prev = document.getElementById(`otp-${index - 1}`);
    prev?.focus();
  }
};
// 🧩 التحقق من الكود
const handleVerify = async () => {
  const otp = verificationCode.value;
  if (otp.length < 6) {
    toast.warning("⚠️ من فضلك أدخل الرمز المكون من 6 أرقام");
    return;
  }
  try {
    const response = await verifyOTP(otp, email);
    const token = response.data.access_token;
    localStorage.setItem("token", token);
    toast.success("✅ تم التحقق بنجاح");
    router.push("/main");
  } catch (err) {
    toast.error(err.response?.data?.message || "❌ رمز التحقق غير صحيح");
  }
};
</script>
