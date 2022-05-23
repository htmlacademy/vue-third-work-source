<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.scss";
</style>
