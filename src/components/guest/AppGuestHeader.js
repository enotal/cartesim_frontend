import { CContainer, CHeader, CHeaderNav } from '@coreui/react'
import { AppHeaderBrand } from '../header'
import { useEffect } from 'react'

const AppGuestHeader = () => {
  useEffect(() => {
    // console.log(location.pathname)
  }, [])

  return (
    <CHeader
      position="sticky"
      className="guest-header py-1"
      // style={{ backgroundColor: '#00407d', height: 'auto' }}
      style={{ backgroundColor: '#056709', height: 'auto' }}
    >
      <CContainer className="px-2 py-0" fluid>
        <AppHeaderBrand isVisibledName={false} />
        <CHeaderNav>
          <div className="text-light">Vous n'êtes pas connecté(e) !</div>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppGuestHeader
