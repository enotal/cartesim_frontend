import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { RequiredField } from '../../../components/crud/RequiredField'

const DimensionCreate = ({ thematiques, typerepondants }) => {
  
  const handleCheckBox = (e) => {
    var checkedValues = []
    $('input[name="typeRepondant[]"]:checked').each(function () {
      checkedValues.push($(this).val())
    })
    $('input[name="typeRepondant"]').val(checkedValues)
  }

  

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
          Types de répondants
        </label>
        <div className="">
          <div className="">
            {typerepondants.map((typerepondant, index) => {
              return (
                <div className="form-check" key={'typeRepondant' + index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={'typeRepondant' + index}
                    name="typeRepondant[]"
                    value={typerepondant.libelle}
                    onChange={handleCheckBox}
                  />
                  <label className="form-check-label" htmlFor={'typeRepondant' + index}>
                    {typerepondant.code + ' => ' + typerepondant.libelle}
                  </label>
                </div>
              )
            })}
          </div>
          <div className="">
            <input type="text" className="form-control" id="typeRepondant" name="typeRepondant" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DimensionCreate
