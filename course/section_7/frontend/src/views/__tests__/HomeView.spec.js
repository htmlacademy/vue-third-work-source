import { mount } from '@vue/test-utils'
import { it, describe, beforeEach, afterEach, expect } from 'vitest'
import '@/stores/__tests__/mockStores'
import { createPinia, setActivePinia } from 'pinia'
import { useColumnsStore, useTasksStore } from '@/stores'
import { HomeView } from '@/views'
import DeskColumn from '@/modules/columns/components/DeskColumn.vue'
import TaskCard from '@/modules/tasks/components/TaskCard.vue'
import router from '@/router'

const pinia = createPinia()

describe('HomeView.vue', () => {
	let columnsStore, tasksStore, wrapper
	beforeEach(() => {
		setActivePinia(pinia)
		columnsStore = useColumnsStore()
		tasksStore = useTasksStore()
		wrapper = mount(HomeView, {
			global: {
				plugins: [pinia, router],
			}
		})
	})
	afterEach(async () => {
		await columnsStore.$reset()
	})
	
	it('should render the component', async () => {
		expect(wrapper.exists()).toBeTruthy()
	})
	
	it('should have initial columns', async () => {
		// Получаем колонки
		await columnsStore.fetchColumns()
		const deskColumns = wrapper.findAllComponents(DeskColumn)
		expect(deskColumns.length).toBe(5)
	})
	
	it.skip('should have initial tasks', async () => {
		await tasksStore.fetchTasks()
		const taskCards = wrapper.findAllComponents(TaskCard)
		expect(taskCards.length).toBe(20)
	})
})
