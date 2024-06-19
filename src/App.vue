<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
<<<<<<< HEAD
    <router-link to="/sidebar">sidebar</router-link> |
    <router-link to="/main">main</router-link> |
    <router-link to="/footer">footer</router-link> |
    <router-link to="/header">header</router-link> |
=======
    <router-link to="/join">Join</router-link> |
    <router-link to="/login">Login</router-link>
>>>>>>> c35912dea7c1ee4e226007d6d1c424d327066aa9
  </nav>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>