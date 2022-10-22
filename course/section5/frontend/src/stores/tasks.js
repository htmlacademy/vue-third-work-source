import { defineStore } from 'pinia'
import tasks from '../mocks/tasks.json'
import { normalizeTask } from '../common/helpers'
import { useFiltersStore } from './filters'
import { useUsersStore } from '@/stores/users'
import tasksService from '@/services/tasks-service'

export const useTasksStore = defineStore('tasks', {
	state: () => ({
		tasks: [],
	}),
	getters: {
		filteredTasks: state => {
			const filtersStore = useFiltersStore()
			
			const filtersAreEmpty = Object.values(filtersStore.filters)
				.every(value => !value.length)
			
			if (filtersAreEmpty) {
				// Вернуть все задачи если фильтры не применены
				return state.tasks
			}
			
			// Применить фильтр по поиску
			const searchFilter = task => task.title
				.toLowerCase()
				.includes(filtersStore.filters.search.toLowerCase().trim())
			
			// Применить фильтр по пользователям
			const usersFilter = task => filtersStore.filters.users
				.some(userId => userId === task.userId)
			
			// Применить фильтр по статусам
			const statusesFilter = task => filtersStore.filters.statuses
				.some(el => el === task.status || el === task.timeStatus)
			
			// Обработать задачи в соответствии с фильтрами
			return state.tasks.filter(task => {
				let result = {
					search: searchFilter,
					users: usersFilter,
					statuses: statusesFilter
				}
				return Object.entries(result)
					.every(([key, callback]) =>
						!filtersStore.filters[key].length || callback(task))
			})
		},
		getTaskUserById: () => id => {
			const usersStore = useUsersStore()
			return usersStore.users.find(user => user.id === id)
		},
		// Фильтруем задачи, которые относятся к беклогу (columnId === null)
		sidebarTasks: state => {
			return state.filteredTasks
				.filter(task => !task.columnId)
				.sort((a, b) => a.sortOrder - b.sortOrder)
		}
	},
	actions: {
		async fetchTasks () {
			// Получение данных из json файла будет заменено в последующих разделах
			this.tasks = await tasksService.fetchTasks()
		},
		updateTasks (tasksToUpdate) {
			tasksToUpdate.forEach(task => {
				const index = this.tasks.findIndex(({ id }) => id === task.id)
				// findIndex вернет элемент массива или -1
				// Используем bitwise not для определения если index === -1
				// ~-1 вернет 0, а значит false
				if (~index) {
					this.tasks.splice(index, 1, task)
				}
			})
		},
		async addTask (task) {
			// Добавляем задачу в конец списка задач в беклоге
			task.sortOrder = this.tasks.filter(task => !task.columnId).length
			const newTask = await tasksService.createTask(task)
			// Добавляем задачу в массив
			this.tasks = [...this.tasks, newTask]
		},
		async editTask (task) {
			await tasksService.updateTask(task)
			const index = this.tasks.findIndex(({ id }) => task.id === id)
			if (~index) {
				const newTask = normalizeTask(task)
				if (newTask.userId) {
					newTask.user = { ...this.getTaskUserById(newTask.userId) }
				}
				this.tasks.splice(index, 1, newTask)
			}
		},
		async deleteTask (id) {
			console.log(id)
			await tasksService.deleteTask(id)
			this.tasks = this.tasks.filter(task => task.id !== id)
		}
	},
})
