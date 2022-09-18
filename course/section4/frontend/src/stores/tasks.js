import { defineStore } from "pinia";
import tasks from '../mocks/tasks.json'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  getters: {},
  actions: {
    fetchTasks() {
      // Получение данных из json файла будет заменено в последующих разделах
	    this.tasks = tasks;
    },
  },
});
