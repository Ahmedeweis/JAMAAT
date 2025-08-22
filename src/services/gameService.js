import api from "./axios";
// Get all games
export const getGames = (lang) => {
  return api.get("/games", {
    headers: {
      lang:lang
    }
  });
};
export const getGameById = (id) => {
  return api.get(`/game/${id}`)
}
// Create a new game
export const createGame = (data) => {
  return api.post('/game-category', data)
}
// Get games assigned to current user
export const getUserGames = (lang) => {
  return api.get("/user-game", {
    headers: {
         lang:lang
    }
  });
};
