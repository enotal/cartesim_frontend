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
import { useCookies } from 'react-cookie'
import { cookieItems } from '../../constants'

const AppHeaderDropdown = ({ auth }) => {
  const navigate = useNavigate()
  const [cookies, removeCookie] = useCookies(cookieItems)
  const userData = cookies[cookieItems[0]] ? cookies[cookieItems[0]] : null
  // Logout
  const handleLogout = async () => {
    await logout().then((response) => {
      // localStorage.removeItem('cartesim.auth')
      removeCookie(cookieItems[0])
      navigate('/', { replace: true })
    })
  }
  //
  return (
    <CDropdown variant="nav-item">
      <div className="text-light">
        <CDropdownToggle
          placement="bottom-end"
          className="py-0 pe-0 text-light"
          title={auth ? auth.lastname + ' ' + auth.name : ''}
          // caret={isAuthenticated ? true : false}
        >
          <CAvatar
            src={auth ? (auth.sexe === 'Masculin' ? AvatarHomme : AvatarFemme) : ''}
            size="md"
          />
          <span className="">
            {auth ? auth.lastname.substring(0, 1) + auth.name.substring(0, 1) : ''}
          </span>
        </CDropdownToggle>
        <div className="">{auth ? auth.roles[0] : ''}</div>
      </div>
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
