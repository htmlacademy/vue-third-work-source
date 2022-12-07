import { mount } from '@vue/test-utils'
import { it, describe, beforeEach, afterEach, expect, vi } from 'vitest'
import '@/stores/__tests__/mockServices'
import { createTestingPinia } from '@pinia/testing'
import { useColumnsStore, useTasksStore, useUsersStore } from '@/stores'
import { HomeView } from '@/views'
import router from '@/router'

describe('HomeView.vue', async () => {
	
	let columnsStore, tasksStore, usersStore, wrapper
	wrapper = await mount(HomeView, {
			global: {
				plugins: [createTestingPinia({
					createSpy: vi.fn,
					stubActions: false,
				}), router],
			}
		})
		columnsStore = useColumnsStore()
		tasksStore = useTasksStore()
		usersStore = useUsersStore()
		await columnsStore.fetchColumns()
		await tasksStore.fetchTasks()
		await usersStore.fetchUsers()
	
	it.skip('should render the component', async () => {
		expect(wrapper.exists()).toBeTruthy()
	})
	
	it.skip('should have a proper title', () => {
		const deskTitle = wrapper.find('[data-test="desk-title"]')
		expect(deskTitle.text()).toBe('Design Coffee Lab')
	})
	
	it.skip('should have initial columns', async () => {
		const deskColumns = wrapper.findAll('[data-test="desk-column-title"]')
		expect(deskColumns[0].text()).toBe('Запланировано')
		expect(deskColumns[1].text()).toBe('В работе')
		expect(deskColumns[2].text()).toBe('На проверке')
		expect(deskColumns[3].text()).toBe('Выполнено')
		expect(deskColumns[4].text()).toBe('На удаление')
	})
	
	it.skip('should trigger addColumn action', async () => {
		const addColumnButton = wrapper.find('[data-test="desk-add"]')
		addColumnButton.trigger('click')
		expect(columnsStore.addColumn).toHaveBeenCalledTimes(1)
	})
	
	it.skip('should have tasks in the first column', () => {
		const firstColumn = wrapper.find('[data-test="column-target-area"]')
		const taskTitles = firstColumn.findAll('[data-test="task-title"]')
		expect(taskTitles[0].text()).toBe('Задача № 2')
		expect(taskTitles[1].text()).toBe('Задача № 6')
		expect(taskTitles[2].text()).toBe('Задача № 10')
		expect(taskTitles[3].text()).toBe('Задача № 14')
		expect(taskTitles[4].text()).toBe('Задача № 18')
	})
	
	it('should have users filter', () => {
		const users = wrapper.findAll('[data-test="user-filter"]')
		expect(users.length).toBe(8)
	})
})
