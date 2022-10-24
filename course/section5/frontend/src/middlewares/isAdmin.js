import { useAuthStore } from '@/stores'

export default function isAdmin({ next, nextMiddleware }) {
	const authStore = useAuthStore()
  if (!authStore.user?.isAdmin) {
    next('/');
  }
  return nextMiddleware();
}
