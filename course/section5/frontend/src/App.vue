<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from './layouts'
import { useTasksStore, useColumnsStore, useUsersStore, useCommentsStore } from './stores'

// Определяем хранилища
const tasksStore = useTasksStore()
const usersStore = useUsersStore()
const columnsStore = useColumnsStore()
const commentsStore = useCommentsStore()

// Загрузка первоначальных данных
// Загружаем задачи
void tasksStore.fetchTasks()
// Загружаем пользователей
void usersStore.fetchUsers()
// Загружаем колонки
void columnsStore.fetchColumns()
// Загружаем комментарии
void commentsStore.fetchComments()
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
