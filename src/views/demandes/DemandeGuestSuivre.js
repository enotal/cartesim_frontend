import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppGuestHeader, AppGuestFooter } from '../../components'
import { CustomIndexAlert } from '../../components/CustomIndexAlert'
import { CustomRequired } from '../../components/CustomRequired'
import { getItemBy } from '../../apiService'
import { colors } from '../../constants'

const DemandeGuestSuivre = () => {
  const navigate = useNavigate()
  const formRef = useRef()
  const [demande, setDemande] = useState(null)
  const [date, setDate] = useState(null)
  const [alert, setAlert] = useState(null)

  // Redirection vers la page d'accueil
  const handleHome = (e) => {
    navigate('/', { replace: true })
  }

  // Cancel
  const handleCancel = () => {
    $('#code').val('')
    setAlert(null)
    setDemande(null)
  }

  // Search
  const handleSubmit = async (e) => {
    e.preventDefault()
    const submitterName = e.nativeEvent.submitter.name
    // Search
    if (submitterName === 'btn-search') {
      // récupération des données du formulaire
      const formData = new FormData(formRef.current)
      const formValues = Object.fromEntries(formData)
      const search = e.target.getAttribute('data-search')
      formValues.search = search
      const response = await getItemBy('demandes/showby', formValues)
      if (response.success) {
        setDemande(response.data)
        const d = response.data !== null ? new Date(response.data.dmddate) : null
        setDate(d !== null ? d.toLocaleDateString() : '')
      } else {
        setDemande(null)
      }
      setAlert(response)
    }
  }

  return (
    <div className="home-main-container min-vh-100">
      <AppGuestHeader />
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <form
              ref={formRef}
              className=""
              role="search"
              action=""
              method="GET"
              onSubmit={handleSubmit}
              encType=""
              data-search="code"
            >
              {/* Alerts */}
              {alert && (
                <div
                  className="card mb-2"
                  style={{
                    backgroundColor: colors[alert.type],
                    borderColor: colors[alert.type],
                  }}
                >
                  <div className="card-body py-1">
                    <CustomIndexAlert alert={alert} />
                  </div>
                </div>
              )}
              {/* Search */}
              <div className="card">
                <div className="card-header py-1 d-flex justify-content-center align-content-center">
                  <div className="card-header-custom-title align-content-center">
                    <i className="fa fa-eye me-1" aria-hidden="true"></i>Suivre ma demande
                  </div>
                  <button
                    type="button"
                    className="btn ms-auto custom-btn-secondary"
                    onClick={handleHome}
                  >
                    <i className="fa fa-home me-1" aria-hidden="true"></i>Page d'accueil
                  </button>
                </div>
                <div className="card-body pt-1">
                  <CustomRequired tagP={true} />
                  {/* Code */}
                  <div className="my-2">
                    <label htmlFor="code" className="form-label mb-0 fw-bolder">
                      Code de la demande
                      <CustomRequired />
                    </label>
                    <div className="d-flex">
                      <div className=" flex-grow-1">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Code de la demande"
                          aria-label="Search"
                          id="code"
                          name="code"
                          autoFocus
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn custom-btn-success ms-3"
                        name="btn-search"
                      >
                        <i className="fa fa-search me-1" aria-hidden="true"></i>Rechercher
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Result */}
              {demande && (
                <div className="card mt-2">
                  <div className="card-body pb-0">
                    {demande.sim_id === null && (
                      <div
                        className="card mb-2"
                        style={{
                          backgroundColor: colors['success'],
                          borderColor: colors['success'],
                          fontSize: '1em',
                        }}
                      >
                        <div className="card-body text-light py-1 d-flex justify-content-center align-content-center">
                          <i className="fa fa-check me-1" aria-hidden="true"></i>Votre demande est
                          en cours de traitement. Merci de vérifier ultérieurment !
                        </div>
                      </div>
                    )}
                    <div className="table-responsive-sm">
                      <table className="table table-sm table-striped">
                        <tbody>
                          {/* Code */}
                          <tr>
                            <th scope="row" className="show-table-title">
                              Code
                            </th>
                            <td className="show-table-value">{demande.dmdcode}</td>
                          </tr>
                          {/* Date */}
                          <tr>
                            <th scope="row" className="show-table-title">
                              Date de la demande
                            </th>
                            <td className="show-table-value">{date}</td>
                          </tr>
                          {/* Code Sim */}
                          <tr>
                            <th scope="row" className="show-table-title">
                              Code SIM
                            </th>
                            <td className="show-table-value">
                              {demande.sim && demande.sim.simcode}
                            </td>
                          </tr>
                          {/* Site */}
                          <tr>
                            <th scope="row" className="show-table-title">
                              Site de la remise
                            </th>
                            <td className="show-table-value">
                              {demande.site && demande.site.sitlibelle}
                            </td>
                          </tr>
                          {/* Session remise */}
                          <tr>
                            <th scope="row" className="show-table-title">
                              Session de remise
                            </th>
                            <td className="show-table-value">
                              {demande.session &&
                                'du ' +
                                  demande.sessionremise.serdatedebut +
                                  ' au ' +
                                  demande.sessionremise.datefin}
                            </td>
                          </tr>
                          {/*  */}
                        </tbody>
                      </table>
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
