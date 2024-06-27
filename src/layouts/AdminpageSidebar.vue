<template>
    <div class="adminpage-bar">
      <h3 class="title_text">관리자 페이지</h3>
      <div class="adminpage_nav">
        <ul>
            <ul>
              <li>
                <span @click="goToUserList">- 회원 관리</span>
              </li>
            </ul>
            <br />
            <ul>
              <li>
                <span @click="goToCheck">- 상품 관리</span>
              </li>
            </ul>
            <br />
            <ul>
              <li>
                <span @click="goToQna">- Q&A 관리</span>
              </li>
            </ul>
            <br />
            <ul>
              <li>
                <span @click="goToReview">- 이벤트 관리</span>
              </li>
            </ul>
            <br />
            <ul>
              <li>
                <span @click="goToReview">- 리뷰 관리</span>
              </li>
            </ul>
        </ul>
      </div>
    </div>
  </template>

  <script>
  export default {
    methods: {
      goToUserList() {
        this.$router.push({ path: '/userlist' });
      },
    //   goToProfile() {
    //     this.$router.push({ path: '/mypage/profile' });
    //   },
    //   goToCheck() {
    //     this.$router.push({ path: '/mypage/check' });
    //   },
    //   goToQna() {
    //     this.$router.push({ path: '/mypage/qna' });
    //   },
    //   goToReview() {
    //     this.$router.push({ path: '/mypage/review' });
    //   },
    }
  }
  </script>
  
  <style>
    .adminpage-bar {
      height: 100%;
      width: 10%;
      position: relative;
      background-color: rgb(255, 255, 255);
      margin: 80px 5% 0 5%;
      min-height: 250px;
      display:inline-block;
    }
    .title_text {
      padding: 0 0 14px 10px;
      border-bottom: 1px solid #ececec;
    }
    .adminpage_nav > ul {
      margin: 7px 0 0 0;
    }
    /* .mypage_nav > ul > li {
      padding: 8px 0 15px 0;
      font-size: 14px;
      font-weight: bold;
      background: url("../assets/img/mypage/lnb_tit.png") no-repeat top left;
    } */
    .adminpage_nav > ul > li:first-child {
      margin: 30px 0 0 0;
    }
    .adminpage_nav > ul > li > ul {
      margin: 5px 0 25px 0;
    }
    .adminpage_nav > ul > li > ul > li {
      padding: 1px 0 0 0;
      font-weight: normal;
      font-size: 12px;
      text-indent: 10px;
      padding: 7px 0 6px 0;
    }
    .adminpage_nav > ul > ul > li > span {
      cursor: pointer;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
  </style>
  