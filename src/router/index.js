import { createRouter, createWebHistory } from "vue-router";

// layout
import DefaultLayout from "../layouts/defaultLayout.vue";
import MypageSidebar from "../layouts/MypageSidebar.vue";
import AdminpageSidebar from "../layouts/AdminpageSidebar.vue";

// user page
import Main from "../views/Main.vue"
import SignUpAgreement from "../views/SignUpAgreement.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import FindId from "../views/FindId.vue";
import FindPw from "../views/FindPw.vue";
import Basket from "../views/basket.vue";
import orderList from "../views/orderList.vue";
import about from "../views/about.vue";
import CategoryGoodsList from "../views/CategoryGoodsList.vue";
import EventList from "../views/EventList.vue";
import GoodsDetail from "../views/Detail.vue";
import OrderPay from "../views/orderPay.vue";
import QnaUpdate from "../views/QnaUpdate.vue";

// 404 page
import NotFoundPage from "../views/NotFoundPage.vue";

// mypage
import Profile from "../mypages/Profile.vue";
import Like from "../mypages/like.vue";
import DeleteProfile from "../mypages/DeleteProfile.vue"
import MypageMain from "../mypages/MypageMain.vue"
import UpdatePw from "../mypages/UpdatePw.vue";
import ReviewWrite from "../mypages/ReviewWrite.vue";
import Check from "../mypages/Check.vue";
import review from "../mypages/review.vue";

// admin page
import UserList from "../admin/UserList.vue";
import QnA from "../admin/QnA.vue";
import selectGoods from "../admin/selectGoods.vue";
import GoodsAdd from "../admin/goodsAdd.vue";
import GoodsUpdate from "../admin/goodsUpdate.vue";
import AdminOrderList from "../admin/orderList.vue";
import WriteQna from "../admin/WriteQna.vue"
import OrderManagement from "../admin/orderManagement.vue";




const routes = [
  {
    path: '/',
    name: "defaultLayout",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        component: Main
      },
      {
        path: "/about",
        name: "about",
        component: about,
      },
      {
        path: "/agreement",
        name: "SignUpAgreement",
        component: SignUpAgreement,
      },
      {
        path: "/join",
        name: "SignUp",
        component: SignUp,
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
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
        path: "/basket",
        name: "basket",
        component: Basket,
      },
      {
        path: "/goodsDetail/:goodsno",
        name: "GoodsDetail",
        component: GoodsDetail,
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
        path: '/orderpay/:ordertp/:goodsno/:total',
        name: "OrderPay",
        component: OrderPay
      },
      {
        path: "/qnaupdate",
        name: "QnaUpdate",
        component: QnaUpdate
      },
    ]
  },
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
      {
        path: 'reviewwrite',
        name: "ReviewWrite",
        component: ReviewWrite
      },
      {
        path: 'check',
        component: Check
      },
      {
        path: "orderList",
        name: "orderList",
        component: orderList,
      },
      {
        path: 'review',
        name: "review",
        component: review
      },
    ]
  },
  {
    path: "/admin/",
    name: "AdminpageSidebar",
    component: AdminpageSidebar,
    children: [
      {
        path: "goods",
        component: selectGoods,
      },
      {
        path: "goodscreate",
        name: "GoodsAdd",
        component: GoodsAdd,
      },
      {
        path: "goodsupdate/:goodsno",
        component: GoodsUpdate,
      },
      {
        path: 'qna',
        name: "QnA",
        component: QnA
      },
      {
        path: "userlist",
        name: "UserList",
        component: UserList
      },
      {
        path: "orderlist",
        name: "orderList",
        component: AdminOrderList,
      },
      {
        path: "order",
        component: OrderManagement,
      },
      {
        path: "writeqna",
        name: "WriteQna",
        component: WriteQna
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundPage
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