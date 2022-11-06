<template>
  <demo-container>
    <button @click="isComponentA = !isComponentA">
      Изменить компонент
    </button>
    <Transition name="slide" mode="out-in">
      <component :is="currentComponent"/>
    </Transition>
  </demo-container>
</template>

<script setup>
import DemoContainer from '../components/DemoContainer.vue'
import { ref, computed } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const isComponentA = ref(true)
const currentComponent = computed(() => {
  return isComponentA.value ? ComponentA : ComponentB
})

</script>

<style scoped>
.slide-enter-active {
  transition: all 0.4s
}

.slide-enter {
  opacity: 0;
  margin-left: 90px;
}

.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}
</style>
