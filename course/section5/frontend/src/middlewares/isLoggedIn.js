import { useAuthStore } from '@/stores'

export default async function isLoggedIn() {
	const authStore = useAuthStore()
	
  if (!authStore.isAuthenticated) {
		console.log()
		// Logout
    return { path: '/login' };
  }
  return true;
}
