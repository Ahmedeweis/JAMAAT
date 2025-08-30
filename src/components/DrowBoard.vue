<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen
           bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6"
  >
    <!-- الهيدر -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-indigo-700 flex items-center gap-2 justify-center">
        🎨 لوحة الرسم
      </h1>
      <p class="text-gray-600 mt-2">ارسم بحرية، غيّر الألوان والحجم، واحفظ إبداعك!</p>
    </div>
    <!-- أدوات التحكم -->
    <div
      class="flex flex-wrap gap-6 items-center mb-8 bg-white shadow-lg
             rounded-xl p-6 border border-indigo-100"
    >
      <!-- اختيار اللون -->
      <div class="flex items-center gap-3">
        <label class="font-medium text-gray-700">اللون</label>
 <div class="relative group">
  <input
    type="color"
    v-model="color"
    class="sr-only"
    ref="colorPicker"
  />
  <!-- الزر الدائري -->
  <div
    class="w-11 h-11 rounded-full border border-gray-300 shadow-sm
           transition-all duration-300 cursor-pointer
           group-hover:shadow-md group-hover:scale-105"
    :style="{ background: color }"
    @click="$refs.colorPicker.click()"
  ></div>
</div>
      </div>
      <!-- حجم القلم -->
      <div class="flex items-center gap-4">
        <label class="font-medium text-gray-700">الحجم</label>
        <input
          type="range"
          min="5"
          max="25"
          v-model="size"
          class="w-44 h-2 rounded-lg appearance-none bg-gray-200 accent-indigo-600
                 cursor-pointer transition-all duration-300"
        />
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-800 tabular-nums">{{ size }}px</span>
          <!-- preview circle -->
          <div
            class="rounded-full bg-indigo-500 border border-gray-300"
            :style="{ width: size + 'px', height: size + 'px' }"
          ></div>
        </div>
      </div>
      <!-- أزرار التحكم -->
        <div class="flex gap-3">
  <!-- زر الممحاة -->
  <button
    @click="toggleEraser"
    :class="[
      'flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium cursor-pointer transition-all duration-200',
      isErasing
        ? 'bg-yellow-500 text-white shadow-md'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    ]"
  >
    🩹 <span>الممحاة</span>
  </button>
        <button
          @click="clearCanvas"
          class="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium cursor-pointer
                 bg-red-500 text-white shadow-sm
                 hover:bg-red-600 hover:shadow-md
                 active:scale-95 transition-all duration-200"
        >
           <span>مسح الكل</span>
        </button>
        <button
          @click="saveCanvas"
          class="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium cursor-pointer
                 bg-indigo-600 text-white shadow-sm
                 hover:bg-indigo-700 hover:shadow-md
                 active:scale-95 transition-all duration-200"
        >
           <span>حفظ الصورة</span>
        </button>
      </div>
    </div>
    <!-- الكانفاس -->
    <canvas
      ref="canvas"
      width="800"
      height="500"
      class="border-2 border-indigo-300 rounded-xl shadow-lg bg-white cursor-crosshair
             transition-transform duration-500 hover:scale-[1.01]"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
    ></canvas>
    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        ✅ تم حفظ الصورة بنجاح
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
const color = ref("#ff5733")
const isErasing = ref(false)
const canvas = ref(null)
const ctx = ref(null)
const drawing = ref(false)
const size = ref(5)
const showToast = ref(false)
onMounted(() => {
  ctx.value = canvas.value.getContext("2d")
  ctx.value.lineCap = "round"
  ctx.value.lineJoin = "round"
})
const startDrawing = (e) => {
  drawing.value = true
  ctx.value.beginPath()
  ctx.value.moveTo(e.offsetX, e.offsetY)
}
const draw = (e) => {
  if (!drawing.value) return
  ctx.value.strokeStyle = isErasing.value ? "#ffffff" : color.value
  ctx.value.lineWidth = size.value
  ctx.value.lineTo(e.offsetX, e.offsetY)
  ctx.value.stroke()
}
const stopDrawing = () => {
  drawing.value = false
  ctx.value.closePath()
}
const clearCanvas = () => {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
}
const saveCanvas = () => {
  const link = document.createElement("a")
  link.download = "my-drawing.png"
  link.href = canvas.value.toDataURL()
  link.click()
  showToast.value = true
  setTimeout(() => (showToast.value = false), 2000)
}
const toggleEraser = () => {
  isErasing.value = !isErasing.value
}
</script>
<style scoped>
/* سلايدر مخصص */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 6px;
  background: #e5e7eb;
  cursor: pointer;
  transition: background 0.3s ease;
}
input[type="range"]:hover {
  background: #d1d5db;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: #4f46e5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}
input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}
input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: #4f46e5;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}
input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.15);
}
/* Toast Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
