<template>
    <main class="mt-3">
        <div class="container">
            <div class="row mb-2">
                <div class="col-12">
                </div>
            </div>
            <hr>
            <div class="content cate-list">
                <h2 class="home_title">위생용품</h2>
                <br>
            </div>
            <div v-if="cleanGoodsList.length>0">
                <div class="clean_container" v-for="(goods, i) in cleanGoodsList" :key="i">
                    <div class="img">
                        <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
                            <!-- <img class="img" :src="goods.goods_img ? require(`'/Users/areumAREUM/Downloads/TodakTodak/vscode/node-back/TodakToack_Backend/uploads/uploadGoods/${goods.goods_img}'`) : '/goodsempty.jpg'"
                            alt="상품 이미지"> -->
                            <!-- <img :src="`/img/${product.id}/${product.path}`" class="card-img-top" alt="..."> -->
                        </a>
                        <a @click="goToDetail()"></a>
                    </div>
                    <div class="name">{{ goods.goods_nm }}</div>
                    <div class="span">{{ getCurrencyFormat(goods.goods_price) }}</div>
                </div>
            </div>
        </div>
    </main>
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
            cleanGoodsList: [],
        };
    },
    // mounted() {
    //     this.cleanGoodsList();
    // },
    methods: {
        filteredGoodsList(category) {
            return this.GoodsList.filter((goods) => goods.GOODS_CATEGORY === category);
        },
        tableGoodsList() {
            axios({
                url: "http://localhost:3000/goods/cleanGoodsList",
                method: "GET",
            }).then(results => {
                console.log(results.data);
                this.cleanGoodsList = results.data;
            })
        },
        goTogoodsDetail(goodsno) {
            window.localStorage.href = `http://localhost:8080/Detail/${goodsno}`;
        }
    }
}
</script>