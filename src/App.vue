<template>
  <nav>
    <Header />
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/sidebar">sidebar</router-link> |
    <router-link to="/main">main</router-link> |
    <router-link to="/footer">footer</router-link> |
    <router-link to="/header">header</router-link> |
    <router-link to="/join">Join</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/agreement">Agreement</router-link> |
    <router-link to="/orderList">orderList</router-link>  -->

  </nav>

  <router-view />

</template>

<script>
import Header from "./layouts/header.vue";

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>