import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', {
	state: () => ({
		search: '',
		users: [],
		statuses: []
	}),
	getters: {
		filters: state => {
			const { search, users, statuses } = state
			return {
				search,
				users,
				statuses
			}
		}
	},
	actions: {
		applyFilters ({ item, entity }) {
			if (entity === 'search') {
				this.search = item
			} else {
				const resultValues = [...this[entity]]
				const itemIndex = resultValues.findIndex(el => el === item)
				~itemIndex
					? resultValues.splice(itemIndex, 1)
					: resultValues.push(item)
				this.$patch({ [entity]: resultValues })
			}
		}
	},
})
