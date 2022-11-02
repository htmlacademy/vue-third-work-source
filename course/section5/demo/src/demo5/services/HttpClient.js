export class HttpClient {
	constructor (options) {
		if (!options.baseURL) {
			throw Error('[HttpClient]: Base url is empty')
		}
		this.httpProvider = options.httpProvider
		this.baseUrl = options.baseURL
	}
	buildRequest (options = {}) {
		let headers = {
			'Content-Type': 'application/json',
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
		return this.httpProvider.get(path, this.buildRequest(options))
	}
	
	async post (path, options) {
		this.checkPath(path)
		return this.httpProvider.post(path, this.buildRequest(options))
	}
	
	async put (path, options) {
		this.checkPath(path)
		return this.httpProvider.put(path, this.buildRequest(options))
	}
	
	async delete (path, options) {
		this.checkPath(path)
		return this.httpProvider.delete(path, this.buildRequest(options))
	}
}
