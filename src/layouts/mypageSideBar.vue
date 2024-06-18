<template>
  <div>
      <div class="mypage-bar">

        <h3>마이 페이지</h3>

        <br>

        <p class="lm">회원 정보</p>

          <router-link to="/mypage" class="m">
            <p>내 정보</p>
          </router-link>

          <router-link to="/checkPw" class="m">
            <p>개인정보 수정</p>
          </router-link>

          <router-link to="/mypage" class="m">
            <p>회원 탈퇴</p>
          </router-link>

          <p class="lm">나의 쇼핑 정보</p>

          <router-link to="/mypage/check" class="m">
              <p>주문 내역</p>
          </router-link> 

          <router-link to="/mypage/qna" class="m">
              <p>문의 내역</p>
          </router-link>

          <router-link to="/mypage/review" class="m">
              <p>리뷰 관리</p>
          </router-link>
      </div>
  </div>
</template>

<style>

.mypage-bar {
  height: 100%;
  width: 100px;
  position: fixed; 
  /* z-index: 2; /* Stay on top */
  top: 150px; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  background-color: rgb(255, 255, 255);
}

.mypage-bar .m, p{
  color: #000000;
}

.mypage-bar a {
  display: block;
  text-align: center;
  height: 60px;
  padding-top: 18px;
  padding-bottom: 18px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.mypage-bar p {
  margin: auto;
  font-size: 14px;
  padding-top: 4px;
}

.mypage-bar .m:hover{
  background-color: #a0a0a0;
}

.active {
  background-color: #a0a0a0;
}


</style>