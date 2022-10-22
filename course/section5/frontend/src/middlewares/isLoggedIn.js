import { useAuthStore } from '@/stores'

export default async function isLoggedIn({ next, nextMiddleware }) {
	const authStore = useAuthStore()
	
  if (!authStore.isAuthenticated) {
		console.log()
		// Logout
    next('/login');
  }
  return nextMiddleware();
}
