<template>
  <span>Current value: {{ value }}</span>
</template>

<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
  }
});
</script>
