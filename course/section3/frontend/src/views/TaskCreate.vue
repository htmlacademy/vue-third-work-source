<template>
  <task-card-creator @addTask="$emit('addTask', $event)" />
</template>

<script setup>
import TaskCardCreator from '../modules/tasks/components/TaskCardCreator.vue'

defineEmits(['addTask'])
</script>
