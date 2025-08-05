<template>
    <div class="p-4">
        <h2 class="text-2xl font-bold mb-6 text-center text-purple-700">📂 التصنيفات المتاحة</h2>
        <div  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="category in categories" :key="category.id"
                class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative group">
                <!-- صورة -->
                <img :src="category.image_url" alt="صورة التصنيف" class="w-full h-36 object-contain mb-4  rounded-xl" />
                <!-- عنوان + زر التلميح -->
                <div class="flex items-center justify-between mb-2  p-4 ">
                    <button @click="toggleHint(category.id)"
                        class="text-white cursor-pointer hover:text-purple-800 text-xl  bg-purple-400 rounded-full px-[10px] font-bold focus:outline-none"
                        title="عرض التلميح">
                        i
                    </button>
                    <h3 class="text-lg font-bold bg-gray-800/60 text-white px-3 py-1 rounded-lg truncate">
                        {{ category.name }}
                    </h3>
                </div>
                <div v-if="activeHintId === category.id" class="bg-purple-100 text-purple-800 text-sm mt-2 p-2 rounded">
                    💡 {{ category.hint }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getCategories } from '../../services/categoryService'
const categories = ref([])
const activeHintId = ref(null)
const toggleHint = (id) => {
    activeHintId.value = activeHintId.value === id ? null : id
}
onMounted(async () => {
    try {
        const res = await getCategories()
        categories.value = res.data.data
    } catch (err) {
        console.error("فشل في جلب التصنيفات", err)
    }
})
</script>
