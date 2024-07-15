<template>
    <div>
        <div id="MainSlider">
            <splide :options="options">
                <splide-slide>
                    <img @click="this.$router.push({ path: '/goodsDetail/1' })" class="slider-image" src="../assets/banner1.png" alt="배너 이미지1" />
                </splide-slide>
                <splide-slide>
                    <img @click="this.$router.push({ path: '/goodsDetail/2' })" class="slider-image" src="../assets/banner2.png" alt="배너 이미지2" />
                </splide-slide>
                <splide-slide>
                    <img @click="this.$router.push({ path: '/goodsDetail/3' })" class="slider-image" src="../assets/banner3.png" alt="배너 이미지3" />
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
                    <div v-if="bestGoods.length>0">
                        <div class="goods_list">
                            <div class="best_img" v-for="(goods, index) in bestGoods" :key="index">
                                <div class="imgbox">
                                        <a :href="'http://localhost:8080/goodsDetail/' + goods.GOODS_NO">
                                        <img class="img" :src="goods.GOODS_IMG ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.GOODS_IMG}`) : require('../assets/goodsempty.jpg')" alt="상품 이미지">
                                        </a>
                                    <div class="goods_ranking">
                                    <span>{{index + 1}}</span>
                                    </div>
                                </div>
                                <div class="name">{{ goods.GOODS_NM }}
                                    
                                </div>
                                <div class="span">{{ getCurrencyFormat(goods.GOODS_PRICE)}}<span class="span_price">원</span></div>
                                <div class="box_tag">
                                    <span v-if="(index + 1) === 1" >BEST</span>
                                    <span v-if="(index + 1) < 3">HIT</span>
                                    <span>무료배송</span>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div>
                        <h2 class="home_title">NEW</h2>
                        <!-- <div class="card" v-for="(goods, index) in filteredGoodsList(1),slice(0,4)" :key="index">
                        </div> -->
                    </div>
                
                
                    <div v-if="newGoods.length>0">
                        <div class="goods_list">
                            <div class="best_img" v-for="(data, index) in newGoods" :key="index">
                                <div>
                                    <a :href="'http://localhost:8080/goodsDetail/' + newGoods[index].goods_no">
                                        <img class="img" :src="newGoods[index].goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${newGoods[index].goods_img}`) : require('../assets/goodsempty.jpg')" alt="상품 이미지">
                                    </a>
                                    <a @click="goToDetil()"></a>
                                    <div class="goods_ranking">
                                    <span>{{index + 1}}</span>
                                    </div>
                                </div>
                                <div class="name">{{ newGoods[index].goods_nm }}</div>
                                <div class="span">{{ getCurrencyFormat(newGoods[index].goods_price)}}<span class="span_price">원</span></div>
                                <div class="box_tag">
                                    <span v-if="(index + 1) === 1" >NEW</span>
                                    <span v-if="(index + 1) < 3">BEST</span>
                                    <span>무료배송</span>
                                </div>
                            </div>
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
    #MainSlider img {
        cursor: pointer;
    }
    .hr {
        width: 100%;
        height: 10px;
        border: 3px solid black;
    }

    body {
        font-family: "Spoqa Han Sans Neo";
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
        position: relative;
        display: block;
        padding-bottom: 70px;
        width: 1200px;
        margin: 0 auto;
    }

    .home_title {
        font-size: 30px;
        font-weight: bold;
        padding-bottom: 20px;
        padding-top: 20px;
        margin-bottom: 30px;
        width: 1200px;
        text-align: center;
        position: relative;
        border-top: 1px solid rgb(240, 240, 240);
        border-bottom: 1px solid rgb(240, 240, 240);
        
    }

    .goods_inner {
        width: 1080px;
        position: relative;
    }

    .goods_list {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        justify-content: center;
        padding-bottom: 40px;
        padding-left: 10px;
        padding-right: 10px;
        width: 1200px;

    }

    .best_img {
        border-radius: 6px;
        width: 255px;
        display: block;
        position: relative;
        unicode-bidi: isolate;
        box-sizing: border-box;
        margin: 10px;
    }

    .goods_ranking{
        z-index: 50;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        align-items: center;
        border-radius: 5px 0;
        background-color: #000;
        justify-content: center;
        display: flex;
        height: 30px;
        min-width: 30px;
        font-size: 14px;
        font-weight: 400;
        color: #fff;
        box-sizing: border-box;
    }

    .img {
        border-radius: 6px;
        height: 255px;
        width: 255px;
        display: block;
        position: relative;
    }



    .name {
        height: 58px;
        font-size: 15px;
        
    }

    .span {
        height: 30px;
        font-size: 20px;
        align-items: center;
        font-weight: 600;
        font-family: "Spoqa Han Sans Neo";
        
    }

    .span_price {
        font-size: 14px;
        font-weight: 500;
    }
    
    .box_tag {
        margin-top: 6px;
    }

    .box_tag span{
        box-sizing: inline-block;
        background: #f1f1f1;
        padding: 4px 7px 5px;
        border-radius: 100px;
        margin: 0 3px 3px 0;
        line-height: 1;
        color: #999;
        letter-spacing: -0.2px;
        cursor: pointer;
    }

    .best_container {
        display: inline-block;
    }
</style>