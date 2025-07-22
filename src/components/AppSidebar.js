import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
// import { sygnet } from 'src/assets/brand/sygnet'
// import uvbfLogo from '../assets/brand/logo-uvbf.png'

// sidebar nav config
import navigation from '../_nav'
import { isAuthenticated } from '../authService'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const isLoggedIn = isAuthenticated()

  if (isLoggedIn) {
    return (
      <CSidebar
        className="border-end"
        colorScheme="dark"
        position="fixed"
        size="lg"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
        style={{ backgroundColor: '#17376e' }}
      >
        <CSidebarHeader className="pt-1">
          <CSidebarBrand>
            {/* <CIcon customClassName="sidebar-brand-narrow" icon={logo} height={32} /> */}
            <CImage className="" src={logo} height={84} />
          </CSidebarBrand>
          <CCloseButton
            className="d-lg-none"
            white
            onClick={() => dispatch({ type: 'set', sidebarShow: false })}
          />
        </CSidebarHeader>
        <AppSidebarNav items={navigation} />
        {/* <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter> */}
      </CSidebar>
    )
  }
}

export default React.memo(AppSidebar)
