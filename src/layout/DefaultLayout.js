import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent, AppSidebar, AppHeader } from '../components/index'

import { isAuthenticated } from '../authService'
import myBackground from '../assets/images/background.jpg'

const DefaultLayout = () => {
  const isLoggedIn = isAuthenticated()
  return (
    <div className="defaultLayout-main-container">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
