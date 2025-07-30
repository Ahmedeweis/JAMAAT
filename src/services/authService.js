import api from "./axios";
// تسجيل الدخول
export const login = (payload) => {
  return api.post("/login", payload);
};
// تسجيل حساب جديد
export const register = (payload) => {
  return api.post("/register", payload);
};
// الحصول على بيانات المستخدم
export const getProfile = () => {
  return api.get("/user");
};
