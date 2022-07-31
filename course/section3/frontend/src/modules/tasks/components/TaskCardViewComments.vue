<template>
  <div class="task-card__comments">
    <h2 class="task-card__title">
      Комментарии
    </h2>
    <div class="comments">
      <ul class="comments__list">
        <li
            v-for="comment in comments"
            :key="comment.id"
            class="comments__item"
        >
          <div class="comments__user">
            <img
                :src="getImage(comment.user.avatar)"
                :alt="comment.user.name"
                width="30"
                height="30"
            />
            {{ comment.user.name }}
          </div>
          <p>{{ comment.text }}</p>
        </li>
      </ul>

      <form
          v-if="user"
          action="#"
          class="comments__form"
          method="post"
      >
        <app-textarea
            v-model="newComment"
            name="comment_text"
            placeholder="Введите текст комментария"
            :error-text="validations.newComment.error"
        />
        <button
            type="submit"
            @click.prevent="submit"
        >
          Написать комментарий
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import users from '@/mocks/users.json'
import { validateFields, clearValidationErrors } from '../../../common/validator'
import AppTextarea from '@/common/components/AppTextarea.vue'
import { getImage } from '../../../common/helpers'

const props = defineProps({
  taskId: {
    type: Number,
    required: true
  },
  comments: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['createNewComment'])

const newComment = ref('')
const validations = ref({
  newComment: {
    error: '',
    rules: ['isNotEmpty']
  }
})

// Позже будет добавлен залогиненый пользователь. До этого будем использовать первого пользователя в списке
const user = computed(() => users[0])

watch(newComment, () => {
  clearValidationErrors(validations.value)
})

const submit = function () {
  if (!validateFields({ newComment }, validations.value)) return
  const comment = {
    text: newComment.value,
    taskId: props.taskId,
    userId: user.value.id,
    user: {
      id: user.value.id,
      name: user.value.name,
      avatar: user.value.avatar
    }
  }
  emits('createNewComment', comment)
  newComment.value = ''
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.comments {
  &__list {
    @include clear-list;
  }

  &__item {
    margin-top: 24px;

    p {
      @include r-s14-h21;
    }

    strong {
      color: $blue-600;

      @include r-s14-h21;
    }
  }

  &__user {
    display: flex;
    align-items: center;

    width: 100%;
    margin: 0;
    padding: 0;

    text-align: left;

    background-color: transparent;

    @include r-s14-h16;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;

      border-radius: 50%;
    }

    span {
      display: block;

      box-sizing: border-box;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      padding-top: 5px;

      text-align: center;

      color: $white-900;
      border-radius: 50%;
      background-color: $green-700;

      @include m-s14-h21;
    }
  }

  &__form {
    margin-top: 24px;

    button {
      display: block;

      margin: 0;
      margin-top: 15px;
      margin-left: auto;
      padding: 0;

      cursor: pointer;
      transition: opacity $animationSpeed;

      opacity: 0.5;
      color: $blue-gray-600;
      border: none;
      outline: none;
      background-color: transparent;

      @include m-s14-h21;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
