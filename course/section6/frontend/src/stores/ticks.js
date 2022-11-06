import { defineStore } from 'pinia'
import { ticksService } from '@/services'

export const useTicksStore = defineStore('ticks', {
	state: () => ({
		ticks: [],
	}),
	getters: {
		getTicksByTaskId: state => taskId => state.ticks.filter(tick => tick.taskId === taskId)
	},
	actions: {
		async fetchTicks () {
			this.ticks = await ticksService.fetchTicks()
		},
		async addTick (tick) {
			const newTick = await ticksService.createTick(tick)
			this.ticks.push(newTick)
		},
		async updateTick (tick) {
			await ticksService.updateTick(tick)
			const index = this.ticks.findIndex(({ id }) => id === tick.id)
			if (~index) {
				this.ticks.splice(index, 1, tick)
			}
		},
		async deleteTick (id) {
			await ticksService.deleteTick(id)
			this.ticks = this.ticks.filter(tick => tick.id !== id)
		}
	},
})
