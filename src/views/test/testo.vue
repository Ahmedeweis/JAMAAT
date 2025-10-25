<template>
  <section class="p-8 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">🔍 Fetch Category Questions</h1>
    <!-- إدخال الـ ID -->
    <div class="flex gap-3 items-center mb-6">
      <input
        v-model="categoryId"
        type="number"
        placeholder="Enter Category ID..."
        class="border rounded-lg px-4 py-2 flex-1 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
      <button
        @click="fetchQuestions"
        :disabled="loading || !categoryId"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        {{ loading ? "Loading..." : "Get Questions" }}
      </button>
    </div>
    <!-- عرض النتائج -->
    <div v-if="error" class="text-red-500 mb-4">⚠️ {{ error }}</div>
    <div v-if="questions.length" class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-700">
        📋 Questions for Category #{{ categoryId }}
      </h2>
      <ul class="space-y-2">
        <li
          v-for="q in questions"
          :key="q.id"
          class="p-3 border rounded-md bg-gray-50 hover:shadow-sm transition"
        >
          <h3 class="font-medium">{{ q.title }}</h3>
          <p v-if="q.description" class="text-sm text-gray-600 mt-1">
            {{ q.description }}
          </p>
        </li>
      </ul>
    </div>
    <div v-else-if="!loading && !error && categoryId" class="text-gray-500">
      No questions found for this category.
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { getCategoryQuestions } from "../../services/categoryServicee";
// 🧩 المتغيرات
const categoryId = ref("");
const questions = ref([]);
const loading = ref(false);
const error = ref(null);
// 🧠 دالة تجيب الأسئلة حسب ID
const fetchQuestions = async () => {
  if (!categoryId.value) return;
  loading.value = true;
  error.value = null;
  questions.value = [];
  try {
    const res = await getCategoryQuestions(categoryId.value);
    questions.value = res.data || res;
  } catch (err) {
    error.value = err.message || "Failed to fetch questions";
  } finally {
    loading.value = false;
  }
};
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button {
  display: none;
}
</style>
