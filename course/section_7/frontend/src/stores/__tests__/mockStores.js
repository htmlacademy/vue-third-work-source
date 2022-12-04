import columnsJSON from '../../mocks/columns.json'
import { vi } from 'vitest'

vi.mock('@/services', () => {
	return {
		columnsService: {
			fetchColumns: vi.fn(async () => columnsJSON),
			createColumn: vi.fn(async () => ({ id: 6 })),
			updateColumns: vi.fn(),
			deleteColumns: vi.fn()
		}
	}
})
