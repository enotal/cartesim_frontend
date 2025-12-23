import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppGuestHeader, AppGuestFooter } from './components/index'
import { CampusFasoLoginLink, CampusFasoOptiacademiqplusLink } from './assets/images/images'

// v23122025
import KeycloakService from './KeycloakService'
import { useState } from 'react'
//

const Home = () => {
  const navigate = useNavigate()
  // v23122025
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)

  // Vérification SSO Keycloak
  useEffect(() => {
    KeycloakService.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    })
      .then((authenticated) => {
        console.log('User authenticated:', authenticated)
        setIsAuthenticated(authenticated)

        if (authenticated) {
          const accessToken = KeycloakService.getToken()
          setToken(accessToken)
          //
          console.log('Access token:', accessToken)
        }
      })
      .catch((err) => {
        console.error('Keycloak init error', err)
      })
  }, [])

  // Nouveau useEffect pour suivre l'état du token
  useEffect(() => {
    if (token) {
      console.log('Token actuel stocké dans state:', token)
    }
  }, [token])

  // Stockage + redirection
  useEffect(() => {
    if (isAuthenticated && token) {
      localStorage.setItem(
        'optiacademiqplus_auth',
        JSON.stringify({
          isAuthenticated: true,
          token: token,
        }),
      )
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, token, navigate])

  //

  // Redirection vers Campus Faso
  const handleLogin = () => {
    window.location.href = 'https://services.campusfaso.bf/#/services'
    // navigate('/dashboard', { replace: true })
  }

  return (
    <div className="home-main-container min-vh-100">
      <AppGuestHeader />
      <div className="container pb-5 overflow-y-auto">
        {/*  */}

        {/* Title */}
        <div className="">
          <h5 className="home-title mt-4">
            <span>optiacademiq+</span>
            <p>Un plus pour la qualité de notre Université !</p>
          </h5>
        </div>
        {/*  */}

        {/* Main frame */}
        <div className="card border-0">
          <div className="card-body row">
            {/* Description */}
            <div className="col-md-8 pe-5" style={{ fontSize: '1.1em' }}>
              <p className="pt-1 pb-0">
                <b>OptiAcadémiQ+</b> est une plateforme innovante développée par l’Université
                Virtuelle du Burkina Faso (UV-BF), visant à optimiser les parcours académiques et
                professionnels des étudiants. Elle permet d’identifier et d’analyser les
                déterminants de la réussite et du décrochage universitaire, tout en offrant un
                modèle prédictif d’accompagnement personnalisé adapté au contexte du Burkina Faso.
              </p>
              <p>
                Le nom <b>OptiAcadémiQ+</b> découle d’une combinaison stratégique des notions{' '}
                <b>Optimisation</b>, <b>Académique</b> <b>IQ</b> (quotient intellectuel), rehaussée
                par le symbole <b>« + »</b>, qui incarne la valeur ajoutée, l’excellence continue et
                un encadrement renforcé des étudiants.
              </p>
              <p className="pb-0">
                Bien au-delà d’un simple outil technologique, cette plateforme porte une vision
                audacieuse de la réussite étudiante. Elle s’appuie sur des technologies
                intelligentes, des ressources pédagogiques ciblées et des approches d’apprentissage
                adaptatives, afin de booster les performances, encourager l’autonomie et accompagner
                durablement l’épanouissement académique et professionnel des apprenants.
              </p>
            </div>
            {/*  */}
            {/* Authentication */}
            <div className="col-md-4">
              <p className="card-title fw-bolder text-center fs-5" style={{ color: '#17376e' }}>
                <i className="fa fa-step-backward me-1" aria-hidden="true"></i>Procédure de
                connexion<i className="fa fa-step-forward ms-1" aria-hidden="true"></i>
              </p>
              <ol>
                <li className="mt-3">Cliquez sur le lien de connexion situé en bas du cadre</li>
                <li className="mt-3">
                  Cliquez sur le lien de connexion situé en haut à droite dans la plateforme des
                  services de Campus Faso
                  <div className="text-center">
                    <img className="rounded my-1" src={CampusFasoLoginLink} height={64} alt="" />
                  </div>
                </li>
                <li className="mt-3">
                  Cliquez sur le service OptiAcadémiQ+
                  <div className="text-center">
                    <img
                      className="rounded my-1"
                      src={CampusFasoOptiacademiqplusLink}
                      height={64}
                      alt=""
                    />
                  </div>
                </li>
              </ol>
              <div className="d-grid mt-3">
                <button className="btn app-btn-primary" onClick={handleLogin}>
                  <i className="fa fa-sign-in me-1" aria-hidden="true"></i>Se connecter
                </button>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
      </div>
      <AppGuestFooter />
    </div>
  )
}

export default Home
