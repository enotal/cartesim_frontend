//== Keycloak-js

import Keycloak from 'keycloak-js'
import { isAuthenticated } from './authService'

const keycloakConfig = {
  url: 'http://localhost:8189',
  realm: 'optiacademiqplus',
  clientId: 'optiacademiqplus-front',
}

const keycloak = new Keycloak(keycloakConfig)

let initPromise = null // Promesse d'initialisation partagée

export const KeycloakService = {
  instance: keycloak,

  init: (options = {}) => {
    if (!initPromise) {
      initPromise = keycloak
        .init(options)
        .then((authenticated) => {
          return authenticated
        })
        .catch((error) => {
          // Réinitialisation si échec pour retenter proprement
          initPromise = null
          throw error
        })
    }
    return initPromise
  },

  login: (options) => keycloak.login(options),
  logout: (options) => keycloak.logout(options),
  isAuthenticated: () => keycloak.authenticated,
  getToken: () => keycloak.token,
  getTokenParsed: () => keycloak.tokenParsed,
  hasRole: (role) => keycloak.hasRealmRole(role),
  updateToken: (minValidity) => keycloak.updateToken(minValidity),
}

export default KeycloakService
