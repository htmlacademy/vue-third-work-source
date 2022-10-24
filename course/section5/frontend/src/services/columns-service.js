import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

const BASE_URL = '/api/columns'

class ColumnsService extends HttpClient {
	async fetchColumns() {
		try {
			return this.get('/')
		} catch (e) {
			throw Error(e)
		}
	}
	async createColumn(column) {
		try {
			return this.post('/', { data: column})
		} catch (e) {
			throw Error(e)
		}
	}
	async updateColumns(column) {
		try {
			return this.put(`/${column.id}`, { data: column })
		} catch (e) {
			throw Error(e)
		}
	}
	async deleteColumns(id) {
		try {
			await this.delete(`/${id}`)
		} catch (e) {
			throw Error(e)
		}
	}
}

export default new ColumnsService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})
