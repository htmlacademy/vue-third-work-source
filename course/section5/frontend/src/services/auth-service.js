import { HttpClient } from './HttpClient'
import FetchProvider from './providers/FetchProvider'
import { getToken } from './token-manager'
import router from '@/router'

const BASE_URL = 'http://localhost:3000'

class AuthService extends HttpClient {
	async login (email, password) {
		try {
			return await this.post('/login', {
				data: {
					email, password
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}
	
	async whoAmI () {
		try {
			return await this.get('/whoAmI')
		} catch (e) {
			throw Error(e)
		}
	}
	
	async logout () {
		try {
			await this.delete('/logout')
		} catch (e) {
			throw Error(e)
		}
	}
}

const httpProvider = new FetchProvider()
httpProvider.addInterceptor(
	{
		onError: async (status) => {
			if (status === 401) {
				// Logout
				router.push({ name: 'Login' })
			}
		},
	}
)

export default new AuthService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})
