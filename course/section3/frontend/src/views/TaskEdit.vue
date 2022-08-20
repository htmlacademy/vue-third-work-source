<template>
  <task-card-creator
      v-if="task"
      :task-to-edit="task"
      @editTask="$emit('editTask', $event)"
      @deleteTask="$emit('deleteTask', $event)"
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

const task = ref(props.tasks.find(task => +task.id === +route.params.id))
if (task.value) {
  const taskDate = task.value.dueDate
  task.value.dueDate = taskDate ? new Date(taskDate) : createNewDate()
} else {
  router.push('/')
}

defineEmits(['editTask', 'deleteTask'])
</script>
