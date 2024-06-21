import { createRouter, createWebHistory } from "vue-router";
import adminSideBar from "../layouts/mypageSideBar.vue";

import Main from "../views/Main.vue"
import Basket from "../views/basket.vue";
import SignUp from "../views/SignUp.vue";
import SignUpAgreement from "../views/SignUpAgreement.vue";
import Login from "../views/Login.vue";
import orderList from "../views/orderList.vue";
import findId from "../views/findId.vue";
import about from "../views/about.vue";
import Tableware from "../views/Tableware.vue";



import GoodsAdd from "../admin/goodsAdd.vue";
import GoodsDetail from "../views/Detail.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/about",
    name: "about",
    component: about,
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
    path: "/basket",
    name: "basket",
    component: Basket,
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
  },
  {  
    path: "/findId",
    name: "findId",
    component: findId,

  },
  {
    path: "/tableware",
    name: "Tableware",
    component: Tableware
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
