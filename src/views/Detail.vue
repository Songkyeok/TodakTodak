<template>
    <div v-if="goods">
        <div class="detail">
            {{getCategory(goods.goods_category)}}
            <div class="container">
                <div class="image">
                    <img :width="450"
                        :src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                        alt="상품 이미지">
                </div>
                <div class="details">
                    {{goods.goods_nm}}
                    <button class="heart-button" @click="likeInsert">
                        <i class="far fa-heart heart-icon"></i>
                    </button>
                    <h4>{{like}}</h4>
                    <div class="price">
                        {{getCurrencyFormat(goods.goods_price)}}원
                    </div>
                    <div class="input-group">
                        <span>수량</span>
                        <button class="input-group-text" @click="calculatePrice(-1);" :disabled="total === 1">-</button>
                        <input type="text" style="width:40px;" v-model="total">
                        <button class="input-group-text" @click="calculatePrice(1);"
                            :disabled="total === goods.goods_cnt">+</button>
                    </div>
                    <div class="totalPrice">
                        <div>
                            <h4>총 금액</h4>
                        </div>
                        <div>
                            <h4>{{getCurrencyFormat(this.totalPrice)}}</h4>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="add-to-cart" @click="addToCart()">장바구니</button>
                        <button class="buy-now" @click="goToBuy(goods.goods_no)">구매하기</button>
                    </div>
                </div>
            </div>
                    <!-- <div class="info">
                    <div class="header">
                    <h2>{{categoryType(goods.goods_category)}}/{{goods.goods_nm}}</h2>
                    <button v-if="user.user_no === ''" class="heart-button" @click="likeInsert">
                        <i class="far fa-heart heart-icon"></i>
                    </button>
                    <h4>{{like}}</h4>
                    </div>
                    </div> -->
            </div>
            

            <div class="d-flex justify-content-center">
              <div class="content">
                    v-show
                    <img :width="550"
                    :src="goods.goods_content ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_content}`) : '/goodsempty.jpg'"
                    alt="상품 디테일 이미지">
                </div>
            </div>
        </div>


</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                goods: {},
                total: 1,
                totalPrice: 0,
                cnt: 1,
            };
        },
        beforeCreate() {},
        created() {
            this.getGoods();
        },
        beforeMount() {},
        mounted() {
            this.getGoods();
        },
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {
            async getGoods() { 
                try {
                    const goodsno = this.$route.params.goodsno;
                    const response = await axios.get(`http://localhost:3000/goods/goodsDetail/${goodsno}`);
                    this.goods = response.data[0];
                    this.totalPrice = this.goods.goods_price;
                    console.log(this.goods);
                } catch (error) {
                    console.error(error);
                }
            },
            calculatePrice(cnt) {
                const total = this.total + cnt;
                if (total < 1) total = 1;
                this.total = total;
                this.totalPrice = this.goods.goods_price * this.total;
            },
            getCurrencyFormat(value) {
                return this.$currencyFormat(value);
            },
            getCategory(cate){
                console.log(cate)
                if(cate == 1){
                    return '유아식기';
                }else if(cate == 2){
                    return '욕실용품'
                }else if(cate == 3){
                    return '외출용품'
                }else if(cate == 4){
                    return '유아용품'
                }else if(cate == 5){
                    return '위생용품'
                }else if(cate == 6){
                    return '장난감'
                }else if(cate == 7){
                    return '이벤트'
                }
            },
            goToBuy(goodsno){
                
            },
            addToCart(){
                if(this.user.user_no === ''){
                    alert('로그인해주셈');
                    this.$router.push({ path: '/login'});
                }else{
                    axios({
                        url: "http//localhost:3000/goods/basketInsert",
                        method: "post",
                        data: {
                            user_no: 1,
                            goods_price: this.goods.goods_price,
                            goods_nm: this.goods.goods_nm,

                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f4f4f4;
    }

    .container {
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .image {
        flex: 1;
        text-align: center;

    }

    .details {
        flex: 2;
        margin-left: 20px;
        height: 500px;
    }

    .details h2 {
        margin-bottom: 10px;
    }

    .details .price {
        font-size: 24px;
        color: #e67e22;
        margin-bottom: 10px;
    }

    .details .input-group {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .details .total-price {
        font-size: 20px;
        color: #e74c3c;
        margin-bottom: 20px;
    }

    .details .description {
        font-size: 16px;
        line-height: 1.5;
    }

    .details .quantity input {
        width: 60px;
        padding: 5px;
        font-size: 16px;
    }
</style>