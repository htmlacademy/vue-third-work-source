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

const cards = [
  {
    name: 'Counter Base',
    link: '/counter-0'
  },
]
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
