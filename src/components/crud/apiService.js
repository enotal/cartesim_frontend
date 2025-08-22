import axios from 'axios'
import KeycloakService from '../../KeycloakService'

// const API_BASE_URL = 'http://optiacademiqplus.uv.bf:8080/api/'
export const API_BASE_URL = 'http://localhost:8000/api/'

export const getData = async (apiResource) => {
  try {
    const response = await axios.get(API_BASE_URL + apiResource)
    return response.data.data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error // Re-throw to allow component-level error handling
  }
}

export const createItem = async (apiResource, resourceData) => {
  try {
    const response = await axios.post(API_BASE_URL + apiResource, resourceData)
    return response.data
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export const updateItem = async (apiResource, editingRowId, resourceData) => {
  try {
    const response = await axios.patch(API_BASE_URL + apiResource + editingRowId, resourceData)
    return response.data
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

export const deleteItem = async (apiResource, idsToDelete) => {
  try {
    const response = await axios.delete(API_BASE_URL + apiResource + idsToDelete)
    return response.data
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

// Intercepteur qui ajoute le token d'authentification à chaque requête
/*api.interceptors.request.use(
  async (config) => {
    await KeycloakService.updateToken(30).catch(() => {
      KeycloakService.login()
    })

    const token = KeycloakService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.debug('[DEBUG] Token envoyé : ', token)
    }
    return config
  },
  (error) => Promise.reject(error),
)*/
