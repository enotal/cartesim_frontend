import React from 'react'
import { thematiques } from './data'

const Formulaire = () => {
    

  const handleChangeThematique = (e) => {
    console.log(e.target.checked)
  }

  return (
    <div>
      {/* En-t^tes */}
      {/* checkbox */}
      {thematiques.map((thematique, index) => {
        return (
          <div className="form-check form-check" key={'thematique' + index}>
            <input
              className="form-check-input"
              type="checkbox"
              id={'thematique' + index}
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
      <div className="tab-content mt-5" id="pills-tabContent">
        {thematiques.map((thematique, index) => {
          return (
            <div
              key={'tabcontent' + index}
              className="tab-pane fade show active"
              id={'pills-' + index}
              role="tabpanel"
              aria-labelledby={'pills-' + index + '-tab'}
              tabIndex="0"
            >
              {thematique.libellelong}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Formulaire
