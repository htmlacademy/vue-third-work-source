<template>
  <header class="header">
    <div class="header__logo">
      <a href="#" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="VueWork logo"
          width="147"
          height="23"
        />
      </a>
    </div>

    <form action="#" class="header__search">
      <input type="search" name="search" required placeholder="Поиск" />
      <button type="submit">Найти</button>
    </form>

    <a href="#" class="header__create-task">Создать карточку</a>

    <a href="#" class="header__user">
      <img
        src="@/assets/img/admin.jpg"
        alt="Администратор"
        width="40"
        height="40"
      />
    </a>

    <div class="header__menu">
      <div class="user-menu">
        <img
          src="@/assets/img/admin.jpg"
          width="56"
          height="56"
          alt="Администратор"
        />
        <span>Администратор</span>
        <a href="#" class="user-menu__link">Мой аккаунт</a>
        <a href="#" class="user-menu__link">Выйти</a>
      </div>
    </div>
  </header>
</template>

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
    top: 0;
    right: 0;

    display: none;
  }
}
</style>
