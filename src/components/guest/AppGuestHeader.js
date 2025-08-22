import { CContainer, CHeader, CHeaderNav } from '@coreui/react'
import { AppHeaderBrand } from '../header'

const AppGuestHeader = () => {
  return (
    <CHeader position="sticky" className="guest-header py-1">
      <CContainer className="px-4 py-0" fluid>
        <AppHeaderBrand isVisibledName={false} />
        <CHeaderNav>
          <div className="text-light">Non connecté(e)</div>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppGuestHeader
