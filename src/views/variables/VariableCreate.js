import React from 'react'
import { RequiredField } from '../../components/crud/RequiredField'

const VariableCreate = ({dimensions}) => {
  return (
    <div>
      <div className="mb-2 row">
        <label htmlFor="dimension" className="col-form-label py-0">
          <RequiredField tagP={0} />
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
                  {dimension.libellelong}
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
          <input type="text" className="form-control" id="libelle" name="libelle" required />
        </div>
      </div>
    </div>
  )
}

export default VariableCreate
