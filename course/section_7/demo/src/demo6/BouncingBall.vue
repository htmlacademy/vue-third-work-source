<template>
  <demo-container>
    <demo-button @click="show = !show">Показать</demo-button>
    <br>
    <transition name="bounce">
      <img v-if="show" :src="imageLink" alt="img">
    </transition>
  </demo-container>
</template>

<script setup>
import DemoContainer from '../components/DemoContainer.vue'
import DemoButton from './DemoButton.vue'
import { ref } from 'vue'

const imageLink = 'https://freepngimg.com/thumb/ball/75396-cricket-tennis-green-ball-hq-image-free-png-thumb.png'
const show = ref(true)
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
