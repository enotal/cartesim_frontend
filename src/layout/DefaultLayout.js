import { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import { isAuthenticated } from '../Auth'

const DefaultLayout = () => {
  const auth = isAuthenticated()

  return (
    <div className="defaultLayout-main-container" style={{ backgroundColor: '#fff' }}>
      <AppSidebar auth={auth} />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader auth={auth} />
        <div className="body flex-grow-1">
          <AppContent auth={auth} />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
