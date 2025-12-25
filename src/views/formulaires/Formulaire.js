import React, { useEffect, useRef, useState } from 'react'
import { getData, getItem } from '../../apiService'
import Typerepondant from '../typerepondants/Typerepondant'

// import { isDate } from 'validator'

const Formulaire = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [questionnaire, setQuestionnaire] = useState([])
  const [thematiques, setThematiques] = useState([])
  const [typerepondants, setTyperepondants] = useState([])
  const [dimensions, setDimensions] = useState([])
  const [show, setShow] = useState(false)
  const separator = ', '

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
        setShow(false)
      }
    })
  }

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
    <div className="container">
      {/* Questionnaire */}
      <div className="card">
        <div className={`card-body ${show ? 'pb-1' : ''}`}>
          <div className="">
            <label htmlFor="questionnaire" className="form-label mb-0">
              Questionnaire
              {/* <CustomRequired /> */}
            </label>
            <div className="">
              <select
                className="form-select"
                aria-label="Default select example"
                id="questionnaire"
                name="questionnaire"
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

          {/* Questionnaire infos */}
          <div className={`table-responsive mt-3 ${show ? 'd-block' : 'd-none'}`}>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="row">ID</th>
                  <th scope="row">DATE DEBUT</th>
                  <th scope="row">DATE FIN</th>
                  <th scope="row">THEMATIQUES</th>
                  <th scope="row">TYPE REPONDANTS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{questionnaire.id}</td>
                  <td>{questionnaire.datedebut}</td>
                  <td>{questionnaire.datefin}</td>
                  <td>
                    {thematiques.map((thematique) => thematique.libellecourt).join(separator)}
                  </td>
                  <td>
                    {typerepondants
                      .map((typerepondant) => typerepondant[0] && typerepondant[0].libelle)
                      .join(separator)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Contents */}
      {/* <div className={`card mt-2 ${show ? 'd-block' : 'd-none'}`}> */}
      {/* <div className="card-body"> */}
      <ol type="1" className="list-group list-group-numbered mt-2">
        {thematiques.map((thematique, index) => (
          <li className="list-group-item" key={'thematique-item-' + index}>
            <strong>{thematique.libellelong}</strong>
            <ol type="a" className="list-group list-group-numbered">
              {thematique.dimensions.map((dimension, index2) => (
                <li className="list-group-item" key={'dimension-item-' + index2}>
                  {dimension.libelle}
                  <ul className="">
                    {dimension.variables.map((variable, index3) => (
                      <ul type="none" className="list-group" key={'variable-item-' + index3}>
                        {variable.questions.map((question, index4) => (
                          <li key={'question-item-' + index4}>
                            <div className="">
                              <label htmlFor="" className="form-label">
                                {question.libelle}
                              </label>

                              {/* Text */}
                              {question.typemodalite === 'text' && (
                                <div className="" key={'modalite-text-item' + index4}>
                                  <input
                                    className="form-control"
                                    type="text"
                                    id={'modalite-item-text-' + index4}
                                    name={question.id}
                                  />
                                </div>
                              )}
                              {/* Radio */}
                              {question.typemodalite === 'unique' && (
                                <div className="">
                                  {question.valeurmodalite.split(';').map((v, index5) => (
                                    <div
                                      className="form-check"
                                      key={'modalite-unique-item-' + index5}
                                    >
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id={'modalite-item-unique-' + index5}
                                        name={question.id}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={'modalite-item-unique-' + index5}
                                      >
                                        {v}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {/* Checkbox */}
                              {question.typemodalite === 'multiple' && (
                                <div className="">
                                  {question.valeurmodalite.split(';').map((v, index6) => (
                                    <div
                                      className="form-check"
                                      key={'modalite-multiple-item-' + index6}
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={'modalite-item-multiple-' + index6}
                                        name={question.id}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={'modalite-item-multiple-' + index6}
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
    // </div>
    // </div>
  )
}

export default Formulaire
