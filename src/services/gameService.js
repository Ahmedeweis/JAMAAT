import api from "./axios";
// Get all games
export const getGames = () => {
  return api.get('/game')
}
// Get a game by ID
export const getGameById = (id) => {
  return api.get(`/game/${id}`)
}
// Create a new game
export const createGame = (data) => {
  return api.post('/game-category', data)
}