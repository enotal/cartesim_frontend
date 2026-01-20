// Example of a ProtectedRoute component
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getItemBy } from './apiService'

const ProtectedRoute = ({ redirectPath = '/' }) => {
  const auth = JSON.parse(localStorage.getItem('cartesim.auth'))
  if (!auth) {
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet auth={auth} /> // Renders the child routes/components
}

export default ProtectedRoute
