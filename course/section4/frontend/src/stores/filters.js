import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', {
	state: () => ({
		filters: {
			search: '',
			users: [],
			statuses: []
		},
	}),
	getters: {},
	actions: {},
})
