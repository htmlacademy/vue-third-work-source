import { defineStore } from 'pinia'
import { authService } from '../services'
import { setToken, removeToken } from '@/services/token-manager'

export const useAuthStore = defineStore('auth', {
	state: () => ({
    user: null
	}),
	getters: {
		isAuthenticated: state => !!state.user,
		getUserAttribute: state => attr => state.user ? state.user[attr] : ''
	},
	actions: {
		async login(email, password) {
			try {
				const data = await authService.login(email, password)
				setToken(data.token)
				return 'ok'
			} catch (e) {
				return e.message
			}
 		},
		async getMe() {
			this.user = await authService.whoAmI()
		},
		async logout(sendRequest = true) {
			await authService.logout()
			this.user = null
			removeToken()
		},
	},
})
