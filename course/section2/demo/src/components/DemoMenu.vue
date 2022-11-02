<template>
  <div class="main-container">
    <div class="cards">
      <demo-menu-card
        v-for="({ name, text, path }, index) in routes"
        :key="index"
        :name="name"
        :text="text"
        :link="path"/>
    </div>
  </div>
</template>

<script setup>
import DemoMenuCard from './DemoMenuCard.vue'
import routes from '../routes'
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

@media (max-width: 1600px) {
  .cards {
    justify-content: center;
  }
}
</style>
