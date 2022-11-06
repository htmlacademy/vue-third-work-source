<template>
  <demo-container>
    <demo-button @click="add">Add</demo-button>
    <br>
    <transition-group name="card" tag="ul">
      <li class="card" v-for="({ id }) in items" :key="id">Id: {{ id }}</li>
    </transition-group>
  </demo-container>
</template>

<script setup>
import DemoContainer from '../components/DemoContainer.vue'
import DemoButton from './DemoButton.vue'
import { reactive } from 'vue'

const items = reactive([
  { id: 1 },
  { id: 2 },
])

function add () {
  items.push({ id: Math.floor(Math.random() * 10) })
}
</script>

<style scoped>
.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
