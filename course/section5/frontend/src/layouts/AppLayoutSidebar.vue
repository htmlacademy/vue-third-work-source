<template>
  <!--  Отслеживает в какую колонку передана задача-->
  <app-drop
      class="backlog"
      :class="{ 'backlog--hide': state.backlogIsHidden }"
      @drop="moveTask"
  >
    <!--  Отвечает за открытие/закрытие беклога-->
    <button
        class="backlog__title"
        @click="state.backlogIsHidden = !state.backlogIsHidden"
    >
      <span>
        Бэклог
      </span>
    </button>
    <div class="backlog__content">
      <div class="backlog__scroll">
        <div class="backlog__collapse">
          <div class="backlog__user">
            <div class="backlog__account">
              <img
                  :src="userImage"
                  alt="Ваш аватар"
                  width="32"
                  height="32"
              />
              {{ authStore.user.name }}
            </div>

            <div class="backlog__counter">
              {{ tasksStore.sidebarTasks.length }}
            </div>
          </div>

          <div class="backlog__target-area">
            <!--  Задачи в беклоге-->
            <task-card
                v-for="task in tasksStore.sidebarTasks"
                :key="task.id"
                :task="task"
                class="backlog__task"
                @drop="moveTask($event, task)"
            />
          </div>
        </div>
      </div>
    </div>
  </app-drop>
</template>

<script setup>
import { reactive } from 'vue'
import AppDrop from '@/common/components/AppDrop.vue'
import TaskCard from '@/modules/tasks/components/TaskCard.vue'
import { getTargetColumnTasks, addActive, getPublicImage } from '@/common/helpers'
import { useTasksStore, useAuthStore } from '@/stores'

const tasksStore = useTasksStore()
const authStore = useAuthStore()

const state = reactive({ backlogIsHidden: false })

const userImage = getPublicImage(authStore.user.avatar)

function moveTask (active, toTask) {
  // Не обновляем массив если задача фактически не перемещалась
  if (toTask && active.id === toTask.id) {
    return
  }

  const toColumnId = null
  // Получить задачи для текущей колонки
  const targetColumnTasks = getTargetColumnTasks(toColumnId, tasksStore.tasks)
  const activeClone = { ...active, columnId: toColumnId }
  // Добавить активную задачу в колонку
  const resultTasks = addActive(activeClone, toTask, targetColumnTasks)
  const tasksToUpdate = []

  // Отсортировать задачи в колонке
  resultTasks.forEach((task, index) => {
    if (task.sortOrder !== index || task.id === active.id) {
      const newTask = { ...task, sortOrder: index }
      tasksToUpdate.push(newTask)
    }
  })
  tasksStore.updateTasks(tasksToUpdate)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.backlog {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  flex-grow: 1;

  min-width: 400px;
  max-width: 400px;
  padding-top: 16px;

  background-color: $gray-100;

  $bl: ".backlog";

  &__title {
    position: relative;

    height: 26px;
    margin-bottom: 5px;
    margin-left: 12px;
    padding-left: 28px;

    cursor: pointer;
    text-align: left;

    color: $blue-gray-600;
    border: none;
    background-color: transparent;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;

      width: 24px;
      height: 24px;

      content: "";
      transition: $animationSpeed;
      transform: translateY(-53%) rotate(180deg);

      background-image: url("@/assets/img/arrow-right.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }

    span {
      @include m-s14-h21;
    }
  }

  &--hide {
    min-width: 40px;
    max-width: 40px;

    #{$bl}__title {
      &::before {
        transform: translateY(-53%);
      }
    }

    #{$bl}__scroll {
      visibility: hidden;
      overflow: hidden;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    width: 400px;

    background-color: $gray-100;
  }

  &__scroll {
    overflow-y: auto;
    flex-grow: 1;

    height: 1px;
    padding-bottom: 20px;
  }

  &__collapse {
    padding-bottom: 1px;

    border-bottom: 1px solid $blue-gray-200;
  }

  &__user {
    display: flex;
    align-items: center;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 15px 12px;

    text-align: left;

    border: none;
    outline: none;
    background-color: transparent;

    &:active {
      color: inherit;
    }
  }

  &__account {
    display: flex;
    align-items: center;

    max-width: 80%;
    margin-right: auto;

    @include m-s18-h21;

    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;

      border-radius: 50%;
    }
  }

  &__counter {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    padding-top: 6px;

    text-align: center;

    border-radius: 50%;
    background-color: $blue-gray-100;

    @include m-s18-h21;
  }

  &__arrow {
    width: 10px;
    height: 30px;
    margin: 0 0 0 18px;
    padding: 0;

    cursor: pointer;

    border: none;
    outline: none;
    background-color: transparent;
    background-image: url("@/assets/img/icon-arrow.svg");
    background-repeat: no-repeat;
    background-position: center;

    &--top {
      transform: rotate(180deg);
    }
  }

  &__task {
    margin-right: 12px;
    margin-bottom: 11px;
    margin-left: 12px;
  }
}
</style>
