<template>
  <demo-container>
    <demo-button @click="show = !show">Показать</demo-button>
    <br>
    <Transition
        @enter="enterAnimation"
        @leave="leaveAnimation"
        :css="false"
    >
      <img v-if="show" :src="imageLink" alt="">
    </Transition>
  </demo-container>
</template>

<script setup>
import DemoContainer from '../components/DemoContainer.vue'
import DemoButton from './DemoButton.vue'
import { ref } from 'vue'

const imageLink = 'https://freepngimg.com/thumb/ball/75396-cricket-tennis-green-ball-hq-image-free-png-thumb.png'
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
