import React, { useEffect, useRef, useState } from 'react'
import { getData } from '../../components/crud/apiService'
import { CustomRequired } from '../../components/crud/CustomRequired'

const Formulaire = () => {
  const formRef = useRef()
  const [thematiques, setThematiques] = useState([])
  const [questionnaires, setQuestionnaires] = useState([])
  const [questions, setQuestions] = useState([])

  const [isThematiqueChecked, setIsThematiqueChecked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const fetchGetThematiques = async () => {
    try {
      const data = await getData('thematiques')
      setThematiques(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchGetQuestionnaires = async () => {
    try {
      const data = await getData('questionnaires')
      setQuestionnaires(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchGetQuestions = async () => {
    try {
      const data = await getData('questions')
      setQuestions(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchGetThematiques()
    fetchGetQuestionnaires()
    fetchGetQuestions()
  }, [])

  const questionnaire = questionnaires.filter((item) => item.isclosed === 'non')[0]

  const handleChangeThematique = (e) => {
    const radio = document.getElementsByName('thematique')
    for (let i = 0; i < radio.length; i++) {
      document.getElementById('pills-' + radio[i].id).style.display = radio[i].checked
        ? 'block'
        : 'none'
    }
    setIsVisible(true)
    // setIsThematiqueChecked(true)
  }

  const renderQuestionContent = (dimensionId, question, index) => {
    if (question.dimension_id === dimensionId) {
      // modalité : prédéfinie
      if (question.modalite === 'prédéfini') {
        let reponses = question.reponsepredefinie.split(';')
        // Type modalité : unique
        if (question.typemodalite === 'unique') {
          return reponses.map((reponse, index) => (
            <div className="form-check" key={'question-' + question.id + '-' + index}>
              <input
                className="form-check-input"
                type="radio"
                name={'question' + question.id}
                id={'question-' + question.id + '-' + index}
                value={reponse}
                // checked={selectedTypeModalite === typeModalite}
                // onChange={handleChangeTypeModalite}
              />
              <label className="form-check-label" htmlFor={'question-' + question.id + '-' + index}>
                {reponse}
              </label>
            </div>
          ))
        }
        // Type modalité : multiple
        if (question.typemodalite === 'multiple') {
          reponses.map((reponse, index) => {
            return (
              <div className="form-check" key={'question-' + question.id + '-' + index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={'question' + question.id + '[]'}
                  id={'question-' + question.id + '-' + index}
                  value={reponse}
                  // checked={selectedTypeModalite === typeModalite}
                  // onChange={handleChangeTypeModalite}
                />
                <label
                  className="form-check-label"
                  htmlFor={'question-' + question.id + '-' + index}
                >
                  {reponse}
                </label>
              </div>
            )
          })
        }
      } else {
        // modalité : autre
        return (
          <div className="mb-2 row">
            <label htmlFor="" className="col-form-label py-0">
              <CustomRequired tagP={0} />
              {question.libelle}
            </label>
            <div className="">
              <input
                type="text"
                className="form-control"
                id={'question' + question.id}
                name={'question' + question.id}
                required
              />
            </div>
          </div>
        )
      }
    }
  }

  // console.log(thematiques[2] && thematiques[2].dimensions[0])
  const handleReset = (event) => {
    setIsVisible(false)
  }

  const handleSave = (event) => {
    event.preventDefault()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="container">
      <form ref={formRef} action="" method="post" encType="" onSubmit={handleSubmit}>
        {/*  */}
        <div className="card">
          <div className="card-body">
            {/* Titre et autres */}
            <div className="card mb-3" style={{ backgroundColor: '#17376e', color: '#fff' }}>
              <div className="card-body p-1">
                {questionnaire && (
                  <div>
                    <div className="">
                      <span className="fw-bolder me-2">Questionnaire n°</span>
                      {questionnaire.numero}
                    </div>
                    <div className="d-flex">
                      <div>
                        <span className="fw-bolder me-2">Date début :</span>
                        {questionnaire.datedebut}
                      </div>
                      <div className="ms-auto">
                        <span className="fw-bolder me-2">Date fin :</span>
                        {questionnaire.datefin}
                      </div>
                    </div>
                    <div>
                      <span className="fw-bolder me-2">Consigne :</span>
                      {questionnaire.consigne}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* En-têtes */}
            {thematiques.length > 1 && <div className="fw-bold mb-0 fs-4">Thématiques</div>}
            {/* checkbox */}
            {thematiques.map((thematique, index) => {
              return (
                <div className="form-check" key={'thematique' + index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={'thematique' + index}
                    name="thematique"
                    value={thematique.id}
                    onChange={(e) => handleChangeThematique(e)}
                  />
                  <label className="form-check-label" htmlFor={'thematique' + index}>
                    {thematique.libellelong}
                  </label>
                </div>
              )
            })}
            <div className="formulaireButtons mt-2">
              <button
                type="reset"
                className="btn btnFormulaireReset me-2"
                title="Effacer toutes les données saisies"
                onClick={(e) => {
                  handleReset(e)
                }}
              >
                <i className="fa fa-refresh me-1" aria-hidden="true"></i>
                <span>Réinitialiser</span>
              </button>
              <button
                type="button"
                className="btn btnFormulaireSave me-2"
                title="Sauvegarder temporairement les données"
                onClick={handleSave}
              >
                <i className="fa fa-save me-1" aria-hidden="true"></i>
                <span>Enregistrer</span>
              </button>
              <button type="submit" className="btn btnFormulaireSubmit" title="Envoyer les données">
                <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>
                <span> Soumettre</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contenus */}
        <div
          className="card mt-2"
          style={{ height: '30em', overflowY: 'auto', display: isVisible ? 'block' : 'block' }}
        >
          <div className="card-body">
            {/* <div className="fw-bold mb-2 mt-4 fs-4">Dimensions et Questions de la thématique </div> */}
            <div className="" style={{ height: '', overflowY: 'auto' }}>
              {thematiques.map((thematique, index) => {
                return (
                  <div
                    key={'tabcontent' + index}
                    className=""
                    id={'pills-thematique' + index}
                    style={{ display: 'none' }}
                  >
                    <div className="accordion" id="accordionExample">
                      {thematique.dimensions &&
                        thematique.dimensions.map((dimension, indx) => {
                          return (
                            <div
                              className="accordion-item mb-3"
                              key={'accordion-item-thematique' + index + '-dimension' + indx}
                            >
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={
                                    '#collapseOne-thematique' + index + '-dimension' + indx
                                  }
                                  aria-expanded="true"
                                  aria-controls={
                                    'collapseOne-thematique' + index + '-dimension' + indx
                                  }
                                >
                                  {indx + 1 + ' - ' + dimension.libelle}
                                </button>
                              </h2>
                              <div
                                id={'collapseOne-thematique' + index + '-dimension' + indx}
                                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  {questions.map((question, idx) => (
                                    <div
                                      key={
                                        'thematique' +
                                        index +
                                        '-dimension' +
                                        indx +
                                        '-question' +
                                        idx
                                      }
                                    >
                                      {renderQuestionContent(dimension.id, question, idx)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/*  */}
      </form>
    </div>
  )
}

export default Formulaire
