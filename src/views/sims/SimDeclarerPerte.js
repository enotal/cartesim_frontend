import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppGuestHeader, AppGuestFooter } from '../../components'
import { CustomRequired } from '../../components/CustomRequired'
import { CustomIndexAlert } from '../../components/CustomIndexAlert'
import { getItemBy, updateItem } from '../../apiService'
import $ from 'jquery'
import { colors } from '../../constants'

const SimDeclarerPerte = () => {
  const navigate = useNavigate()
  const formRef = useRef()
  const [demande, setDemande] = useState(null)
  const [sim, setSim] = useState(null)
  const [date, setDate] = useState(null)
  const [alert, setAlert] = useState(null)

  // Redirection vers la page d'accueil
  const handleHome = (e) => {
    navigate('/', { replace: true })
  }

  // Search & Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const submitterName = e.nativeEvent.submitter.name
    // récupération des données du formulaire
    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData)
    // Search
    if (submitterName === 'btn-search') {
      const response = await getItemBy('demandes/simdeclarerperte', formValues)
      if (response.success) {
        if (response.data) {
          setDemande(response.data)
          setSim(response.data.sim_id)
          const d = response.data !== null ? new Date(response.data.dmddate) : null
          setDate(d !== null ? d.toLocaleDateString() : '')
        }
      } else {
        setDemande(null)
      }
      setAlert(response)
    }
    // Submit
    if (submitterName === 'btn-submit') {
      const switchcase = e.target.getAttribute('data-switchcase')
      formValues.sim = sim && sim.id
      const response = await updateItem('sims.declarer.perte/'.replace(':id', sim), formValues)
      // Succès
      if (response.status === 200) {
        setAlert(response.data)
        setDemande(null)
      }
      // Echec
      if (response.status === 201) {
        setAlert(response.data)
        setDemande(null)
      }
    }
  }

  return (
    <div className="home-main-container min-vh-100">
      <AppGuestHeader />
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Search & Submit form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              method="POST"
              encType=""
              data-switchcase="declaresimlost"
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
                    <i className="fa fa-question-circle me-1" aria-hidden="true"></i>Déclarer une
                    perte
                  </div>
                  <button
                    type="button"
                    className="btn ms-auto custom-btn-secondary"
                    onClick={handleHome}
                  >
                    <i className="fa fa-home me-1" aria-hidden="true"></i>Page d'accueil
                  </button>
                </div>
                <div className="card-body py-1">
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
                          type="text"
                          className="form-control"
                          id="code"
                          name="code"
                          required
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
              {/* Submit */}
              {demande && (
                <div className="card mt-2">
                  <div className="card-body">
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
                          {/*  */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer py-1 text-end">
                    <button type="submit" className="btn custom-btn-success" name="btn-submit">
                      <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>Soumettre
                    </button>
                  </div>
                </div>
              )}
              {/*  */}
            </form>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimDeclarerPerte
