import { createApp } from "vue"
import { createPinia } from "pinia"
import { clickOutside } from './common/directives'
import { useAuthStore } from '@/stores'
import { getToken, removeToken } from '@/services/token-manager'

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('click-outside', clickOutside)

app.mount("#app")

// Проверяем если пользователь уже вошел в систему
const token = getToken()
if (token) {
	try {
		const authStore = useAuthStore()
		await authStore.getMe()
		await router.push('/')
	} catch (e) {
		removeToken()
		console.log(e)
	}
}
