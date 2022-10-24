import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'
import taskStatuses from '@/common/enums/taskStatuses'
import { getTimeStatus } from '@/common/helpers'

const BASE_URL = '/api/tasks'

class TasksService extends HttpClient {
	createRequest(task) {
		// Убираем ненужные параметры из задачи
    const { ticks, comments, status, timeStatus, user, ...request } = task
    return request
	}
	normalizeTask(task) {
		return {
      ...task,
      ticks: task.ticks || [],
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      status: task.statusId ? taskStatuses[task.statusId] : '',
      timeStatus: getTimeStatus(task.dueDate)
    }
	}
	async fetchTasks() {
		try {
			const tasks = await this.get('/')
			return tasks.map(task => this.normalizeTask(task))
		} catch (e) {
			throw Error(e)
		}
	}
	async createTask(task) {
		try {
			const newTask = await this.post('/', { data: this.createRequest(task)})
			return this.normalizeTask(newTask)
		} catch (e) {
			throw Error(e)
		}
	}
	async updateTask(task) {
		try {
			await this.put(`/${task.id}`, { data: this.createRequest(task) })
			return this.normalizeTask(task)
		} catch (e) {
			throw Error(e)
		}
	}
	async deleteTask(id) {
		try {
			await this.delete(`/${id}`)
		} catch (e) {
			throw Error(e)
		}
	}
}

export default new TasksService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})
