import React, { useEffect, useRef, useState } from 'react'
import { getData } from '../../components/crud/apiService'
import { CustomRequired } from '../../components/crud/CustomRequired'
import { isDate } from 'validator'

const Formulaire = () => {
  const formRef = useRef()
  const [questionnaires, setQuestionnaires] = useState([])
  const [dimensions, setDimensions] = useState([])
  const [submitter, setSubmitter] = useState('')

  useEffect(() => {
    getData('questionnaires')
      .then((response) => setQuestionnaires(response))
      .catch((error) => console.error(error))

    getData('dimensions')
      .then((response) => setDimensions(response))
      .catch((error) => console.error(error))
  }, [])

  // Save or Send form values
  const handleSubmit = (event) => {
    event.preventDefault()
    if (formRef.current) {
      // récupération des données du formulaire
      const formData = new FormData(formRef.current)
      const formValues = Object.fromEntries(formData)
      console.log(formValues)
    }
  }

  const questionnaire = questionnaires.filter((item) => item.isclosed === 'non')[0]
  console.log(questionnaire && questionnaire)
  // var startDate = null
  // if (questionnaire) {
  //   startDate = questionnaire.datedebut ? new Date() : null
  // }

  const renderPredefiniContent = (question) => {
    let reponses = question.reponsepredefinie.split(';')
    // Type modalité :  ? unique : multiple
    return reponses.map((reponse, idx) => (
      <div className="form-check form-check-inline" key={question.id + '-' + idx}>
        <input
          className="form-check-input"
          type={question.typemodalite === 'unique' ? 'radio' : 'checkbox'}
          name={
            question.typemodalite === 'unique'
              ? 'question' + question.id
              : 'question' + question.id + '[]'
          }
          id={question.id + '-' + idx}
          // data-question={question.id}
          value={reponse}
        />
        <label className="form-check-label" htmlFor={question.id + '-' + idx}>
          {reponse}
        </label>
      </div>
    ))
  }

  return (
    <form ref={formRef} key={''} action="" method="post" encType="" onSubmit={handleSubmit}>
      {/* Titre */}
      <div className="card" style={{ backgroundColor: '#17376e', color: '#fff' }}>
        <div className="card-body py-1">
          {questionnaire && (
            <div>
              <div className="">
                <span className="fw-bolder me-1">Questionnaire n°</span>
                {questionnaire.numero}
              </div>
              <div className="d-flex">
                <div>
                  <span className="fw-bolder me-1">Date début :</span>
                  {/* {startDate} */}
                </div>
                <div className="ms-auto">
                  <span className="fw-bolder me-1">Date fin :</span>
                  {questionnaire.datefin}
                </div>
              </div>
              <div>
                <span className="fw-bolder me-1">Consigne :</span>
                {questionnaire.consigne}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenus */}
      <div className="card mt-2" style={{ maxHeight: '32em', overflowY: 'auto' }}>
        <div className="card-body ps-0">
          <ol className=''>
            {dimensions.map((dimension, index) => {
              return dimension?.questions.map((question) => (
                <li className="mb-3" key={'question' + question.id}>
                  <label htmlFor="" className="col-form-label py-0 fw-bolder">
                    <CustomRequired tagP={0} />
                    {question.libelle}
                  </label>
                  <div className="">
                    {question.modalite !== 'prédéfini' ? (
                      <input
                        type="text"
                        className="form-control"
                        id={'question' + question.id}
                        name={'question' + question.id}
                        required
                      />
                    ) : (
                      renderPredefiniContent(question)
                    )}
                  </div>
                </li>
              ))
            })}
          </ol>
        </div>
      </div>

      {/* Boutons : */}
      <div className="formulaireButtons mt-2 d-flex justify-content-center sticky-bottom p-2">
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
          type="submit"
          className="btn btnFormulaireSave me-2"
          title="Sauvegarder temporairement les données"
          onClick={() => setSubmitter('save')}
        >
          <i className="fa fa-save me-1" aria-hidden="true"></i>
          <span>Sauvegarder</span>
        </button>
        <button
          type="submit"
          className="btn btnFormulaireSubmit"
          title="Envoyer les données"
          onClick={() => setSubmitter('send')}
        >
          <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>
          <span> Soumettre</span>
        </button>
      </div>
      {/*  */}
    </form>
  )
}

export default Formulaire
