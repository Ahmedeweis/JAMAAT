<!-- components/StartGameModal.vue -->
<template>
  <div class="min-h-screen w-full bg-cover bg-center bg-no-repeat" :style="`background-image: url(${bg});`">
  <div
    @click="confirmExit"
    class="fixed top-5 left-0 m-4 flex justify-between items-center text-start bg-[#010035] shadow-lg rounded-lg z-50 cursor-pointer"
  >
    <img src="../../../assets/imgs/close_btn.svg" alt="Logo" class="w-10 z-10" />
  </div>
            <div
            @click="resetBoard"
      class=" cursor-pointer fixed top-5 left-15 m-4 flex justify-between items-center  text-start bg-[#010035] shadow-lg rounded-lg z-50">
      <img src="../../../assets/imgs/redo_btn.svg" alt="Logo" class="w-10 z-10 " />
    </div>
    <div
      class=" board fixed top-0 right-0 m-4 flex justify-between items-center  w-[200px] text-start bg-[#010035] shadow-lg rounded-lg z-50">
      <img src="../../../assets/imgs/coin.svg" alt="Logo" class="w-8 z-10 coin-icon" />
      <span class="text-2xl font-bold text-white coin-amount">120</span>
      <img src="../../../assets/imgs/Icon-Buttons.svg" alt="Clock Icon" class="w-8 h-8 add-button" />
    </div>
    <div class=" inset-0  bg-opacity-60 flex justify-center items-center z-50">
      <div class="mt-30 flex flex-col items-center">
<div class="flex items-center mb-4 boardII cursor-pointer"
     :class="[{ active: currentPlayer === 'red' }, 'red']">
    <img src="../../../assets/imgs/green.svg">
    <h2 class="text-white text-bold text-3xl">{{ player1 }}</h2>
</div>
<div class="flex items-center mb-4 boardII cursor-pointer"
     :class="[{ active: currentPlayer === 'yellow' }, 'yellow']">
    <img src="../../../assets/imgs/yellow.svg">
    <h2 class="text-white text-bold text-3xl">{{ player2 }}</h2>
</div>
        <div class="space-y-6 my-3" style="margin: 20px 10px;">
            <div class="land">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="cell"
        :class="cell"
        @click="dropDisc(colIndex)"
      ></div>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { getCategories } from '../../../services/categoryService'
import bg from '../../../assets/imgs/splash.png'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
const router = useRouter();
const rows = 6
const cols = 7
const toast = useToast()
const route = useRoute()
const categories = ref([])
const allQuestions = ref([])
const loading = ref(true)
const player1 = ref(localStorage.getItem('player1Name') || '')
const player2 = ref(localStorage.getItem('player2Name') || '')
// استخراج أرقام الكاتيجوريز من الرابط وتحويلها لأرقام
const routeCategories = Array.isArray(route.query.categories)
  ? route.query.categories.map(Number)
  : route.query.categories?.split(',').map(Number) || []
