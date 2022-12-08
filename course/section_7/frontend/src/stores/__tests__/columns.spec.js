import { it, afterEach, describe, beforeEach, expect } from 'vitest'
import '@/stores/__tests__/mockServices'
// Из-за того, что vi.mock всплывает на самый верх файла, у него нет доступа к глобальным переменным
// Поэтому важно делать импорт до использования основными файлами
import { createPinia, setActivePinia } from 'pinia'
import { useColumnsStore } from '@/stores'

describe('columns store', () => {
	let columnsStore
	beforeEach(async () => {
		// Определяем Pinia
		setActivePinia(createPinia())
		columnsStore = useColumnsStore()
		await columnsStore.fetchColumns()
	})
	it('should have initial columns', async () => {
		// Количество загруженных колонок должно соответствовать количеству в нашем файле columns.json
		expect(columnsStore.columns.length).toBe(5)
	})
	it('should add a new column', async () => {
		// В данном тесте нам не важно что мы отправляем на сервер, важно какой результат нам отдаст mockStore.js
		await columnsStore.addColumn({ title: 'Новая колонка' })
		const columnsLength = columnsStore.columns.length
		// Проверяем что количество колонок увеличилось на одну
		expect(columnsLength).toBe(6)
		// id новой колонки должно быть 6 (как мы определили в файле mockStore.js)
		expect(columnsStore.columns[columnsLength - 1].id).toBe(6)
	})
	it('should update column', async () => {
		const newTitle = 'Наша новая колонка'
		await columnsStore.updateColumn({ id: 1, title: newTitle })
		// Проверяем что у нас все еще 6 элементов (5 изначально и один добавлен в предыдущем тесте)
		expect(columnsStore.columns.length).toBe(5)
		// Проверяем что изменилось название первой колонки
		expect(columnsStore.columns[0].title).toBe(newTitle)
	})
	it('should delete column', async () => {
		await columnsStore.deleteColumn(5)
		// Проверяем что количество уменьшилось на одну колонку
		expect(columnsStore.columns.length).toBe(4)
		// Проверяем что колонки с id = 5 не существует
		expect(columnsStore.columns.find(column => column.id == 5)).toBeUndefined()
	})
})
