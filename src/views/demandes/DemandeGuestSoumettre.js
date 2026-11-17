import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppGuestHeader, AppGuestFooter } from '../../components'
import { CustomRequired } from '../../components/CustomRequired'
import { getItem, getItemBy, guestCreateItem } from '../../apiService'
import { CustomIndexAlert } from '../../components/CustomIndexAlert'
import { isEmpty } from 'validator'
import $ from 'jquery'

import axios from 'axios'
import { colors, APIBASEURL } from '../../constants'

  const DemandeGuestSoumettre = () => {
  let navigate = useNavigate()
  //const [data, setData] = useState({annee: [], site: [], sessiondemande: []})
  const [annee, setAnnee] = useState([])
  const [sites, setSites] = useState([])
  const [sessiondemande, setSessiondemande] = useState([])
  const formRef = useRef()
  const btnResetRef = useRef()
  const tableRef = useRef()
  const [alert, setAlert] = useState()
  const [dates, setDates] = useState({ datedebut: '', datefin: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() =>  {
    const controller = new AbortController()
    const signal = controller.signal 

    const fetchData = async () => {
      try {
        // 1. Lancement des requêtes en parallèle 
	// Exemple avec allSettled pour isoler les erreurs 
	const results = await Promise.allSettled([
	  fetch(APIBASEURL+'getactiveannee', {signal}).then((res) => res.json()), 
 	  fetch(APIBASEURL+'getactivesite', {signal}).then((res) => res.json()), 
	  fetch(APIBASEURL+'getactivesessiondemande', {signal}).then((res) => res.json()),
	])
        
	// 2. Récupération des réponses HTTP 
	const resAnnee = results[0].status === 'fulfilled' ? results[0].value : []
	const resSite = results[1].status === 'fulfilled' ? results[1].value : []
	const resSessiondemande = results[2].status === 'fulfilled' ? results[2].value[0] : []
	
	// 3. 
	const annee = resAnnee 
	const sites = resSite
	const sessiondemande = resSessiondemande	

	//setData({ annee, sites, sessiondemande })
	setAnnee(annee) 
	setSites(sites)
	setSessiondemande(resSessiondemande)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()  // Annulation automatique au démontage
  }, [])
 
//  if (loading) return <p>Chargement...</p>
//  if (error) return <p>Erreur : {error}</p>

  // Redirection vers la page d'accueil
  const handleHome = (e) => {
    navigate('/', { replace: true })
  }

  // Search & Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    // récupération des données du formulaire
    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData)
//	console.log('sed :'+formValues.sessiondemande)
    //formValues.sessiondemande = sessiondemande && sessiondemande.id
    await axios.post(APIBASEURL+'demandes/guestsubmit', formValues)
	.then((response) => { 
		if (response.data.success) {
			setAlert({
				type: 'success', 
				message: 'Votre demande a bien été soumise !', 
				background: '#056409', 
				color: '#FFFFFF'
			})
			btnResetRef.current.click()
		} else {
			setAlert({
				type: response.data.type, 
				message: response.data.message, 
				background: '#970000', 
				color: '#FFFFFF'
			})
		}
	})
	.catch((err) => {
		console.log(err.message)
		setAlert({
			type: 'danger', 
			message: "Votre demande n'a pu être soumise. Merci de réessayer ultérieurement !", 
			background: '#FCD116', 
			color: '#FFFFFF'
		})
	})
	.finally(() => {
		console.log('Request completed')
	})
  }

  const handleGoToPage = (e) => {
	const name = event.target.name
	if (name === "accueil") {
		navigate('/', { replace: true })
	}
	if (name === "suivre") {
		navigate('/demandes/suivre', { replace: true })
	}
	if (name === "declarer") {
		//
	}
  }

  return (
    <div className="demandeGuestSoumettre min-vh-100">
      <AppGuestHeader />
      <div className="container pt-1">
	
	{/* other pages links */}
	<div className="d-flex gap-3 justify-content-end align-items-center">
		<button type="button" className="btn" name="accueil" onClick={(e) => handleGoToPage(e)} style={{ backgroundColor: '#056409', color: '#FFFFFF' }}>
			<i className="fa fa-home me-1"></i>Accueil
		</button>
		<button type="button" className="btn" name="suivre" onClick={(e) => handleGoToPage(e)} style={{ backgroundColor: '#056409', color: '#FFFFFF' }}>
			<i className="fa fa-eye me-1"></i>Suivre ma demande
		</button>
		<button type="button" className="btn d-none" name="declarer" onClick={(e) => handleGoToPage(e)} style={{ backgroundColor: '#056409', color: '#FFFFFF' }}>
			<i className="fa fa-info-circle me-1"></i>Déclarer une perte
		</button>
	</div>
	{/* */}

        <div className="row mt-5">
          <div className="col-md-8 offset-md-2">
            {sessiondemande ? (
              <form ref={formRef} onSubmit={handleSubmit} method="POST" encType="">
		<input type="hidden" name="sessiondemande" id="sessiondemande" value={sessiondemande.id} />
                {/* Notifications & Alerts */}
                {/* Notifications */}
		{sessiondemande && (
		<>
                <div className="card mb-1 sessionInfo">
                  <div className="card-body py-1 fw-bolder text-center">
                    <i className="fa fa-exclamation-circle me-2" aria-hidden="true"></i>
                    {'La session est ouverte du ' +
                      (new Date(sessiondemande.seddatedebut).toLocaleDateString()) +
                      ' au ' +
                      (new Date(sessiondemande.seddatefin).toLocaleDateString()) +
                      ' inclus !'}
                  </div>
                </div>
 		<div className="card border-0 py-1 mb-3">
			<div className="card-body border-0 py-1 fw-bold">
				<i className="fa fa-info-circle me-2"></i>Merci de ne pas tenter de soumettre une autre demande alors que vous êtes détenteur d'une carte sim ou avez une demande en cours !
			</div>
		</div>
		</>
		)}

		{/* Invite à suivre la demande */}
            	{/*<div className="card bg-light mb-1" style={{ backgroundColor: '#970000', border: '5px solid #970000' }}>
              	  <div className="card-body py-1 text-justify">
                      Des dysfonctionnements peuvent survenir lors de la soumission. Au cas où vous ne parvenez pas à soumettre votre demande, merci de les signaler aux services compétents !
	              {/* <div className="">Au cas échéant, merci de renseigner le formulaire disponible au lien <a href="https://cloud.uv.bf/index.php/apps/forms/s/rHqCXrzFKntwPf3nwewgfwqJ">m'aider à soumettre !</a></div> * /} 
                  </div>
                </div>*/}

                {/* Alerts */}
                {alert && (
                  <div className="alert py-1 mb-1"  style={{ backgroundColor: alert.background, color: alert.color }}>
                      {alert.message}
                  </div>
                )}

                {/* Submit */}
                <div className="card">
                  <div className="card-header py-1">
                    <div className="card-header-custom-title align-content-start">
                      <i className="fa fa-edit me-1" aria-hidden="true"></i>Soumettre ma demande
                    </div>
                  </div>
                  <div className="card-body py-1">
                    {/* INE */}
                    <div className="my-2">
                      <label htmlFor="identifiant" className="form-label mb-0 fw-bolder">INE</label>
                      <div className="">
                        <input type="text" className="form-control" id="identifiant" name="identifiant" required autoFocus />
                      </div>
                    </div>

                    {/* Site désiré pour la remise */}
                    <div className="my-2">
                      <label htmlFor="site" className="form-label mb-0 fw-bolder">Site désiré pour la remise</label>
                      <div className="">
                        <select className="form-select" aria-label="Default select example" id="site" name="site" required>
                          <option value="">Sélectionner ici !</option>
                          {sites.map((site, index) => (
                            <option value={site.id} key={'site-item-' + index}>
                              {index + 1 + '. ' + site.sitlibelle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/*  */}
                  </div>
                  <div className="card-footer py-1 d-flex align-content-center ">
                    <button ref={btnResetRef} type="reset" className="btn d-none" name="btn-reset">Annuler</button>
                    <button type="submit" className="btn custom-btn-success ms-auto" name="btn-submit">
                      <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>Soumettre
                    </button>
                  </div>
                </div>
                {/*  */}
              </form>
            ) : (
              <div className="card">
                <div className="card-header py-1 d-flex justify-content-center align-content-center">
                  <div className="card-header-custom-title align-content-start">
                    <i className="fa fa-edit me-1" aria-hidden="true"></i>Soumettre ma demande
                  </div>
                </div>
                <div className="card-body text-center sorryBecauseNone">
                  <i className="fa fa-exclamation-triangle me-3" aria-hidden="true"></i>Désolé,
                  aucune de session de demande en cours !
                </div>
	      </div>
	    )}
	  </div>
	{/* */}
	</div>
      </div>
    </div>
  )
}

export default DemandeGuestSoumettre
