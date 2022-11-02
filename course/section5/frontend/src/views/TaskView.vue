<template>
  <div
      class="task-card"
      tabindex="0"
      ref="dialog"
      @click.self="closeDialog"
      @keydown.esc="closeDialog"
  >
    <section v-if="task" class="task-card__wrapper">
<!--Закрытие задачи-->
      <button
          class="task-card__close"
          type="button"
          @click="closeDialog"
      />
<!--Шапка задачи-->
      <div class="task-card__block">
        <div class="task-card__row">
<!--Наименование задачи-->
          <h1 class="task-card__name task-card__name--min">
            {{ task.title }}
          </h1>
<!--Кнопка редактирования задачи-->
          <a
              v-if="authStore.getUserAttribute('isAdmin')"
              class="task-card__edit"
              @click="router.push({
                name: 'TaskEdit',
                params: { id: $route.params.id }
              })"
          >
            Редактировать задачу
          </a>
        </div>
<!--Дата создания задачи-->
        <p class="task-card__date">
          {{ useTaskCardDate(task) }}
        </p>
      </div>
<!--Участник задачи и срок выполнения-->
      <div class="task-card__block">
        <ul class="task-card__params">
<!--Участник задачи-->
          <li v-if="task && task.user">
            Участник:
            <div class="task-card__participant">
              <button
                  type="button"
                  class="task-card__user"
              >
                <img
                    :src="getPublicImage(task.user.avatar)"
                    :alt="task.user.name"
                />
                {{ task.user.name }}
              </button>
            </div>
          </li>
<!--Срок выполнения-->
          <li v-if="dueDate">
            Срок:
            <button
                type="button"
                class="task-card__date-link"
            >
              {{ dueDate }}
            </button>
          </li>
        </ul>
      </div>
<!--Описание задачи-->
      <div class="task-card__block">
        <div
            v-if="task.description"
            class="task-card__description"
        >
          <h4 class="task-card__title">
            Описание
          </h4>
          <p>{{ task.description }}</p>
        </div>
      </div>
<!--Дополнительная ссылка-->
      <div
          v-if="task.url"
          class="task-card__block task-card__links"
      >
        <h4 class="task-card__title">
          Ссылки
        </h4>

        <div class="task-card__links-item">
          <a
              :href="task.url"
              target="_blank"
          >
            {{ task.urlDescription || 'ссылка' }}
          </a>
        </div>
      </div>
<!--Чеклист-->
      <div
          v-if="task.ticks && task.ticks.length"
          class="task-card__block"
      >
        <task-card-view-ticks-list
            :ticks="task.ticks"
            disabled
        />
      </div>
<!--Метки-->
      <div
          v-if="task.tags && task.tags.length"
          class="task-card__block"
      >
        <h4 class="task-card__title">
          Метки
        </h4>
        <task-card-tags
            :tags="task.tags"
        />
      </div>
<!--Комментарии-->
      <task-card-view-comments
          v-if="authStore.isAuthenticated"
          class="task-card__comments"
          :task-id="task.id"
      />
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getReadableDate, getPublicImage } from '../common/helpers'
import { useTaskCardDate } from '../common/composables'
import TaskCardViewTicksList from '../modules/tasks/components/TaskCardViewTicksList.vue'
import TaskCardTags from '../modules/tasks/components/TaskCardTags.vue'
import TaskCardViewComments from '../modules/tasks/components/TaskCardViewComments.vue'
import { useTasksStore, useAuthStore } from '@/stores'

const tasksStore = useTasksStore()
const authStore = useAuthStore()

const router = useRouter()
const route = useRoute()

const dialog = ref(null)

onMounted(() => {
  // Фокусируем на диалоговом окне чтобы сработала клавиша esc без дополнительного клика на окне
  dialog.value.focus()
})

// Найдем задачу по id из массива задач
const task = computed(() => {
  return tasksStore.getTaskById(route.params.id)
})

if (!task.value) {
  // Вернуть пользователя на главную страницу если задача не найдена
  router.push('/')
}

const dueDate = computed(() => {
  return getReadableDate(task.value.dueDate || '')
})

