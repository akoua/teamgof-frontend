const USER = 'user'

export function getUser() {
  if (typeof window !== 'undefined')
    return JSON.parse(localStorage.getItem(USER))
}

export function getAccessToken() {
  return getUser()?.accessToken
}
export function getRefreshToken() {
  return getUser()?.refreshToken
}

export function saveUser(user) {
  if (typeof window !== 'undefined')
    localStorage.setItem(USER, JSON.stringify(user))
}

export function destroyUser() {
  if (typeof window !== 'undefined')
    localStorage.removeItem(USER)
}

export default { getUser, saveUser, destroyUser }
