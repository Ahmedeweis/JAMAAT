<template>
  <section class="p-8 space-y-10">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">🎮 Game Categories</h1>
    <div v-if="loading" class="text-gray-500">Loading categories...</div>
    <div v-else-if="error" class="text-red-500">⚠️ {{ error }}</div>
    <!-- 🔹 All Categories + Games -->
    <div
      v-for="(group, index) in allGames"
      :key="index"
      class="space-y-4"
    >
      <h2
        class="text-xl font-semibold mb-3"
        :class="group.color"
      >
        {{ group.title }}
      </h2>
      <ul class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <li
          v-for="cat in group.data"
          :key="cat.id"
          class="p-4 border rounded-lg hover:shadow-lg transition bg-white"
          @click="toggleCategory(cat)"
        >
          <img
            v-if="cat.image_url"
            :src="cat.image_url"
            class="w-full h-32 object-cover rounded mb-2"
          />
          <h3 class="font-medium text-lg">{{ cat.name }}</h3>
          <!-- الأسئلة -->
          <div v-if="expandedCategory === cat.id" class="mt-3 border-t pt-3">
            <div v-if="cat.loadingQuestions" class="text-gray-400 text-sm">
              Loading questions...
            </div>
            <div v-else-if="cat.questions?.length">
              <ul class="space-y-2">
                <li
                  v-for="q in cat.questions"
                  :key="q.id"
                  class="p-2 bg-gray-50 border rounded-md"
                >
                  {{ q.title }}
                </li>
              </ul>
            </div>
            <div v-else class="text-gray-400 text-sm">No questions available.</div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getCategories, getCategoryQuestions } from "../../services/categoryServicee";
const loading = ref(true);
const error = ref(null);
const expandedCategory = ref(null);
// كل الألعاب في مجموعة واحدة (عشان نعرضها بديناميكية)
const allGames = ref([
  { title: "🌐 All Categories", color: "text-orange-600", data: [] },
  { title: "🕹️ Game 1", color: "text-blue-600", data: [] },
  { title: "🎯 Game 2", color: "text-green-600", data: [] },
  { title: "⚔️ Game 3", color: "text-purple-600", data: [] },
]);
// 🧠 دالة تجيب كاتيجوري معينة
const fetchCategories = async (gameId = null, targetRef) => {
  try {
    const response = await getCategories(gameId, true);
    targetRef.data = response.data || response;
  } catch (err) {
    error.value = err.message || "Failed to load categories";
  }
};
// 🧩 جلب كل الداتا
onMounted(async () => {
  await Promise.all([
    fetchCategories(null, allGames.value[0]),
    fetchCategories(1, allGames.value[1]),
    fetchCategories(2, allGames.value[2]),
    fetchCategories(3, allGames.value[3]),
  ]);
  loading.value = false;
});
// 🎯 لما تضغط على كاتيجوري
const toggleCategory = async (cat) => {
  if (expandedCategory.value === cat.id) {
    expandedCategory.value = null;
    return;
  }
  if (!cat.questions) {
    cat.loadingQuestions = true;
    try {
      const res = await getCategoryQuestions(cat.id);
      cat.questions = res.data || res;
    } catch (e) {
      cat.questions = [];
      console.error(e);
    } finally {
      cat.loadingQuestions = false;
    }
  }
  expandedCategory.value = cat.id;
};
</script>
