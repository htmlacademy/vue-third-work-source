import { HttpClient } from './HttpClient'
import httpProvider from './providers'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

class JsonPlaceholderService extends HttpClient {
	async fetchPosts() {
		try {
			return this.get('/')
		} catch (e) {
			throw Error(e)
		}
	}
	async getById(id) {
		try {
			return this.get(`/${id}`)
		} catch (e) {
			throw Error(e)
		}
	}
	async createPost(post) {
		try {
			return this.post('/', { data: post})
		} catch (e) {
			throw Error(e)
		}
	}
	async updatePost(post) {
		try {
			return this.put(`/${post.id}`, { data: post })
		} catch (e) {
			throw Error(e)
		}
	}
	async deletePost(id) {
		try {
			await this.delete(`/${id}`)
		} catch (e) {
			throw Error(e)
		}
	}
}

export default new JsonPlaceholderService({
	httpProvider,
	baseURL: BASE_URL,
})
