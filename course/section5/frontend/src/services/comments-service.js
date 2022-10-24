import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

const BASE_URL = '/api/comments'

class CommentsService extends HttpClient {
	async fetchComments() {
		try {
			return this.get('/')
		} catch (e) {
			throw Error(e)
		}
	}
	async createComment(comment) {
		try {
			return this.post('/', { data: comment})
		} catch (e) {
			throw Error(e)
		}
	}
}

export default new CommentsService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})
