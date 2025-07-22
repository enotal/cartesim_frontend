import React, { useState } from 'react'

const Formulaire1 = () => {
  const thematiques = [
    {
      id: 1,
      libellecourt: 'Parcours & Performance',
      libellelong: 'Parcours individuel et performance académique',
      code: 'PIPA',
      dimensions: [],
    },
    {
      id: 2,
      libellecourt: 'Qualité & Pédagogie',
      libellelong: 'Qualité des enseignements et accompagnement pédagogique',
      code: 'QEAP',
      dimensions: [],
    },
    {
      id: 3,
      libellecourt: 'Suivi & Insertion',
      libellelong: 'Suivi postuniversitaire et insertion socioprofessionnelle',
      code: 'SPIS',
      dimensions: [
        {
          id: 1,
          libellecourt: '',
          libellelong: 'Situation professionnelle actuelle',
          typerepondant: [],
        },
        {
          id: 2,
          libellecourt: '',
          libellelong: 'Compétences métier et << soft skills >>',
          typerepondant: [],
        },
        {
          id: 3,
          libellecourt: '',
          libellelong: 'Motivation et projet professionnel',
          typerepondant: [],
        },
        {
          id: 4,
          libellecourt: '',
          libellelong: 'Réseau et insertion socioprofessionnelle',
          typerepondant: [],
        },
        {
          id: 5,
          libellecourt: '',
          libellelong: "Statut socio-économique à l'insertion",
          typerepondant: [],
        },
        {
          id: 6,
          libellecourt: '',
          libellelong: 'Suivi longitudinal des diplômés',
          typerepondant: [],
        },
        {
          id: 7,
          libellecourt: '',
          libellelong: 'Soutien institutionnel post-diplôme',
          typerepondant: [],
        },
      ],
    },
    {
      id: 4,
      libellecourt: 'Gouvernance & Infrastructure',
      libellelong: 'Gouvernance, infrastructures & cadre institutionnel',
      code: 'GICI',
      dimensions: [],
    },
  ]

  const [isThematiqueChecked, setIsThematiqueChecked] = useState(null)

  const handleChangeThematique = (e) => {
    console.log(e.target.checked)
    console.log(e.target.value)
    setIsThematiqueChecked(e.target.checked && e.target.value)
  }
  console.log(isThematiqueChecked)

  const handleChangeDimension = (e) => {}

  return (
    <div>
      {/* En-t^tes */}
      {/* checkbox */}
      {thematiques.length > 1 && <div className="fw-bold mb-2 fs-4">Thématiques</div>}
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
      {thematiques.length > 1 && thematiques.dimensions && thematiques.dimensions.length > 1 && (
        <div className="fw-bold mb-2 fs-4">Dimensions de la thématique </div>
      )}
      {thematiques.map((thematique, index) => {
        return (
          <div
            key={'tabcontent' + index}
            className=""
            id={'pills-thematique' + index}
            // style={{ display: isThematiqueChecked === thematique.id ? 'block' : 'none' }}
          >
            {thematique.id}
            {thematique.dimensions &&
              thematique.dimensions.map((dimension, idx) => {
                return (
                  <div
                    className="form-check form-check"
                    key={'thematique' + index + '-dimension' + idx}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
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
