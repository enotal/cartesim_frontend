import { LogoUvbfAccueil } from '../../assets/brand/logo'

const AppHeaderBrand = ({ isVisibledName }) => {
  return (
    <div className="d-flex">
      <img
        className="py-0"
        src={LogoUvbfAccueil}
        alt="logo_uvbf"
        style={{ height: '4em', display: 'block' }}
      />
      <div className={`fw-bolder text-light ms-4 ${isVisibledName ? 'd-block' : 'd-none'}`}>
        GESTION DES CARTES SIM
      </div>
    </div>
  )
}

export default AppHeaderBrand
