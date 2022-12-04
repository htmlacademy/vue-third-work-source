import { it, describe, beforeEach} from 'vitest'
import '@/stores/__tests__/mockStores'
import { createPinia, setActivePinia } from "pinia"
import { useColumnsStore } from '@/stores'

describe('HomeView.vue', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})
	
	it('should test', async () => {
		const columnsStore = useColumnsStore()
		await columnsStore.fetchColumns()
		await columnsStore.addColumn({ id: 6 })
		console.log(columnsStore.columns)
	})
})
