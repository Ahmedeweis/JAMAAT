<template>
    <div class="min-h-screen bg-cover bg-center flex" :style="`background-image: url(${bg});`">
        <div class="flex-1 pl-2 pb-2 pr-0 pt-0 rounded-3xl">
            <div class="min-h-screen mt-4 mr-[5px] rounded-3xl bg-white flex flex-col items-center justify-center p-4">
                <h1 class="text-3xl md:text-4xl font-bold mb-8" style="font-family: 'Kufam', sans-serif;" >تواصل معنا</h1>
                <div class="w-full max-w-md space-y-4 ">
                    <div class="flex flex-col text-right">
                        <label class="text-[#663D9C] mb-1">الإسم</label>
                        <input v-model="name" type="text"
                            class="p-2  placeholder-[#D5C1EE] text-[#24054C]  rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right "
                            placeholder="سجل الإسم">
                    </div>
                    <div class="flex flex-col text-right">
                        <label class="text-purple-800 mb-1">البريد الإلكتروني</label>
                        <input type="email" v-model="email"
                            class="p-2 placeholder-[#D5C1EE] text-[#24054C] font-bold text-left rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                            placeholder="example@gmail.com" />
                    </div>
                    <div class="flex flex-col text-right">
                        <label class="text-purple-800 mb-1">رقم الجوال</label>
                        <input type="tel" v-model="phone"
                            class="p-2 placeholder-[#D5C1EE] text-[#24054C]  text-right rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none"
                            placeholder="رقم الجوال">
                    </div>
                    <div class="flex flex-col text-right">
                        <label class="text-[#663D9C] mb-1">رسالتك</label>
                        <textarea v-model="message"
                            class="p-2 placeholder-[#D5C1EE] text-[#24054C] rounded-3xl bg-purple-50 border-2 border-purple-50 focus:border-[#3F0092] focus:outline-none text-right resize-none"
                            placeholder="اكتب رسالتك هنا" rows="6"></textarea>
                    </div>
                    <button @click="handleSubmit"
                     class="w-full cursor-pointer bg-[#E3614D] text-white py-3 rounded-4xl font-bold
                     shadow-[5px_5px_15px_#C33520] transition duration-300">
                        إرسال
                    </button>
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
import { ref } from 'vue'
import bg from '../../assets/imgs/splash.png'
import { useToast } from 'vue-toastification'
import { ContactUs } from '../../services/supportService.js'
import side from '../../components/side.vue'
import { useRouter } from 'vue-router'
const name = ref('')
const email = ref('')
// const phone = ref('')
const message = ref('')
const toast = useToast()
const router = useRouter()
const handleSubmit = async () => {
  const payload = {
    name: name.value.trim(),
    email: email.value.trim(),
    // phone: phone.value.trim(),
    message: message.value.trim(),
  }
  if (!payload.name || !payload.email || !payload.message) {
    toast.warning('يرجى تعبئة الحقول المطلوبة')
    return
  }
  try {
    await ContactUs(payload)
    toast.success('تم إرسال الرسالة بنجاح  سنتواصل معك في أسرع وقت ')
    name.value = ''
    email.value = ''
    // phone.value = ''
    message.value = ''
  } catch (err) {
    console.error('خطأ في الإرسال:', err)
    const errorMsg = err?.response?.data?.message || 'حدث خطأ أثناء الإرسال '
    toast.error(errorMsg)
  }
}
</script>
