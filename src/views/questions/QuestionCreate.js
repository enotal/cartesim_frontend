import { useState } from 'react'
import { CustomRequired } from '../../components/crud/CustomRequired'

const QuestionCreate = ({ dimensions, questions }) => {
  const modalites = ['prédéfini', 'autre']
  const typeModalites = ['unique', 'multiple']

  const [selectedModalite, setSelectedModalite] = useState(modalites[1])
  const [selectedTypeModalite, setSelectedTypeModalite] = useState()

  const handleChangeModalite = (event) => {
    setSelectedModalite(event.target.value)
  }

  const handleChangeTypeModalite = (event) => {
    setSelectedTypeModalite(event.target.value)
  }

  return (
    <div>
      {/* Dimensions */}
      <div className="mb-2 row">
        <label htmlFor="dimension" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Dimensions
        </label>
        <div className="">
          <select
            className="form-select"
            aria-label="Default select example"
            id="dimension"
            name="dimension"
            required
            autoFocus
          >
            <option value="">Sélectionner ici !</option>
            {dimensions.map((dimension, index) => {
              return (
                <option key={'dimension' + index} value={dimension.id}>
                  {dimension.libelle}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      {/* QUestions */}
      <div className="mb-2 row">
        <label htmlFor="question" className="col-form-label py-0">
          Questions
        </label>
        <div className="">
          <select
            className="form-select"
            aria-label="Default select example"
            id="question"
            name="question"
            // disabled={questions.length > 0 ? false : true}
          >
            <option value="">Sélectionner ici !</option>
            {questions.map((question, index) => {
              return (
                <option key={'question' + index} value={question.id}>
                  {question.libelle}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      {/* Libellé */}
      <div className="mb-2 row">
        <label htmlFor="libelle" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Libellé
        </label>
        <div className="">
          <input type="text" className="form-control" id="libelle" name="libelle" required />
        </div>
      </div>

      {/* Variable */}
      <div className="mb-2 row">
        <label htmlFor="variable" className="col-form-label py-0">
          Variable
        </label>
        <div className="">
          <input type="text" className="form-control" id="variable" name="variable" />
        </div>
      </div>

      {/* Modalité */}
      <div className="mb-2 row">
        <label htmlFor="modalite" className="col-form-label py-0">
          Modalité
        </label>
        <div className="">
          {modalites.map((modalite, index) => {
            return (
              <div className="form-check form-check-inline" key={'modalite' + index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="modalite"
                  id={'modalite' + index}
                  value={modalite}
                  checked={selectedModalite === modalite}
                  onChange={handleChangeModalite}
                />
                <label className="form-check-label" htmlFor={'modalite' + index}>
                  {modalite}
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Types de modalité */}
      <div className="mb-2 row">
        <label htmlFor="typeModalite" className="col-form-label py-0">
          Types de Modalité
        </label>
        <div className="">
          {typeModalites.map((typeModalite, index) => {
            return (
              <div className="form-check form-check-inline" key={'typemodalite' + index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="typeModalite"
                  id={'typeModalite' + index}
                  value={typeModalite}
                  checked={selectedTypeModalite === typeModalite}
                  onChange={handleChangeTypeModalite}
                  disabled={selectedModalite == modalites[1] ? true : false}
                />
                <label className="form-check-label" htmlFor={'typeModalite' + index}>
                  {typeModalite}
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Réponse prédéfinie */}
      <div className="mb-2 row">
        <label htmlFor="reponsePredefinie" className="col-form-label py-0">
          {selectedModalite == modalites[0] ? <CustomRequired tagP={0} /> : ''}
          Réponse prédéfinie
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="reponsePredefinie"
            name="reponsePredefinie"
            required={false}
          />
        </div>
      </div>

      {/* Déclencheur */}
      <div className="mb-2 row">
        <label htmlFor="declencheur" className="col-form-label py-0">
          Déclencheur
        </label>
        <div className="">
          <input type="text" className="form-control" id="declencheur" name="declencheur" />
        </div>
      </div>
    </div>
  )
}

export default QuestionCreate
