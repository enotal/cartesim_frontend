import React from 'react'
import { RequiredField } from '../../components/crud/RequiredField'

const DimensionCreate = ({ thematiques }) => {
  return (
    <div>
      <div className="mb-2 row">
        <label htmlFor="thematique" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Thématiques
        </label>
        <div className="">
          <select
            className="form-select"
            aria-label="Default select example"
            id="thematique"
            name="thematique"
            required
            autoFocus
          >
            <option value="">Sélectionner ici !</option>
            {thematiques.map((thematique, index) => {
              return (
                <option key={'thematique' + index} value={thematique.id}>
                  {thematique.libellelong}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      
      <div className="mb-2 row">
        <label htmlFor="libelleCourt" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Libellé court
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="libelleCourt"
            name="libelleCourt"
            required
          />
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="libelleLong" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Libellé long
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="libelleLong"
            name="libelleLong"
            required
          />
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="code" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Code
        </label>
        <div className="">
          <input type="text" className="form-control" id="code" name="code" required />
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="typeRepondant" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Type répondant
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="typeRepondant"
            name="typeRepondant"
            required
          />
        </div>
      </div>
    </div>
  )
}

export default DimensionCreate
