import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/js/all.js'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'
import './styles.css'

// Containers
const Home = React.lazy(() => import('./Home'))
const DemandeGuestSoumettre = React.lazy(() => import('./views/demandes/DemandeGuestSoumettre'))
const DemandeGuestSuivre = React.lazy(() => import('./views/demandes/DemandeGuestSuivre'))
const SimDeclarerPerte = React.lazy(() => import('./views/sims/SimDeclarerPerte'))
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('cartesim.auth'))
    setAuth(auth)
  }, [])

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" name="Accueil" element={<Home />} />
          <Route
            path="/demandes/soumettre"
            name="DemandeGuestSoumettre"
            element={<DemandeGuestSoumettre />}
          />
          <Route
            path="/demandes/suivre"
            name="DemandeGuestSuivre"
            element={<DemandeGuestSuivre />}
          />
          <Route
            path="/sims/declarer/perte"
            name="SimDeclarerPerte"
            element={<SimDeclarerPerte />}
          />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="*" name="Dashboard" element={<DefaultLayout auth={auth} />} />
          </Route>
          {/*  */}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