const closeDialog = function () {
  router.push('/')
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-card {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  overflow-x: auto;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;

  outline: none;
  background: $gray-900;

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;

    width: 20px;
    height: 20px;

    cursor: pointer;

    border: none;
    background-color: transparent;

    &::after,
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;

      width: 100%;
      height: 1px;

      content: "";
      transition: background-color $animationSpeed;

      background-color: $blue-gray-300;
    }

    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:hover {
      &::before,
      &::after {
        background-color: $blue-700;
      }
    }
  }

  &__error-text {
    color: $red-600;

    @include r-s10-h12;
  }

  &__wrapper {
    position: relative;

    box-sizing: border-box;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 40px;

    background-color: $white-900;
    box-shadow: 0 4px 8px $shadow-500;
  }

  &__block {
    margin-bottom: 30px;
  }

  &__name {
    display: block;

    width: 100%;
    margin: 0;
    padding: 0;

    color: $gray-900;
    border: none;
    border-bottom: 1px solid transparent;
    border-radius: 0;
    outline: none;

    @include m-s24-h21;

    &:focus:not(:disabled) {
      cursor: text;

      border-color: $blue-gray-200;
    }

    &--disabled {
      pointer-events: none;
    }

    &--min {
      max-width: 59%;
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__date {
    margin-top: 5px;

    color: $blue-gray-300;

    @include r-s14-h21;
  }

  &__participant {
    display: inline-block;

    margin-left: 10px;

    vertical-align: baseline;
  }

  &__user,
  &__date-link {
    position: relative;

    display: flex;
    align-items: center;

    width: 100%;
    margin: 0;

    text-align: left;

    border: 0;
    outline: 0;
    background-color: transparent;

    @include r-s14-h16;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;

      border-radius: 50%;
    }
  }

  &__user {
    &:active {
      color: $blue-gray-300;
    }
  }

  &__date-link {
    text-decoration: none;

    color: $gray-900;

    @include r-s16-h21;
  }

  &__params {
    position: relative;

    color: $gray-900;

    @include clear-list;
    @include r-s16-h21;

    li {
      display: flex;
      align-items: center;

      height: 30px;
      margin-bottom: 15px;
    }
  }

  :deep(&__link) {
    position: relative;

    margin: 0;
    padding: 0 23px 0 0;

    cursor: pointer;
    text-decoration: underline;

    color: $blue-gray-600;
    border: none;
    background-color: transparent;

    @include r-s16-h21;

    &:after {
      position: absolute;
      top: 2px;
      right: 0;

      width: 14px;
      height: 14px;

      content: "";
      transition: opacity $animationSpeed;

      opacity: 0;
      background-image: url("~@/assets/img/icon-pencil.svg");
      background-size: cover;
    }

    &:hover {
      text-decoration: none;

      &:after {
        opacity: 1;
      }
    }
  }

  &__links-item {
    margin-top: 16px;

    color: $blue-gray-300;

    @include r-s14-h21;

    a {
      color: $blue-600;
    }

    input {
      display: block;

      width: 100%;
      margin-bottom: 10px;

      color: $blue-gray-600;
      border: 0;
      outline: 0;

      font-family: inherit;
      font-size: 14px;
      font-weight: 400;
      font-style: normal;
      line-height: 21px;
    }
  }

  :deep(&__title) {
    margin: 0;

    color: $gray-900;

    @include m-s18-h21;
  }

  &__description {
    p {
      margin-top: 16px;

      color: $blue-gray-600;

      @include r-s14-h21;
    }

    textarea {
      display: block;

      box-sizing: border-box;
      width: 100%;
      height: 90px;
      margin-top: 16px;
      padding: 16px;

      resize: none;

      color: $blue-gray-600;
      border: 1px solid $gray-100;
      border-radius: 6px;
      outline: none;

      @include r-s14-h21;
    }
  }

  &__files {
    margin-top: 30px;
    margin-bottom: 20px;
  }

  &__list {
    @include clear-list;

    margin-top: 15px;
  }

  :deep(&__item) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 10px;

    &:hover {
      .task-card__icons {
        opacity: 1;
      }
    }
  }

  :deep(&__icons) {
    transition: opacity $animationSpeed;

    opacity: 0;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;

    width: 410px;
    margin-top: 50px;
  }

  &__comments {
    margin-top: 20px;
  }

  &__status {
    display: flex;
    align-items: center;

    margin-bottom: 15px;
  }

  &__meta {
    margin-left: 5px;
  }

  &__edit {
    display: block;

    margin: 0;
    margin-top: 3px;
    padding: 0;

    cursor: pointer;
    transition: opacity $animationSpeed;

    opacity: 0.5;
    color: $blue-gray-600;
    border: none;
    outline: none;
    background-color: transparent;

    @include r-s14-h16;

    &:hover {
      opacity: 1;
    }

    &--red {
      align-self: center;

      margin-top: 0;

      color: $red-500;
    }
  }
}

</style>
