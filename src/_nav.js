import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPieChart,
  faUsers,
  faObjectGroup,
  faPaperPlane,
  faCogs,
  faHashtag,
  faTasks,
  faFile,
  faCubes,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Tableau de bord',
    to: '/dashboard',
    user: '*',
    icon: <FontAwesomeIcon icon={faPieChart} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Types Répondants',
    to: '/typerepondants',
    user: '*',
    icon: <FontAwesomeIcon icon={faUsers} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Répondants',
    to: '/repondants',
    user: '*',
    icon: <FontAwesomeIcon icon={faUsers} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Thématiques',
    to: '/thematiques',
    user: '*',
    icon: <FontAwesomeIcon icon={faObjectGroup} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Dimensions',
    to: '/dimensions',
    user: '*',
    icon: <FontAwesomeIcon icon={faPaperPlane} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Variables',
    to: '/variables',
    user: '*',
    icon: <FontAwesomeIcon icon={faCogs} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Questions',
    to: '/questions',
    user: '*',
    icon: <FontAwesomeIcon icon={faHashtag} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Questionnaires',
    to: '/questionnaires',
    user: '*',
    icon: <FontAwesomeIcon icon={faTasks} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Formulaire',
    to: '/formulaire',
    user: '*',
    icon: <FontAwesomeIcon icon={faFile} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Résultats',
    to: '/resultats',
    user: '*',
    icon: <FontAwesomeIcon icon={faCubes} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Analyses',
    to: '/analyses',
    user: '*',
    icon: <FontAwesomeIcon icon={faNewspaper} className="me-1" />,
  },
]

export default _nav
