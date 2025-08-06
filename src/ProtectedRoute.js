// Example of a ProtectedRoute component
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ isAuthenticated, redirectPath = '/home' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }
   return <Outlet />; // Renders the child routes/components
}

export default ProtectedRoute
