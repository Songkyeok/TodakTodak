<template>
    <div>
        <div id="MainSlider">
            <splide :options="options">
                <splide-slide>
                    <img class="slider-image" src="../assets/banner1.png" alt="main1" />
                </splide-slide>
                <splide-slide>
                    <img class="slider-image" src="../assets/banner2.png" alt="main1" />
                </splide-slide>
                <splide-slide>
                    <img class="slider-image" src="../assets/banner3.png" alt="main2" />
                </splide-slide>
            </splide>
        </div>
        <hr>
        <div class="d-flex justify-content-left">
            <div class="content cate-list">
                <h2 class="home_title">BEST SELLER</h2>
                <!-- <div class="card" v-for="(goods, index) in filteredGoodsList(1),slice(0,4)" :key="index">
                </div> -->
            </div>
        </div>
        <hr>

        <div v-if="bestGoods.length>0">
            <div class="best_container" v-for="(data, index) in bestGoods" :key="index">
                <div class="img">
                    <a :href="'http://localhost:8080/goodsDetail/' + bestGoods[index].goods_no">
                        <img class="img" :src="bestGoods[index].goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${bestGoods[index].goods_img}`) : '/goodsempty.jpg'"
                            alt="상품 이미지">
                    </a>
                </div>
                    <div class="name">{{ bestGoods[index].goods_nm }}</div>
                    <div class="span">{{ getCurrencyFormat(bestGoods[index].goods_price) }}</div>

            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-left">
            <div class="content cate-list">
                <h2 class="home_title">NEW</h2>
                <!-- <div class="card" v-for="(goods, index) in filteredGoodsList(1),slice(0,4)" :key="index">
                </div> -->
            </div>
        </div>
        <hr>
        <div v-if="newGoods.length>0">
            <div class="best_container" v-for="(data, i) in newGoods" :key="i">
                <div>
                    <router-link class="img" to="/detail/:goodsNo">
                        <img class="img" src="../assets/logo.png" alt="상품 이미지" />
                    </router-link>
                    <a @click="goToDetil()"></a>
                </div>
                <div class="name">{{ newGoods[i].goods_nm }}</div>
                <div class="span">{{ getCurrencyFormat(newGoods[i].goods_price) }}</div>
            </div>
        </div>






        
        

    </div>
</template>
<script>
    import {
        Splide,
        SplideSlide
    } from '@splidejs/vue-splide';
    import '@splidejs/splide/dist/css/themes/splide-default.min.css';

    import axios from 'axios';



export default {	
    components:{
        Splide,
        SplideSlide,
    },
    data() {
        return {
            goodsList: [],
            bestGoods: [],
            options: {
                type: 'fade',
                rewind: true,
                speed: 800,
                interval: 3000,
                perPage: 1,
                autoplay: true,
                wheel: true,
                wheelSleep: 500,
                arrows: false,
                
            }
        };
    },
    mounted() {
        this.bestGoodsList();
    },
    methods: {
        filteredGoodsList(category){
            return this.goodsList.filter((goods) => goods.GOODS_CATEGORY === category);

    export default {
        components: {
            Splide,
            SplideSlide,

        },
        data() {
            return {
                goodsList: [],
                bestGoods: [],
                newGoods: [],
                options: {
                    type: 'fade',
                    rewind: true,
                    speed: 800,
                    interval: 3000,
                    perPage: 1,
                    autoplay: true,
                    wheel: true,
                    wheelSleep: 500,
                    arrows: false,

                }
            };
        },
        mounted() {
            this.bestGoodsList();
            this.newGoodsList();
        },
        methods: {
            filteredGoodsList(category) {
                return this.goodsList.filter((goods) => goods.GOODS_CATEGORY === category);
            },
            bestGoodsList() {
                axios({
                    url: "http://localhost:3000/main/bestGoodsList",
                    method: "GET",
                }).then(results => {
                    console.log(results.data);
                    this.bestGoods = results.data;
                })

            },
            newGoodsList() {
                axios({
                    url: "http://localhost:3000/main/newGoodsList",
                    method: "GET",
                }).then(res => {
                    console.log(res.data);
                    this.newGoods = res.data;
                })
            },
            getCurrencyFormat(value){
                return this.$currencyFormat(value);
            },
            goToDetil(goodsno){
                window.location.href=`http://localhost:8080/Detail/${goodsno}`;
            }
        },

    }
</script>

<style scoped>
    .hr {
        width: 100%;
        height: 10px;
        border: 3px solid black;
    }

    .slider-image {
        width: 50%;
        height: 300px;
        object-fit: cover;
        margin: auto;
        display: block;
    }

    .home_title {
        font-size: 30px;
        font-weight: bold;
    }

    .img {
        height: 310px;
        width: 236px;
    }

    .name {
        height: 58px;
        width: 236px;
    }

    .span {
        height: 50px;
        width: 236px;
    }

    .best_container {
        display: inline-block;
    }
</style>