import api from "./axios";
export const ContactUs = (payload) => {
  return api.post("/contact-us", payload);
};
export const GetFAQ = () => {
  return api.get("/faqs");
};
