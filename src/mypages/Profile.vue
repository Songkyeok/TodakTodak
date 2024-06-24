<template>
    <MypageSidebar />

    <div class="profile_container">
        
    </div>
</template>
<script>
import MypageLayout from "../layouts/mypageLayout.vue";
import MypageSidebar from "../layouts/mypageSideBar.vue";

export default {
    components: {
        MypageLayout,
        MypageSidebar
    }
}
</script>

<style scoped>
.profile_container {
    width: 1080px;
    background: coral;
}
</style>