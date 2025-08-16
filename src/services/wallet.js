import api from "./axios";
export const getWalletBalance = async () => {
  try {
    const res = await api.get("/wallet");
    console.log("Wallet response:", res); // 👈 اطبع الريسبونس كله
    return res;
  } catch (err) {
    console.error("Wallet error:", err.response || err);
    throw err;
  }
};
export const rechargeWallet = (amount) => {
  return api.post("/wallet/recharge", { amount });
};