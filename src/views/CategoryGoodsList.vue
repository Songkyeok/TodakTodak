<template>
    <main class="mt-3">
        <div class="container">
            <div class="row mb-2">
                <div class="col-12">
                </div>
            </div>
            <hr>
            <div class="content cate-list">
                <!-- categoryGoods => 아래에 데이터 저장한 변수이름, v-if에 선언한 이름, goods_category => 카테고리 값에 따른 페이지 -->
                <h2>{{ getCategoryName(cate) }}</h2> 
                <br>
            </div>
            <div v-if="categoryGoods.length>0">
                <div class="category_container" v-for="(goods, i) in categoryGoods" :key="i">
                    <div class="img">
                        <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
                            <img class="img" :width="200" :src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                            alt="상품 이미지">
                        </a> 
                        <a @click="goToDetail()"></a>
                    </div>
                    <div class="name">{{ goods.goods_nm }}</div>
                    <div class="span">{{ $currencyFormat(goods.goods_price) }}원</div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>


import axios from 'axios';

export default {
    data() {
        return {        
            categoryGoods: [],
            cate: 0,
        };
    },
    mounted() {
        this.categoryGoodsList();
    },
    created() {
        this.categoryGoodsList();
    },

    methods: {
        filteredGoodsList(category) {
            return this.GoodsList.filter((goods) => goods.GOODS_CATEGORY === category);
        },
        categoryGoodsList() {
            const category = this.$route.params.category;
            console.log(category);
            axios({
                url: `http://localhost:3000/goods/categoryGoodsList/${category}`,
                method: "GET",
            }).then(results => {
                console.log('result===', results);
                this.categoryGoods = results.data; // 여기에 저장, this.categoryGoods => return 바로 아래에 선언한 categoryGoods: []
                this.cate = results.data[0].goods_category;
            }) .catch(error => {
                alert('상품이 없습니다.')
                window.location.href = `http://localhost:8080/main`; 
            })     
        },
        goTogoodsDetail(goodsno) {
            window.localStorage.href = `http://localhost:8080/Detail/${goodsno}`;
        },
        getCategoryName(categoryNo) {
            if (categoryNo == 1) {
                return '유아식기';
            } else if (categoryNo == 2) {
                return '욕실용품';
            } else if (categoryNo == 3) {
                return '외출용품';
            } else if (categoryNo == 4) {
                return '유아용품';
            } else if (categoryNo == 5) {
                return '위생용품';
            } else if (categoryNo == 6) {
                return '장난감';
            }
        }
    }
}
</script>