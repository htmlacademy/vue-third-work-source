<template>
  <div class="task-card__check-list">
    <h4 class="task-card__title">
      Чеклист
      <!--Кнопка создания новой подзадачи-->
      <button
          v-if="!disabled"
          type="button"
          class="task-card__plus"
          @click="$emit('createTick')"
      />
    </h4>
    <!--Список подзадач-->
    <ul
        v-if="ticks.length"
        class="task-card__list"
    >
      <li
          v-for="tick in ticks"
          :key="tick.id || tick.uuid"
          class="task-card__item"
      >
        <div class="task-card__checkbox">
          <label class="checkbox">
            <div class="checkbox__icon">
              <input
                  type="checkbox"
                  name="remember"
                  :checked="tick.done"
                  @click="updateTick(tick, 'done', !tick.done)"
              />
              <span/>
            </div>
            <div class="checkbox__label">
              <input
                  v-if="!disabled"
                  type="text"
                  name="checkbox_name"
                  :value="tick.text"
                  max="64"
                  placeholder="Введите текст пункта"
                  @change="updateTick(tick, 'text', $event.target.value)"
              />
              <span v-else>{{ tick.text }}</span>
            </div>
          </label>
        </div>

        <div
            class="task-card__icons"
            :class="{'task-card__icons--hidden': disabled}"
        >
          <app-icon
              class="icon--trash"
              @click="$emit('removeTick', { uuid: tick.uuid, id: tick.id })"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import AppIcon from '@/common/components/AppIcon.vue'

const props = defineProps({
  ticks: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['createTick', 'updateTick', 'removeTick'])

const updateTick = function (tick, property, value) {
  const tickCopy = Object.assign({}, tick)
  tickCopy[property] = value
  emits('updateTick', tickCopy)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-card {
  &__checkbox {
    flex-grow: 1;

    margin-left: -7px;
  }

  &__list {
    @include clear-list;

    margin-top: 15px;
  }

  &__icons--hidden {
    display: none;
  }

  &__plus {
    display: inline-block;

    width: 14px;
    height: 14px;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: opacity $animationSpeed;
    vertical-align: middle;

    opacity: .8;
    border: none;
    border-radius: 50%;
    outline: none;
    background-color: transparent;
    background-image: url("@/assets/img/icon-plus.svg");
    background-size: cover;

    &:hover {
      opacity: 1;
    }

    &--circle {
      width: 30px;
      height: 30px;
      margin-top: 10px;

      background-image: url("@/assets/img/icon-add.svg");
    }
  }
}

.checkbox {
  position: relative;

  display: flex;
  align-items: center;

  [type="checkbox"] {
    position: absolute;

    overflow: hidden;
    clip: rect(0 0 0 0);

    width: 100%;
    height: 100%;
    padding: 0;

    white-space: nowrap;

    border: 0;

    clip-path: inset(100%);

    &:checked + span {
      border: none;
      background: url("@/assets/img/icon-check.svg") no-repeat;
      background-size: cover;
    }
  }

  &__icon {
    position: relative;

    width: 30px;
    height: 30px;

    cursor: pointer;
    transition: $animationSpeed cubic-bezier(.4, 0, .6, 1);

    border-radius: 50%;

    &:hover {
      background: rgba(30, 136, 229, 0.1);
    }

    &:active {
      transform: scale(1.3);
    }

    span {
      box-sizing: border-box;
      width: 16px;
      height: 16px;

      transition: $animationSpeed;

      border: 1px solid $blue-gray-600;
      border-radius: 2px;

      @include p_center-all;
    }
  }

  &__label {
    display: block;

    width: calc(100% - 40px);
    margin-left: 10px;

    color: $blue-gray-600;

    @include r-s14-h16;
  }

  [type="text"] {
    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    margin-left: -5px;
    padding: 5px 8px;

    cursor: pointer;
    transition: background-color $animationSpeed;

    color: $gray-900;
    border: none;
    outline: none;
    background-color: transparent;

    @include r-s14-h21;

    &:focus {
      cursor: text;

      background-color: $blue-300;
    }
  }
}
</style>
