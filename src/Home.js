import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppGuestHeader, AppGuestFooter } from './components/index'
import { CampusFasoLoginLink, CampusFasoOptiacademiqplusLink } from './assets/images/images'

// v23122025
import KeycloakService from './KeycloakService'
import { useState } from 'react'
//

import { getData, getItemBy } from './apiService'
import { CustomRequired } from './components/CustomRequired'
import { CustomCreateAlert } from './components/CustomCreateAlert'

const Home = () => {
  const quizFormRef = useRef()
  const quizFormBtnLaunchRef = useRef()
  const quizFormBtnResetRef = useRef()
  const quizFormBtnCloseRef = useRef()

  const navigate = useNavigate()

  // v23122025
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)

  const [questionnaire, setQuestionnaire] = useState([])
  const [data, setData] = useState([])
  const [createAlert, setCreateAlert] = useState(null)

  const getQuestionnaire = async () => {
    await getData('questionnaires')
      .then((response) => {
        setData(response)
        setQuestionnaire(response.filter((item) => item.estactive === 'oui'))
      })
      .catch((err) => console.log(err))
  }

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

    getQuestionnaire()
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
    // window.location.href = 'https://services.campusfaso.bf/#/services'
    navigate('/dashboard', { replace: true })
  }

  // Redirection vers le questionnaire
  const handleQuiz = () => {
    // navigate('/quiz/3', { replace: true })
    if (quizFormRef.current && quizFormBtnLaunchRef.current) {
      setCreateAlert(null)
      quizFormBtnResetRef.current.click()
      quizFormBtnLaunchRef.current.click()
    }
  }

  const handleCancelQuizForm = () => {
    setCreateAlert(null)
    quizFormBtnResetRef.current.click()
    quizFormBtnCloseRef.current.click()
  }

  const handleSubmitQuizForm = async (e) => {
    e.preventDefault()
    // Récupération des données du formulaire
    const formData = new FormData(quizFormRef.current)
    const formValues = Object.fromEntries(formData)
    // Soumission
    const response = await getItemBy('repondants/quiz', formValues)
    if (response.success) {
      handleCancelQuizForm()  
      navigate('/quiz/' + response.data[0].id, { replace: true })
    }
    setCreateAlert(response)
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
            {/* <p>Un plus pour la qualité de notre Université !</p> */}
            <p>Une plateforme innovante pour la réussite !</p>
          </h5>
        </div>
        {/*  */}

        {/* Main frame */}
        <div className="card border-0">
          <div className="card-body row">
            {/* Description */}
            <div className="col-md-8 pe-5" style={{ fontSize: '1em' }}>
              <p className="pt-1 pb-0">
                <b>OptiAcadémiQ+</b> est une plateforme numérique innovante conçue et développée par
                l’Université Virtuelle du Burkina Faso (UV-BF). Déjà déployée sur la plateforme
                intégrée Campus Faso, elle s’inscrit dans une dynamique de transformation digitale
                et de pilotage intelligent de la réussite universitaire. Elle a pour vocation
                d'analyser en profondeur les déterminants de la réussite et du décrochage
                universitaire au sein de l'UV-BF, en vue de bâtir un modèle prédictif
                d'accompagnement personnalisé des étudiants.
              </p>
              <p>
                Elle génère également des recommandations fondées sur des données probantes afin
                d’appuyer la prise de décision stratégique et de renforcer la gouvernance
                universitaire. L’objectif global est d’optimiser les parcours académiques et
                professionnels des apprenants, de favoriser la réussite, de prévenir le décrochage
                et d’améliorer la performance institutionnelle.
              </p>
              <p>
                Bien plus qu'un simple outil technologique, OptiAcadémiQ+ incarne une vision
                audacieuse de la réussite étudiante. Elle mobilise des technologies intelligentes,
                des ressources pédagogiques ciblées et des approches d'apprentissage adaptatives
                pour stimuler les performances académiques, encourager l'autonomie et la motivation,
                et accompagner durablement l'épanouissement intellectuel et professionnel des
                apprenants.
              </p>
              <p className="pb-0">
                Le nom <b>OptiAcadémiQ+</b> résulte d’une combinaison stratégique des trois concepts
                clés <b>Opti</b> pour <i>Optimisation</i>, <b>AcadémiQ</b> pour <i>Académique</i> et{' '}
                <i>Intellectuel</i> <i>(IQ)</i> le signe <b>« + »</b>, symbole de la{' '}
                <i>
                  valeur ajoutée, de l'exercice continu et d'un encadrement pédagogique renforcé.
                </i>
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
              <div className="d-grid gap-3 mt-4">
                <button className="btn app-btn-primary" onClick={handleLogin}>
                  <i className="fa fa-sign-in me-1" aria-hidden="true"></i>Se connecter
                </button>
                {questionnaire.length > 0 && (
                  <button className="btn app-btn-primary" onClick={handleQuiz}>
                    <i className="fa fa-tasks me-1" aria-hidden="true"></i>Répondre à un
                    questionnaire
                  </button>
                )}
              </div>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}

        {/* Import form */}
        <form
          ref={quizFormRef}
          onSubmit={handleSubmitQuizForm}
          method="POST"
          encType=""
          form-action="quiz"
          target-id=""
        >
          <button
            ref={quizFormBtnLaunchRef}
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#quizModal"
          >
            <i className="fa fa-plus me-2" aria-hidden="true"></i>Launch demo static modal
          </button>
          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="quizModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="quizModal"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header py-1 bg-primary">
                  <h5 className="modal-title  fw-bold text-light" id="quizModalLabel">
                    <i className="fa fa-file-import me-1" aria-hidden="true"></i>Répondre à un
                    questionnaire
                  </h5>
                  <button
                    ref={quizFormBtnCloseRef}
                    type="button"
                    className="btn-close d-none"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex pb-1">
                    <CustomRequired tagP={true} />
                    <CustomCreateAlert alert={createAlert} />
                  </div>

                  <div className="card">
                    <div className="card-body">
                      {/* Identifiant = {ine, matricule, etc.} */}
                      <div className="mb-2">
                        <label htmlFor="identifiant" className="form-label mb-0">
                          Identifiant (INE, Matricule, etc.)
                          <CustomRequired />
                        </label>
                        <div className="">
                          <input
                            type="text"
                            className="form-control"
                            id="identifiant"
                            name="identifiant"
                            required
                            autoFocus
                          />
                        </div>
                      </div>
                      {/* Email */}
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
                            required
                          />
                        </div>
                      </div>
                      {/*  */}
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 py-0">
                  <button type="submit" className="btn btn-primary text-white quizModalBtnSave">
                    <i className="fa fa-check me-1" aria-hidden="true"></i>
                    Valider
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary quizModalBtnCancel"
                    data-bs-dismiss="modal"
                    onClick={handleCancelQuizForm}
                  >
                    <i className="fa fa-close me-1" aria-hidden="true"></i>Annuler
                  </button>
                  <button
                    ref={quizFormBtnResetRef}
                    type="reset"
                    className="btn btn-secondary d-none"
                  >
                    <i className="fa fa-refresh me-1" aria-hidden="true"></i>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/*  */}
      </div>
      <AppGuestFooter />
    </div>
  )
}

export default Home
