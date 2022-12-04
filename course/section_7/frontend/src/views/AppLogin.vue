<template>
  <div class="sign-form sign-in">
<!--    Шапка формы входа-->
    <div class="sign-form__header">
      <router-link
          to="/"
          class="logo"
      >
        <img
            src="@/assets/img/logo.svg"
            alt="VueWork logo"
            width="147"
            height="23"
        />
      </router-link>

      <button
          class="sign-form__close"
          type="button"
          @click="router.push('/')"
      />
    </div>

    <h3 class="sign-form__title">
      Войти
    </h3>
<!--    Форма входа-->
    <form
        class="sign-form__shape"
        @submit.prevent="login"
    >
<!--      Поле электронной почты-->
      <label class="sign-form__input">
        <app-input
            v-model="email"
            type="email"
            name="email"
            class="input"
            placeholder="E-mail"
            :error-text="validations.email.error"
        />
      </label>
<!--      Поле пароля-->
      <label class="sign-form__input">
        <app-input
            v-model="password"
            type="password"
            name="password"
            class="input"
            placeholder="Пароль"
            :error-text="validations.password.error"
        />
      </label>
<!--      Кнопка отправки формы-->
      <div class="sign-form__wrap">
        <app-button
            class="button--primary"
            type="submit"
        >
          Войти
        </app-button>
      </div>
<!--       Поле ошибок сервера-->
      <div v-if="serverErrorMessage" class="server-error-message">{{ serverErrorMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import AppButton from '@/common/components/AppButton.vue'
import AppInput from '@/common/components/AppInput.vue'
import { validateFields, clearValidationErrors } from '@/common/validator'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()

const setEmptyValidations = () => ({
  email: {
    error: '',
    rules: ['required', 'email']
  },
  password: {
    error: '',
    rules: ['required']
  }
})

const email = ref('')
const password = ref('')
const validations = ref(setEmptyValidations())
const serverErrorMessage = ref(null)

watch(email, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value ) serverErrorMessage.value = null
  if (validations.value.email.error) clearValidationErrors(validations.value)
})

watch(password, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value ) serverErrorMessage.value = null
  if (validations.value.password.error) clearValidationErrors(validations.value)
})

async function login () {
  if (!validateFields(
      { email: email.value, password: password.value },
      validations.value
  )) {
    return
  }
  const responseMessage = await authStore.login(email.value, password.value)
  // Проверяем если возвращается статус не "ок", то показываем ошибку сервера
  if (responseMessage !== 'ok') {
    serverErrorMessage.value = responseMessage
  } else {
    // Получаем данные пользователя
    await authStore.getMe()
    // Если логин прошел без ошибок, перенаправляем на главную страницу
    await router.push('/')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.sign-form {
  display: block;

  width: 500px;

  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  @include pf_center-all;

  &__shape {
    padding-right: 64px;
    padding-bottom: 64px;
    padding-left: 64px;
  }

  &__header {
    display: flex;
    justify-content: space-between;

    padding: 25px;

    background-color: $blue-600;
  }

  &__title {
    margin: 30px 0;

    text-align: center;

    color: $blue-gray-600;

    @include m-s24-h21;
  }

  &__input {
    display: block;

    margin-bottom: 16px;
  }

  &__checkbox {
    margin-top: 20px;
  }

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 30px;
  }

  &__link {
    color: $blue-600;

    &:hover {
      text-decoration: underline;
    }
  }

  &__close {
    position: relative;

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

      background-color: $white-900;
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
        opacity: 0.6;
      }
    }
  }
}

.server-error-message {
  margin-top: 20px;
  color: $red-700;
}
</style>
