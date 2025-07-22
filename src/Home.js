import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './assets/brand/uvbf-login.png'
import { AppHeader, AppFooter } from './components/index'

const Home = () => {
  const formRef = useRef()
  const loginFormBtnLaunchRef = useRef()
  const loginFormBtnCancelRef = useRef()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevents page reload
    localStorage.setItem(
      'optiacademiqplus_auth',
      JSON.stringify({
        tokenType: 'Bearer',
        tokenValue: 'auth',
        user: { username: 'admin@admin.com' },
      }),
    )
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="home-main-container">
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img className="home-image" src={Logo} alt="uvbf-logo" />
                    <h5 className="home-title mt-4">
                      <span>optiacademiq+</span>
                      <p>Un plus pour la qualité de notre Université !</p>
                    </h5>
                  </div>
                  <div className="card p-3">
                    <div className="card-body pb-0">
                      <div className="p-0">
                        <p>
                          <b>OptiAcadémiQ+</b> est une plateforme innovante développée par
                          l’Université Virtuelle du Burkina Faso (UV-BF), visant à optimiser les
                          parcours académiques et professionnels des étudiants. Elle permet
                          d’identifier et d’analyser les déterminants de la réussite et du
                          décrochage universitaire, tout en offrant un modèle prédictif
                          d’accompagnement personnalisé adapté au contexte du Burkina Faso.
                        </p>
                        <p>
                          Le nom OptiAcadémiQ+ découle d’une combinaison stratégique des notions{' '}
                          <b>« Optimisation »</b>,<b>« Académique »</b> et <b>« IQ »</b> (quotient
                          intellectuel), rehaussée par le symbole <b>« + »</b>, qui incarne la
                          valeur ajoutée, l’excellence continue et un encadrement renforcé des
                          étudiants.
                        </p>
                        <p>
                          Bien au-delà d’un simple outil technologique, cette plateforme porte une
                          vision audacieuse de la réussite étudiante. Elle s’appuie sur des
                          technologies intelligentes, des ressources pédagogiques ciblées et des
                          approches d’apprentissage adaptatives, afin de booster les performances,
                          encourager l’autonomie et accompagner durablement l’épanouissement
                          académique et professionnel des apprenants.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid gap-1 mt-2">
                    <button className="btn btn-primary">Se connecter</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Home
