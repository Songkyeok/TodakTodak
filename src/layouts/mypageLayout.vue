<template>
    <div>
        <Header />  
        <div class="content">
          <mypage-side-bar></mypage-side-bar>
          <topbar></topbar>
            <router-view></router-view>
        </div>
        <Footer />
    </div>
  </template>
  
  <script>
  import MypageSideBar from './mypageSideBar.vue'
  import Header from './header.vue'
  import Footer from './footer.vue'
  
  export default {
  name: 'app',
  components: {
    MypageSideBar, Header, Footer
  }
  }
  </script>
  
  <style scoped>
  .content{
  padding-left:150px; 
  margin: auto;
  }
  .nev.nevbar{
    padding: 0;
  }

  Footer {
  width: 100%;
  height: auto;
  position : relative;
  transform : translateY(-1%);
  }
  </style>