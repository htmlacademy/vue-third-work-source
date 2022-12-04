import FetchProvider from './FetchProvider'
import { useAuthStore } from '@/stores'

const httpProvider = new FetchProvider()
httpProvider.addInterceptor(
	{
		onError: async (status) => {
			// Если с сервиса приходит ошибка 401 Unauthorized, то выполняем выход из системы
			if (status === 401) {
				const authStore = useAuthStore()
				if (authStore.isAuthenticated) await authStore.logout()
			}
		},
	}
)

export default httpProvider
