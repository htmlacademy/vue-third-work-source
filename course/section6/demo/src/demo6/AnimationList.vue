<template>
  <button @click="add">Add</button>
  <TransitionGroup name="card" tag="ul">
    <li class="card" v-for="({ id }) in items" :key="id">Id: {{ id }}</li>
  </TransitionGroup>
</template>

<script setup>
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
