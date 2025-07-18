import React from 'react'

const Formulaire = () => {
  const thematiques = [
    {
      id: 1,
      libellecourt: 'Parcours & Performance',
      libellelong: 'Parcours individuel et performance académique',
      code: 'PIPA',
    },
    {
      id: 2,
      libellecourt: 'Qualité & Pédagogie',
      libellelong: 'Qualité des enseignements et accompagnement pédagogique',
      code: 'QEAP',
    },
    {
      id: 3,
      libellecourt: 'Suivi & Insertion',
      libellelong: 'Suivi postuniversitaire et insertion socioprofessionnelle',
      code: 'SPIS',
    },
    {
      id: 4,
      libellecourt: 'Gouvernance & Infrastructure',
      libellelong: 'Gouvernance, infrastructures & cadre institutionnel',
      code: 'GICI',
    },
  ]

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
