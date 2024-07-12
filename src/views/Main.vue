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
        <div class="main_product_inner">
                <div>
                    <h2 class="home_title">BEST SELLER</h2>
                    <!-- <div class="card" v-for="(goods, index) in filteredGoodsList(1),slice(0,4)" :key="index">
                    </div> -->
                </div>
        
            <div class="goods_inner">
                <div class="goods_tab">
                    <div class="goods_list">
                        <div v-if="bestGoods.length>0">
                            <div class="best_img" v-for="(goods, index) in bestGoods" :key="index">
                                <div class="img">
                                    <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
                                        <img class="img"
                                            :src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                                            alt="상품 이미지">
                                    </a>
                                </div>
                                <div class="name">{{ goods.goods_nm }}</div>
                                <div class="span">{{ getCurrencyFormat(goods.goods_price)}}원</div>

                            </div>
                        </div>
                    </div>
                
                    <div>
                        <h2 class="home_title">NEW</h2>
                        <!-- <div class="card" v-for="(goods, index) in filteredGoodsList(1),slice(0,4)" :key="index">
                        </div> -->
                    </div>
                
                
                    <div v-if="newGoods.length>0">
                        <div class="best_container" v-for="(data, index) in newGoods" :key="index">
                            <div>
                                <a :href="'http://localhost:8080/goodsDetail/' + newGoods[index].goods_no">
                                    <img class="img"
                                        :src="newGoods[index].goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${newGoods[index].goods_img}`) : '/goodsempty.jpg'"
                                        alt="상품 이미지">
                                </a>
                                <a @click="goToDetil()"></a>
                            </div>
                            <div class="name">{{ newGoods[index].goods_nm }}</div>
                            <div class="span">{{ getCurrencyFormat(newGoods[index].goods_price) }}</div>
                        </div>
                    </div>
                </div>
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
                // wheel: true,
                // wheelSleep: 500,
                wheel: false,
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
                url: "http://localhost:3000/goods/bestGoodsList",
                method: "GET",
            }).then(results => {
                this.bestGoods = results.data;
            })

        },
        newGoodsList() {
            axios({
                url: "http://localhost:3000/goods/newGoodsList",
                method: "GET",
            }).then(res => {
                this.newGoods = res.data;
            })
        },
        getCurrencyFormat(value) {
            return this.$currencyFormat(value);
        },
        goToDetil(goodsno) {
            window.location.href = `http://localhost:8080/Detail/${goodsno}`;
        }
    },
}
</script>

<style scoped>
    #MainSlider {
        margin-bottom: 100px;
    }
    .hr {
        width: 100%;
        height: 10px;
        border: 3px solid black;
    }

    .element.style{
        min-height: 1px;
    }


    .slider-image {
        width: 100%;
        height: 600px;
        object-fit: cover;
        margin: auto;
        display: block;
    }

    .main_product_inner {
        padding: 30px 0;
        font-size: 13px;
        font-family: "Spoqa Han Sans Neo";
        box-sizing: border-box;
        display: block;
        padding-bottom: 70px;
        width: 1200px;
        margin: 0 auto;
    }

    .content-cate-list {
        
    }

    .home_title {
        font-size: 30px;
        font-weight: bold;
        padding-bottom: 20px;
        padding-top: 20px;
        margin-bottom: 30px;
        text-align: center;
        position: relative;
        border-top: 1px solid rgb(240, 240, 240);
        border-bottom: 1px solid rgb(240, 240, 240);
        
    }

    .goods_inner {
        width: 1080px;
        position: relative;
    }

    .goods_tab {
        
    }
    .goods_list {
        box-sizing: border-box;
        display: block;
        list-style-position: outside;
        padding-bottom: 40px;
        padding-left: 10px;
        padding-right: 10px;
        width: 275px;

    }

    .best_img {
        border-radius: 6px;
        width: 255px;
    }

    .img {
        border-radius: 6px;
        height: 310px;
        width: 236px;
        display: block;
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