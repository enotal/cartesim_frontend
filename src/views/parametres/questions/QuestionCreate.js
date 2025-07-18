import React from 'react'
import { RequiredField } from '../../../components/crud/RequiredField'

const QuestionCreate = ({ variables, modalites }) => {
  return (
    <div>
      <div className="mb-2 row">
        <label htmlFor="variable" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Variables
        </label>
        <div className="">
          <select
            className="form-select"
            aria-label="Default select example"
            id="variable"
            name="variable"
            required
            autoFocus
          >
            <option value="">Sélectionner ici !</option>
            {variables.map((variable, index) => {
              return (
                <option key={'variable' + index} value={variable.id}>
                  {variable.libellelong}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="libelle" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Libellé
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="libelle"
            name="libelle"
            required
          />
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="modalite" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Modalités
        </label>
        <div className="">
          <select
            className="form-select"
            aria-label="Default select example"
            id="modalite"
            name="modalite"
            required
          >
            <option value="">Sélectionner ici !</option>
            {modalites.map((modalite, index) => {
              return (
                <option key={'modalite' + index} value={modalite}>
                  {modalite}
                </option>
              )
            })}
          </select>
        </div>
      </div>

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
