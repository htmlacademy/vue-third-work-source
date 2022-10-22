<template>
  <!--    Компонент AppDrop отслеживает куда упала задача -->
  <app-drop @drop="$emit('drop', $event)">
    <!--      Компонент AppDrag определяет какая задача перемещается -->
    <app-drag :transfer-data="task">
      <div
          class="task"
          @click="router.push({ path: `/${task.id}` })"
      >
<!--        Данный блок показывает пользователя, который работает над задачей-->
        <div
            v-if="taskUser"
            class="task__user"
        >
          <div class="task__avatar">
            <img
                :src="getPublicImage(taskUser.avatar)"
                alt="Аватар пользователя"
                width="20"
                height="20"
            />
          </div>
          {{ taskUser.name }}
        </div>
<!--        Данный блок показавает статусы задачи-->
        <div class="task__statuses">
          <span
              v-if="task.status"
              class="task__status"
              :class="`task__status--${task.status}`"
          />
          <span
              v-if="task.timeStatus"
              class="task__status"
              :class="`task__status--${task.timeStatus}`"
          />
        </div>
        <h5
            class="task__title"
            :class="{ 'task__title--first': !task.user }"
        >
          {{ task.title }}
        </h5>
<!--        Тэги задачи вынесены в отдельный компонент-->
        <task-card-tags
            v-if="task.tags && task.tags.length"
            :tags="task.tags"
        />
      </div>
    </app-drag>
  </app-drop>
</template>

<script setup>
import AppDrag from '@/common/components/AppDrag.vue'
import AppDrop from '@/common/components/AppDrop.vue'
import TaskCardTags from './TaskCardTags.vue'
import { getPublicImage } from '@/common/helpers'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores'
import { computed } from 'vue'

const usersStore = useUsersStore()
const router = useRouter()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['drop', 'click'])

const taskUser = computed(() => {
  return usersStore.users.find(user => user.id === props.task.userId)
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task {
  display: flex;
  flex-wrap: wrap;

  padding: 8px;

  cursor: pointer;

  border-radius: 6px;
  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  $bl: ".task";

  &:hover {
    background-color: $blue-200;
  }

  &:active {
    box-shadow: 0 2px 4px $shadow-500;
  }

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
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 80%;
    margin-right: auto;

    @include m-s10-h21;
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
    margin: 3px 0 0 auto;
  }

  &__status {
    width: 8px;
    height: 8px;
    margin-left: 8px;

    border-radius: 50%;

    &:first-child {
      margin-left: 0;
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
    width: 100%;
    margin-top: 9px;
    margin-bottom: 0;

    @include r-s14-h21;

    &--first {
      order: -1;

      width: 85%;
      margin-top: 0;
    }
  }
}
</style>
