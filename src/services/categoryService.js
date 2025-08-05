import api from "./axios";
export const getCategories = () => {
  return api.get('/categories?per_page=100');
}
// Get one category by ID
export const getCategoryById = (id) => {
  return api.get(`/category/${id}`)
}
