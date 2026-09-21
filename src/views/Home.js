import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { cookieItems } from './constants'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  const formRef = useRef()
  const [alert, setAlert] = useState(null)

  // Redirection vers soumettre, suivre et déclarer
  const handleNavigate = (e) => {
    const name = e.target.name
    if (name) {
      navigate('/' + name, { replace: true })
    }
    return
  }

  // Connexion
  /*  const handleSubmit = async (e) => {
    e.preventDefault()
    // Récupération des données du formulaire
    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData)
    // Soumission
    const response = await login(formValues)
    if (response.success) {
      localStorage.setItem(cookieItems[0], JSON.stringify(response.data))
      navigate('/dashboard', { replace: true })
    } else {
      if (response.status !== 500) {
        setAlert(response)
      } else {
        setAlert({
          type: 'warning',
          message:
            'Un problème est survenu. Merci de réessayer ultérieurement ! Si le problème persiste, merci de contacter les services compétents !',
        })
      }
    }
  }*/

  return (
    <div className="main-container">
      <div className="top-menu">
        {/* <Link to="/" className="btn btn-sm top-menu-btn-home" title="Accueil">
          <i className="fa fa-arrow-left me-1" aria-hidden="true"></i>Accueil
        </Link> */}
        <Link to="/about" className="btn btn-sm top-menu-btn-about me-3" title="A propos">
          <i className="fa fa-info-circle me-1" aria-hidden="true"></i>A propos
        </Link>
        <Link to="/login" className="btn btn-sm top-menu-btn-signin" title="Connexion">
          <i className="fa fa-lock me-1" aria-hidden="true"></i>Se connecter
        </Link>
      </div>
      <div className="page-content">
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              <b>L'Université Virtuelle du Burkina Faso (UV-BF)</b> met à la disposition des
              entreprises, des projets de développement, des ONG et des institutions publiques ses
              infrastructures modernes pour l'organisation de divers événements professionnels.
            </p>
            {/* Types d'infrastructures et salles disponibles */}
            <div className="card-title">
              <i className="fa fa-building me-1" aria-hidden="true"></i>Types d'infrastructures et
              salles disponibles
            </div>
            <div className="card-text">
              Les salles de l'UV-BF offrent des commodités adaptées aux exigences numériques
              actuelles :
            </div>
            <ul className="card-text">
              <li className="">
                <span className="list-item-title">salles de visioconférence et de réunion</span>
                équipées de technologies de communication avancées pour des réunions hybrides ou à
                distance ;
              </li>
              <li className="">
                <span className="list-item-title">
                  salles de formation informatique/Laboratoires d'innovation
                </span>
                dotées d'une connectivité Internet haut débit et d'infrastructures informatiques
                prêtes à l'emploi ;
              </li>
              <li className="">
                <span className="list-item-title">salles polyvalentes</span>adaptées pour des
                séminaires, des ateliers de travail, des conférences ou des sessions de formation
                continue.
              </li>
            </ul>
            {/* Services et prestations connexes inclus ou sur option */}
            <div className="card-title">
              <i className="fa fa-gears me-1" aria-hidden="true"></i>Services et prestations
              connexes inclus ou sur option
            </div>
            <div className="card-text">
              En marge de la simple mise à disposition de l'espace, la location à l'UV-BF peut
              inclure ou mobiliser des prestataires pour :
            </div>
            <ul className="card-text">
              <li className="">une connexion Internet haut débit dédiée ;</li>
              <li className="">
                du matériel de projection (vidéoprojecteurs, écrans) et de la sonorisation complète
                ;
              </li>
              <li className="">
                la logistique événementielle de base (disposition des tables et chaises) ;
              </li>
              <li className="">
                l'assistance technique d'un personnel informatique pour veiller au bon déroulement
                des sessions connectées.
              </li>
            </ul>
          </div>
        </div>

        <div className="about-buttons">
          <button
            type="button"
            className="btn btn-sm"
            name="soumettredemande"
            onClick={(e) => handleNavigate(e)}
          >
            <i className="fa fa-registered" aria-hidden="true"></i>Faire ma demande
          </button>
          <button
            type="button"
            className="btn btn-sm"
            name="suivredemande"
            onClick={(e) => handleNavigate(e)}
          >
            <i className="fa fa-eye" aria-hidden="true"></i>Suivre ma demande
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
