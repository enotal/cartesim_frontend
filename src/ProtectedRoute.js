// Example of a ProtectedRoute component
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ auth, redirectPath = '/' }) => {
  if (!auth) {console.log('auth')
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet /> // Renders the child routes/components
}

export default ProtectedRoute
