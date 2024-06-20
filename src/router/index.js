import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import adminSideBar from "../layouts/mypageSideBar.vue";
import footer from "../layouts/footer.vue";
import header from "../layouts/header.vue";
import Main from "../views/Main.vue"
import Basket from "../views/basket.vue";
import LoginView from "../views/LoginView";
import SignUp from "../views/SignUp.vue";
import SignUpAgreement from "../views/SignUpAgreement.vue";
import Login from "../views/Login.vue";
import orderList from "../views/orderList.vue";



import GoodsAdd from "../admin/goodsAdd.vue";
import GoodsDetail from "../views/Detail.vue";

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
  },
  {
    path: "/auth",
    name: "loginView",
    component: LoginView,
  },
  {
    path: "/join",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/agreement",
    name: "SignUpAgreement",
    component: SignUpAgreement,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/orderList",
    name: "orderList",
    component: orderList,
  },
  {
    path: "/goodsAdd",
    name: "GoodsAdd",
    component: GoodsAdd,
  },
  {
    path: "/goodsDetail/:goodsno",
    name: "GoodsDetail",
    component: GoodsDetail,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
