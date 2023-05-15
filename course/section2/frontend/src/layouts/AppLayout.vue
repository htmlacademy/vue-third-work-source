<template>
  <div class="app_layout">
    <app-layout-header />
    <div class="content">
      <app-layout-sidebar
          :tasks="props.tasks"
          @update-tasks="$emit('updateTasks', $event)"
      />
      <slot/>
    </div>
  </div>
</template>

<script setup>
import AppLayoutHeader from './AppLayoutHeader.vue'
import AppLayoutSidebar from './AppLayoutSidebar.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  filters: {
    type: Object,
    required: true
  }
})

defineEmits(['updateTasks'])
</script>

<style lang="scss" scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex-grow: 1;
}
</style>
