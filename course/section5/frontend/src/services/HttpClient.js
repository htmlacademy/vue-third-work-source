export class HttpClient {
	constructor (options) {
		if (!options.baseURL) {
			throw Error('[HttpClient]: Base url is empty')
		}
		this.httpProvider = options.httpProvider
		this.getToken = options.getToken
		this.baseUrl = options.baseURL
	}
	
	async buildRequest (options) {
		if (!options) {
			throw Error('[HttpClient]: Request options are empty')
		}
		
		const { headers, ...rest } = options
		const token = await this.getToken()
		
		return {
			baseUrl: this.baseUrl,
			headers: {
				'Content-Type': 'application/json',
				Authorization: token || '',
				...headers,
			},
			...rest,
		}
	}
	
	async get (path, options) {
		console.log(path)
		return this.httpProvider.get(path, await this.buildRequest(options))
	}
	
	async post (path, options) {
		return this.httpProvider.post(path, await this.buildRequest(options))
	}
	
	async put (path, options) {
		return this.httpProvider.put(path, await this.buildRequest(options))
	}
	
	async delete(path, options) {
		return this.httpProvider.delete(path, await this.buildRequest(options))
	}
}
