import { defineStore } from "pinia";
import columns from '@/mocks/columns.json'

export const useColumnsStore = defineStore('columns', {
  state: () => ({
    columns: [],
  }),
  getters: {},
  actions: {
		async fetchColumns() {
      // Получение данных из json файла будет заменено в последующих разделах
	    this.columns = columns;
    },
  },
});
