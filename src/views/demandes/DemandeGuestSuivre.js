import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppGuestHeader, AppGuestFooter } from '../../components'
import { CustomIndexAlert } from '../../components/CustomIndexAlert'
import { CustomRequired } from '../../components/CustomRequired'
import { guestGetItemBy } from '../../apiService'

import axios from 'axios'
import { colors, APIBASEURL } from '../../constants'
import 'jquery'
import $ from 'jquery'

const DemandeGuestSuivre = () => {
  let navigate = useNavigate()
  const formRef = useRef()
  const simFormRef = useRef()
  const btnSearchRef = useRef()
  const [demandes, setDemandes] = useState([])
  const [alert, setAlert] = useState()
  const [show, setShow] = useState(false)
  const [simFormShow, setSimFormShow] = useState(false)

  // Redirection vers la page d'accueil
  const handleGoToPage = (e) => {
	const name = e.target.name 
	if (name === "accueil") {
		navigate('/', { replace: true })
	}
	if (name === "soumettre") {
		navigate('/demandes/soumettre', { replace: true })
	}
	if (name === "declarer") {
    		//navigate('/', { replace: true })
	}
  }

  // Search
  const handleSubmit = async (e) => {
    	e.preventDefault()
    	const submitterName = e.nativeEvent.submitter.name 
    	// Récupération des données du formulaire 
	const formData = new FormData(formRef.current)
	const formValues = Object.fromEntries(formData)
	formValues.action = submitterName
    	// Search
      	// fetching data
      	await axios.post(APIBASEURL+'suivredemande', formValues)
	.then((response) => { 
		setSimFormShow(false)
      		if (response.data) { 
			if (response.data.success) {
				const r = response.data.data
        			setDemandes(r)
				setSimFormShow(r[0].simnumero && r[0].simnumero.includes('44219824') ? true : false) 
		  		setAlert({
					type: response.data.type, 
					message: response.data.message, 
					background: '#056409', 
					color: '#FFFFFF'
				})
			} else {
				setAlert({
					type: response.data.type, 
					message: response.data.message,
					background: '#970000', 
					color: '#FFFFFF' 
				})
			}
			setShow(response.data.success)
      		} else {
        		setDemandes()
		  	setAlert({
				type: 'danger', 
				message:'aucune correspondance trouvée !', 
				background: '#970000', 
				color: '#FFFFFF'
			})
			setShow(false)
      		}
		if (submitterName !== 'btn-search') {
			$('identifiant').val(formValues.identifiant)
			$('simnumero').val(formValues.simnumero)
			btnSearchRef.current.click()
		}
	})
	.catch((err) => {
		console.log(err.message)
		setAlert({
			type: 'warning', 
			message: 'Une erreur est survenue. Merci de réessayer ultérieurment !', 
			background: '#FCD116', 
			color: '#FFFFFF'
		})
		setShow(false)
	})
	.finally(() => {
      		console.log('Request completed')
	})
  }
	
  return (
    <div className="home-main-container min-vh-100">
      <AppGuestHeader />
      <div className="container pt-1">

	{/* other pages links */}
	<div className="d-flex justify-content-end align-items-center gap-3">
		<button type="button" className="btn" name="accueil" onClick={(e) => handleGoToPage(e)} style={{ backgroundColor: '#056409', color: '#FFFFFF' }}>
			<i className="fa fa-home me-1"></i>Accueil
		</button>
		<button type="button" className="btn" name="soumettre" onClick={(e) => handleGoToPage(e)} style={{ backgroundColor: '#056409', color: '#FFFFFF' }}>
			<i className="fa fa-paper-plane me-1"></i>Soumettre ma demande
		</button>
		<button type="button" className="btn d-none" name="declarer" onClick={(e) => handleGoToPage(e)} style={{ backgroundColor: '#056409', color: '#FFFFFF' }}>
			<i className="fa fa-info-circle me-1"></i>Déclarer une perte
		</button>
	</div>
	{/* */}

        <div className="row mt-5">
          <div className="col-md-8 offset-md-2">
            <form ref={formRef} className="" role="search" action="" method="POST" onSubmit={handleSubmit} encType="">
              {/* Alerts */}
              {alert && (
                <div className="alert py-1  mb-2" style={{ backgroundColor: alert.background, color: alert.color }}>
                    {alert.message}
                </div>
              )}
              {/* Search */}
              <div className="card">
                <div className="card-header py-1">
                  <div className="card-header-custom-title align-content-center">
                    <i className="fa fa-eye me-1" aria-hidden="true"></i>Suivre ma demande
                  </div>
                </div>
                <div className="card-body py-1">
                  {/* Identifiant */}
                  <div className="my-2">
                    <div className="d-flex">
                      <div className=" flex-grow-1">
                        <input className="form-control me-2" type="search" placeholder="Identifiant ou INE" aria-label="Search" id="identifiant" name="identifiant" required autoFocus />
                      </div>
                      <button type="submit" className="btn custom-btn-success ms-3 text-nowrap" name="btn-search" ref={btnSearchRef}>
                        <i className="fa fa-search me-1" aria-hidden="true"></i>Rechercher
                      </button>
                    </div>
                  </div>
                </div>
              </div>
	      {/* Result */}
              {show && (
                <div className="card mt-2 show-follow-result-card">
                  <div className="card-header">{demandes.length + ' demande(s) associée(s)'}</div>
                  <div className="card-body py-1">
                    <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 g-2">
                      {demandes.map((demande, index) => (
                        <div className="col" key={'demande-item-' + index}>
                          <div className="card h-100">
                            <div className="card-header py-1">{'# demande ' + (index + 1)}</div>
                            <div className="card-body py-1">
                              {/* Code */}
                              <div className="d-flex border-bottom">
                                <div className="show-follow-title">Code</div>
                                <div className="show-follow-value ms-auto">{demande.id}</div>
                              </div>
                              {/* Date */}
                              <div className="d-flex border-bottom">
                                <div className="show-follow-title">Date de la demande</div>
                                <div className="show-follow-value ms-auto">{demande.dmddate !== null ? new Date(demande.dmddate).toLocaleDateString() : ''}</div>
                              </div>
			      {/* Site désiré pour la remise */}
                              <div className="d-flex border-bottom">
                                <div className="show-follow-title">Site désiré pour la remise</div>
                                <div className="show-follow-value ms-auto">{demande.sitlibelle}</div>
                              </div>
                              <div className="d-flex border-bottom">
                               <div className="show-follow-title">Période, Horaires et Lieu de remise</div>
                               <div className="show-follow-value ms-auto">{demande.dmddateremise !== null ? new Date(demande.dmddateremise).toLocaleDateString() : ''}</div>
                              </div>
                              {/* Code de la SIM */}
                              <div className="d-flex border-bottom">
                                <div className="show-follow-title">Code de la SIM</div>
                                <div className="show-follow-value ms-auto">{demande.simcode}</div>
                              </div>
                              {/* Numéro d'abonné */}
                              <div className="d-flex border-bottom">
                                <div className="show-follow-title">Numéro d'abonné</div>
                                <div className="show-follow-value ms-auto text-danger">
					{ demande.sim_id !== null ? 
						demande.simnumero.includes('44219824') ? 
							demande.simnumero :
							'Composer *444#, puis valider' 
						: ''
					}
				</div>
                              </div>
			      {/* Date effective de remise  */}
			      <div className="d-flex border-bottom">
				<div className="show-follow-title">Date de remise</div>
				<div className="show-follow-value ms-auto">{demande.dmddateremiseeffective !== null ? new Date(demande.dmddateremiseeffective).toLocaleDateString() : ''}</div>
			      </div>
			      {/* */} 
			      {simFormShow && (
			      	<div className="mt-1 pt-1">
					<div className="flex-grow-1 gap-2">
						<input type="hidden" id="demande" name="demande" value={demande.id} />
						<input type="hidden" id="sim" name="sim" value={demande.sim_id} />
						<input type="search" className="form-control flex-grow-1" placeholder="numéro de la carte sim reçue" aria-label="search" id="simnumero" name="simnumero" />
						<div className="d-flex gap-2 justify-content-between mt-1">
							<button type="submit" className="btn btn-sm btn-secondary text-nowrap" id="btn-none-simcard" name="btn-none-simcard"> 
								Je n'ai pas reçu de carte sim
							</button>
							<button type="submit" className="btn btn-sm btn-secondary text-nowrap" id="btn-has-simcard" name="btn-has-simcard">
								J'ai la carte sim
							</button>
							<button type="submit" className="btn btn-sm btn-secondary text-nowrap" id="btn-update-simcard" name="btn-update-simcard">
								Mettre à jour le numéro
							</button>
						</div>
					</div>
			      	</div>
			      )}
                              {/*  */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/*  */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemandeGuestSuivre
