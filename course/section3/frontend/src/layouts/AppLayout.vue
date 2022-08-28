<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppLayoutDefault from './AppLayoutDefault.vue'

const route = useRoute()
const layout = shallowRef(null)

// Наблюдаем за изменением маршрута
watch(
  () => route.meta,
    async meta => {
      try {
        // Пробуем найти компонент из свойства meta и динамически импортировать его
        const component = await import(`./${meta.layout}.vue`)
        layout.value = component?.default || AppLayoutDefault
      } catch (e) {
        // Если компонент не найдет, добавляем шаблон по-умолчанию
        layout.value = AppLayoutDefault
      }
    }
)

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
