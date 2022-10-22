import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

const BASE_URL = 'http://localhost:3000/users'

class UserService extends HttpClient {
	async fetchUsers() {
		try {
			return this.get('/')
		} catch (e) {
			throw Error(e)
		}
	}
}

export default new UserService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})
