import axios from 'axios'
// import KeycloakService from '../../KeycloakService'
import KeycloakService from './KeycloakService'

// const API_BASE_URL = 'http://optiacademiqplus.uv.bf:8080/api/'
export const API_BASE_URL = 'http://localhost:8000/api/'

// List
export const getData = async (apiResource) => {
  try {
    const response = await axios.get(API_BASE_URL + apiResource)
    return response.data.data
  } catch (error) {
    return error.response
    // console.error('Error fetching user data:', error)
    // throw error // Re-throw to allow component-level error handling
  }
}

// Show
export const getItem = async (apiResource) => {
  try {
    const response = await axios.get(API_BASE_URL + apiResource)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error fetching user data:', error)
    // throw error // Re-throw to allow component-level error handling
  }
}

// Store
export const createItem = async (apiResource, resourceData) => {
  try {
    const response = await axios.post(API_BASE_URL + apiResource, resourceData)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error creating post:', error)
    // throw error
  }
}

// Update
export const updateItem = async (apiResource, resourceData) => {
  try {
    const response = await axios.patch(API_BASE_URL + apiResource, resourceData)
    return response
  } catch (error) {
    return error.response
    // console.error('Error updating post:', error)
    // throw error
  }
}

// Delete
export const deleteItem = async (apiResource) => {
  try {
    const response = await axios.delete(API_BASE_URL + apiResource)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error deleting post:', error)
    // throw error
  }
}


