<template>
  <main class="content">
    <section class="desk">
      <!--      Шапка доски-->
      <div class="desk__header">
        <h1 class="desk__title">Design Coffee Lab</h1>
        <div class="desk__filters">
          <div class="desk__user-filter">
            <!--            Список пользователей-->
            <ul class="user-filter">
              <li
                  v-for="user in users"
                  :key="user.id"
                  :title="user.name"
                  class="user-filter__item"
              >
                <a class="user-filter__button">
                  <img
                      :src="getImage(user.avatar)"
                      alt="Аватар юзера"
                      width="24"
                      height="24"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div class="desk__meta-filter">
            <!--            Список статусов-->
            <ul class="meta-filter">
              <li
                  v-for="({ value, label }) in STATUSES"
                  :key="value"
                  class="meta-filter__item"
              >
                <a
                    class="meta-filter__status"
                    :class="`meta-filter__status meta-filter__status--color meta-filter__status--${value}`"
                    :title="label"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--      Колонки и задачи-->
      <div v-if="columns.length" class="desk__columns">
        <desk-column
            v-for="column in columns"
            :key="column.id"
            :column="column"
            :tasks="props.tasks"
            :filters="props.filters"
            @update="updateColumn"
            @delete="deleteColumn"
            @updateTasks="$emit('updateTasks', $event)"
        />
      </div>
      <!--      Пустая доска-->
      <p
          v-else
          class="desk__emptiness"
      >
        Пока нет ни одной колонки
      </p>
    </section>
  </main>
</template>

<script setup>
import { defineProps } from 'vue'
import columns from '../mocks/columns.json'
import users from '../mocks/users.json'
import { STATUSES } from '../common/constants'
import DeskColumn from '@/modules/columns/components/DeskColumn.vue'
import { getImage } from '../common/helpers'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  filters: {
    type: Object,
    required: true
  }
})

function updateColumn() {
  console.log('update')
}

function deleteColumn() {
  console.log('delete')
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.desk {
  $bl: ".desk";

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  width: calc(100% - 400px);
  padding-top: 27px;

  background-color: $white-900;

  &__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    margin-bottom: 24px;
    padding: 0 17px;
  }

  &__title {
    @include m-s24-h21;

    margin: 0;
    margin-right: auto;

    color: $black-900;
  }

  &__add {
    @include m-s10-h12;

    position: relative;

    margin: 0;
    padding: 0;
    padding-left: 32px;

    cursor: pointer;

    color: $blue-gray-600;
    border: none;
    outline: none;
    background-color: transparent;

    &::before {
      @include p_center-v;

      width: 23px;
      height: 23px;

      content: "";

      background-image: url("../img/icon-add.svg");
    }
  }

  &__filters {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    margin-top: 16px;
  }

  &__user-filter {
    margin-right: 40px;
  }

  &__columns {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    flex-grow: 1;

    border-top: 1px solid $blue-gray-200;
  }
}

.user-filter {
  @include clear-list;

  display: flex;
  flex-direction: row-reverse;

  &__item {
    margin-right: -4px;
  }

  &__button {
    display: block;
    overflow: hidden;

    width: 24px;
    height: 24px;

    cursor: pointer;
    transition: 0.3s;

    border: 1px solid $white-900;
    border-radius: 50%;
    outline: none;
    background-color: $blue-gray-50;

    &:hover {
      border-color: $blue-600;
    }

    img {
      display: block;

      width: 24px;
      height: 24px;
    }

    span {
      @include m-s14-h21;

      display: block;

      width: 100%;
      height: 100%;
      padding-top: 1px;

      text-align: center;

      color: $white-900;
      background-color: $green-700;
    }

    &--current {
      border-color: $white-900;
      box-shadow: 0 0 0 1px $blue-600;
    }
  }
}

