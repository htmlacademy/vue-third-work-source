import { defineStore } from 'pinia'
import { useUsersStore, useFiltersStore, useTicksStore } from '@/stores'
import { tasksService } from '@/services'

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
		getTaskById: state => id => {
			const ticksStore = useTicksStore()
			const usersStore = useUsersStore()
			const task = state.tasks.find(task => task.id == id)
			if (!task) return null
			// Добавляем подзадачи
			task.ticks = ticksStore.getTicksByTaskId(task.id)
			// Добавляем пользователя
			task.user = usersStore.users.find(user => user.id === task.userId)
			return task
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
			tasksToUpdate.forEach(async task => {
				const index = this.tasks.findIndex(({ id }) => id === task.id)
				// findIndex вернет элемент массива или -1
				// Используем bitwise not для определения если index === -1
				// ~-1 вернет 0, а значит false
				if (~index) {
					// Обновить порядок сортировки на сервере
					await tasksService.updateTask(task)
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
			return newTask
		},
		async editTask (task) {
			const newTask = await tasksService.updateTask(task)
			const index = this.tasks.findIndex(({ id }) => newTask.id === id)
			if (~index) {
				if (newTask.userId) {
					newTask.user = { ...this.getTaskUserById(newTask.userId) }
				}
				this.tasks.splice(index, 1, newTask)
			}
			return newTask
		},
		async deleteTask (id) {
			await tasksService.deleteTask(id)
			this.tasks = this.tasks.filter(task => task.id !== id)
		}
	},
})
