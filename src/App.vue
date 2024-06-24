<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from "./layouts/header.vue";
import Footer from "./layouts/footer.vue";
import MypageLayout from "./layouts/mypageLayout.vue";
import MypageSidebar from "./layouts/mypageSideBar.vue";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    MypageLayout,
    MypageSidebar
  }
}
</script>