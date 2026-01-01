import React, { useEffect, useRef, useState } from 'react'
import { getData, getItem } from '../../apiService'
import Typerepondant from '../typerepondants/Typerepondant'
import { createItem } from '../../apiService'

// import { isDate } from 'validator'

const Formulaire = () => {
  const formRef = useRef()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [questionnaire, setQuestionnaire] = useState([])
  const [thematiques, setThematiques] = useState([])
  const [typerepondants, setTyperepondants] = useState([])
  const [dimensions, setDimensions] = useState([])
  const [show, setShow] = useState(false)
  const separator = ', '
  const [dates, setDates] = useState({ datedebut: null, datefin: null })
  const [alert, setAlert] = useState(null)

  const apiResource = {
    get: 'questionnaires',
    show: 'questionnaires/:id',
    create: 'questionnaires',
    update: 'questionnaires/:id',
    delete: 'questionnaires/:id',
  }

  const fetchGet = async () => {
    try {
      const response = await getData(apiResource.get)
      setData(response)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGet()
  }, [])

  // Save or Send form values
  const handleQuestionnaireChange = async (e) => {
    await getItem(apiResource.show.replace(':id', e.target.value)).then((response) => {
      if (response.id) {
        setShow(true)
        setQuestionnaire(response)
        const dd = response.datedebut !== null ? new Date(response.datedebut) : null
        const df = response.datefin !== null ? new Date(response.datefin) : null
        setDates({
          datedebut: dd !== null ? dd.toLocaleDateString() : dd,
          datefin: df !== null ? df.toLocaleDateString() : df,
        })
        // Thématiques
        const thms = response.thematiques
        setThematiques(thms)
        // Types repondants
        const trps = thms.map((thm) => thm.typerepondants)
        setTyperepondants(trps)
        // Dimensions
        const dms = thms.map((thm) => thm.dimensions)
        setDimensions(dms)
        // Questions
      } else {
        setQuestionnaire([])
        setDates({ datedebut: null, datefin: null })
        setThematiques([])
        setTyperepondants([])
        setDimensions([])
        setShow(false)
      }
    })
  }

  // Fonctions
  const handleRadio = async (e) => {
    const { name, value } = e.target
    await getItem('questions/' + name).then(response => {
      if (response.length === 1){
        console.log(response[0])
      }
    })
    console.log(name + ' : ' + value)
    // console.log(response)
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
  if (loading) {
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
          <div className="card">
            <div className="card-body d-grid gap-1">
              {/* Buttons  & Alerts */}
              <div className="d-flex mb-2">
                <button
                  type="submit"
                  className="btn custom-btn formulaire-btn-save me-3"
                  name="sauvegarder"
                  disabled={!show}
                >
                  <i className="fa fa-save me-1" aria-hidden="true"></i>Sauvegarder
                </button>
                <button
                  type="submit"
                  className="btn custom-btn formulaire-btn-submit"
                  name="soumettre"
                  disabled={!show}
                >
                  <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>Soumettre
                </button>
                {/* Alerts */}
                <div className="ms-auto">
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
              </div>
              {/* Select */}
              <div className="">
                <label htmlFor="questionnaire" className="form-label mb-0 fw-bolder">
                  Questionnaires disponibles
                  {/* <CustomRequired /> */}
                </label>
                <div className="">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="questionnaire"
                    name="questionnaire"
                    value={questionnaire.id ? questionnaire.id : ''}
                    onChange={handleQuestionnaireChange}
                  >
                    <option value="">Sélectionner ici !</option>
                    {data.map((dat, index) => {
                      return (
                        <option value={dat.id} key={'data-item-' + index}>
                          {index + 1 + '. ' + dat.numero}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              {/* Notifications */}
              <div className="ms-auto text-success mt-2 fw-bolder">
                {dates.datedebut !== null && dates.datefin !== null
                  ? 'Ouvert du ' + dates.datedebut + ' au ' + dates.datefin
                  : ''}
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
                    {thematique.dimensions.map((dimension, index2) => (
                      <li className="list-group-item" key={'dimension-item-' + index2}>
                        {dimension.libelle}
                        <ul className="">
                          {dimension.variables.map((variable, index3) => (
                            <ul type="none" className="list-group" key={'variable-item-' + index3}>
                              {/* <strong>{variable.libelle}</strong> */}
                              {variable.questions.map((question, index4) => (
                                <li key={'question-item-' + index4}>
                                  <div className="">
                                    <label htmlFor="" className="form-label fw-bolder ">
                                      {question.libelle}
                                    </label>
                                    {/* Text */}
                                    {question.typemodalite === 'text' && (
                                      <div
                                        className="mb-2"
                                        key={'question-typemodalite-text-item-' + index4}
                                      >
                                        <input
                                          className="form-control"
                                          type="text"
                                          id={'question-typemodalite-text-item-' + index4}
                                          name={question.id}
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
                                              key={'question-typemodalite-radio-item-' + index5}
                                            >
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                id={'question-typemodalite-radio-item-' + index5}
                                                name={question.id}
                                                value={v}
                                                onChange={handleRadio}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor={
                                                  'question-typemodalite-radio-item-' + index5
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
                                              className="form-check"
                                              key={'question-typemodalite-checkbox-item-' + index6}
                                            >
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={'question-typemodalite-checkbox-item-' + index6}
                                                name={question.id}
                                                value={v}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor={
                                                  'question-typemodalite-checkbox-item-' + index6
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
