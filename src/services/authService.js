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
export const verifyOTP = (otp, email) => {
  const formData = new FormData();
  formData.append("otp", otp);
  return api.post(`/auth/verifyToken/${otp}/${email}`, formData);
};
export const updateProfile = (payload) => {
  return api.put("/profile/update", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return api.post("/profile/upload-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const resendOTP = (email) => {
  return api.post(`/auth/resend-otp/${email}`);
};
export const getProfile = () => {
  return api.get("/user");
};
export const deleteAccount = () => {
  return api.delete(`/profile/delete-account`)
}
