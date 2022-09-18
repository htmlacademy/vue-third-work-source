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
	actions: {
		applyFilters ({ item, entity }) {
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
	},
})
