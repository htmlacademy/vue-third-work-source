import { defineStore } from "pinia";
import users from '../mocks/users.json'
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
