import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Questionnaire = React.lazy(() => import('./views/questionnaires/Questionnaire'))
const Formulaire = React.lazy(() => import('./views/formulaires/Formulaire'))
const Resultat = React.lazy(() => import('./views/resultats/Resultat'))
const Analyse = React.lazy(() => import('./views/analyses/Analyse'))
const Thematique = React.lazy(() => import('./views/thematiques/Thematique'))
const Dimension = React.lazy(() => import('./views/dimensions/Dimension'))
const Variable = React.lazy(() => import('./views/variables/Variable'))
const Question = React.lazy(() => import('./views/questions/Question'))
const Repondant = React.lazy(() => import('./views/repondants/Repondant'))
const Typerepondant = React.lazy(() => import('./views/typerepondants/Typerepondant'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/questionnaires', name: 'Questionnaire', element: Questionnaire },
  { path: '/formulaire', name: 'Formulaire', element: Formulaire },
  // { path: '/resultats', name: 'Resultat', element: Resultat },
  // { path: '/analyses', name: 'Analyse', element: Analyse },
  { path: '/thematiques', name: 'Thematiques', element: Thematique },
  { path: '/dimensions', name: 'Dimensions', element: Dimension },
  { path: '/variables', name: 'Variables', element: Variable },
  { path: '/questions', name: 'Questions', element: Question },
  { path: '/repondants', name: 'Répondants', element: Repondant },
  { path: '/typerepondants', name: 'Type Répondants', element: Typerepondant },
]

export default routes
