import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilDescription,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilGroup,
  cilUserPlus,
  cilGrain,
  cilLockUnlocked,
  cilCommentBubble,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Tableau de bord',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Formulaire 1',
  //   to: '/formulaire1',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'FORMULAIRE',
  },
  {
    component: CNavItem,
    name: 'Parcours & Performance',
    to: '/formulaire/pipa',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Qualité & Pédagogie',
    to: '/formulaire/qeap',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Suivi & Insertion',
    to: '/formulaire/spis',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Gouvernance',
    to: '/formulaire/gici',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: '',
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
  {
    component: CNavTitle,
    name: 'Paramètres',
  },
  {
    component: CNavItem,
    name: 'Thématiques',
    to: '/parametres/thematiques',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dimensions',
    to: '/parametres/dimensions',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Variables',
    to: '/parametres/variables',
    icon: <CIcon icon={cilGrain} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Questions',
    to: '/parametres/questions',
    icon: <CIcon icon={cilCommentBubble} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Administration',
  },
  {
    component: CNavItem,
    name: 'Rôles',
    to: '/administration/roles',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Utilisateurs',
    to: '/administration/utilisateurs',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Permissions',
    to: '/administration/permissions',
    icon: <CIcon icon={cilLockUnlocked} customClassName="nav-icon" />,
  },
]

export default _nav
