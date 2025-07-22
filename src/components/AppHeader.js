import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { isAuthenticated } from '../authService'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const isLoggedIn = isAuthenticated()

  return (
    <CHeader
      position="sticky"
      className="mb-4 p-0 AppHeader"
      ref={headerRef}
      style={{ backgroundColor: '#17376e' }}
    >
      {isLoggedIn && (
        <div className="px-4 pt-1 pb-0 mb-0 header-title">
          <div className="application-name">optiacademiq+</div>
          <div className='application-slogan'>Un plus pour la qualité de notre Université !</div>
        </div>
      )}
      <CContainer className="border-bottom px-4 py-0" fluid>
        {isLoggedIn ? (
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} size="lg" className="text-light" />
          </CHeaderToggler>
        ) : (
          <CImage className="home-image-appHeader py-1" src={logo} />
        )}
        <CHeaderNav className="ms-auto me-3">
          {isLoggedIn && (
            <>
              <CNavItem>
                <CNavLink href="/#/dashboard" className="text-light">
                  <CIcon icon={cilBell} size="lg" className="me-1" />
                  Notifications
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/#/dashboard" className="text-light">
                  <CIcon icon={cilEnvelopeOpen} size="lg" className="me-1" />
                  Messages
                </CNavLink>
              </CNavItem>
            </>
          )}
        </CHeaderNav>
        <CHeaderNav>
          {/* {isLoggedIn && (
            <>
              <li className="nav-item py-1">
                <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
              </li>
              <CDropdown variant="nav-item" placement="bottom-end">
                <CDropdownToggle caret={false} className="text-light">
                  {colorMode === 'dark' ? (
                    <CIcon icon={cilMoon} size="lg" />
                  ) : colorMode === 'auto' ? (
                    <CIcon icon={cilContrast} size="lg" />
                  ) : (
                    <CIcon icon={cilSun} size="lg" />
                  )}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    active={colorMode === 'light'}
                    className="d-flex align-items-center"
                    as="button"
                    type="button"
                    onClick={() => setColorMode('light')}
                  >
                    <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                  </CDropdownItem>
                  <CDropdownItem
                    active={colorMode === 'dark'}
                    className="d-flex align-items-center"
                    as="button"
                    type="button"
                    onClick={() => setColorMode('dark')}
                  >
                    <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                  </CDropdownItem>
                  <CDropdownItem
                    active={colorMode === 'auto'}
                    className="d-flex align-items-center"
                    as="button"
                    type="button"
                    onClick={() => setColorMode('auto')}
                  >
                    <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <li className="nav-item py-1">
                <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
              </li>
            </>
          )} */}
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
