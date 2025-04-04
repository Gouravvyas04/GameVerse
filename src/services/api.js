import axios from 'axios'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

// Create axios instance with default params
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
})

export const fetchGames = async (params = {}) => {
  try {
    const response = await api.get('/games', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching games:', error)
    throw error
  }
}

export const fetchGameDetails = async (gameId) => {
  try {
    const response = await api.get(`/games/${gameId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching game details for ID ${gameId}:`, error)
    throw error
  }
}

export const fetchGameScreenshots = async (gameId) => {
  try {
    const response = await api.get(`/games/${gameId}/screenshots`)
    return response.data.results
  } catch (error) {
    console.error(`Error fetching screenshots for game ID ${gameId}:`, error)
    throw error
  }
}

export const fetchGenres = async () => {
  try {
    const response = await api.get('/genres')
    return response.data.results
  } catch (error) {
    console.error('Error fetching genres:', error)
    throw error
  }
}

export const fetchTags = async () => {
  try {
    const response = await api.get('/tags')
    return response.data.results
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw error
  }
}

export default api