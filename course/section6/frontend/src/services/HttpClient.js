export class HttpClient {
	/*
		Конструктор принимает параметры:
		* httpProvider - провайдер, который будет осущетвлять подключение
		* getToken - функция для получени токена аутентификации
		* baseUrl - базовый URL для конкретного ресурса
  */
	constructor (options) {
		if (!options.baseURL) {
			throw Error('[HttpClient]: Base url is empty')
		}
		this.httpProvider = options.httpProvider
		this.getToken = options.getToken
		this.baseUrl = options.baseURL
	}
	// Метод для построения запросов
	buildRequest (options = {}) {
		const token = this.getToken()
		// Добавляем хедеры
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
	// Метод проверки если путь запроса начинается с /
	// Это поможет предотвратить ситуации когда запрос my-domain.com/tasks/create будет выглядеть так: my-domain.com/taskscreate
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
