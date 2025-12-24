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
    icon: <FontAwesomeIcon icon={faPieChart} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Types Répondants',
    to: '/typerepondants',
    icon: <FontAwesomeIcon icon={faUsers} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Répondants',
    to: '/repondants',
    icon: <FontAwesomeIcon icon={faUsers} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Thématiques',
    to: '/thematiques',
    icon: <FontAwesomeIcon icon={faObjectGroup} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Dimensions',
    to: '/dimensions',
    icon: <FontAwesomeIcon icon={faPaperPlane} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Variables',
    to: '/variables',
    icon: <FontAwesomeIcon icon={faCogs} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Questions',
    to: '/questions',
    icon: <FontAwesomeIcon icon={faHashtag} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Questionnaires',
    to: '/questionnaires',
    icon: <FontAwesomeIcon icon={faTasks} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Formulaire',
    to: '/formulaire',
    icon: <FontAwesomeIcon icon={faFile} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Résultats',
    to: '/resultats',
    icon: <FontAwesomeIcon icon={faCubes} className="me-1" />,
  },
  {
    component: CNavItem,
    name: 'Analyses',
    to: '/analyses',
    icon: <FontAwesomeIcon icon={faNewspaper} className="me-1" />,
  },
]

export default _nav
