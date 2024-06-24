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
import EventList from "../views/EventList.vue";
import Tableware from "../views/Tableware.vue";
import BathStuff from "../views/BathStuff.vue";
import Outside from "../views/Outside.vue";
import BabyStuff from "../views/BabyStuff.vue";
import CleanStuff from "../views/CleanStuff.vue";
import Toy from "../views/Toy.vue";



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
    path: "/eventList",
    name: "EventList",
    component: EventList
  },
  {
    path: "/tableware",
    name: "Tableware",
    component: Tableware
  },
  {
    path: "/bathstuff",
    name: "BathStuff",
    component: BathStuff
  },
  {
    path: "/outside",
    name: "Outside",
    component: Outside
  },
  {
    path: "/babystuff",
    name: "BabyStuff",
    component: BabyStuff
  },
  {
    path: "/cleanstuff",
    name: "CleanStuff",
    component: CleanStuff
  },
  {
    path: "/toy",
    name: "Toy",
    component: Toy
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
