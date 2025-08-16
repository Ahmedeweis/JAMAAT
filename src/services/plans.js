import api from "./axios";
export const getPlans = async () => {
  try {
    const res = await api.get("/plan");
    return res.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};