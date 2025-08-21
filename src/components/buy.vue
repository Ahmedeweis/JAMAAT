<template>
  <router-link to="/Payment"
      class=" board fixed top-0 right-0 m-4 flex justify-between items-center  w-[200px] text-start bg-[#010035] shadow-lg rounded-lg z-50">
      <img src="../assets/imgs/coin.svg" alt="Logo" class="w-8 z-10 coin-icon" />
      <!-- عرض الرصيد من localStorage -->
      <span class="text-2xl font-bold text-white coin-amount">{{ balance }}</span>
      <img src="../assets/imgs/Icon-Buttons.svg" alt="Clock Icon" class="w-8 h-8 add-button" />
  </router-link>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const balance = ref(0)
onMounted(() => {
  const storedBalance = localStorage.getItem('balance')
  balance.value = storedBalance ? Number(storedBalance) : 0
})
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
</style>