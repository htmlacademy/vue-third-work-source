<template>
  <div class="task-card__tags">
    <div class="task-card__tags--text">
      Добавьте тэги, разделенные символом #
    </div>
    <task-card-creator-tags-analyzer
        v-if="showAnalyzer"
        class="task-card__tags-analyzer"
        :tags="tags"
        @setTags="setTags"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskCardCreatorTagsAnalyzer from './TaskCardCreatorTagsAnalyzer.vue'

const props = defineProps({
  tags: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['setTags'])

const showAnalyzer = ref(true)
const timeout = ref(null)

function setTags(tags, refresh) {
  if (refresh) {
    // При обновлении тегов очищаем текущую строку
    showAnalyzer.value = false
    emits('setTags', tags)
    // Обновляем анализатор за минимальное время
    timeout.value = setTimeout(() => {
      showAnalyzer.value = true
      clearTimeout(timeout.value)
    })
  } else {
    emits('setTags', tags)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-card__tags {
  &-analyzer {
    box-sizing: border-box;
    padding: 8px;

    color: $blue-gray-600;
    border: 1px solid $gray-100;
    border-radius: 6px;
    outline: none;

    @include r-s14-h21;
  }

  &--text {
    padding: 10px 0;

    color: $blue-gray-600;

    @include r-s10-h12;
  }
}
</style>
