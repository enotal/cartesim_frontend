import { logo } from 'src/assets/brand/logo'

const AppHeaderBrand = ({ isVisibledName }) => {
  return (
    <div className="d-flex">
      <img className="app-header-brand-image py-1" src={logo} alt="logo_uvbf" />
      {isVisibledName && (
        <div className="ps-2">
          <div className="app-header-brand-name">optiacademiq+</div>
          <div className="app-header-brand-slogan">
            Un plus pour la qualité de notre Université !
          </div>
        </div>
      )}
    </div>
  )
}

export default AppHeaderBrand
