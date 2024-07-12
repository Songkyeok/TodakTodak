<template>
  <Header />
  <div class="adminpage-bar">
    <h3 class="title_text">관리자 페이지</h3>
    <div class="adminpage_nav">
      <ul>
        <li>
          주요 관리
          <ul>
            <li>
              <span @click="goToGoods">- 상품 관리</span>
            </li>
            <li>
              <span @click="goToStatus">- 주문 관리</span>
            </li>
            <li>
              <span @click="goToUserList">- 고객 관리</span>
            </li>
            <li>
              <span @click="goToEvent">- 이벤트 관리</span>
            </li>
          </ul>
        </li>
        <li>
          후기 관리
          <ul>
            <li>
              <span @click="goToReview">- 리뷰 관리</span>
            </li>
            <li>
              <span @click="goToQna">- Q&amp;A 관리</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import Header from './header.vue';

export default {
  components: {
    Header
  },
  methods: {
    goToGoods() {
      this.$router.push({
        path: '/admin'
      });
    },
    goToStatus() {
      this.$router.push({
        path: '/admin/orderlist'
      });
    },
    goToUserList() {
      this.$router.push({
        path: '/admin/userlist'
      });
    },
    goToEvent() {
      this.$router.push({
        path: '/admin/event'
      });
    },
    goToReview() {
      this.$router.push({ path: '/admin/review' });
    },
    goToQna() {
      this.$router.push({ path: '/admin/qna' });
    },
  }
}
</script>

<style>
.adminpage-bar {
  height: 100%;
  width: 10%;
  position: relative;
  background-color: rgb(255, 255, 255);
  margin: 80px 2% 0 5%;
  min-height: 250px;
  display: inline-block;
}

.title_text {
  padding: 0 0 14px 10px;
  border-bottom: 1px solid #ececec;
}

.adminpage_nav>ul {
  margin: 7px 0 0 0;
}

.adminpage_nav > ul > li {
    padding: 8px 0 15px 0;
    font-size: 14px;
    font-weight: bold;
    background: url("../assets/img/mypage/lnb_tit.png") no-repeat top left;
  }
.adminpage_nav>ul>li:first-child {
  margin: 30px 0 0 0;
}

.adminpage_nav>ul>li>ul {
  margin: 5px 0 25px 0;
}

.adminpage_nav>ul>li>ul>li {
  padding: 1px 0 0 0;
  font-weight: normal;
  font-size: 12px;
  text-indent: 10px;
  padding: 7px 0 6px 0;
}

.adminpage_nav>ul>li>ul>li>span {
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>