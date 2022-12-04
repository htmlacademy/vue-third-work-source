<template>
  <header class="header">

    <!--    Логотип-->
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
            src="@/assets/img/logo.svg"
            alt="VueWork logo"
            width="147"
            height="23"
        />
      </router-link>
    </div>
    <!--    Поиск-->
    <form action="#" class="header__search">
      <input
          type="search"
          name="search"
          required
          placeholder="Поиск"
          @input="filtersStore.applyFilters({ item: $event.target.value, entity: 'search' })"
      />
      <button type="submit">Найти</button>
    </form>
    <!--    Кнопка создания новой задачи-->
    <router-link
        v-if="authStore.getUserAttribute('isAdmin')"
        to="/tasks/create"
        class="header__create-task"
    >
      Создать карточку
    </router-link>
    <!--    Аватар пользователя-->
    <a
        v-if="authStore.user"
        href="#"
        class="header__user"
        @click.stop="toggleUserMenu"
    >
      <img
          :src="userImage"
          alt="Администратор"
          width="40"
          height="40"
      />
    </a>
    <!--    Панель пользователя-->
    <div
        v-if="isUserMenuOpened"
        v-click-outside="toggleUserMenu"
        class="header__menu"
    >
      <div class="user-menu">
        <img
            :src="userImage"
            width="56"
            height="56"
            alt="Администратор"
        />
        <span>{{ authStore.user.name }}</span>
        <a href="#" class="user-menu__link" @click="logout">Выйти</a>
      </div>
    </div>
    <a
        v-if="!authStore.isAuthenticated"
        class="header__login"
        @click="$router.push('/login')"
    >
      Войти
    </a>
  </header>
</template>

<script setup>
import { useFiltersStore, useAuthStore } from '@/stores'
import { ref } from 'vue'
import { getPublicImage } from '@/common/helpers'

const filtersStore = useFiltersStore()
const authStore = useAuthStore()

const isUserMenuOpened = ref(false)
const userImage = getPublicImage(authStore.user?.avatar)

function toggleUserMenu () {
  isUserMenuOpened.value = !isUserMenuOpened.value
}

function logout () {
  authStore.logout()
  isUserMenuOpened.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds-system";

.header {
  position: relative;

  display: flex;
  align-items: center;

  padding: 15px 12px;

  background-color: $blue-600;
  box-shadow: 0 2px 4px $shadow-400;

  &__logo {
    margin-right: auto;
  }

  &__search {
    position: relative;

    margin-right: 18px;

    input {
      @include m-s14-h21;

      margin: 0;
      padding-top: 11px;
      padding-right: 11px;
      padding-bottom: 11px;
      padding-left: 40px;

      color: $white-900;
      border: 1px solid $white-800;
      border-radius: 6px;
      background-color: transparent;
    }

    button {
      position: absolute;
      top: 50%;
      left: 11px;

      overflow: hidden;

      width: 17px;
      height: 17px;
      padding: 0;

      transform: translateY(-50%);

      color: transparent;
      border: none;
      outline: none;
      background-color: transparent;
      background-image: url("@/assets/img/icon-search.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &__create-task {
    @include m-s14-h21;

    margin-right: 18px;
    padding-top: 13px;
    padding-right: 14px;
    padding-bottom: 11px;
    padding-left: 14px;

    transition: background-color 0.3s;
    text-transform: uppercase;

    color: $black-700;
    border-radius: 6px;
    background: $white-800;
    box-shadow: 0 4px 8px $shadow-500;

    &:hover {
      background-color: $yellow-300;
    }
  }

  &__login {
    @include m-s14-h21;

    position: relative;

    padding-left: 28px;

    cursor: pointer;

    color: $white-900;

    &::before {
      position: absolute;
      top: -3px;
      left: 0;

      width: 16px;
      height: 21px;

      content: "";

      background-image: url("@/assets/img/login.svg");
    }
  }

  &__user {
    cursor: pointer;

    img {
      display: block;

      width: 40px;
      height: 40px;

      border-radius: 50%;
    }
  }

  &__menu {
    position: absolute;
    z-index: 10;
    top: 1px;
    right: 1px;
  }
}
.user-menu {
  width: 240px;
  padding-top: 32px;
  padding-bottom: 24px;

  text-align: center;

  border-radius: 6px 0 0 6px;
  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  img {
    display: block;

    margin: 0 auto;
  }

  span {
    display: block;

    margin-top: 16px;
    padding-bottom: 16px;

    color: $black-900;
    border-bottom: 1px solid $gray-100;

    @include m-s18-h21;
  }

  &__link {
    display: block;

    margin-top: 16px;
    padding: 5px 0;

    color: $blue-gray-600;

    @include m-s14-h21;

    &:hover {
      background-color: $gray-100;
    }

    &:active {
      color: $gray-900;
    }
  }
}
</style>
