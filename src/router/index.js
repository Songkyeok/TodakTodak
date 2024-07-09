import { createRouter, createWebHistory } from "vue-router";

import Main from "../views/Main.vue"
import Basket from "../views/basket.vue";
import SignUp from "../views/SignUp.vue";
import SignUpAgreement from "../views/SignUpAgreement.vue";
import Login from "../views/Login.vue";
import orderList from "../views/orderList.vue";
import FindId from "../views/FindId.vue";
import FindPw from "../views/FindPw.vue";
import about from "../views/about.vue";
import CategoryGoodsList from "../views/CategoryGoodsList.vue";
import Profile from "../mypages/Profile.vue"
import EventList from "../views/EventList.vue";
import UserList from "../admin/UserList.vue";
import QnA from "../admin/QnA.vue";
import Like from "../mypages/like.vue";
import DeleteProfile from "../mypages/DeleteProfile.vue"
selectGoods
import MypageMain from "../mypages/MypageMain.vue"
import UpdatePw from "../mypages/UpdatePw.vue";
import MypageSidebar from "../layouts/MypageSidebar";

import GoodsDetail from "../views/Detail.vue";
import OrderPay from "../views/orderPay.vue";

import selectGoods from "../admin/selectGoods.vue";
import GoodsAdd from "../admin/goodsAdd.vue";

import ReviewWrite from "../views/ReviewWrite.vue";

import QnaUpdate from "../views/QnaUpdate.vue";

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
  // {
  //   path: "/sidebar",
  //   name: "adminSideBar",
  //   component: adminSideBar,
  // },
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
    path: "/admin/goods",
    component: selectGoods,
  },
  {
    path: "/admin/goodscreate",
    name: "GoodsAdd",
    component: GoodsAdd,
  },
  {
    path: '/admin/qna',
    name: "QnA",
    component: QnA
  },
  {
    path: "/goodsDetail/:goodsno",
    name: "GoodsDetail",
    component: GoodsDetail,
  },
  {  
    path: "/findId",
    name: "FindId",
    component: FindId,
  },
  {  
    path: "/findPw",
    name: "FindPw",
    component: FindPw,
  },
  {
    path: "/categoryGoodsList/:category",
    name: "CategoryGoodsList",
    component: CategoryGoodsList
  },
  {
    path: "/eventList",
    name: "EventList",
    component: EventList
  },
  {
    path: "/admin/userlist",
    name: "UserList",
    component: UserList
  },
  {
    path: '/orderpay/:ordertp/:goodsno/:total',
    name: "OrderPay",
    component: OrderPay
  },
  {
    path: '/qnaupdate',
    name: "QnaUpdate",
    component: QnaUpdate
  },
  // 리뷰작성
  {
    path: "/reviewwrite",
    name: "ReviewWrite",
    component: ReviewWrite
  },
  // 마이페이지
  {
    path: "/mypage/",
    name: "MypageSidebar",
    component: MypageSidebar,
    children: [
      {
        path: '',
        name: "MypageMain",
        component: MypageMain
      },
      {
        path: 'profile',
        name: "Profile",
        component: Profile
      },
      {
        path: 'updatePw',
        name: "UpdatePw",
        component: UpdatePw
      },
      {
        path: 'deleteprofile',
        name: "DeleteProfile",
        component: DeleteProfile
      },
      {
        path: 'like',
        component: Like
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const isLogin = ['/mypage', '/admin'];

router.beforeEach(function(to, from, next) {
  const user_no = router.user.user.user_no;
  const user_tp = router.user.user.user_tp;

  const requiresLogin = isLogin.some(route => to.path.startsWith(route));
  const requiresAdmin = to.path.startsWith('/admin');

  if(requiresLogin && user_no == '') {
    next({
      path: "/login"
    })
  } else if(requiresAdmin && user_tp !== 1) {
    alert("관리자만 접근 가능합니다.");
    next({
      path: "/"
    })
  } else {
    next();
  }
})

export default router;