import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getData, getItem } from '../../apiService'
import Typerepondant from '../typerepondants/Typerepondant'
import { createItem } from '../../apiService'

import $ from 'jquery'

// import { isDate } from 'validator'

const Formulaire = () => {
  const navigate = useNavigate()
  const formRef = useRef()

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [questionnaire, setQuestionnaire] = useState([])
  const [thematiques, setThematiques] = useState([])
  const [dimensions, setDimensions] = useState([])
  const [show, setShow] = useState(false)
  const separator = ', '
  const [dates, setDates] = useState({ datedebut: null, datefin: null })
  const [alert, setAlert] = useState(null)

  const { questionnaireId } = useParams()

  const apiResource = {
    get: 'questionnaires',
    show: 'questionnaires/:id',
    create: 'questionnaires',
    update: 'questionnaires/:id',
    delete: 'questionnaires/:id',
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await getItem(apiResource.show.replace(':id', questionnaireId))
        if (response.success) {
          const q = response.data[0]
          setShow(true)
          setData(q)
          // Dates de début et de fin
          const dd = q.datedebut !== null ? new Date(q.datedebut) : null
          const df = q.datefin !== null ? new Date(q.datefin) : null
          setDates({
            datedebut: dd !== null ? dd.toLocaleDateString() : dd,
            datefin: df !== null ? df.toLocaleDateString() : df,
          })
          // Thématiques
          const themas = q.thematiques
          setThematiques(themas)
          // Dimensions
          const dimens = themas.map((thema) => thema.dimensions)
          setDimensions(dimens)
          // Variables
          const varias = dimens.map((dimen) => dimen.variables)
        }
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Fonctions
  const handleRadio = async (e) => {
    const { name, value } = e.target
    await getItem('questions/' + name).then((response) => {
      if (response.length === 1) {
        const resp = response[0]
        const ch = resp.child
        if (ch !== null) {
          const qs = $('input[name="' + ch.id + '"]')
          const qsType = qs.attr('type')
          // Déclencheur = valeur choisie ?
          if (value.trim() === resp.declencheur.trim()) {
            // text, radio, checkbox, select, textarea, ...
            if (qsType === 'text' || qsType === 'radio' || qsType === 'checkbox') {
              qs.prop('disabled', false)
              // qs.focus()
            } else {
              qs.prop('disabled', true)
            }
          } else {
            qs.prop('disabled', true)
          }
        }
      }
    })
  }

  //
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    // récupération des données du formulaire
    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData)
    // User ID
    formValues.repondant = 1
    //
    const id = e.target.getAttribute('questionnaire-id')
    console.log(formValues)
    // Use event.nativeEvent.submitter to identify which button was clicked
    const submitterName = e.nativeEvent.submitter.name
    if (submitterName === 'sauvegarder') {
      //
    } else if (submitterName === 'soumettre') {
      const response = await createItem('questionquestionnairerepondants', formValues)
      console.log(response)
      setAlert(response)
      // // Succès
      // if (response.status === 200) {
      //   setCreateAlert(response)
      //   createFormBtnResetRef.current.click()
      // }
      // // Echec
      // if (response.status === 201) {
      //   setCreateAlert(response.data)
      // }
    }
  }
  // ===

  // Datatable loading...
  if (isLoading) {
    return (
      <div className="text-center">
        <div
          className="spinner-border me-2"
          style={{ width: '3rem', height: '3rem' }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow"
          style={{ width: '3rem', height: '3rem', color: '#2e9ed5' }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) return <div>Error: {error.message}</div>

  if (data.length === 0) navigate('/questionnaires', { replace: true })

  return (
    <div className="container-fluid">
      <form
        ref={formRef}
        onSubmit={handleSubmitForm}
        method="POST"
        encType=""
        questionnaire-id={questionnaire.id}
      >
        {/* Questionnaire */}
        <div className="">
          {/* Infos */}
          <div className="card" style={{ backgroundColor: '#00407D' }}>
            <div className="card-body fw-bolder text-light">
              {'Questionnaire N°' + data.numero + ' du ' + dates.datedebut + ' au ' + dates.datefin}{' '}
            </div>
          </div>
          {/* Alerts & Buttons */}
          <div className="card mt-1" style={{ backgroundColor: '' }}>
            <div className="card-body fw-bolder text-light py-1 text-end d-flex align-items-center">
              {/* Alerts */}
              <div className="">
                {alert !== null ? (
                  <div className="">
                    {alert.success ? (
                      <div className="px-2 py-1 bg-success text-light">
                        <i className="fa fa-check me-1" aria-hidden="true"></i>
                        {alert.message}
                      </div>
                    ) : (
                      <div className="px-2 py-1 bg-danger text-light">
                        <i className="fa fa-exclamation-triangle me-1" aria-hidden="true"></i>
                        {alert.message}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
              {/* Buttons */}
              <div className="ms-auto d-flex">
                <button type="submit" className="btn btn-outline-primary me-3" name="sauvegarder">
                  <i className="fa fa-save me-1" aria-hidden="true"></i>Sauvegarder
                </button>
                <button type="submit" className="btn btn-outline-primary" name="soumettre">
                  <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>Soumettre
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contents */}
        <div className="" style={{ top: '' }}>
          <ol type="1" className="list-group list-group-numbered mt-2">
            {thematiques &&
              thematiques.map((thematique, index) => (
                <li className="list-group-item" key={'thematique-item-' + index}>
                  <strong>{thematique.libellelong}</strong>
                  <ol type="a" className="list-group list-group-numbered">
                    {/* Dimensions */}
                    {thematique.dimensions.map((dimension, index2) => (
                      <li className="list-group-item" key={'list-dimension-item-' + index2}>
                        <span className="fw-bolder" style={{ color: '#00407D' }}>
                          {dimension.libelle}
                        </span>
                        <ul className="">
                          {dimension.variables.map((variable) => (
                            <ul
                              type="none"
                              className="list-group mt-2"
                              key={'variable-item-' + variable.id}
                            >
                              {/* <strong>{variable.libelle}</strong> */}
                              {variable.questions.map((question, index4) => (
                                <li key={'list-question-item-' + question.id}>
                                  <div className="">
                                    <label htmlFor="" className="form-label fw-bolder mb-0">
                                      {question.libelle}
                                    </label>
                                    {/* Text */}
                                    {question.typemodalite === 'text' && (
                                      <div
                                        className="mb-2"
                                        key={'question-item-' + question.id + '-' + index4}
                                      >
                                        <input
                                          className="form-control"
                                          type="text"
                                          id={'question-item-' + question.id}
                                          name={question.id}
                                          disabled={question.parent_id !== null ? true : false}
                                        />
                                      </div>
                                    )}
                                    {/* Radio */}
                                    {question.typemodalite === 'unique' && (
                                      <div className="mb-2">
                                        {question.valeurmodalite !== null &&
                                          question.valeurmodalite.split(';').map((v, index5) => (
                                            <div
                                              className="form-check form-check-inline"
                                              key={'question-item-' + question.id + '-' + index5}
                                            >
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                id={'question-item-' + question.id + '-' + index5}
                                                name={question.id}
                                                value={v.trim()}
                                                onChange={handleRadio}
                                                disabled={
                                                  question.parent_id !== null ? true : false
                                                }
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor={
                                                  'question-item-' + question.id + '-' + index5
                                                }
                                              >
                                                {v}
                                              </label>
                                            </div>
                                          ))}
                                      </div>
                                    )}
                                    {/* Checkbox */}
                                    {question.typemodalite === 'multiple' && (
                                      <div className="mb-2">
                                        {question.valeurmodalite !== null &&
                                          question.valeurmodalite.split(';').map((v, index6) => (
                                            <div
                                              className="form-check form-check-inline"
                                              key={'question-item-' + question.id + '-' + index6}
                                            >
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={'question-item-' + question.id + '-' + index6}
                                                name={question.id}
                                                value={v.trim()}
                                                disabled={
                                                  question.parent_id !== null ? true : false
                                                }
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor={
                                                  'question-item-' + question.id + '-' + index6
                                                }
                                              >
                                                {v}
                                              </label>
                                            </div>
                                          ))}
                                      </div>
                                    )}
                                    {/*  */}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
          </ol>
        </div>
        {/*  */}
      </form>
    </div>
  )
}

export default Formulaire
