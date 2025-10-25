import api from "./axios";
export const getCategories = async (gameId = null, noPagination = false) => {
    const params = {};
    if (gameId) params.game = gameId;
    if (noPagination) params.no_pagination = true;
    const res = await api.get("/categories", { params });
    return res.data;
};
export const getCategoriesWithLimit = async (gameId, limit = 10) => {
    const res = await api.get("/categories", {
        params: { game: gameId, per_page: limit },
    });
    return res.data;
};
export const getCategoryQuestions = async (categoryId) => {
    const res = await api.get(`/categories/${categoryId}/questions`, {
        params: { no_pagination: true },
    });
    return res.data;
};
