<template>
  <div
    class="min-h-screen bg-cover bg-center flex flex-row-reverse"
    :style="`background-image: url(${bg});`"
    :dir="dir"
  >
    <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
      <div class="min-h-screen mt-4 mr-[5px] rounded-3xl bg-white flex flex-col items-center justify-center p-4">
        <h1
          class="text-3xl md:text-4xl font-bold mb-8"
          style="font-family: 'Kufam', sans-serif;"
        >
          {{ $t("contactUs") }}
        </h1>
        <div class="w-full max-w-md space-y-4">
          <!-- الاسم -->
          <div class="flex flex-col">
            <label class="text-[#663D9C] mb-1 text-justify">{{ $t("name") }}</label>
            <input
              v-model="name"
              type="text"
              :class="[
                'p-2 rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none',
                $i18n.locale === 'en' ? 'text-left placeholder-left' : 'text-right placeholder-right'
              ]"
              :placeholder="$t('enterName')"
            />
          </div>
          <!-- البريد -->
          <div class="flex flex-col text-right">
            <label class="text-purple-800 mb-1 text-justify">{{ $t("email") }}</label>
            <input
              type="email"
              v-model="email"
              class="p-2 placeholder-[#D5C1EE] text-[#24054C] font-bold rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
              :placeholder="$t('enterEmail')"
            />
          </div>
          <!-- الهاتف -->
          <div class="flex flex-col" :class="$i18n.locale === 'ar' ? 'text-right' : 'text-left'">
            <label class="text-purple-800 mb-1">{{ $t("phone") }}</label>
            <input
              type="tel"
              v-model="phone"
              :class="[
                'p-2 rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none',
                $i18n.locale === 'ar' ? 'text-right placeholder-right' : 'text-left placeholder-left'
              ]"
              :placeholder="$t('enterPhone')"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-[#663D9C] mb-1 text-justify">{{ $t("subject") }}</label>
            <input
              v-model="subject"
              type="text"
              :class="[
                'p-2 rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none',
                $i18n.locale === 'en' ? 'text-left placeholder-left' : 'text-right placeholder-right'
              ]"
              :placeholder="$t('entersubject')"
            />
          </div>
          <!-- الرسالة -->
          <div class="flex flex-col text-right">
            <label class="text-[#663D9C] mb-1 text-justify">{{ $t("message") }}</label>
            <textarea
              v-model="message"
              class="p-2 placeholder-[#D5C1EE] text-[#24054C] rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right resize-none"
              :placeholder="$t('enterMessage')"
              rows="6"
            ></textarea>
          </div>
          <!-- زر الإرسال -->
          <button
            @click="handleSubmit"
            class="w-full cursor-pointer bg-[#E3614D] text-white py-3 rounded-4xl font-bold shadow-[5px_5px_15px_#C33520] transition duration-300"
          >
            {{ $t("send") }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="bg-white bg-opacity-90 shadow-lg my-4 mx-0 sm:mx-4 rounded-4xl overlay flex flex-col items-center justify-between"
    >
      <side />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import bg from '../../assets/imgs/splash.png';
import { useToast } from 'vue-toastification';
import { ContactUs } from '../../services/supportService.js';
import side from '../../components/side.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const toast = useToast();
const name = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');
const subject = ref('');
const handleSubmit = async () => {
  const payload = {
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    message: message.value.trim(),
    subject: subject.value?.trim() || 'Contact Us Message',
  };
  if (!payload.name || !payload.email || !payload.message) {
    toast.warning(t('required'));
    return;
  }
  try {
    const response = await ContactUs(payload);
    // حالة النجاح الواضحة
    const ok = response?.status === 200;
    const successFlag = response?.data?.success === true;
    if (ok && successFlag) {
      toast.success('✅ تم إرسال رسالتك بنجاح');
      // تنظيف الحقول
      name.value = '';
      email.value = '';
      phone.value = '';
      message.value = '';
      return;
    }
    // حالة الـ 200 لكن الفلاج success=false (زي: {"success":false,"result":null,"msg":"..."} )
    if (ok && response?.data) {
      const serverMsg = response.data.msg || response.data.message || 'حدث خطأ أثناء إرسال الرسالة';
      toast.error(serverMsg);
      return;
    }
    // أي حالة غير متوقعة نعرض رسالة عامة
    toast.error('حدث خطأ أثناء الإرسال. حاول مرة أخرى لاحقًا.');
  } catch (err) {
    // حالات الـ validation (مثال: 422) أو أخطاء السيرفر
    const data = err?.response?.data;
    // 1) رسائل Validation كثيرًا تكون في data.errors object
    if (data?.errors && typeof data.errors === 'object') {
      // نجمع أول رسالة من كل حقل ونعرضها
      const messages = Object.values(data.errors)
        .flat()
        .slice(0, 3) // نعرض حتى 3 رسائل قصيرة
        .join('\n');
      toast.error(messages || 'خطأ في البيانات المدخلة');
      return;
    }
    // 2) رسالة عامة من السيرفر في data.msg أو data.message
    if (data?.msg || data?.message) {
      toast.error(data.msg || data.message);
      return;
    }
    // 3) fallback: رسالة خطأ عامة
    toast.error('فشل في إرسال الرسالة. تحقق من اتصالك ثم حاول مرة أخرى.');
    console.error('ContactUs error:', err);
  }
};
</script>
