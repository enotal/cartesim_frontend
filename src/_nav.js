import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilDescription,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilGroup,
  cilCommentBubble,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // Dashboard
  {
    component: CNavItem,
    name: 'Tableau de bord',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // Parameters
  // {
  //   component: CNavTitle,
  //   name: 'Paramètres',
  // },
  {
    component: CNavItem,
    name: 'Répondants',
    to: '/repondants',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Thématiques',
    to: '/thematiques',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dimensions',
    to: '/dimensions',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Questions',
    to: '/questions',
    icon: <CIcon icon={cilCommentBubble} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Questionnaires',
    to: '/questionnaires',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    // className:"border-top border-bottom border-light"
  },
  // Formulaire
  {
    component: CNavItem,
    name: 'Formulaire',
    to: '/formulaire',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Résultats',
    to: '/resultats',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Analyses',
    to: '/analyses',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default _nav
