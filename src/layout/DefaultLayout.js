import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

import { isAuthenticated } from '../authService'
import myBackground from '../assets/images/background.jpg'

const DefaultLayout = () => {
  const isLoggedIn = isAuthenticated()
  return (
    <div
      className="defaultLayout-main-container"
      // style={{
      //   backgroundImage: `url(${isLoggedIn ? '' : myBackground})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      // }}
    >
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
