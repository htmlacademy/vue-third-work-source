<template>
  <app-layout
      :tasks="filteredTasks"
      :filters="state.filters"
      @updateTasks="updateTasks"
  >
    <home-view
        :tasks="filteredTasks"
        :filters="state.filters"
        @updateTasks="updateTasks"
        @applyFilters="applyFilters"
    />
  </app-layout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { AppLayout } from '@/layouts'
import { HomeView } from '@/views'
import { normalizeTask } from './common/helpers'
import tasks from './mocks/tasks.json'

const state = reactive({
  tasks: tasks.map(task => normalizeTask(task)),
  filters: {
    search: '',
    users: [],
    statuses: []
  }
})

const filteredTasks = computed(() => {
  const filtersAreEmpty = Object.values(state.filters)
      .every(value => !value.length)
  if (filtersAreEmpty) {
    // Note: to avoid tasks filtering if the filter are not set
    return state.tasks
  }

  const searchFilter = task => task.title
      .toLowerCase()
      .includes(state.filters.search.toLowerCase().trim())

  const usersFilter = task => state.filters.users
      .some(userId => userId === task.userId)

  const statusesFilter = task => state.filters.statuses
      .some(el => el === task.status || el === task.timeStatus)

  return state.tasks.filter(task => {
    let result = {
      search: searchFilter,
      users: usersFilter,
      statuses: statusesFilter
    }
    return Object.entries(result)
        .every(([key, callback]) =>
            !state.filters[key].length || callback(task))
  })
})

function updateTasks (tasksToUpdate) {
  tasksToUpdate.forEach(task => {
    const index = state.tasks.findIndex(({ id }) => id === task.id)
    if (~index) {
      state.tasks.splice(index, 1, task)
    }
  })
}

function applyFilters ({ item, entity }) {
  if (!Array.isArray(state.filters[entity])) {
    state.filters[entity] = item
  } else {
    const resultValues = [...state.filters[entity]]
    const itemIndex = resultValues.findIndex(el => el === item)
    ~itemIndex
        ? resultValues.splice(itemIndex, 1)
        : resultValues.push(item)
    state.filters[entity] = resultValues
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
