<template>
    <main class="container">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <h3>주문결제</h3>
        <div class="container-wrapper">
            <div class="container">
                <h5><strong>배송정보</strong></h5>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="defaultAddressCheck" v-model="useDefaultAddress">
                    <label class="form-check-label" for="defaultAddressCheck">
                        기본 배송지
                    </label>
                </div>
                <hr>
                <div v-if="useDefaultAddress">
                    <div class="mb-3">
                        <label for="userNick" class="form-label"><strong>받는사람</strong></label>
                        <input type="text" id="userNick" class="form-control" v-model="userInfo.user_nm" :disabled="useDefaultAddress"
                            @input="updateOrderInfo" />
                    </div>
                    <div class="mb-3">
                        <label for="userMobile" class="form-label"><strong>핸드폰</strong></label>
                        <input type="text" id="userMobile" class="form-control" v-model="userInfo.user_phone" :disabled="useDefaultAddress"
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
                </div>
                <div v-if="!useDefaultAddress">
                    <div class="mb-3">
                        <label for="userNick" class="form-label"><strong>받는사람</strong></label>
                        <input type="text" id="userNick" class="form-control" v-model="newOrderInfo.user_nm"
                            @input="updateOrderInfo" />
                    </div>
                    <div class="mb-3">
                        <label for="userMobile" class="form-label"><strong>핸드폰</strong></label>
                        <input type="text" id="userMobile" class="form-control" v-model="newOrderInfo.user_phone"
                            @input="updateOrderInfo" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label"><strong>주소</strong></label>
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="newOrderInfo.user_zipcode" placeholder="우편번호"
                                @input="updateOrderInfo" />
                            <button class="btn btn-outline-secondary" type="button" @click="zipload">우편번호 찾기</button>
                        </div>
                        <input type="text" class="form-control mt-2" v-model="newOrderInfo.user_adr1" placeholder="기본 주소"
                            @input="updateOrderInfo" />
                        <input type="text" class="form-control mt-2" v-model="newOrderInfo.user_adr2" placeholder="상세 주소"
                            @input="updateOrderInfo" />
                    </div>
                    <div class="mb-3">
                        <label for="userMemo" class="form-label"><strong>배송요청사항</strong></label>
                        <input type="text" id="userMemo" class="form-control" placeholder="10자 이내" v-model="order_memo" />
                    </div>
                    <br><br>
                </div>
                

                <h5><strong>주문정보</strong></h5>
                <hr>
                <div v-if="this.$route.params.ordertp === '0'">
                    <div class="d-flex mb-3 orderinfo">
                        <div class="me-3">
                            <img :width="80"
                                :src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : require('../assets/goodsempty.jpg')"
                                alt="상품 이미지">
                        </div>
                        <div class="me-3">
                            <strong>{{ goods.goods_nm }}</strong><br>
                            수량: {{ this.$route.params.total }}개
                        </div>
                        <div class="ms-auto">
                            <strong>총 {{ getCurrencyFormat(getTotalPrice()) }}</strong>
                        </div>
                    </div>
                </div>
                <div v-if="this.$route.params.ordertp === '1'">
                    <div class="d-flex mb-3 orderinfo" v-for="(cart, i) in cartList" :key="i">
                        <div class="me-3">
                            <img class="img_cart"
                                :src="cart.basket_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${cart.basket_img}`) : require('../assets/goodsempty.jpg')"
                                alt="상품 이미지">
                        </div>
                        <div class="me-3">
                            <strong>{{ cart.basket_nm }}</strong><br>
                            수량: {{ cart.basket_cnt }}개
                        </div>
                        <div class="ms-auto">
                            <strong>총 {{ getCurrencyFormat(cart.basket_cnt * cart.basket_price) }}</strong>
                        </div>
                    </div>
                </div>
                <br><br>
                <h5><strong>보유적립금</strong></h5>
                <hr>
                <div class="input-group">
                    <input type="text" class="form-control" v-model="pointInput" placeholder="5천원 이상 사용가능"
                        @input="handlePointInput" />
                    <button class="btn btn-outline-secondary" type="button" @click="pointUse">사용하기</button>
                </div>
                보유적립금 : {{ getCurrencyFormat(userInfo.user_point) }}
                <br><br><br>

                <h5><strong>최종 결제금액</strong></h5>
                <hr>
                <table class="table">
                    <tbody>
                        <tr>
                            <th scope="row" class="table-active">총 상품 금액</th>
                            <td colspan="2"><strong>{{ getCurrencyFormat(getTotalPrice()) }}원</strong></td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-active">사용적립금</th>
                            <td colspan="2"><strong>{{ getCurrencyFormat(usePoint) }}포인트</strong></td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-active">총 결제 금액</th>
                            <td colspan="2"><strong>{{ getCurrencyFormat(getOrderTotalPrice()) }}원</strong></td>
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
            useDefaultAddress: true,
            orderAddress: false,
            userInfo: {},
            newOrderInfo: {
                user_id: '',
                user_nm: '',
                user_email: '',
                user_phone: '',
                user_zipcode: '',
                user_adr1: '',
                user_adr2: '',
                user_point: '',
            },
            goods: {},
            order: {},
            paymentInit: false,
            cartOrder: [],
            cartList: [],
            pointInput: '',
            usePoint: 0,
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
        this.getGoods();
        this.getBasketList();
    },
    beforeMount() {},
    mounted() {
        this.loadDaumPostcodeScript();
    },
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
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
                    user_point: res.data.USER_POINT,
                };
            })
        },
        async getGoods() {
            try {
            const goodsno = this.$route.params.goodsno;
            const response = await axios.get(
                `http://localhost:3000/goods/goodsDetail/${goodsno}`
            );
            this.goods = response.data[0];
            } catch (error) {
            console.error(error);
            }
        },
        getCurrencyFormat(value) {
            return this.$currencyFormat(value);
        },
        updateOrderInfo(){
            if(this.useDefaultAddress){
                this.order.order_nm = this.userInfo.user_nm;
                this.order.order_phone = this.userInfo.user_phone;
                this.order.order_zipcode = this.userInfo.user_zipcode;
                this.order.order_adr1 = this.userInfo.user_adr1;
                this.order.order_adr2 = this.userInfo.user_adr2;
                this.order.order_memo = this.order_memo;
            }else if(!this.useDefaultAddress){
                this.order.order_nm = this.newOrderInfo.user_nm;
                this.order.order_phone = this.newOrderInfo.user_phone;
                this.order.order_zipcode = this.newOrderInfo.user_zipcode;
                this.order.order_adr1 = this.newOrderInfo.user_adr1;
                this.order.order_adr2 = this.newOrderInfo.user_adr2;
                this.order.order_memo = this.order_memo;
            }
        },
        requestPay(){

            if (!this.validationCheck()) {
                return;
            }
            this.updateOrderInfo();
            

            let amount;
            let name;
            let count;
            let order_detail;
            if(this.$route.params.ordertp === '0'){
                amount = this.goods.goods_price * this.$route.params.total;
                name = this.goods.goods_nm;
                count = parseInt(this.$route.params.total);
                order_detail = {
                    goods_no : this.$route.params.goodsno,
                    order_goods_cnt: this.$route.params.total,
                }
            }else if(this.$route.params.ordertp === '1' && this.cartList.length > 1){
                amount = this.cartList.reduce((total, cart) =>  total + (cart.basket_cnt * cart.basket_price),0);
                count = this.cartList.reduce((total, cart) => total + cart.basket_cnt, 0)
                name = this.cartList[0].basket_nm + ' 외' + (this.cartList.length - 1) + '건'
                order_detail = this.cartList.map((cart) => ({
                    goods_no : cart.goods_no,
                    order_goods_cnt : cart.basket_cnt,
                }))
               
            }else if(this.$route.params.ordertp === '1' && this.cartList.length == 1){
                amount = this.cartList.reduce((total, cart) =>  total + (cart.basket_cnt * cart.basket_price),0);
                count = this.cartList.reduce((total, cart) => total + cart.basket_cnt, 0)
                name = this.cartList[0].basket_nm;
                order_detail = {
                    goods_no : this.cartList[0].goods_no,
                    order_goods_cnt : this.cartList[0].basket_cnt,
                }
            }

            const total = amount - this.usePoint; //이후 포인트 추가
            
            //결제데모를 사용 시 실제로 결제가 되기 때문에 앞쪽으로 빼놓음.
            axios({
                        url: "http://localhost:3000/goods/orderPay",
                        method: "POST",
                        data: {
                            order_nm: this.order.order_nm,
                            order_adr1: this.order.order_adr1,
                            order_adr2: this.order.order_adr2,
                            order_zipcode: this.order.order_zipcode,
                            order_phone: this.order.order_phone,
                            order_memo: this.order.order_memo !== undefined ? this.order.order_memo.trim() : '없음',
                            order_tc: count,
                            order_tp: total,
                            user_no: this.user.user_no,
                            ordertp: this.$route.params.ordertp,
                            order_point: this.usePoint,
                            order_detail: order_detail,
                        }
                    })
                    .then(() => {
                        this.$swal('구매가 완료되었습니다.');
                    })

            const IMP = window.IMP;
            IMP.init("imp17750140");

            IMP.request_pay({

                pg: "html5_inicis",
                pay_method: "card",
                name: name,
                amount: total,
                buyer_name: this.order.order_nm,
                buyer_tel: this.order.order_phone,
                buyer_addr: this.order.order_adr1 + this.order.order_adr2,
                buyer_postcode: this.order.order_zipcode,
            },
            (rsp) => {

                if(rsp.success){
                    console.log(rsp)
                    axios({
                        url: "http://localhost:3000/goods/orderPay",
                        method: "POST",
                        data: {
                            order_nm: this.order.order_nm,
                            order_adr1: this.order.order_adr1,
                            order_adr2: this.order.order_adr2,
                            order_zipcode: this.order.order_zipcode,
                            order_phone: this.order.order_phone,
                            order_memo: this.order.order_memo !== undefined ? this.order.order_memo.trim() : '없음',
                            order_tc: count,
                            order_tp: total,
                            user_no: this.user.user_no,
                            ordertp: this.$route.params.ordertp,
                            order_detail: order_detail,
                        }
                    })
                    .then(() => {
                        this.$swal('구매가 완료되었습니다.');
                        window.location.href = "http://localhost:8080/mypage/check";
                    })

                }
            })
            
        },
        getBasketList(){
            if(this.user.user_no === ''){
                alert('로그인해주셈');
                this.$router.push({ path: '/login'});
            }else{
                const goods_no = this.$route.params.goodsno.split(',');
                axios({
                    url: "http://localhost:3000/goods/orderpayBasket",
                    method: "POST",
                    data: {
                        user_no: this.user.user_no,
                        goods_no : goods_no,
                    }
                })
                .then(results => {
                    this.cartList = results.data;
                    console.log('>>>>>>>>>>>>>',results.data);
                })
            }
        },
        handlePointInput(){
            this.pointInput = this.pointInput.replace(/[^0-9]/g, '');
        },
        pointUse() {
            const inputPoint = parseInt(this.pointInput)

            if(inputPoint > this.userInfo.user_point){
                this.$swal('보유적립금을 초과합니다.')
            }else if(inputPoint < 5000){
                this.$swal('적립금 5,000부터 사용 가능합니다.')
            }else if(inputPoint <= this.getTotalPrice()){
                this.$swal('사용 가능합니다.')
                this.usePoint = inputPoint;
            }else if(inputPoint > this.getTotalPrice()){
                this.$swal('총 상품 금액보다 큽니다.')
            }else{
                this.$swal('숫자만 입력해주세요')
            }
        },
        getTotalPrice(){
            if(this.$route.params.ordertp === '0'){
                const totalPrice = this.goods.goods_price * this.$route.params.total;
                return totalPrice
            }
            else if(this.$route.params.ordertp === '1'){
                const totalPrice = this.cartList.reduce((total, cart) =>  total + (cart.basket_cnt * cart.basket_price),0);
                return totalPrice;

            }else {
                return 0;
            }
        },
        getOrderTotalPrice(){
            if(this.$route.params.ordertp === '0'){
                if(this.usePoint >= 5000){
                    const totalPrice = this.goods.goods_price * this.$route.params.total;
                    return totalPrice - this.usePoint
                }else{
                    const totalPrice = this.goods.goods_price * this.$route.params.total;
                    return totalPrice
                }
            }
            else if(this.$route.params.ordertp === '1'){
                if(this.usePoint >= 5000){
                    const totalPrice = this.cartList.reduce((total, cart) =>  total + (cart.basket_cnt * cart.basket_price),0);
                    return totalPrice - this.usePoint;
                }else{
                    const totalPrice = this.cartList.reduce((total, cart) =>  total + (cart.basket_cnt * cart.basket_price),0);
                    return totalPrice
                }
            }else {
                return 0;
            }
        },
        loadDaumPostcodeScript() {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.onload = () => {
          this.isScriptLoaded = true; // 스크립트가 로드되면 isScriptLoaded를 true로 설정
        };
        document.head.appendChild(script);
        },
        zipload() {
            if (window.daum && window.daum.Postcode) {
                if(!this.useDefaultAddress){
                    new daum.Postcode({
                        oncomplete: (data) => {
                        this.newOrderInfo.user_zipcode = data.zonecode;
                        this.newOrderInfo.user_adr1 = data.address;
                        this.newOrderInfo.user_adr2 = "";
                        }
                    }).open();
                }else {
                    new daum.Postcode({
                        oncomplete: (data) => {
                        this.userInfo.user_zipcode = data.zonecode;
                        this.userInfo.user_adr1 = data.address;
                        this.userInfo.user_adr2 = "";
                        }
                    }).open();
                }

            } else {
            console.error("Daum Postcode 스크립트가 로드되지 않았습니다.");
            }
        },
        validationCheck(){
            

            if ((this.useDefaultAddress && (this.userInfo.user_nm === "" || this.userInfo.user_nm == null)) ||
                (!this.useDefaultAddress && (this.newOrderInfo.user_nm === "" || this.newOrderInfo.user_nm == null))) {
                this.$swal("이름을 입력하세요.");
                return false;
            }
            if ((this.useDefaultAddress && (this.userInfo.user_phone === "" || this.userInfo.user_phone == null)) ||
                (!this.useDefaultAddress && (this.newOrderInfo.user_phone === "" || this.newOrderInfo.user_phone == null))) {
                this.$swal("전화번호를 입력하세요.");
                return false;
            }else if(!this.useDefaultAddress && (this.newOrderInfo.user_phone)){
                const validatedPhone = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
                if(!validatedPhone.test(this.newOrderInfo.user_phone)){
                    this.$swal("전화번호를 다시 입력하세요. EX) 01012345678");
                    return false;
                }
            }
            if ((this.useDefaultAddress && (this.userInfo.user_zipcode === "" || this.userInfo.user_zipcode == null)) ||
                (!this.useDefaultAddress && (this.newOrderInfo.user_zipcode === "" || this.newOrderInfo.user_zipcode == null))) {
                this.$swal("우편번호를 입력하세요.");
                return false;
            }
            if ((this.useDefaultAddress && (this.userInfo.user_adr1 === "" || this.userInfo.user_adr1 == null)) ||
                (!this.useDefaultAddress && (this.newOrderInfo.user_adr1 === "" || this.newOrderInfo.user_adr1 == null))) {
                this.$swal("주소를 입력하세요.");
                return false;
            }
            
            return true;
        }
    },
}
</script>
<style scoped>

.img_cart {

    width: 80px;
    height: 80px;
    border-radius: 6px;

}

</style>