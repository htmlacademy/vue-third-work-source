export default class FetchProvider {
	interceptors = []
	// Метод для добавления параметров запроса
	computeQueryParams (query) {
		if (!query) return ''
		const queryParams = new URLSearchParams(query)
		return '?' + queryParams.toString()
	}
	// Метод для конкретного запроса
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
				if (response.status > 201) return Promise.resolve(response)
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
	// Метод для добавления перехватчиков
	addInterceptor (interceptor) {
		if (interceptor && interceptor.onError) {
			this.interceptors.push(interceptor)
		} else {
			throw Error('Interceptor не поддерживается')
		}
		return this
	}
	// Метод для отработки ошибок
	async onError (response) {
		if (response.json) {
			const { error } = await response.json()
			const { message, statusCode } = error
			this.interceptors.forEach((interceptor) => {
				if (interceptor.onError) {
					interceptor.onError(statusCode, message)
				}
			})
			throw Error(message)
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
