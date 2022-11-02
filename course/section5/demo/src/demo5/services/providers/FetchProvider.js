export default class FetchProvider {
	computeQueryParams (query) {
		if (!query) return ''
		const queryParams = new URLSearchParams(query)
		return '?' + queryParams.toString()
	}
	request (options) {
		const body = options.data ? JSON.stringify(options.data) : null
		return fetch(
			options.baseUrl + options.path + this.computeQueryParams(options.query),
			{ headers: options.headers, body, method: options.method }
		)
			.then((response) => {
				if (!response.ok) {
					return Promise.reject(response)
				}
				return response
			})
			.then((response) => {
				if (response.status === 204) return Promise.resolve(response)
				return response.json()
			})
			.then((data) => {
				return data
			})
			.catch(async (response) => {
				const message = await this.onError(response)
				throw Error(message)
			})
	}
	async onError (response) {
		if (response.json) {
			const { error } = await response.json()
			throw Error(error.message)
		} else if (response.message) {
			throw Error(response.message)
		}
	}
	
	get (path, requestOptions) {
		return this.request({ path, method: 'GET', ...requestOptions })
	}
	
	post (path, requestOptions) {
		return this.request({ path, method: 'POST', ...requestOptions })
	}
	
	put (path, requestOptions) {
		return this.request({ path, method: 'PUT', ...requestOptions })
	}
	
	delete (path, requestOptions) {
		return this.request({ path, method: 'DELETE', ...requestOptions })
	}
}
