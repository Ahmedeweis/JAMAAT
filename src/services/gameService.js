import api from "./axios";
// Get all games
export const getGames = () => {
  return api.get('/games')
};
export const getGameById = (id) => {
  return api.get(`/game/${id}`)
}
// Create a new game
export const createGame = (data) => {
  return api.post('/game-category', data)
}
// Get games assigned to current user
export const getUserGames = () => {
  return api.get('/user-game');
};
