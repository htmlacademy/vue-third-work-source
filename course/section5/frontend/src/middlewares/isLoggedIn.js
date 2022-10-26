import { useAuthStore } from '@/stores'

export default async function isLoggedIn() {
	const authStore = useAuthStore()
	
  if (!authStore.isAuthenticated) {
		// Logout
    return { path: '/login' };
  }
  return true;
}
