<template>
    <main class="mt-3">
        <div>
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
                            <span>무료배송</span>
                        </div>
                    </div>
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


.products-container {
    /* margin-left: 11%;
    margin-right: 5%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* 아이템 간격 조정 */
    /* justify-content: space-between; */
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    justify-content: center;
    /* padding-bottom: 40px;
    padding-left: 10px;
    padding-right: 10px;
    width: 1200px; */
}

.category-container-item {
    flex: 1 1 calc(20% - 25px);
    max-width: calc(20% - 25px);
    padding: 25px;
    /* border: 1px solid #ddd; */
    /* border-radius: 8px; */
    text-align: center;
    display: inline-block;
    border-radius: 6px;
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
</style>