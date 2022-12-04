import { mount } from '@vue/test-utils'
import { it, describe, beforeEach, expect} from 'vitest'
import '@/stores/__tests__/mockStores'
import { createPinia, setActivePinia } from "pinia"
import { HomeView } from '@/views'
import router from '@/router'

const pinia = createPinia()

describe('HomeView.vue', () => {
	beforeEach(() => {
		setActivePinia(pinia)
	})
	
	it('should render the component', async () => {
		const wrapper = mount(HomeView, {
			global: {
				plugins: [pinia, router],
			}
		})
		expect(wrapper.exists()).toBeTruthy()
	})
})
