import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent, AppSidebar, AppHeader } from '../components/index'

import { isAuthenticated } from '../authService'
import myBackground from '../assets/images/background.jpg'

const DefaultLayout = () => {
  const isLoggedIn = isAuthenticated()
  return (
<<<<<<< HEAD
    <div className="defaultLayout-main-container">
=======
    <div
      className="defaultLayout-main-container"
      // style={{
      //   backgroundImage: `url(${isLoggedIn ? '' : myBackground})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      // }}
    >
>>>>>>> ac3612064d474c848834f5ba3844b849ca83f5a7
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
<<<<<<< HEAD
=======
        <AppFooter />
>>>>>>> ac3612064d474c848834f5ba3844b849ca83f5a7
      </div>
    </div>
  )
}

export default DefaultLayout
