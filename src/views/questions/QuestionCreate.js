import React from 'react'
import { RequiredField } from '../../components/crud/RequiredField'

const QuestionCreate = () => {
  return (
    <div>
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
            autoFocus={true}
          />
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="modalite" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Modalité
        </label>
        <div className="">
          <input type="text" className="form-control" id="modalite" name="modalite" required />
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
