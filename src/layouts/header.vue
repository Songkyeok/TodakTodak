<template>
    <div id="header">
        <div class="cm-component pc">
            <div class="sticky-wrap" style="height: 154px;">
                <header class="ki-header cm-header is-fill">
                    <div class="ki-header__inner">
                        <div class="cm-layout">
                            <div class="cm-layout__item">
                                <div class="cm-component">
                                    <div class="cn-mall">
                                        <div class="cn-mall-inner">
                                            <h1 class="logo">
                                                <a href="/main">
                                                    <img src="../assets/logo2.png" alt="">
                                                    <span class="blind">토닥토닥</span>
                                                </a>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cm-layout__item">
                                <div class="cm-component">
                                    <ul class="quick-list">
                                        <li><a href="/html/header.html" class="ki-cs"><em class="blind">고객센터</em></a></li>
                                        <li><a href="/html/header.html" class="ki-mypage"><em class="blind">마이페이지</em></a></li>
                                        <li><a href="/basket" class="ki-cart"><span id="cartCnt"></span></a></li>
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
                                                <a href="/html/header.html">
                                                    <span>소개글</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide swiper-slide-next">
                                            <div class="slide-inner">
                                                <a href="/"><span>이벤트</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="/html/header.html"><span>유아식기</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="/html/header.html"><span>욕실용품</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="/html/header.html"><span>외출용품</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="/html/header.html"><span>유아용품</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="/html/header.html"><span>위생용품</span></a>
                                            </div>
                                        </li>
                                        <li class="swiper-slide">
                                            <div class="slide-inner">
                                                <a href="/html/header.html"><span>장난감</span></a>
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
    name:'',
    components:{},
    data() {
        return {
            sampleData : ''
        };
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {}
}
</script>
<style>
@import "../assets/css/main.css";
</style>