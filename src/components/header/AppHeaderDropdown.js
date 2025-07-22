import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { isAuthenticated } from '../../authService'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const isLoggedIn = isAuthenticated()

  const handleLogout = () => {
    // Clear User session before authentication
    localStorage.removeItem('optiacademiqplus_auth') // Remove a specific item
    localStorage.clear() // Clear all items from localStorage
    document.location.href = '/'
    // navigate(0)
  }
  return (
    <CDropdown variant="nav-item">
      {isLoggedIn ? (
        <>
          <CDropdownToggle
            placement="bottom-end"
            className="py-0 pe-0 text-light"
            caret={isAuthenticated ? true : false}
          >
            <CAvatar src={avatar8} size="md" />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownItem href="#">
              <CIcon icon={cilUser} className="me-2" />
              Profil
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem href="#" onClick={handleLogout}>
              <CIcon icon={cilLockLocked} className="me-2" />
              Déconnexion
            </CDropdownItem>
          </CDropdownMenu>
        </>
      ) : (
        <div className="text-light">Non connecté(e)</div>
      )}
    </CDropdown>
  )
}

export default AppHeaderDropdown
