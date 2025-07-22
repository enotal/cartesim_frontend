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
                libelle: 'Quelle est votre situation professionnelle actuelle ?',
                modalite: 'prédéfini',
                typemodalite: 'unique',
                reponsepredefinies: [
                  { id: 1, libelle: 'ne fais rien ; stage;emploi salarié ; auto emploi' },
                ],
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
        variables: [
          {
            id: 1,
            libelle: 'Niveau d’acquisition de compétences métiers (certifications)',
            questions: [
              {
                id: 1,
                libelle: 'Avez-vous suivi une formation continue après la fin de votre cycle ?',
                modalite: 'prédéfini',
                typemodalite: 'unique',
                reponsepredefinies: [{ id: 1, libelle: 'oui ; non' }],
              },
              {
                id: 2,
                libelle:
                  'Si “Avez-vous suivi une formation continue après la fin de votre cycle ?” est oui, quel(s) diplôme(s) diplômes avez-vous obtenu ?',
                modalite: 'prédéfini',
                typemodalite: 'multiple',
                reponsepredefinies: [{ id: 1, libelle: 'certification ; attestation ; diplôme' }],
              },
            ],
          },
          {
            id: 2,
            libelle:
              'Auto‑évaluation des soft skills (communication, travail en équipe, adaptabilité)',
            questions: [
              {
                id: 1,
                libelle: 'Comment appréciez-vous vos soft skills sur une échelle de 1 à 5 ?',
                modalite: 'prédéfini',
                typemodalite: 'unique',
                reponsepredefinies: [{ id: 1, libelle: '1 ; 2 ; 3 ; 4 ; 5' }],
              },
            ],
          },
          {
            id: 3,
            libelle: 'Communication (sens de l’écoute, bonne expression à l’oral ou à l’écrit)',
            questions: [
              {
                id: 1,
                libelle:
                  'Comment jugez-vous vos compétences en matière de communication sur une échelle de 1 à 5 ?',
                modalite: 'prédéfini',
                typemodalite: 'unique',
                reponsepredefinies: [{ id: 1, libelle: '1 ; 2 ; 3 ; 4 ; 5' }],
              },
            ],
          },
          {
            id: 4,
            libelle:
              'Travail en équipe (contribution efficace à la dynamique du groupe, respect des opinions des autres)',
            questions: [
              {
                id: 1,
                libelle:
                  'Comment jugez-vous vos compétences en matière de travail en équipe sur une échelle de 1 à 5 ?',
                modalite: 'prédéfini',
                typemodalite: 'unique',
                reponsepredefinies: [{ id: 1, libelle: '1 ; 2 ; 3 ; 4 ; 5' }],
              },
            ],
          },
          {
            id: 5,
            libelle:
              'Adaptabilité/Gestion du stress (facilité de s’adapter à de nouvelles situations ou contraintes, conservation de son efficacité face à l’imprévu)',
            questions: [
              {
                id: 1,
                libelle:
                  'Comment jugez-vous vos compétences en matière d’adaptabilité ou de gestion de stress sur une échelle de 1 à 5 ?',
                modalite: 'prédéfini',
                typemodalite: 'unique',
                reponsepredefinies: [{ id: 1, libelle: '1 ; 2 ; 3 ; 4 ; 5' }],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        libellecourt: '',
        libellelong: 'Motivation et projet professionnel',
        typerepondant: [],
        variables: [],
      },
      {
        id: 4,
        libellecourt: '',
        libellelong: 'Réseau et insertion socioprofessionnelle',
        typerepondant: [],
        varaibles: [],
      },
      {
        id: 5,
        libellecourt: '',
        libellelong: "Statut socio-économique à l'insertion",
        typerepondant: [],
        variables: [],
      },
      {
        id: 6,
        libellecourt: '',
        libellelong: 'Suivi longitudinal des diplômés',
        typerepondant: [],
        variables: [],
      },
      {
        id: 7,
        libellecourt: '',
        libellelong: 'Soutien institutionnel post-diplôme',
        typerepondant: [],
        varaibles: [],
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
