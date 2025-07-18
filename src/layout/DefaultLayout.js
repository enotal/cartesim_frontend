import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

import { isAuthenticated } from '../authService'

const DefaultLayout = () => {
  const isLoggedIn = isAuthenticated()
  return (
    <div>
      <AppSidebar isAuthenticated={isLoggedIn} />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader isAuthenticated={isLoggedIn} />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter isAuthenticated={isLoggedIn} />
      </div>
    </div>
  )
}

export default DefaultLayout
