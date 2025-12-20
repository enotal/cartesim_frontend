import { LogoUvbfAccueil } from "../../assets/brand/logo"

const AppHeaderBrand = ({ isVisibledName }) => {
  return (
    <div className="d-flex">
      <img className="app-header-brand-image py-1" src={LogoUvbfAccueil} alt="logo_uvbf" />
    </div>
  )
}

export default AppHeaderBrand
