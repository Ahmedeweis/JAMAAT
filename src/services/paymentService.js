import api from "./axios";
export async function getAvailablePaymentMethods(invoiceAmount, currencyIso, lang = "en") {
  try {
    const res = await api.post(
      "/availabel-payment-methods",
      {
        InvoiceAmount: invoiceAmount,
        CurrencyIso: currencyIso,
      },
      {
        headers: {
          lang: lang, // هنا بنبعت اللغة
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching payment methods:", err);
    throw err;
  }
}