export default class FetchProvider {
  computeQueryParams(query) {
    if (!query) return ''
    const queryParams = new URLSearchParams(query)
    return '?' + queryParams.toString()
  }

  request(options) {
    this.onRequest(options)
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
        return response.json()
      })
      .then((response) => {
        this.onResponse(response)
        return data
      })
      .catch((response) => {
        this.onError(response)
      })
  }

  onError(response) {
    console.error(response)
  }

  onRequest(request) {
    console.log('on request')
  }

  onResponse(response) {
    console.log('on response')
  }

  get(path, requestOptions) {
    return this.request({ path, method: 'GET', ...requestOptions })
  }

  post(path, requestOptions) {
    return this.request({ path, method: 'POST', ...requestOptions })
  }

  put(path, requestOptions) {
    return this.request({ path, method: 'PUT', ...requestOptions })
  }
	
  delete(path, requestOptions){
    return this.request({ path, method: 'DELETE', ...requestOptions })
  }
}
