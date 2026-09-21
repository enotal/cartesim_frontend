import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import './GuestLayoutStyle.css'
import { IMAGES } from '../constants/images'

const GuestLayout = () => {
  const isAuthenticated = false

  // Redirect to dashboard if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="layout-container">
      <header className="app-header">
        <div className="brand d-flex align-items-center gap-2 px-6">
          <div className="">
            <img src={IMAGES.logo} alt="" className="uvbfLogo" />
          </div>
          <div className="">
            <div className="etsName">UV-BF</div>
            <div className="etsCommercial">salles</div>
          </div>
        </div>
        <div className="rounded-fulljustify-content-end gap-1">Vous n'êtes pas connecté(e) !</div>
      </header>

      <main className="content-wrapper">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="footer-copyright">&copy; 2025 UV-BF</div>
        <div>-</div>
        <div className="footer-rights">Tous droits réservés</div>
        {/* <div>-</div>
        <Link to="/about" className="footer-about py-0 border-0">
          A propos
        </Link> */}
      </footer>
    </div>
  )
}

export default GuestLayout
