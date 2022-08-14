<template>
  <li>
    Срок:
    <div class="task-card__datepicker">
      <date-picker
          v-model="date"
          input-format="dd:MM:yyyy"
          :lower-limit="new Date()"
      />
    </div>
  </li>
</template>

<script setup>
import DatePicker from 'vue3-datepicker'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const date = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-card {
  &__datepicker {
    margin-left: 5px;

    &:deep(input) {
      margin: 0;
      padding: 0;

      text-decoration: none;

      color: $gray-900;
      border: none;
      outline: 0;
      cursor: pointer;

      @include r-s16-h21;
    }
  }
}
</style>
