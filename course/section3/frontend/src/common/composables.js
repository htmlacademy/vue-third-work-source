import { computed } from 'vue'
import { getTimeAgo } from './helpers'

export const taskCardDate = task => {
	return computed(() => {
	  return `# ${task.id} создана ${getTimeAgo(task.dueDate)}`
	})
}
