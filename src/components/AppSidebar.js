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
import { LogoUvbfAccueil } from '../assets/brand/logo'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)

  const handleOnHide = () => {
    // 
  }

  const handleOnShow = () => {
    // 
  }

  return (
    <CSidebar
      className=""
      colorScheme="dark"
      narrow={false}
      onHide={handleOnHide}
      onShow={handleOnShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      overlaid={false}
      placement='start'
      position="fixed"
      size="sm" 
      unfoldable={unfoldable}
      visible={sidebarShow} 
      style={{ backgroundColor: '#17376e' }}
    >
      <CSidebarHeader className="pt-1">
        <CSidebarBrand>
          <CImage className="" src={LogoUvbfAccueil} height={48} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          white
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
