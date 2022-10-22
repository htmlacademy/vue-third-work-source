export class HttpClient {
	constructor (options) {
		if (!options.baseURL) {
			throw Error('[HttpClient]: Base url is empty')
		}
		this.httpProvider = options.httpProvider
		this.getToken = options.getToken
		this.baseUrl = options.baseURL
	}
	
	async buildRequest (options = {}) {
		const token = this.getToken()
		console.log(token, 'http')
		let headers = {
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '',
		}
		if (options.headers) {
			headers = {
				...headers,
				...options.headers
			}
		}
		
		return {
			baseUrl: this.baseUrl,
			headers,
			...options,
		}
	}
	
	checkPath(path) {
		if (!path.startsWith('/')) {
			throw Error('Путь должен начинаться с /', path)
		}
	}
	
	async get (path, options) {
		this.checkPath(path)
		return this.httpProvider.get(path, await this.buildRequest(options))
	}
	
	async post (path, options) {
		this.checkPath(path)
		return this.httpProvider.post(path, await this.buildRequest(options))
	}
	
	async put (path, options) {
		this.checkPath(path)
		return this.httpProvider.put(path, await this.buildRequest(options))
	}
	
	async delete (path, options) {
		this.checkPath(path)
		return this.httpProvider.delete(path, await this.buildRequest(options))
	}
}