.meta-filter {
  @include clear-list;

  display: flex;
  align-items: center;

  &__item {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }

  &__status {
    display: block;

    box-sizing: content-box;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: 0.3s;

    border: 1px solid $white-900;
    border-radius: 50%;
    outline: none;
    background-color: transparent;

    &:hover {
      border-color: $blue-600;
    }

    &--color {
      width: 8px;
      height: 8px;
    }

    &--green {
      background-color: $green-600;
    }

    &--orange {
      background-color: $orange-600;
    }

    &--red {
      background-color: $red-600;
    }

    &--time {
      width: 16px;
      height: 16px;

      background-image: url("@/assets/img/status-time.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--alert {
      width: 16px;
      height: 16px;

      background-image: url("@/assets/img/status-alert.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--current {
      border-color: $white-900;
      box-shadow: 0 0 0 1px $blue-600;
    }
  }
}

.column {
  $bl: &;

  display: flex;
  flex-direction: column;

  padding-top: 15px;

  border-left: 1px solid $blue-gray-200;

  &__name {
    @include m-s14-h21;

    display: flex;
    align-items: center;

    margin: 0 8px;

    color: $blue-gray-600;

    &:hover {
      #{$bl}__button {
        opacity: 1;
      }
    }
  }

  &__target-area {
    overflow-y: auto;
    flex-grow: 1;

    min-width: 224px;
    max-width: 380px;
    height: 1px;
    padding-right: 8px;
    padding-bottom: 30px;
    padding-left: 8px;

    @media (min-width: 1500px) {
      min-width: 244px;
    }
  }

  &__task {
    display: block;

    width: 100%;
    margin-top: 16px;
  }

  &__button {
    margin: 0;
    padding: 0;

    transition: opacity 0.3s;
    transform: scale(0.8);

    opacity: 0;
    border: none;
    outline: none;
    background-color: transparent;
  }

  &__update {
    margin-right: 5px;
    margin-left: 5px;
  }
}

.task {
  $bl: ".task";

  display: flex;
  flex-wrap: wrap;

  padding: 8px;

  cursor: pointer;

  border-radius: 6px;
  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  &--backlog {
    box-shadow: none;

    #{$bl}__title {
      order: -2;

      max-width: 290px;
      margin-top: 0;
      margin-right: auto;
    }

    #{$bl}__statuses {
      order: -1;

      margin-left: 20px;
    }
  }

  &__user {
    @include m-s10-h21;

    display: flex;
    align-items: center;

    max-width: 80%;
    margin-right: auto;
  }

  &__avatar {
    margin-right: 4px;

    img {
      display: block;

      width: 20px;
      height: 20px;
    }
  }

  &__statuses {
    display: flex;
    align-items: center;
    align-self: flex-start;

    height: 16px;
    margin-top: 3px;
  }

  &__status {
    margin-left: 8px;

    border-radius: 50%;

    &:first-child {
      margin-left: 0;
    }

    &--color {
      width: 8px;
      height: 8px;
    }

    &--green {
      background-color: $green-600;
    }

    &--orange {
      background-color: $orange-600;
    }

    &--red {
      background-color: $red-600;
    }

    &--time {
      width: 16px;
      height: 16px;

      background-image: url("@/assets/img/status-time.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--alert {
      width: 16px;
      height: 16px;

      background-image: url("@/assets/img/status-alert.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &__title {
    @include r-s14-h21;

    width: 100%;
    margin-top: 9px;
    margin-bottom: 0;
  }

  &__tags {
    @include clear-list;

    display: flex;
    flex-wrap: wrap;

    width: 100%;
    margin-top: 5px;

    li {
      margin-top: 4px;
      margin-right: 4px;
    }
  }
}

.tag {
  @include r-s10-h12;

  padding: 4px 8px;

  border-radius: 100px;

  &--pink {
    background-color: $pink-300;
  }

  &--orange {
    background-color: $yellow-300;
  }

  &--green {
    background-color: $green-100;
  }

  &--yellow {
    background-color: $yellow-100;
  }

  &--blue {
    background-color: $blue-300;
  }

  &--violet {
    background-color: $pink-200;
  }
}

</style>
