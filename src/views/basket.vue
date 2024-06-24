<template>
    <main>
        <div class="container">
            <div class="myinfo">
                <div>
                    <h2 class="A">CART</h2>
                </div>
                <div class="my">
                    <div class="table-responsive">
                        <table class="table" style="width:100%;">
                            <thead class="A">
                                <th class="goodsname">선택사항/상품이미지</th>
                                <th>상품명</th>
                                <th>상품금액</th>
                                <th>수량</th>
                                <th>주문하기</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td v-if="img.length > 0" ><input type="checkbox" name="checkbox" value="" checked />
                                    <div class="img_container" v-for="(data, index) in img" :key="index"></div>
                                    <a :href="'http://localhost:8080/goodsDetail/' + img[index].goods_no">
                                    <img class="img" src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                                    alt="상품 이미지" /></a></td>
                                    
                                    <td class="basketName">{{ basket.basket_nm }}</td>
                                    <td class="basketPrice">{{ basket.basket_price}}</td>

                                    <td class="input-group">
                                <div class="goods-cnt d-flex align-items-center">
                                    <div class="me-2">수량</div>
                                        <button class="input-group-text size=sm" @click="decrementQuantity(cart);" :disabled="total === 1">-</button>
                                            <div class="me-2">{{ basket.basket_goods_count }}</div>
                                            <input type="text" readonly="readonly" style="height: 30px" v-model="total">
                                        <button class="input-group-text" @click="incrementQuantity(cart);"
                                            :disabled="total === 999">+</button>
                                </div>
                                    
                                    </td>
                                    <td>
                                    <button @click="goToOrder" type="button" id="btnOrder" class="order-step">주문하기</button>
                                    <button @click="confirmDelete(basket.basket_no)">삭제</button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-center btn_container">
                        <div class="buttons">
                            <button class="" @click="1">전체상품 주문</button>
                            <button class="" @click="2">선택상품 주문</button>
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
        return{
            img:[],
            name:[],
            cnt:[],
            orderList: [],
        };
    },
    methods: {
        goToOrder() {
            if (!this.$store.state.user) {
                alert ('로그인이 필요합니다.');
                window.location.href = '/auth';
            } else {
                alert ('주문페이지로 이동합니다.');
                window.location.href = '/order';
            }
        },
    goToImg(){
        axios({
            url: "http://localhost:3000/goods/goToImg",
            method: "POST",
            }).then(results => {
                console.log(results.data);
                this.img = results.data;
            })
    },
    goToName(){
        axios({
            url: "http://localhost:3000/goods/goToName",
            method: "POST",
            }).then(results => {
                console.log(results.data);
                this.name = results.data;
            })
    },
    goToCnt(){
        axios({
            url: "http://localhost:3000/goods/goToCnt",
            method: "POST",
            }).then(results => {
                console.log(results.data);
                this.cnt = results.data;
            })
    },
    
}
}
</script>

<style scoped>
.A{
    border-bottom: 1px 
    solid #000;
}
.B{
    width: 54px;
    height: 123px;
}
/* .d-flex{
    width: 139px;
    height: 49px;
} */
.table-responsive {
    text-align: center;
}
.table-responsive td {
    vertical-align: middle;
}
.btn_container {
    margin: 0 auto;
}
.btn_container div button {
    display: inline-block;
}
.btn_container div button:first-child {
    margin-right: 70px;
    background-color: black;
    color: white;
}
.input-group {
        height: 123px;
    }
    .input-group-text{
        width: 30px;
        height: 30px;
    }
   
    
    
    

</style>