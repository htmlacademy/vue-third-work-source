import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

// Мы используем proxy для перенаправления запросов
// Конфикурация proxy находиться в файле vite.config.js
const BASE_URL = '/api'

class AuthService extends HttpClient {
	// Метод входа в систему
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
	// Метод получения данных текущего пользователя
	async whoAmI () {
		try {
			return await this.get('/whoAmI')
		} catch (e) {
			throw Error(e)
		}
	}
	// Метод выхода из системы
	async logout () {
		try {
			await this.delete('/logout')
		} catch (e) {
			throw Error(e)
		}
	}
}

export default new AuthService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})
