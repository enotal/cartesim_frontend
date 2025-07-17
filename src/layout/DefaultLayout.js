import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { isAuthenticated } from '../authService.js'

const DefaultLayout = () => {
  // localStorage.removeItem('optiacademiqplus_auth')
  return (
    <div>
      <AppSidebar isAuthenticated={isAuthenticated()} />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader isAuthenticated={isAuthenticated()} />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter isAuthenticated={isAuthenticated()} />
      </div>
    </div>
  )
}

export default DefaultLayout
