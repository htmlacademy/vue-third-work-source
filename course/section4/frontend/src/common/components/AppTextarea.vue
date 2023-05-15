<template>
  <div class="text-field">
    <!--    Поле ввода текста-->
    <textarea
        :value="modelValue"
        :name="props.name"
        class="text-field__input"
        :class="{'text-field__input--error': showError}"
        :placeholder="props.placeholder"
        :required="props.required"
        @input="$emit('update:modelValue', $event.target.value)"
    />
    <!--      Отображение ошибок валидации-->
    <span
        v-if="showError"
        class="text-field__text"
    >
      {{ errorText }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  errorText: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const showError = computed(() => {
  return !props.modelValue && !!props.errorText;
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.text-field {
  position: relative;

  &__input {
    display: block;

    box-sizing: border-box;
    width: 100%;
    height: 90px;
    margin-top: 16px;
    padding: 16px;

    resize: none;
    transition: border-color $animationSpeed;

    color: $blue-gray-600;
    border: 1px solid $gray-100;
    border-radius: 6px;
    outline: none;

    @include r-s14-h21;

    &:focus {
      border-color: $blue-600;
    }

    &--error {
      border-color: $red-600;
    }
  }

  &__text {
    position: absolute;
    bottom: -12px;
    left: 0;

    color: $red-600;

    @include r-s10-h12;
  }
}
</style>
