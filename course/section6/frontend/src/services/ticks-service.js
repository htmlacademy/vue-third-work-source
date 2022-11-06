import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

const BASE_URL = '/api/ticks'

class TicksService extends HttpClient {
	async fetchTicks() {
		try {
			return this.get('/')
		} catch (e) {
			throw Error(e)
		}
	}
	async createTick(tick) {
		try {
			return this.post('/', { data: tick})
		} catch (e) {
			throw Error(e)
		}
	}
	async updateTick(tick) {
		try {
			return this.put(`/${tick.id}`, { data: tick })
		} catch (e) {
			throw Error(e)
		}
	}
	async deleteTick(id) {
		try {
			await this.delete(`/${id}`)
		} catch (e) {
			throw Error(e)
		}
	}
}

export default new TicksService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})
