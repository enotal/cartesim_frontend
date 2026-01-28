import { cookieItems } from './constants'

export const isAuthenticated = () => {
  const storedUser = localStorage.getItem(cookieItems[0])
  if (storedUser !== null) {
    return JSON.parse(storedUser)
  }
  return null
}
