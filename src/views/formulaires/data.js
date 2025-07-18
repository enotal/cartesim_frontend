export const thematiques = [
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
        variables: [
          {
            id: 1,
            libelle: 'Situation professionnelle actuelle',
            questions: [
              {
                id: 1,
                libelle: 'Quelle est votre situation professionnelle actuelle',
                modalite: 'ne fais rien ; stage ; emploi salarié ; auto emploi',
                typemodalite: 'multi',
              },
            ],
          },
        ],
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
