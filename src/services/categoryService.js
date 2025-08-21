import api from "./axios";
export const getCategories = (params = {}, lang) => {
  return api.get('/categories', {
    params: {
      // per_page: 100,
      ...params,
    },
    headers: {
      'lang': lang
    }
  });
};
// Get one category by ID
export const getCategoryById = (id) => {
  return api.get(`/category/${id}`)
}
export const getCategoriesByIds = (ids) => {
  return api.get('/categories', {
    params: { ids: ids.join(',') }
  })
}
