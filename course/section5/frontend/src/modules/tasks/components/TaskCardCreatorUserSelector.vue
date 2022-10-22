<template>
  <li>
    Участник:
    <div class="task-card__participant">
      <button
          v-if="!modelValue"
          type="button"
          class="task-card__link"
          @click.stop="isMenuOpened = !isMenuOpened"
      >
        добавить пользователя
      </button>
      <button
          v-else
          class="users-list__user"
      >
        <img
            :src="getPublicImage(currentWorker.avatar)"
            @click.stop="isMenuOpened = !isMenuOpened"
        />
        <span @click.stop="isMenuOpened = !isMenuOpened">
          {{ currentWorker.name }}
        </span>
        <app-icon
            class="icon--trash users-list__icon"
            @click="$emit('update:modelValue', null)"
        />
      </button>
      <div class="task-card__users">
        <ul
            v-if="isMenuOpened"
            v-click-outside="hideUserMenu"
            class="users-list"
        >
          <li
              v-for="user in usersStore.users"
              :key="user.id"
          >
            <button
                class="users-list__user"
                @click="setUser(user.id)"
            >
              <img :src="getPublicImage(user.avatar)" />
              <span>{{ user.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getPublicImage } from '../../../common/helpers'
import AppIcon from '@/common/components/AppIcon.vue'
import { useUsersStore } from '@/stores'

const usersStore = useUsersStore()

const props = defineProps({
  modelValue: {
    type: [String],
    default: null
  }
})
const emits = defineEmits(['update:modelValue'])

const isMenuOpened = ref(false)

const currentWorker = computed(() => usersStore.users.find(({ id }) => id === props.modelValue))

function setUser(id) {
  emits('update:modelValue', id)
  hideUserMenu()
}

function hideUserMenu() {
  isMenuOpened.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-card {
  &__participant {
    display: inline-block;

    margin-left: 10px;

    vertical-align: baseline;
  }

  &__users {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;

    display: block;

    box-sizing: border-box;
    width: 210px;

    border-radius: 6px;
    background-color: $white-900;
    box-shadow: 0 4px 8px $shadow-500;
  }
}

.users-list {
  margin: 0;
  padding: 8px;

  list-style-type: none;

  li {
    margin-bottom: 10px;
  }

  &__user {
    position: relative;

    display: flex;
    align-items: center;

    width: 100%;
    margin: 0;
    padding: 0 23px 0 0;

    cursor: pointer;
    text-align: left;

    border: 0;
    outline: 0;
    background-color: transparent;

    font-family: inherit;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 16px;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;

      border-radius: 50%;
    }

    &:hover {
      text-decoration: none;

      .users-list__icon {
        opacity: 1;
      }
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 0;

    transition: opacity $animationSpeed;
    transform: translateY(-50%);

    opacity: 0;
  }
}
</style>
