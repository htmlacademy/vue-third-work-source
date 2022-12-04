<template>
  <div class="app_layout">
    <app-layout-header/>
    <div class="content">
      <app-layout-sidebar v-if="authStore.isAuthenticated" />
      <slot/>
    </div>
  </div>
</template>

<script setup>
import AppLayoutHeader from './AppLayoutHeader.vue'
import AppLayoutSidebar from './AppLayoutSidebar.vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
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
