import FetchProvider from './FetchProvider'
import { useAuthStore } from '@/stores'

const httpProvider = new FetchProvider()
httpProvider.addInterceptor(
	{
		onError: async (status) => {
			if (status === 401) {
				const authStore = useAuthStore()
				await authStore.logout()
			}
		},
	}
)

export default httpProvider
