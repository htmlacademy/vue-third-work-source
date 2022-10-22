const AUTH_KEY = 'vue-work-auth-key'

export async function getToken() {
  localStorage.getItem(AUTH_KEY)
}

export function setToken(token) {
  localStorage.setItem(AUTH_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(AUTH_KEY)
}
