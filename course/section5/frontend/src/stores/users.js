import { defineStore } from "pinia";
import { userService } from '@/services'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  getters: {},
  actions: {
		async fetchUsers() {
      this.users = await userService.fetchUsers()
    },
  },
});
