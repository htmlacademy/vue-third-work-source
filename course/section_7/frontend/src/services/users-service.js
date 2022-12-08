import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

const BASE_URL = '/api/users'

class UsersService extends HttpClient {
	async fetchUsers() {
		try {
			return this.get('/')
		} catch (e) {
			throw Error(e)
		}
	}
}

export default new UsersService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})
