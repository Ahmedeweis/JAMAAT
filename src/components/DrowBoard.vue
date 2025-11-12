<template>
  <div
    class="flex flex-col items-center justify-center min-h-[60vh]
           bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-2 mb-3"
  >
    <!-- أدوات التحكم -->
    <div
      class="flex flex-wrap gap-3 items-center mb-4 bg-white shadow-lg
             rounded-xl p-3 border border-indigo-100"
    >
      <!-- اختيار اللون -->
      <div class="flex items-center gap-2">
        <div class="relative group">
  <div class="flex items-center gap-2">
    <label class="font-medium text-gray-700 text-sm">اللون</label>
    <div class="flex gap-2 flex-wrap">
      <div
        v-for="c in colors"
        :key="c"
        class="w-7 h-7 rounded-full border shadow cursor-pointer transition-transform duration-200"
        :style="{ backgroundColor: c, border: color === c ? '2px solid #4f46e5' : '1px solid #ccc' }"
        @click="color = c"
      ></div>
    </div>
  </div>
        </div>
      </div>
      <!-- حجم القلم -->
      <div class="flex items-center gap-2">
        <label class="font-medium text-gray-700 text-sm">الحجم</label>
        <input
          type="range"
          min="5"
          max="25"
          v-model="size"
          class="w-24 h-2 rounded-lg appearance-none bg-gray-200 accent-indigo-600
                 cursor-pointer transition-all duration-300"
        />
        <div class="flex items-center gap-1">
          <span class="font-semibold text-gray-800 tabular-nums text-xs">{{ size }}px</span>
          <div
            class="rounded-full bg-indigo-500 border border-gray-300"
            :style="{ width: size + 'px', height: size + 'px' }"
          ></div>
        </div>
      </div>
      <!-- أزرار التحكم -->
      <div class="flex gap-2">
        <button
          @click="toggleEraser"
          :class="[
            'flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium cursor-pointer text-xs transition-all duration-200',
            isErasing
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
        <img src="../assets/imgs/eraser.png" class="w-7 h-7">
           <!-- <span>ممحاة</span> -->
        </button>
        <button
          @click="clearCanvas"
          class="flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium cursor-pointer
                 bg-red-500 text-white shadow-sm text-xs
                 hover:bg-red-600 hover:shadow-md
                 active:scale-95 transition-all duration-200"
        >
          <span>مسح</span>
        </button>
        <button
          @click="saveCanvas"
          class="flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium cursor-pointer
                 bg-indigo-600 text-white shadow-sm text-xs
                 hover:bg-indigo-700 hover:shadow-md
                 active:scale-95 transition-all duration-200"
        >
          <span>حفظ</span>
        </button>
      </div>
    </div>
<canvas
  ref="canvas"
  class="w-full max-w-[800px] aspect-[16/9] border-2 border-indigo-300 rounded-xl shadow-lg bg-white cursor-crosshair
         transition-transform duration-500 hover:scale-[1.01]"
  @mousedown="startDrawing"
  @mousemove="draw"
  @mouseup="stopDrawing"
  @mouseleave="stopDrawing"
  @touchstart="startTouchDrawing"
  @touchmove="drawTouch"
  @touchend="stopTouchDrawing"
  @touchcancel="stopTouchDrawing"
></canvas>
    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-indigo-600 text-white px-3 py-1 rounded-lg shadow-lg text-xs"
      >
        ✅ تم حفظ الصورة بنجاح
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
const color = ref("#ff5733")
const colors = [
  "#000000", // أسود
//   "#ffffff", // أبيض
  "#ef4444", // أحمر
  "#3b82f6", // أزرق
  "#22c55e", // أخضر
  "#eab308", // أصفر
//   "#f97316", // برتقالي
  "#a855f7", // بنفسجي
//   "#06b6d4", // سماوي
//   "#ec4899", // وردي
  "#6b7280", // رمادي
  "#92400e", // بني
]
const isErasing = ref(false)
const canvas = ref(null)
const ctx = ref(null)
const drawing = ref(false)
const size = ref(5)
const showToast = ref(false)
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
// 📌 إعادة ضبط الكانفاس مع الحفاظ على الرسمة
const resizeCanvas = () => {
  const canvasEl = canvas.value
  if (!canvasEl) return
  // حفظ الرسم الحالي كصورة
  const dataURL = canvasEl.toDataURL()
  // تحديث أبعاد الكانفاس مع حجم الـ container
  canvasEl.width = canvasEl.clientWidth
  canvasEl.height = canvasEl.clientHeight
  // إعادة تهيئة السياق
  ctx.value = canvasEl.getContext("2d")
  ctx.value.lineCap = "round"
  ctx.value.lineJoin = "round"
  // استرجاع الرسمة القديمة
  const img = new Image()
  img.src = dataURL
  img.onload = () => {
    ctx.value.drawImage(img, 0, 0, canvasEl.width, canvasEl.height)
  }
}
onMounted(() => {
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCanvas)
})
// 🎯 دعم اللمس للموبايل
const getTouchPos = (touchEvent) => {
  const rect = canvas.value.getBoundingClientRect()
  const touch = touchEvent.touches[0] || touchEvent.changedTouches[0]
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  }
}
const startTouchDrawing = (e) => {
  e.preventDefault()
  drawing.value = true
  const pos = getTouchPos(e)
  ctx.value.beginPath()
  ctx.value.moveTo(pos.x, pos.y)
}
const drawTouch = (e) => {
  if (!drawing.value) return
  e.preventDefault()
  const pos = getTouchPos(e)
  ctx.value.strokeStyle = isErasing.value ? "#ffffff" : color.value
  ctx.value.lineWidth = size.value
  ctx.value.lineTo(pos.x, pos.y)
  ctx.value.stroke()
}
const stopTouchDrawing = (e) => {
  e.preventDefault()
  drawing.value = false
  ctx.value.closePath()
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
