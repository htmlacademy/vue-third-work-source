import { mount, shallowMount } from '@vue/test-utils'
import { it, describe, beforeEach, afterEach, expect, vi, vitest } from 'vitest'
import '@/stores/__tests__/mockStores'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useColumnsStore, useTasksStore } from '@/stores'
import { HomeView } from '@/views'
import DeskColumn from '@/modules/columns/components/DeskColumn.vue'
import router from '@/router'

describe('HomeView.vue', () => {
	
	let columnsStore, wrapper
	
	beforeEach(async () => {
		wrapper = mount(HomeView, {
			global: {
				plugins: [createTestingPinia({
					createSpy: vi.fn,
					stubActions: false,
					fakeApp: true
				}), router],
			}
		})
		columnsStore = useColumnsStore()
		await columnsStore.fetchColumns()
	})
	afterEach(async () => {
		await columnsStore.$reset()
	})
	
	it('should render the component', async () => {
		expect(wrapper.exists()).toBeTruthy()
	})
	
	it('should have a proper title', () => {
		const deskTitle = wrapper.find('[data-test="desk-title"]')
		expect(deskTitle.text()).toBe('Design Coffee Lab')
	})
	
	it('should have initial columns', async () => {
		const deskColumns = wrapper.findAll('[data-test="desk-column-title"]')
		expect(deskColumns[0].text()).toBe('Запланировано')
		expect(deskColumns[1].text()).toBe('В работе')
		expect(deskColumns[2].text()).toBe('На проверке')
		expect(deskColumns[3].text()).toBe('Выполнено')
		expect(deskColumns[4].text()).toBe('На удаление')
	})
	
	it('should trigger addColumn action', async () => {
		const addColumnButton = wrapper.find('[data-test="desk-add"]')
		addColumnButton.trigger('click')
		expect(columnsStore.addColumn).toHaveBeenCalledTimes(1)
	})
})
