<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4 text-white"
    :style="`background-image: url(${bg});`"
  >
    <div class="text-center mb-6 w-full max-w-md">
      <!-- 🖼️ الشعار -->
      <div class="flex justify-center mb-4">
        <img src="../../assets/imgs/image.png" alt="Logo" class="w-[150px]" />
      </div>
      <!-- 📝 العنوان -->
      <h2 class="text-2xl font-semibold mb-2">التحقق من البريد الإلكتروني</h2>
      <p class="text-lg mb-1">تم إرسال رسالة إلى:</p>
      <p class="text-[#FFD1D1] font-semibold mb-3">{{ email }}</p>
      <p class="text-lg">أدخل الرمز المكون من 6 أرقام</p>
      <!-- 🔢 إدخال الرمز -->
      <div class="flex gap-3 justify-center mt-5 mb-6" dir="ltr">
        <input
          v-for="(digit, index) in code"
          :key="index"
          v-model="code[index]"
          :id="`code-${index}`"
          maxlength="1"
          type="text"
          inputmode="numeric"
          class="w-12 h-12 text-center text-2xl bg-white text-blue-900 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-[#E3614E]"
          @input="onInput($event, index)"
          @keydown.backspace="onBackspace($event, index)"
        />
      </div>
      <!-- 🔘 زر التأكيد -->
      <div class="text-center mt-4 mb-8 w-full">
        <button
          @click="handleVerify"
          class="w-1/2 cursor-pointer bg-[#E3614E] text-white p-3 rounded-3xl hover:bg-red-600 transition duration-200"
        >
          تأكيد
        </button>
      </div>
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
// ✉️ البريد القادم من الصفحة السابقة
const email = route.query.email || "";
// 🔢 الكود
const code = ref(["", "", "", "", "", ""]);
const verificationCode = computed(() => code.value.join(""));
// ⌨️ التنقل بين الخانات + منع الحروف
const onInput = (event, index) => {
  const input = event.target;
  const value = input.value.replace(/[^0-9]/g, ""); // أرقام فقط
  code.value[index] = value;
  if (value && index < code.value.length - 1) {
    document.getElementById(`code-${index + 1}`)?.focus();
  }
};
// ⬅️ عند الضغط على Backspace
const onBackspace = (event, index) => {
  if (!code.value[index] && index > 0) {
    document.getElementById(`code-${index - 1}`)?.focus();
  }
};
// ✅ التحقق من الكود
const handleVerify = async () => {
  const otp = verificationCode.value;
  if (otp.length < 6) {
    toast.warning("⚠️ من فضلك أدخل الرمز المكون من 6 أرقام");
    return;
  }
  try {
    const response = await verifyOTP(otp, email);
    const token = response.data.access_token;
    const user = response.data.user;
    // حفظ البيانات
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("✅ تم التحقق بنجاح");
    router.push("/changepassword");
  } catch (err) {
    toast.error(err.response?.data?.message || "❌ رمز التحقق غير صحيح");
  }
};
</script>
<style scoped>
body {
  background-color: #1d3557;
}
</style>
