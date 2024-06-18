<template>
  <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <div class="icon-bar mypage-bar">

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

@font-face {
font-family: 'GmarketSansMedium';
font-family: 'GmarketSansLight';
src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff');
font-weight: normal;
font-style: normal;
}

.mypage-bar{font-family: GmarketSansMedium}

.mypage-bar {
overflow-y: scroll;
-ms-overflow-style: none; /* 인터넷 익스플로러 */
scrollbar-width: none; /* 파이어폭스 */
}
.mypage-bar::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

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

/* icon */
.mypage-bar .m, .icon-bar p{
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