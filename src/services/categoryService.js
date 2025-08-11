import api from "./axios";
export const getCategories = (params = {}) => {
  return api.get('/categories', {
    params: {
      per_page: 100,
      ...params,
    },
  });
};
// Get one category by ID
export const getCategoryById = (id) => {
  return api.get(`/category/${id}`)
}
