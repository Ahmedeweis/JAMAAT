import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/FirstP.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Auth/Signup.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Auth/Login.vue"),
  },
  {
    path: "/verify",
    name: "Verify",
    component: () => import("../views/Auth/verify.vue"),
  },
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
    component: () => import("../views/Auth/forgetpassword.vue"),
  },
  {
    path: "/changepassword",
    name: "Changepassword",
    component: () => import("../views/Auth/changepassword.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/main.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
