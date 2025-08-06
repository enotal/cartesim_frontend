import React from 'react'

// const Home = React.lazy(() => import('./Home'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Formulaire1 = React.lazy(() => import('./views/formulaires/Formulaire1'))
// const Formulaire = React.lazy(() => import('./views/formulaires/Formulaire'))

const Pipa = React.lazy(() => import('./views/formulaires/Pipa'))
const Qeap = React.lazy(() => import('./views/formulaires/Qeap'))
const Spis = React.lazy(() => import('./views/formulaires/Spis'))
const Gici = React.lazy(() => import('./views/formulaires/Gici'))
const Resultat = React.lazy(() => import('./views/resultats/Resultat'))
const Analyse = React.lazy(() => import('./views/analyses/Analyse'))
const Typerepondant = React.lazy(() => import('./views/parametres/typerepondants/Typerepondant'))
const Modalite = React.lazy(() => import('./views/parametres/modalites/Modalite'))
const Thematique = React.lazy(() => import('./views/parametres/thematiques/Thematique'))
const Dimension = React.lazy(() => import('./views/parametres/dimensions/Dimension'))
const Variable = React.lazy(() => import('./views/parametres/variables/Variable'))
const Question = React.lazy(() => import('./views/parametres/questions/Question'))

const Role = React.lazy(() => import('./views/administration/Role'))
const User = React.lazy(() => import('./views/administration/User'))
const Permission = React.lazy(() => import('./views/administration/Permission'))



const routes = [
  // { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/formulaire1', name: 'Formulaire1', element: Formulaire1 },
  // { path: '/formulaire', name: 'Formulaire', element: Formulaire },
  { path: '/formulaire/pipa', name: 'Parcours & Performance', element: Pipa },
  { path: '/formulaire/qeap', name: 'Qualité & Performance', element: Qeap },
  { path: '/formulaire/spis', name: 'Suivi & Insertion', element: Spis },
  { path: '/formulaire/gici', name: 'Gouvernance & Infrastructure', element: Gici },
  { path: '/resultats', name: 'Resultat', element: Resultat },
  { path: '/analyses', name: 'Analyse', element: Analyse },
  { path: '/parametres/typerepondants', name: 'Types de répondant', element: Typerepondant },
  { path: '/parametres/modalites', name: 'Modalités', element: Modalite },
  { path: '/parametres/thematiques', name: 'Thematique', element: Thematique },
  { path: '/parametres/dimensions', name: 'Dimension', element: Dimension },
  { path: '/parametres/variables', name: 'Variable', element: Variable },
  { path: '/parametres/questions', name: 'Question', element: Question },
  { path: '/administration/utilisateurs', name: 'Utilisateur', element: User },
  { path: '/administration/roles', name: 'Role', element: Role },
  { path: '/administration/permissions', name: 'Permission', element: Permission },
]

export default routes
