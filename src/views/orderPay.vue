<template>
    <main class="container">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <h3>주문결제</h3>
        <div class="container-wrapper">
            <div class="container">
                <h5><strong>배송정보</strong></h5>
                <hr>
                <div class="mb-3">
                    <label for="userNick" class="form-label"><strong>받는사람</strong></label>
                    <input type="text" id="userNick" class="form-control" v-model="userInfo.user_nm"
                        @input="updateOrderInfo" />
                </div>
                <div class="mb-3">
                    <label for="userMobile" class="form-label"><strong>핸드폰</strong></label>
                    <input type="text" id="userMobile" class="form-control" v-model="userInfo.user_phone"
                        @input="updateOrderInfo" />
                </div>
                <div class="mb-3">
                    <label class="form-label"><strong>주소</strong></label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="userInfo.user_zipcode" placeholder="우편번호"
                            @input="updateOrderInfo" />
                        <button class="btn btn-outline-secondary" type="button" @click="zipload">우편번호 찾기</button>
                    </div>
                    <input type="text" class="form-control mt-2" v-model="userInfo.user_adr1" placeholder="기본 주소"
                        @input="updateOrderInfo" />
                    <input type="text" class="form-control mt-2" v-model="userInfo.user_adr2" placeholder="상세 주소"
                        @input="updateOrderInfo" />
                </div>
                <div class="mb-3">
                    <label for="userMemo" class="form-label"><strong>배송요청사항</strong></label>
                    <input type="text" id="userMemo" class="form-control" placeholder="10자 이내" v-model="order_memo" />
                </div>
                <br><br>

                <router-link to="/">삭제메소드 로그 확인</router-link>

                <h5><strong>주문정보</strong></h5>
                <hr>
                <div v-if="this.$route.params.ordertp === '0'">
                    <div class="d-flex mb-3 orderinfo">
                        <div class="me-3">
                            <img :width="80"
                                :src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                                alt="상품 이미지">
                        </div>
                        <div class="me-3">
                            <strong>{{ goods.goods_nm }}</strong><br>
                            수량: {{ order.ORDER_TC }}개
                        </div>
                        <div class="ms-auto">
                            <strong>총 {{ getCurrencyFormat(goods.goods_price * order.ORDER_TC) }}</strong>
                        </div>
                    </div>
                </div>
                <div v-if="this.$route.params.ordertp === '1'">
                    <div class="d-flex mb-3 orderinfo" v-for="(cart, i) in cartList" :key="i">
                        <div class="me-3">
                            <img :width="80"
                                :src="cart.BASKET_GOODS_IMG ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${cart.BASKET_GOODS_IMG}`) : '/goodsempty.jpg'"
                                alt="상품 이미지">
                        </div>
                        <div class="me-3">
                            <strong>{{ cart.BASKET_GOODS_NM }}</strong><br>
                            수량: {{ cart.BASKET_GOODS_COUNT }}개
                        </div>
                        <div class="ms-auto">
                            <strong>총 {{ formatPrice(cart.BASKET_GOODS_COUNT * cart.BASKET_GOODS_PRICE) }}</strong>
                        </div>
                    </div>
                </div>
                <br><br>
                <!-- <h5><strong>보유적립금</strong></h5>
                <hr>
                <div class="input-group">
                    <input type="text" class="form-control" v-model="pointInput" placeholder="5천원 이상 사용가능"
                        @input="handlePointInput" />
                    <button class="btn btn-outline-secondary" type="button" @click="pointUse">사용하기</button>
                </div>
                보유적립금 : {{ formatPrice(userInfo.user_point) }}
                <br><br><br> -->

                <h5><strong>최종 결제금액</strong></h5>
                <hr>
                <table class="table">
                    <tbody>
                        <tr>
                            <th scope="row" class="table-active">총 상품 금액</th>
                            <td colspan="2"><strong>{{ getCurrencyFormat(0) }}</strong></td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-active">배송비</th>
                            <td colspan="2"><strong>{{ getCurrencyFormat(0) }}</strong></td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-active">사용적립금</th>
                            <td colspan="2"><strong>{{ getCurrencyFormat(0) }}</strong></td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-active">총 결제 금액</th>
                            <td colspan="2"><strong>{{ getCurrencyFormat(0) }}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <button type="submit" class="btn btn-primary" @click="requestPay">결제하기</button>
            </div>
        </div>
    </main>
</template>
<script>
import axios from 'axios';

export default {
    name:'OrderPay',
    data() {
        return {
            userInfo: {},
            goods: {},
            order: {},
            totalPrice: 0,
            paymentInit: false,
        };
    },
    computed: {
        user(){
            return this.$store.state.user;
            
        }
    },
    beforeCreate() {},
    created() {
        this.getUserInfo();
        this.getOrder();
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {
        if(true){
        console.log('Condition met, calling deleteOrder');
            this.deleteOrder();
        }
    },
    unmounted() {},
    methods: {
        getUserInfo() {
            const user_no = this.$store.state.user.user_no;
            axios({
                url: "http://localhost:3000/profile/selectProfile",
                method: "POST",
                data: {
                    user_no: user_no
                }
            }).then(res => {
                this.userInfo = {
                    user_id: res.data.USER_ID,
                    user_nm: res.data.USER_NM,
                    user_email: res.data.USER_EMAIL,
                    user_phone: res.data.USER_PHONE,
                    user_zipcode: res.data.USER_ZIPCODE,
                    user_adr1: res.data.USER_ADR1,
                    user_adr2: res.data.USER_ADR2,
                }; 
            })
        },
        async getOrder(){
            axios({
                url: "http://localhost:3000/goods/getOrder",
                method: "POST",
                data: {
                    user_no: this.user.user_no,
                }
            })
            .then(res => {
                this.order = res.data[0];
                console.log('res>>>>>>>>>>', this.order);
                const goodsno = res.data[0].GOODS_NO;
                
                console.log('ordertp >>>> ', this.$route.params.ordertp)
                axios({
                    url: `http://localhost:3000/goods/goodsDetail/${goodsno}`,
                    methods: "GET"
                })
                .then(res => {
                    this.goods = res.data[0];
                    console.log('goods>>>>', res.data[0])
                })
            })
        },
        getCurrencyFormat(value) {
            return this.$currencyFormat(value);
        },
        requestPay(){
            this.paymentInit = true;
            console.log('결제가 진행되었습니다.')
        },
        deleteOrder(){
            axios({
                url:"http://localhost:3000/goods/orderDelete",
                method: "POST",
                data: {
                    order_trade_no: this.order.ORDER_TRADE_NO
                }
            })
        }
    },
    beforeRouteLeave(to, from, next) {
    if (true) {
      console.log('Navigating away from OrderPay, calling deleteOrder');
      this.deleteOrder();
      next();
    }
    next();
  }
}
</script>