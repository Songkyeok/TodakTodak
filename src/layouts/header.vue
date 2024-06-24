<template>
    <div id="header">
        <div class="cm-component pc">
            <div class="sticky-wrap">
                <header class="ki-header cm-header is-fill">
                    <div class="ki-header__inner">
                        <div class="cm-layout">
                            <div class="cm-layout__item">
                                <div class="cm-component">
                                    <div class="cn-mall">
                                        <div class="cn-mall-inner">
                                            <h1 class="logo" @click="goToHome()">
                                                <img src="../assets/logo2.png" alt="">
                                                <span class="blind">토닥토닥</span>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cm-layout__item">
                                <div class="cm-component">
                                    <!-- <ul class="quick-list">
                                        <li><a href="/html/header.html" class="ki-cs"><em class="blind">고객센터</em></a></li>
                                        <li><a href="/html/header.html" class="ki-mypage"><em class="blind">마이페이지</em></a></li>
                                        <li><a href="/basket" class="ki-cart"><span id="cartCnt"></span></a></li>
                                    </ul> -->

                                    <ul v-if="user.user_id == ''" class="join">
                                        <li @click="goToLogin()">로그인</li>
                                        <li @click="goToAgreement()">회원가입</li>
                                    </ul>
                                    <ul v-else-if="adminCheck == 1" class="join">
                                        <li @click="goToAdmin()">관리 페이지</li>
                                        <li @click="logout()">로그아웃</li>
                                    </ul>
                                    <ul v-else class="join">
                                        <li @click="logout()">로그아웃</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="cm-component">
                            <nav class="gnb-list">
                                <div class="cm-slider swiper-container main-slider swiper-container-initialized swiper-container-horizontal reach-end bg_r">
                                    <ul class="swiper-wrapper">
                                        <li class="swiper-slide swiper-slide-active">
                                            <div class="slide-inner">
                                                <a href="#">
                                                    <span @click="goToAbout()">소개글</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide swiper-slide-next">
                                            <div class="slide-inner">
                                                <a href="#"><span @click="goToEvent()">이벤트</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="#"><span @click="goToTableware()">유아식기</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="#"><span @click="goToBathStuff()">욕실용품</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="#"><span @click="goToOutside()">외출용품</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="#"><span @click="goToBabyStuff()">유아용품</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="#"><span @click="goToCleanStuff()">위생용품</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="#"><span @click="goToToy()">장난감</span></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sampleData : ''
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        logState() {
            console.log("Current state: ", this.$store.state);
        },
        goToAgreement() {
        this.$router.push({ path: '/agreement'});
        },
        goToLogin() {
        this.$router.push({ path: '/login' });
        },
        goToJoin() {
        this.$router.push({ path: '/join' });
        },
        goToAdmin() {
        this.$router.push({ path: '/admin' });
        },
        goToMypage() {
        this.$router.push({ path: '/mypage' });
        },
        goToCart() {
        this.$router.push({ path: '/basket' });
        },
        goToAbout() {
        this.$router.push({ path: '/about' });
        },
        goToEvent() {
        this.$router.push({ path: '/eventList' });
        },
        goToTableware() {
        this.$router.push({ path: '/tableware' });
        },
        goToBathStuff() {
        this.$router.push({ path: '/bathstuff' });
        },
        goToOutside() {
        this.$router.push({ path: '/outside' });
        },
        goToBabyStuff() {
        this.$router.push({ path: '/babystuff' });
        },
        goToCleanStuff() {
        this.$router.push({ path: '/cleanstuff' });
        },
        goToToy() {
        this.$router.push({ path: '/toy' });
        },
        logout() {
            this.$store.commit("user", {});
            this.$swal({
                position: 'top',
                icon: 'success',
                title: '로그아웃되셨습니다.',
                showConfirmButton: false,
                timer: 1000
            }).then(() => {
                window.location.href = "http://localhost:8080";
            })
        },
        goToHome() {
            window.location.href = "http://localhost:8080";
        }
    },
    mounted() {
        console.log("Current state: ", this.$store.state);
    }
}
</script>
<style>
@import "../assets/css/main.css";
</style>