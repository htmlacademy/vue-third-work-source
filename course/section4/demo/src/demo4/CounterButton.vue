<template>
  <button class="counter-button" @click="$emit('action')">
    <slot />
  </button>
</template>

<script setup>
const emit = defineEmits(['action']);
</script>

<style lang="scss" scoped>
.counter-button {
  margin: 0 10px;
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background: #dd0000;
  color: white;
  cursor: pointer;

  &:hover {
    background: #ff0000;
  }

  &[disabled] {
    background: #999;
    cursor: not-allowed;
  }
}
</style>
