import Keycloak from 'keycloak-js'
import { isAuthenticated } from './authService'

const isLoggedIn = isAuthenticated()

const keycloakConfig = {
  url: 'https://login.campusfaso.bf/auth/realms/campusFaso',
  realm: 'campusFaso',
  clientId: 'optiacademiqplus',
}

const keycloak = new Keycloak(keycloakConfig)

let initPromise = null // Promesse d'initialisation partagée

export const KeycloakService = {
  instance: keycloak,

  init: (options = {}) => {
    if (!initPromise) {
      initPromise = keycloak
        .init(options)
        .then((isLoggedIn) => {
          return isLoggedIn
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
