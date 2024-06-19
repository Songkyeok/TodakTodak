<template>
  <div>
    <Header />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>


<script>
import Header from './header.vue'
import Footer from './footer.vue'

export default {
  components: {
    Header, Footer
  }
}
</script>

<style>
* {
     scroll-behavior: smooth;
}

.content {
  padding-top: 150px;
  margin: auto;
  height: 100%;
  position: relative;
  min-height: 100%;
}

body {
  overflow-y: scroll;
}

Footer {
  width: 100%;
  height: auto;
  position : relative;
  transform : translateY(-1%);
}
</style>