import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return (
      <CFooter className="px-4 align-items-center justify-content-center border-0">
        <div>
          <span>UV-BF &copy; 2025 - Tous droits réservés.</span>
        </div>
      </CFooter>
    )
  }
}

export default React.memo(AppFooter)
