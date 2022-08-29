<template>
  <task-card-creator
      v-if="task"
      :task-to-edit="task"
      @edit-task="$emit('editTask', $event)"
      @delete-task="$emit('deleteTask', $event)"
  />
</template>

<script setup>
import TaskCardCreator from '../modules/tasks/components/TaskCardCreator.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createNewDate } from '../common/helpers'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})

defineEmits(['editTask', 'deleteTask'])

// Находим задачу из массива задач по id из строки URL
const task = ref(props.tasks.find(task => +task.id === +route.params.id))

if (task.value) {
  const taskDate = task.value.dueDate
  task.value.dueDate = taskDate ? new Date(taskDate) : createNewDate()
} else {
  router.push('/')
}
</script>
