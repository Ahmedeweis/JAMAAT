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
    path: "/verify-otp",
    name: "Verify-otp",
    component: () => import("../views/Auth/verify-otp.vue"),
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
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Auth/profile.vue"),
  },
  {
    path: "/FAQ",
    name: "FAQ",
    component: () => import("../views/Addtions/FAQ.vue"),
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () => import("../views/Addtions/Contact.vue"),
  },
  {
    path: "/MakeGame",
    name: "MakeGame",
    component: () => import("../views/Games/MakeGame.vue"),
  },
  {
    path: "/apitest",
    name: "Apitest",
    component: () => import("../views/test/apitest.vue"),
  },
    {
    path: "/startgame",
    name: "StartGame",
    component: () => import("../views/Games/Game1/Gameintro.vue"),
  },
  {
    path: "/ChooseGame",
    name: "ChooseGame",
    component: () => import("../views/Games/ChooseGame.vue"),
  },
  {
    path: "/Homescreen",
    name: "Homescreen",
    component: () => import("../views/Games/Game1/Homescreen.vue"),
  },
    {
    path: "/WinGame",
    name: "WinGame",
    component: () => import("../views/Games/Game1/WinGame.vue"),
  },
      {
    path: "/connectintro",
    name: "connectintro",
    component: () => import("../views/Games/Game2/connectintro.vue"),
  },
  {
    path: "/chooseplayer",
    name: "chooseplayer",
    component: () => import("../views/Games/Game2/chooseplayer.vue"),
  },
    {
    path: "/Homeconnect",
    name: "Homeconnect",
    component: () => import("../views/Games/Game2/Homeconnect.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
