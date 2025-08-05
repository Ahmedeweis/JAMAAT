import api from "./axios";
export const getQuestions = () => {
  return api.get('/question')
}
export const createQuestion = (payload) => {
  return api.post('/question', payload)
}
