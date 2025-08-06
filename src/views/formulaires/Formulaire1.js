import React, { useState } from 'react'
import { thematiques } from './data'

const Formulaire1 = () => {
  const [isThematiqueChecked, setIsThematiqueChecked] = useState(false)

  const handleChangeThematique = (e) => {
    const radio = document.getElementsByName('thematique')
    for (let i = 0; i < radio.length; i++) {
      document.getElementById('pills-' + radio[i].id).style.display = radio[i].checked
        ? 'block'
        : 'none'
    }
    // setIsThematiqueChecked(true)
  }

  const handleChangeDimension = (e) => {}

  return (
    <div>
      {/* En-têtes */}
      {thematiques.length > 1 && <div className="fw-bold mb-2 fs-4">Thématiques</div>}
      {/* checkbox */}
      {thematiques.map((thematique, index) => {
        return (
          <div className="form-check" key={'thematique' + index}>
            <input
              className="form-check-input"
              type="radio"
              id={'thematique' + index}
              name="thematique"
              value={thematique.id}
              onChange={(e) => handleChangeThematique(e)}
            />
            <label className="form-check-label" htmlFor={'thematique' + index}>
              {thematique.libellelong}
            </label>
          </div>
        )
      })}

      {/* Contenus */}
      {/* {isThematiqueChecked && ( */}
      <div className="fw-bold mb-2 mt-4 fs-4">Dimensions de la thématique </div>
      {/* )} */}
      {thematiques.map((thematique, index) => {
        return (
          <div
            key={'tabcontent' + index}
            className=""
            id={'pills-thematique' + index}
            style={{ display: 'none' }}
          >
            {thematique.dimensions &&
              thematique.dimensions.map((dimension, idx) => {
                return (
                  <div className="form-check" key={'thematique' + index + '-dimension' + idx}>
                    <input
                      className="form-check-input"
                      type="radio"
                      id={'dimension' + index}
                      value={dimension.id}
                      onChange={(e) => handleChangeDimension(e)}
                    />
                    <label className="form-check-label" htmlFor={'dimension' + index}>
                      {dimension.libellelong}
                    </label>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

export default Formulaire1
