import api from "./axios";
export async function getAvailablePaymentMethods(invoiceAmount, currencyIso) {
  try {
    const res = await api.post("/availabel-payment-methods", {
      InvoiceAmount: invoiceAmount,
      CurrencyIso: currencyIso,
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching payment methods:", err);
    throw err;
  }
}