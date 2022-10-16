<template>
  <div class="app_layout">
    <app-layout-header/>
    <div class="content">
      <app-layout-sidebar />
      <slot/>
    </div>
  </div>
</template>

<script setup>
import AppLayoutHeader from './AppLayoutHeader.vue'
import AppLayoutSidebar from './AppLayoutSidebar.vue'

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
