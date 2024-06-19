<template>
  <div>
      <div class="admin-bar">

        <router-link to ="/">
        <img src="../assets/logo2.png"/>
        </router-link>

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

img {
    width: 100px;
    height: auto;
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

.admin-bar .m, p{
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