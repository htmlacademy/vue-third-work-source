<template>
  <div class="main-container">
    <div class="cards">
      <demo-menu-card
        v-for="({ name, text, link }, index) in cards"
        :key="index"
        :name="name"
        :text="text"
        :link="link"/>
    </div>
  </div>
</template>

<script setup>
import DemoMenuCard from './DemoMenuCard.vue'
import cards from '../routes'
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
