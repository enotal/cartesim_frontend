import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppGuestHeader, AppGuestFooter } from './components/index'
import { getData, getItemBy, login } from './apiService'
import { CustomRequired } from './components/CustomRequired'
import { CustomCreateAlert } from './components/CustomCreateAlert'
import {
  HorizontalCartesimLink,
  LogoUvbfTransparentLink,
  VerticalAlignedCartesimLink,
  VerticalCartesimLink,
} from './assets/images/images'
import { colors } from './constants'
import { useCookies } from 'react-cookie'
import { cookieItems } from './constants'

const Home = () => {
  const navigate = useNavigate()
  const formRef = useRef()
  const [alert, setAlert] = useState(null)
  const [cookies, setCookie] = useCookies(cookieItems)

  useEffect(() => {
    //
  }, [])

  //

  // Redirection vers soumettre, suivre et déclarer
  const handleHome = (e) => {
    const name = e.target.name
    if (name === 'soumettre-demande') {
      navigate('/demandes/soumettre', { replace: true })
    }
    if (name === 'suivre-demande') {
      navigate('/demandes/suivre', { replace: true })
    }
    if (name === 'declarer-perte') {
      navigate('/sims/declarer/perte', { replace: true })
    }
  }

  // Connexion
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Récupération des données du formulaire
    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData)
    // Soumission
    const response = await login(formValues)
    if (response.success) {
      console.log(response.data)
      // localStorage.setItem('cartesim.auth', JSON.stringify(response.data))
      // setCookie(cookieItems[0], JSON.stringify(response.data), { path: '/' })
      // navigate('/dashboard', { replace: true })
    } else {
      setAlert(response)
    }
  }

  return (
    <div className="home-main-container min-vh-100" style={{ backgroundColor: '#fff' }}>
      <AppGuestHeader />
      <div className="container py-5 overflow-y-auto">
        {/* Logo transparent */}
        <div className="text-center">
          {/* <img className="" src={LogoUvbfTransparentLink} height={64} alt="logo-uvbf" /> */}
        </div>
        {/*  */}
        {/* Main */}
        <div className="row">
          {/* Titre & Image & Description & Boutons */}
          <div className="col-md-8 mb-2">
            {/* Titre */}
            <div className="text-center py-1 my-4 homeTitle">GESTION DES CARTES SIM</div>
            {/* Description */}
            <div className="row">
              <div className="col-md-2 mb-3 text-center">
                <img className="" src={VerticalAlignedCartesimLink} height={96} alt="logo-uvbf" />
              </div>
              <div className="col-md-10 home-description">
                <p className="pe-5">
                  Dans le cadre de l’amélioration des conditions d’étude des nouveaux étudiants de
                  l’Université Virtuelle du Burkina Faso (UV-BF), des cartes SIM sont attribuées aux
                  étudiant en ayant fait la demande.
                </p>
                <p className="pe-5">
                  Cette initiative vise à offrir aux étudiants des facilités d’apprentissage dont la
                  particularité est l’utilisation obligatoire d’un micro-ordinateur comme support
                  officiel pour suivre les cours à distance et se soumettre aux évaluations.
                </p>
                <p className="pe-5">
                  L'UV-BF invite ainsi l'ensemble des étudiants bénéficiaires à faire bon usage de
                  cette aubaine qui confirme l'engagement de l'Etat à soutenir l'enseignement
                  supérieur pour une éducation de qualité.
                </p>
              </div>
            </div>
            {/* Boutons */}
            <div className="row mt-3 mb-3">
              <div className="d-flex">
                <button
                  type="button"
                  className="btn custom-btn-success flex-grow-1"
                  name="soumettre-demande"
                  onClick={handleHome}
                >
                  <i className="fa fa-edit me-1" aria-hidden="true"></i>Soumettre ma demande
                </button>
                <button
                  type="button"
                  className="btn custom-btn-success flex-grow-1 ms-3"
                  name="suivre-demande"
                  onClick={handleHome}
                >
                  <i className="fa fa-eye me-1" aria-hidden="true"></i>Suivre ma demande
                </button>
                <button
                  type="button"
                  className="btn custom-btn-success flex-grow-1 ms-3"
                  name="declarer-perte"
                  onClick={handleHome}
                >
                  <i className="fa fa-question me-1" aria-hidden="true"></i>Déclarer une perte
                </button>
              </div>
            </div>
          </div>
          {/* Login form */}
          <div className="col-md-4 home-login-form align-content-center">
            {/* Alerts */}
            {alert && (
              <div
                className="card mb-2"
                style={{
                  backgroundColor: colors[alert.type],
                  borderColor: colors[alert.type],
                }}
              >
                <div className="card-body py-1 text-center">
                  <CustomCreateAlert alert={alert} />
                </div>
              </div>
            )}
            <div className="card">
              <div className="card-body">
                <form ref={formRef} onSubmit={handleSubmit} method="POST" encType="">
                  {/* Identifiant */}
                  <div className="mb-2">
                    <label htmlFor="email" className="form-label mb-0">
                      Email
                      <CustomRequired />
                    </label>
                    <div className="">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        // required
                      />
                    </div>
                  </div>
                  {/* Mot de passe */}
                  <div className="mb-2">
                    <label htmlFor="passwor" className="form-label mb-0">
                      Mot de passe
                      <CustomRequired />
                    </label>
                    <div className="">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        // required
                      />
                    </div>
                  </div>
                  {/*  */}
                  <div className="d-grid mt-3">
                    <button type="submit" className="btn custom-btn-success">
                      <i className="fa fa-sign-in me-1" aria-hidden="true"></i>Connexion
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
      <AppGuestFooter />
    </div>
  )
}

export default Home
