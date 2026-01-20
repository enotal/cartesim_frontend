import React, { useEffect, useState } from 'react'
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
import { logout } from '../../apiService'
import { AvatarFemme, AvatarHomme } from '../../assets/images/avatars/avatars'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const auth = JSON.parse(localStorage.getItem('cartesim.auth'))

  const handleLogout = async () => {
    const response = await logout(auth.id)
    localStorage.removeItem('cartesim.auth')
    navigate('/', { replace: true })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        className="py-0 pe-0 text-light"
        // caret={isAuthenticated ? true : false}
      >
        <CAvatar
          src={auth ? (auth.sexe === 'Masculin' ? AvatarHomme : AvatarFemme) : ''}
          size="md"
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profil
        </CDropdownItem>
        <CDropdownDivider /> */}
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Déconnexion
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
