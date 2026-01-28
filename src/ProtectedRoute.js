// Example of a ProtectedRoute component
import { Navigate, Outlet } from 'react-router-dom'
import { cookieItems } from './constants'
import { isAuthenticated } from './Auth'

{
  /* Public Routes (for guests only) */
}
export const PublicRoutes = ({ redirectPath = '/' }) => {
  const auth = isAuthenticated()
  if (auth !== null) {
    localStorage.setItem(cookieItems[0], null)
  }
  console.log(redirectPath)
  return <Navigate to={redirectPath} replace />
}

export const PrivateRoutes = ({ redirectPath = '/' }) => {
  const auth = isAuthenticated()
  if (auth === null) {
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet auth={auth} /> // Renders the child routes/components
}
