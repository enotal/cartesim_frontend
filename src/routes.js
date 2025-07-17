import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Thematique = React.lazy(() => import('./views/thematiques/Thematique'))
const Dimension = React.lazy(() => import('./views/dimensions/Dimension'))
const Variable = React.lazy(() => import('./views/variables/Variable'))
const Question = React.lazy(() => import('./views/questions/Question'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/parametres/thematiques', name: 'Thematique', element: Thematique },
  { path: '/parametres/dimensions', name: 'Dimension', element: Dimension },
  { path: '/parametres/variables', name: 'Variable', element: Variable },
  { path: '/parametres/questions', name: 'Question', element: Question },
]

export default routes
