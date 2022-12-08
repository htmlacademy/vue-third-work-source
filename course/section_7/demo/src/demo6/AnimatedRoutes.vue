<template>
  <demo-container>
    <div class="container">
      <router-link class="link" to="/animated-routes/component-a">Component A</router-link>
      |
      <router-link class="link" to="/animated-routes/component-b">Component B</router-link>
    </div>
    <transition
        name="view"
        appear
        enter-active-class="animate__animated animate__bounceInRight"
    >
      <router-view/>
    </transition>
  </demo-container>
</template>

<script setup>
import DemoContainer from '../components/DemoContainer.vue'
</script>

<style lang="scss" scoped>
.container {
  margin: 20px;
}
.link {
  border-bottom: 1px solid #343838FF;
  color: #343838FF;
  padding-bottom: .25rem;
  text-decoration: none;
}
</style>

