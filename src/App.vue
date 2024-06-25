<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from "./layouts/header.vue";
import Footer from "./layouts/footer.vue";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>