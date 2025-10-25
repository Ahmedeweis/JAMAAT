import api from "./axios";
// جلب جميع الكاتيجوريز بناءً على أي باراميتر، بما فيها اللعبة
export const getCategories = (
  { game, no_pagination = true } = {},
  lang = 'en'
) => {
  return api.get('/categories', {
    params: {
      game,
      no_pagination,
    },
    headers: {
      'lang': lang
    }
  });
};
// جلب كاتيجوري واحدة حسب الـ ID
export const getCategoryById = (id, game) => {
  return api.get(`/category/${id}`, {
    params: { game } // تمرير رقم اللعبة كـ param اختياري
  });
}
// جلب مجموعة كاتيجوريز حسب الـ IDs
export const getCategoriesByIds = (ids, game) => {
  return api.get('/categories', {
    params: {
      ids: ids.join(','),
      game // تمرير رقم اللعبة
    }
  });
}