onMounted(async () => {
  if (routeCategories.length === 0) {
    toast.error('لم يتم تحديد أي كاتيجوري في الرابط')
    loading.value = false
    return
  }
  try {
    const res = await getCategories()
    // دعم شكلين محتملين للـ API
    const apiData = res?.data?.result?.data || res?.data?.data
    if (!apiData) {
      throw new Error('الـ API لم يرجع بيانات صحيحة')
    }
    // تعديل رابط الصورة إذا لزم الأمر
    const allCategories = apiData.map(cat => ({
      ...cat,
      image_url: cat.image?.startsWith('http')
        ? cat.image
        : `http://game-wise.smartleadtech.com/${cat.image?.replace(/^\/+/, '')}`
    }))
    console.log('📌 الكاتيجوريز قبل الفلترة:', allCategories)
    // فلترة بناءً على IDs من الرابط
    const filteredCategories = allCategories.filter(cat =>
      routeCategories.includes(cat.id)
    )
    categories.value = filteredCategories
    allQuestions.value = filteredCategories.flatMap(cat => cat.questions || [])
    console.log('📌 الكاتيجوريز بعد الفلترة:', categories.value)
    console.log('📌 الأسئلة:', allQuestions.value)
  } catch (err) {
    console.error('❌ خطأ في جلب الكاتيجوريز:', err)
    toast.error('فشل في تحميل الكاتيجوريز')
  } finally {
    loading.value = false
  }
})
const board = ref(
  Array.from({ length: rows }, () => Array(cols).fill(null))
)
const currentPlayer = ref('red')
const dropDisc = (colIndex) => {
  // نلاقي أول خانة فاضية من تحت لفوق
  for (let row = rows - 1; row >= 0; row--) {
    if (!board.value[row][colIndex]) {
      board.value[row][colIndex] = currentPlayer.value
      // نبدل اللاعب
      currentPlayer.value = currentPlayer.value === 'red' ? 'yellow' : 'red'
      break
    }
  }
}
const resetBoard = () => {
  Swal.fire({
    title: 'هل أنت متأكد؟',
    text: 'سيتم مسح البورد وإعادة اللعب من البداية!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم',
    cancelButtonText: 'لا',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      board.value = Array.from({ length: rows }, () => Array(cols).fill(null))
      currentPlayer.value = 'red'
      Swal.fire({
        title: 'تم إعادة التعيين!',
        text: 'اللعبة بدأت من جديد.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
    }
  })
}
const confirmExit = () => {
  Swal.fire({
    title: 'هل أنت متأكد؟',
    text: 'سيتم الخروج من اللعبة!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم',
    cancelButtonText: 'إلغاء'
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/ChooseGame');
    }
  });
};
</script>
<style scoped>
/* خلفية اللوحة */
.board {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  padding: 10px 11px 10px 11px;
  background: #010035;
  border-radius: 12px;
  box-shadow:
    0 0 5px 2px rgba(0, 0, 0, 0.6),
    inset 0 0 8px 2px rgba(255, 255, 255, 0.05);
  font-family: Arial, sans-serif;
  color: white;
  font-weight: 700;
  user-select: none;
  z-index: 1000;
}
/* تصميم شكل الإطار الخارجي مع الأطراف الدائرية والأنبوب */
.board::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 18px;
  pointer-events: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
}
/* أيقونة العملة (العملة الذهبية بالدولار) */
.coin-icon {
  flex-shrink: 0;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #f9d54f 0%, #de8b00 80%);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.6),
    inset 0 -5px 10px #b17d00,
    0 4px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
/* رمز الدولار */
.coin-icon::after {
  content: "$";
  font-weight: 900;
  font-size: 2.2rem;
  color: #fff9d7;
  text-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.4);
  position: relative;
  top: 2px;
}
/* العدد */
.coin-amount {
  margin: 0 12px;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  flex-grow: 1;
  text-align: center;
}
/* زر الإضافة الأخضر */
.add-button {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(180deg, #50f060 0%, #009f2d 100%);
  box-shadow:
    inset 0 4px 5px rgba(255, 255, 255, 0.35),
    0 4px 8px rgba(0, 120, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;
  cursor: pointer;
}
.add-button:hover {
  background: linear-gradient(180deg, #70ff82 0%, #00c03f 100%);
}
/* رمز زائد داخل الزر */
.add-button::before {
  content: "+";
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  line-height: 1;
  user-select: none;
  position: relative;
  top: 1px;
}
.boardII {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin-top:20px ;
  padding: 10px 11px 10px 11px;
  background: #010035;
  border-radius: 12px;
  box-shadow:
    0 0 5px 2px rgba(0, 0, 0, 0.6),
    inset 0 0 8px 2px rgba(255, 255, 255, 0.05);
  font-family: Arial, sans-serif;
  color: white;
  font-weight: 700;
  user-select: none;
  z-index: 1000;
}
.land {
  display: flex;
  flex-direction: column;
  background: #F2FCE0;
  padding: 10px;
  border-radius: 30px;
  width: fit-content;
  border: solid 4px #A3611F;
}
.row {
  display: flex;
}
.cell {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #01004C;
  margin: 6px;
  cursor: pointer;
}
.cell.red {
  background: #FFCE67;
}
.cell.yellow {
  background: #66FD84;
}
.boardII {
  transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
}
/* اللاعب الأحمر (أخضر في التصميم) */
.boardII.active.red {
  transform: scale(1.2);
  box-shadow: 0 0 15px 5px rgba(102, 253, 132, 0.7);
}
.boardII.active.red h2 {
  color: #66FD84;
  text-shadow: 0 0 8px #66FD84, 0 0 12px #66FD84;
}
/* اللاعب الأصفر */
.boardII.active.yellow {
  transform: scale(1.2);
  box-shadow: 0 0 15px 5px rgba(255, 206, 103, 0.7);
}
.boardII.active.yellow h2 {
  color: #FFCE67;
  text-shadow: 0 0 8px #FFCE67, 0 0 12px #FFCE67;
}
</style>
