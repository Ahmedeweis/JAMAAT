import api from "./axios";
export const register = (payload) => {
  return api.post("/register", payload);
};
export const login = (payload) => {
  return api.post("/login", payload);
};
export const resendVerificationCode = (email) => {
  return api.get(`/auth/resend-otp/${email}`);
};
export const verifyOTP = (payload) => {
  return api.post("/auth/verify-otp", payload);
};
export const getProfile = () => {
  return api.get("/user");
};
