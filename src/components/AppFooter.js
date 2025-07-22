import React from 'react'
import { CFooter } from '@coreui/react'
import { isAuthenticated } from '../authService'

const AppFooter = () => {
  const isLoggedIn = isAuthenticated(); 

  if (!isLoggedIn) {
    return (
      <CFooter
        className="px-4 align-items-center justify-content-center border-0 opacity-75"
      >
        <div className="">
          <span>UV-BF &copy; 2025 - Tous droits réservés.</span>
        </div>
      </CFooter>
    )
  }
}

export default React.memo(AppFooter)
