import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
	state: () => ({
    isAuthenticated: false,
    user: null
	}),
	getters: {
		getUserAttribute: state => attr => state.user ? state.user[attr] : ''
	},
	actions: {
		async login(email, password) {
			console.log(email, password)
		},
		async logout(sendRequest = true) {},
		async getMe() {},
	},
})
