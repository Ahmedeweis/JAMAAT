import api from "./axios";
export const GetFAQ = (lang) => {
  return api.get("/question", {
    headers: {
      "lang": lang
    }
  });
};
export const createQuestion = (payload, lang) => {
  return api.post("/question", payload, {
    headers: {
      "lang": lang
    }
  });
};