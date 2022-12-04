<template>
  <render/>
</template>

<script setup>
import { h, ref, watch } from 'vue'
import { uniq } from 'lodash'
import { TAG_SEPARATOR, KEY_CODE_ENTER } from '@/common/constants'
import { getTagsArrayFromString } from '@/common/helpers'

const props = defineProps({
  tags: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['setTags'])

// Разделяем строку тегов на массив
const splitTags = props.tags ? ref(getTagsArrayFromString(props.tags)) : ref([])

watch(
    () => props.tags,
    (tags) => {
      splitTags.value = getTagsArrayFromString(tags)
    }
)

async function setTags (tags) {
  emits('setTags', tags.trim(), true)
}

const render = () => {
  // Создаем дочерние элементы с тегами
  const elements = splitTags.value.map(tag => {
    return h(
        'span',
        {
          class: { tag: true }
        },
        `${TAG_SEPARATOR}${tag}`
    )
  })

  const updateTags = event => {
    // Удаляем дубликаты
    const uniqValues = uniq(
        event.target.textContent
            .split(TAG_SEPARATOR)
    )
    setTags(uniqValues.join(TAG_SEPARATOR))
  }

  return h(
      'div',
      {
        contentEditable: true,
        class: {
          analyzer: true
        },
        style: {
          outline: 'none',
          minHeight: '42px'
        },
        onFocus: () => {
          emits('setTags', `${props.tags}#`, false)
        },
        onBlur: event => updateTags(event),
        onKeydown: event => {
          if (event.keyCode === KEY_CODE_ENTER) {
            event.preventDefault()
            updateTags(event)
          }
        },
        ref: 'analyzer'
      },
      elements
  )
}
</script>
