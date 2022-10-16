import { HttpClient } from './HttpClient'
import FetchProvider from './providers/FetchProvider'
import { getToken } from './token-manager'

const BASE_URL = 'localhost:3000'

class BackendService extends HttpClient {
  async login({ email, password }){
    return this.get('login')
  }
}

export default new BackendService({
  httpProvider: new FetchProvider(),
  baseURL: BASE_URL,
  getToken,
})
