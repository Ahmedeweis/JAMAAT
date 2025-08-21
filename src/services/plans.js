import api from "./axios";
export const getPlans = async (lang = "ar") => {
  try {
    const res = await api.get("/plan", {
      headers: {
        lang: lang
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};