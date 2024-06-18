<template>
  <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <div class="icon-bar admin-bar">

        <h3 class="lg">Todak Todak</h3>

        <br>

          <router-link to="/admin/user" class="m">
            <p>고객 관리</p>
          </router-link>

          <router-link to="/admin/goods" class="m">
            <p>상품 관리</p>
          </router-link>

          <router-link to="/admin/qna" class="m">
            <p>Q&amp;A</p>
          </router-link>

          <router-link to="/admin/goods" class="m">
              <p>이벤트 관리</p>
          </router-link> 

          <router-link to="/admin/status" class="m">
              <p>주문 관리</p>
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

.admin-bar{font-family: GmarketSansMedium}

.admin-bar {
overflow-y: scroll;
-ms-overflow-style: none; /* 인터넷 익스플로러 */
scrollbar-width: none; /* 파이어폭스 */
}
.admin-bar::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

.admin-bar {
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
.admin-bar .m, .icon-bar p{
  color: #000000;
}

.admin-bar a {
  display: block;
  text-align: center;
  height: 60px;
  padding-top: 18px;
  padding-bottom: 18px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.admin-bar p {
  margin: auto;
  font-size: 14px;
  padding-top: 4px;
}

.admin-bar .m:hover{
  background-color: #a0a0a0;
}

.active {
  background-color: #a0a0a0;
}


</style>