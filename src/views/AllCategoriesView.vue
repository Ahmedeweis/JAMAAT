<template>
  <section class="p-8 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 text-center">
      🧾 All Categories (Smart View)
    </h1>
    <div v-if="loading" class="text-gray-500 text-center text-lg">⏳ Loading all categories...</div>
    <div v-else-if="error" class="text-red-500 text-center">⚠️ {{ error }}</div>
    <div v-else>
      <p class="text-gray-600 mb-4 text-center">
        ✅ Total Categories: <b>{{ categories.length }}</b>
      </p>
      <ul class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <li
          v-for="cat in categories"
          :key="cat.id"
          class="p-4 border rounded-xl bg-white hover:shadow-lg transition flex flex-col items-center"
        >
          <img
            v-if="cat.image_url"
            :src="cat.image_url"
            alt="Category image"
            class="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h3 class="text-lg font-semibold text-gray-700 text-center">{{ cat.name }}</h3>
          <p v-if="cat.hint" class="text-sm text-gray-500 mt-1 text-center">{{ cat.hint }}</p>
          <p v-if="cat.game?.label" class="text-xs text-gray-400 mt-1">
            🎮 {{ cat.game.label }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getAllCategories } from "../services/allCategoriesService";
const categories = ref([]);
const loading = ref(true);
const error = ref(null);
onMounted(async () => {
  try {
    categories.value = await getAllCategories();
  } catch (err) {
    error.value = err.message || "Failed to load categories";
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped>
body {
  background-color: #f9fafb;
}
</style>
