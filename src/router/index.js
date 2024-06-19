import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
<<<<<<< HEAD
import adminSideBar from "../layouts/mypageSideBar.vue";
import footer from "../layouts/footer.vue";
import header from "../layouts/header.vue";
import Main from "../views/Main.vue"

import Basket from "../views/basket.vue";

import LoginView from "../views/LoginView";
=======
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
>>>>>>> c35912dea7c1ee4e226007d6d1c424d327066aa9

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
<<<<<<< HEAD
    path: "/sidebar",
    name: "adminSideBar",
    component: adminSideBar,
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/footer",
    name: "footer",
    component: footer,
  },
  {
    path: "/header",
    name: "header",
    component: header,
  },
  {
    path: "/basket",
    name: "basket",
    component: Basket,
  }
=======
    path: "/join",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
>>>>>>> c35912dea7c1ee4e226007d6d1c424d327066aa9
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
