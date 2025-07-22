import React from 'react'
import { thematiques } from './data'

const Spis = () => {
  const _thematique = thematiques.filter(
    (thematique) => thematique.code.toLocaleLowerCase() == 'spis',
  )
  const dimensions = _thematique[0].dimensions
  let ordre

  function renderQuestion(question) {
    var result = []
    var libelle = ''
    var elements = ''
    if (question.modalite === 'prédéfini') {
      if (question.typemodalite === 'unique') {
        libelle = question.reponsepredefinies[0].libelle // && question.reponsepredefinies.libelle.split(';')
        elements = libelle.split(';')
        for (let i = 0; i < elements.length; i++) {
          result.push(
            <div className="form-check form-check-inline" key={'element' + i}>
              <input
                className="form-check-input"
                type="radio"
                id={'inlineCheckbox' + i}
                name={'question' + question.id}
                value={i}
              />
              <label className="form-check-label" htmlFor={'inlineCheckbox' + i}>
                {elements[i]}
              </label>
            </div>,
          )
        }
      }
    }
    console.log(question.modalite)
    return result
  }

  return (
    <div>
      <div className="fw-bold fs-3 mb-3">{_thematique && _thematique[0].libellelong}</div>
      <div className="accordion" id="accordionExample">
        {dimensions &&
          dimensions.map((dimension, index) => {
            ordre = 0
            return (
              <div className="accordion-item mb-3" key={'accordion-item' + dimension.id}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={'#collapseOne' + dimension.id}
                    aria-expanded="true"
                    aria-controls={'collapseOne' + dimension.id}
                  >
                    {dimension.libellelong}
                  </button>
                </h2>
                <div
                  id={'collapseOne' + dimension.id}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {dimension.variables &&
                      dimension.variables.map((variable, indexVariable) => {
                        return (
                          variable.questions &&
                          variable.questions.map((question, indexQuestion) => {
                            return (
                              <div className="row mb-3" key={'question' + question.id}>
                                <label
                                  htmlFor={'question' + question.id}
                                  className="col-form-label py-0 fw-bold"
                                >
                                  {++ordre + '. ' + question.libelle}
                                </label>
                                <div className="d-flex">{renderQuestion(question)}</div>
                              </div>
                            )
                          })
                        )
                      })}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Spis
