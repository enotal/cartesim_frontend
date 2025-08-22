import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppGuestHeader, AppGuestFooter } from './components/index'
import AppHomeConnexion2 from './assets/images/app-home-connexion-2.png'
import AppHomeConnexion3 from './assets/images/app-home-connexion-3.png'
import KeycloakService from './KeycloakService'

const Home = () => {
  const leftCol = 8
  const rightCol = 4
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    KeycloakService.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    })
      .then((authenticated) => {
        console.log('User is authenticated:', authenticated)
        setIsAuthenticated(!authenticated)

        if (!authenticated) {
          const token = KeycloakService.getToken()
          setToken(token)
          console.log('Access token:', token)
        }
      })
      .catch((err) => {
        console.error('Keycloak init error:', err)
      })
  }, [])
  console.log(isAuthenticated)
  if (isAuthenticated && token !== null) {
    localStorage.setItem('optiacademiqplus_auth', {
      isAuthenticated: isAuthenticated,
      token: token,
    })
    navigate('/dashboard', { replace: true })
  }
  // console.log(isAuthenticated)

  return (
    <div className="home-main-container min-vh-100">
      <AppGuestHeader />
      <div className="container pb-5 overflow-y-auto">
        {/*  */}
        <div className="row">
          <div className={`col-md-${leftCol}`}>
            <h5 className="home-title mt-4">
              <span>optiacademiq+</span>
              <p>Un plus pour la qualité de notre Université !</p>
            </h5>
          </div>
          <div className={`col-md-${rightCol}`}>{/*  */}</div>
        </div>
        {/*  */}
        <div className="row mb-2">
          {/* Nom, Slogan, Description */}
          <div className={`col-md-${leftCol} mb-2`}>
            <div className="card">
              <div className="card-body app-home-description">
                <p className="pt-1 pb-0">
                  <b>OptiAcadémiQ+</b> est une plateforme innovante développée par l’Université
                  Virtuelle du Burkina Faso (UV-BF), visant à optimiser les parcours académiques et
                  professionnels des étudiants. Elle permet d’identifier et d’analyser les
                  déterminants de la réussite et du décrochage universitaire, tout en offrant un
                  modèle prédictif d’accompagnement personnalisé adapté au contexte du Burkina Faso.
                </p>
                Le nom <b>OptiAcadémiQ+</b> découle d’une combinaison stratégique des notions
                suivantes :
                <ul className="pt-1 pb-0">
                  <li>
                    <b>Optimisation</b>
                  </li>
                  <li>
                    <b>Académique</b>
                  </li>
                  <li>
                    <b>IQ</b> (quotient intellectuel), rehaussée par le symbole <b>« + »</b>, qui
                    incarne la valeur ajoutée, l’excellence continue et un encadrement renforcé des
                    étudiants.
                  </li>
                </ul>
                <p className="pb-0">
                  Bien au-delà d’un simple outil technologique, cette plateforme porte une vision
                  audacieuse de la réussite étudiante. Elle s’appuie sur des technologies
                  intelligentes, des ressources pédagogiques ciblées et des approches
                  d’apprentissage adaptatives, afin de booster les performances, encourager
                  l’autonomie et accompagner durablement l’épanouissement académique et
                  professionnel des apprenants.
                </p>
              </div>
            </div>
          </div>
          {/* Connexion */}
          <div className={`col-md-${rightCol} mb-2`}>
            <div className="card">
              <div className="card-body app-home-connexion">
                <p className="card-title fw-bolder text-center">
                  <i className="fa fa-step-backward me-1" aria-hidden="true"></i>Procédure de
                  connexion<i className="fa fa-step-forward ms-1" aria-hidden="true"></i>
                </p>
                <div className="card-text">
                  <b className="me-1">1.</b>Cliquez sur le lien de connexion situé en bas du cadre
                </div>
                <div className="card-text mt-3">
                  <b className="me-1">2.</b>Cliquez sur le lien de connexion situé en haut à droite
                  dans la plateforme des services de Campus Faso
                  <div className="d-flex justify-content-center py-1">
                    <img className="rounded" src={AppHomeConnexion2} height={64} alt="" />
                  </div>
                </div>
                <div className="card-text mt-3">
                  <b className="me-1">3.</b>Cliquez sur le service OptiAcadémiQ+
                  <div className="d-flex justify-content-center py-1">
                    <img className="rounded" src={AppHomeConnexion3} height={64} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-grid mt-2">
              <a className="btn app-btn-primary" href="https://services.campusfaso.bf/#/services">
                <i className="fa fa-sign-in me-1" aria-hidden="true"></i>Se connecter
              </a>
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
