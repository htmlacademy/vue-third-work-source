const AUTH_KEY = 'vue-work-auth-key'

export function getToken() {
  return localStorage.getItem(AUTH_KEY)
}

export function setToken(token) {
  return localStorage.setItem(AUTH_KEY, token)
}

export function removeToken() {
  return localStorage.removeItem(AUTH_KEY)
}
