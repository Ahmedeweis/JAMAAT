import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    user: null,
  }),
  actions: {
    setUserData(payload) {
      this.token = payload.token;
      this.user = payload.user;
    },
    clearUserData() {
      this.token = "";
      this.user = null;
    },
  },
});
