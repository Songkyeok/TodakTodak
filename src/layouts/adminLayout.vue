<template>
    <div>
      <div class="content">
        <admin-side-bar></admin-side-bar>
        <topbar></topbar>
        <router-view></router-view>
      </div>
      <Footer />
    </div>
</template>

<script>
import AdminSideBar from './adminSideBar.vue'
import Footer from './footer.vue'

export default {
  name: 'app',
  components: {
    AdminSideBar, Footer
  }
}
</script>

<style scoped>

* {margin: 0; padding: 0;}
.content{
  padding-left:130px; 
  padding-right:30px;
  max-width: 1200px;
  margin: auto;
}

Footer {
  width: 100%;
  height: auto;
  position : relative;
  transform : translateY(-1%);
  }

</style>
