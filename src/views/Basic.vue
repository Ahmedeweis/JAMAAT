<template>
    <div class="bg-cover bg-center min-h-screen"
   :style="`background-image: url(${bg});`">Basic content</div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import bg from '../../assets/imgs/splash.png'
import { useToast } from 'vue-toastification'
const router = useRouter()
const toast = useToast()
</script>