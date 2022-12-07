<template>
  <demo-container>
    <demo-button @click="show = !show">Показать</demo-button>
    <br>
    <transition
        @enter="enterAnimation"
        @leave="leaveAnimation"
        :css="false"
    >
      <img v-if="show" src="@/assets/ball.png" alt="img">
    </transition>
  </demo-container>
</template>

<script setup>
import DemoContainer from '../components/DemoContainer.vue'
import DemoButton from './DemoButton.vue'
import { ref } from 'vue'

const show = ref(true)

function clearAnimations (el, done) {
  el.addEventListener('animationend', () => {
    el.className = ''
    done()
  })
}

function enterAnimation (el, done) {
  el.className = 'bounce'
  clearAnimations(el, done)
}

function leaveAnimation (el, done) {
  el.className = 'bounce-reverse'
  clearAnimations(el, done)
}
</script>

<style scoped>
.bounce {
  animation: bounce .5s;
}

.bounce-reverse {
  animation: bounce .5s reverse;
}

@keyframes bounce {
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
