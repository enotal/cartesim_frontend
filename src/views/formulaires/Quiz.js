import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getData, getItem } from '../../apiService'
import Typerepondant from '../typerepondants/Typerepondant'
import { createItem } from '../../apiService'
import { CustomRequired } from '../../components/CustomRequired'

import { AppGuestHeader, AppGuestFooter } from '../../components'

import $ from 'jquery'

// import { isDate } from 'validator'

const Quiz = () => {
  const formRef = useRef()
  const [alert, setAlert] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const params = useParams() 
  const [repondantId, setRepondantId] = useState(params.id)
  const [questionnaireId, setQuestionnaireId] = useState('')
  const [questionnaires, setQuestionnaires] = useState([])
  const [thematiques, setThematiques] = useState([])

  const fetchGetQuestionnaire = async () => {
    await getData('questionnaires')
      .then((response) => {
        setQuestionnaires(response)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchGetQuestionnaire()
  }, [])

  // ===

  const handleQuestionnaire = async (e) => {
    const { name, value } = e.target
    // Récupération des thématiques du questionnaire
    // const quest = questionnaires.filter((item) => item.id === parseInt(value))
    if (value > 0) {
      const response = await getItem('questionnaires/' + value + '/quiz')
      if (response.success) {
        setQuestionnaireId(value)
        setThematiques(response.data[0].thematiques)
      }
    }
    setShowForm(value > 0 ? true : false)
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    // récupération des données du formulaire
    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData)
    // User ID
    // formValues.repondant = 1
    //
    // const id = e.target.getAttribute('questionnaire-id')
    console.log(formValues)
    // Use event.nativeEvent.submitter to identify which button was clicked
    const submitterName = e.nativeEvent.submitter.name
    if (submitterName === 'sauvegarder') {
      //
    } else if (submitterName === 'soumettre') {
      const response = await createItem('questionquestionnairerepondants', formValues)
      // console.log(response)
      setAlert(response)
    }
  }

  // ===

  return (
    <div className="home-main-container min-vh-100">
      <AppGuestHeader />
      <div className="container py-2 overflow-y-auto">
        <form ref={formRef} onSubmit={handleSubmit} method="POST" encType="">
          {/* Pivot ids */}
          <input type="hidden" name="repondant" value={repondantId} />
          <input type="hidden" name="questionnaire" value={questionnaireId} />

          {/* En-tête */}
          <div className="card">
            <div className="card-body d-flex">
              {/* Questionnaires disponibles et Alerts */}
              <div className="flex-grow-1 pe-5 mb-2">
                <label htmlFor="questionnaire" className="form-label mb-0">
                  Questionnaire
                  <CustomRequired />
                </label>
                <div className="">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="questionnaire"
                    name="questionnaire"
                    required
                    onChange={handleQuestionnaire}
                  >
                    <option value="">Sélectionner ici !</option>
                    {questionnaires.map((questionnaire, index) => (
                      <option value={questionnaire.id} key={'questionnaire-item-' + index}>
                        {index + 1 + '. ' + questionnaire.numero}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Alerts */}
                <div className="mt-2">
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
              {/* Boutons */}
              <div className="d-grid gap-1">
                <a className="btn btn-secondary flex-grow-1" href="#">
                  <i className="fa fa-home me-1" aria-hidden="true"></i>Accueil
                </a>
                <button
                  type="submit"
                  className={`btn btn-outline-primary flex-grow-1 ${showForm ? 'd-block' : 'd-none'}`}
                  name="sauvegarder"
                >
                  <i className="fa fa-save me-1" aria-hidden="true"></i>Sauvegarder
                </button>
                <button
                  type="submit"
                  className={`btn btn-outline-primary flex-grow-1 ${showForm ? 'd-block' : 'd-none'}`}
                  name="soumettre"
                >
                  <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>Soumettre
                </button>
              </div>
            </div>
          </div>
          {/*  */}

          {/* Présentation du formulaire */}
          <div className={showForm ? 'd-block' : 'd-none'}>
            {thematiques && thematiques.length > 0 && (
              <div className="">
                <ol type="1" className="list-group list-group-numbered mt-2">
                  {thematiques.map((thematique, index) => (
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
                                              question.valeurmodalite
                                                .split(';')
                                                .map((v, index5) => (
                                                  <div
                                                    className="form-check form-check-inline"
                                                    key={
                                                      'question-item-' + question.id + '-' + index5
                                                    }
                                                  >
                                                    <input
                                                      className="form-check-input"
                                                      type="radio"
                                                      id={
                                                        'question-item-' +
                                                        question.id +
                                                        '-' +
                                                        index5
                                                      }
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
                                                        'question-item-' +
                                                        question.id +
                                                        '-' +
                                                        index5
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
                                              question.valeurmodalite
                                                .split(';')
                                                .map((v, index6) => (
                                                  <div
                                                    className="form-check form-check-inline"
                                                    key={
                                                      'question-item-' + question.id + '-' + index6
                                                    }
                                                  >
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      id={
                                                        'question-item-' +
                                                        question.id +
                                                        '-' +
                                                        index6
                                                      }
                                                      name={question.id}
                                                      value={v.trim()}
                                                      disabled={
                                                        question.parent_id !== null ? true : false
                                                      }
                                                    />
                                                    <label
                                                      className="form-check-label"
                                                      htmlFor={
                                                        'question-item-' +
                                                        question.id +
                                                        '-' +
                                                        index6
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
            )}
          </div>
          {/*  */}
        </form>
      </div>
    </div>
  )
}

export default Quiz
