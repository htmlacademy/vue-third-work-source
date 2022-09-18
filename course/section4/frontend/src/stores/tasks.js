import { defineStore } from 'pinia'
import tasks from '../mocks/tasks.json'
import { normalizeTask } from '../common/helpers'
import { useFiltersStore } from './filters'

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
		}
	},
	actions: {
		async fetchTasks () {
			// Получение данных из json файла будет заменено в последующих разделах
			this.tasks = tasks.map(task => normalizeTask(task))
		},
	},
})
