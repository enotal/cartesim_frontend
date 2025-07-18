import React from 'react'
import { RequiredField } from '../../../components/crud/RequiredField'

const ThematiqueCreate = () => {
  return (
    <div>
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
            autoFocus={true}
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
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            required
          />
        </div>
      </div>
    </div>
  )
}

export default ThematiqueCreate
