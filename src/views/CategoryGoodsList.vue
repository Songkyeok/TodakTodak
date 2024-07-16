<template>
        <div class="cate-all-list">
            <div class="row mb-2">
                <div class="col-12">
                </div>
            </div>
            <div class="content-cate-list">
                <!-- categoryGoods => 아래에 데이터 저장한 변수이름, v-if에 선언한 이름, goods_category => 카테고리 값에 따른 페이지 -->
                <h2>{{ getCategoryName(cate) }}</h2> 
                <br>
            </div>
            <div class="products-container">
                <div v-if="categoryGoods.length>0">
                    <div class="category-container-item" v-for="(goods, i) in categoryGoods" :key="i">
                        <div class="img">
                            <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
                                <img class="img" :width="200" :src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                                alt="상품 이미지">
                            </a> 
                            <a @click="goToDetail()"></a>
                        </div>
                        <div class="name">{{ goods.goods_nm }}</div>
                        <div class="span">{{ $currencyFormat(goods.goods_price) }}원</div>
                        <div class="box_tag">
                            <span v-if="(i + 1) < 3" >BEST</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                // console.log('result===', results);
                this.categoryGoods = results.data; // 여기에 저장, this.categoryGoods => return 바로 아래에 선언한 categoryGoods: []
                this.cate = results.data[0].goods_category;
            }) .catch(error => {
                // alert('상품이 없습니다.')
                this.$swal("등록된 상품이 없습니다.");
                // window.location.href = `http://localhost:8080/main`;
                setTimeout(() => {
                    this.$router.push({ path: '/' });
                }, 2000);
            })     
        },
        goToDetail(goodsno) { // goTogoodsDetail?
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
                return '유아도서';
            } else if (categoryNo == 5) {
                return '위생용품';
            } else if (categoryNo == 6) {
                return '장난감';
            }
        }
    }
}
</script>



<style scoped>
.cate-all-list {
    width: 1200px;
    margin: 0 auto;
    font-family: "Spoqa Han Sans Neo";
}

.content-cate-list h2{
    /* margin-left: 30px;
    padding: 40px;
    text-align: center;
    color: #000;
    font-size: 28px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.5px; */
    font-size: 30px;
    font-weight: bold;
    padding-bottom: 20px;
    padding-top: 20px;
    margin-bottom: 30px;
    /* width: 1200px; */
    text-align: center;
    position: relative;
    border-top: 1px solid rgb(240, 240, 240);
    border-bottom: 1px solid rgb(240, 240, 240);
}


/* .products-container {
    display: flex;
    justify-content: center;
} */


/* .products-container > div {
    display: flex;
} */

.category-container-item {
    width: 255px;
    margin-right: 60px;
    /* border: 1px solid #ddd; */
    /* border-radius: 8px; */
    text-align: left;
    display: inline-block;
    border-radius: 6px;
    vertical-align: top;
    margin-bottom: 20px;
}
.category-container-item:nth-child(4n) {
    margin-right: 0;
}

.img {
    /* height: auto;
    width: 100%; */
    border-radius: 6px;
    height: 255px;
    width: 255px;
    display: block;
    position: relative;
}

.name {
    height: 58px;
    font-size: 15px;
    margin-top: 10px;
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
    padding: 2px 5px 5px;
    border-radius: 100px;
    margin: 0 3px 3px 0;
    line-height: 1;
    color: #999;
    letter-spacing: -0.2px;
    font-size: small;
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
</style>