<template>
  <div>Component</div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.tasks-enter-active,
.tasks-leave-active {
  transition: all $animationSpeed ease;
}

.tasks-enter,
.tasks-leave-to {
  transform: scale(1.1);

  opacity: 0;
}
</style>
