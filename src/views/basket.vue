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
                                <tr>
                                    <th class="check"> </th>
                                    <th class="goodsname">선택사항/상품이미지</th>
                                    <th>상품명</th>
                                    <th>상품금액</th>
                                    <th>수량</th>
                                    <th>주문하기</th>
                                </tr>
                            </thead>

                            <tbody class="QWER" v-if="basketList.length > 0">
                                <tr class="img_container" v-for="(goods, i) in basketList" :key="i">
                                    <input class="box" type="checkbox" name="checkbox" value="" checked />
                                    <td>
                                        <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
                                            <img class="img" :src="goods.basket_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.basket_img}`) : '/goodsempty.jpg'" alt="상품 이미지" />
                                        </a>
                                    </td>
                                    <td class="basketName">{{ goods.basket_nm }}</td>
                                    <td class="basketPrice">{{ goods.basket_price }}</td>
                                    <td>

                                    <div class="goods-cnt d-flex align-items-center">
                                        <button class="input-group-text" @click="updateBasketCnt2(goods);" :disabled="goods.basket_cnt === 1">-</button>
                                        <input type="text" style="width:30px;" v-model="basketList[i].basket_cnt"> 
                                        <button class="input-group-text" @click="updateBasketCnt(goods);" :disabled="goods.basket_cnt === 999">+</button>
                                    </div>
                                                    <!--<div class="goods-cnt d-flex align-items-center">
                                            <button class="input-group-text" @click="calculatePrice(basketList[i].basket_price, -1);" :disabled="total === 1">-</button>
                                            <input type="text" style="width:30px;" v-model="goods.basket_cnt"> 
                                            <button class="input-group-text" @click="calculatePrice(basketList[i].basket_price, 1);"
                                                :disabled="total === 999">+</button>
                                        </div>-->

                                            <!--<button class="input-group-text size-sm" @click="decrementQuantity(index);" :disabled="goods.basket_cnt === 1">-</button>
                                            <div class="me-2">{{ goods.basket_cnt }}</div>
                                            <button class="input-group-text" @click="incrementQuantity(index);" :disabled="goods.basket_cnt === 999">+</button>-->
                                    </td>
                                    <td>
                                        <button @click="goToOrder(goods)" type="button" class="order-step">주문하기</button>
                                        <button @click="basketDelete(goods.goods_no)">삭제</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-center btn_container">
                        <div class="buttons">
                            <button @click="orderAll" class="btn-order-all">전체상품 주문</button>
                            <button @click="orderSelected" class="btn-order-selected">선택상품 주문</button>
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
            basketList:[],
            orderList: [],
            total: 1,
            totalPrice: 0,
            cnt: 1,
        };
    },
    created(){
        this.getBasketList(); 
    },
    mounted(){
        
    },
    computed: {
        user(){
                return this.$store.state.user;
            },
            selectedTotalPrice() {
                const selectedCarts = this.selectedCartList();
                return selectedCarts.reduce((total, cart) => {
                    return total + cart.basket_cnt * cart.basket_price;
                }, 0);
        },
    },
    methods: {
        selectedCartList() {
            return this.basketList.filter(cart => cart.checked);
        },
        goToOrder() {
            if (!this.$store.state.user) {
                alert ('로그인이 필요합니다.');
                window.location.href = '/auth';
            } else {
                alert ('주문페이지로 이동합니다.');
                window.location.href = '/order';
            }
        },
        getBasketList(){
                if(this.user.user_no === ''){
                    alert('로그인해주셈');
                    this.$router.push({ path: '/login'});
                }else{
                    axios({
                        url: "http://localhost:3000/goods/basketList",
                        method: "POST",
                        data: {
                            user_no: this.user.user_no
                        }
                    })
                    .then(results => {
                        this.basketList = results.data;
                        
                    })
                }
            },

            updateBasketCnt(goods) {
                                       
                goods.basket_cnt++

                
                                  
                this.calculateTotalPrice();
            },
            updateBasketCnt2(goods) {
                goods.basket_cnt--;
                if (newCnt < 1) newCnt = 1;
                
                this.calculateTotalPrice();
            },
            calculateTotalPrice(){
                this.totalPrice = 0;
                for (let i = 0; i < this.basketList.length; i++) {
                this.totalPrice += this.basketList[i].basket_price * this.basketList[i].basket_cnt;
                }
                console.log(this.totalPrice);
            },
            
            //     var total = this.total + cnt;
            //     if (total < 1) this.total = 1;
            //     //total = this.basketList[index].basket_cnt;
            //     console.log(total)
            //     this.totalPrice = basket_price * total;
            //     console.log(this.totalPrice)
            // },
            basketDelete(goods_no) {
            axios({
                url: 'http://localhost:3000/goods/basketDelete',
                method: 'POST',
                data: {
                    goods_no: goods_no,
                    user_no: this.user.user_no
                }
            })
            .then(res => {
                if (res.data.message === '장바구니 삭제') {
                    this.$swal('상품이 삭제되었습니다.');
                    this.getBasketList(); // 삭제 후 목록 다시 불러오기
                } else {
                    console.warn('404:', res.data);
                }
            })
            .catch((error) => {
                console.error("삭제 메소드 오류:", error);
                this.$swal('오류 발생');
            });
        }
    }
}


</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
}

/* 컨테이너 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 헤더 */
h2 {
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
}

/* 테이블 */
.table-responsive {
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.table th,
.table td {
    padding: 15px;
    text-align: left;
}

.table th {
    background-color: #f8f8f8;
    border-bottom: 2px solid #ddd;
}

/* 상품 이미지 */
.img_container img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
}

/* 상품명 */
.basketName {
    font-size: 1em;
    font-weight: bold;
}

/* 상품금액 */
.basketPrice {
    font-size: 1em;
    color: #333;
}

/* 수량 */
.input-group {
    display: flex;
    align-items: center;
}

.input-group-text {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #ddd;
    /* background-color: #f8f8f8; */
    margin: 0 12px;
}

.goods-cnt {
    display: flex;
    align-items: center;
}

/* 버튼 */
button {
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #000;
    color: #fff;
    font-size: 1em;
    margin-right: 3px;
}

button:hover {
    background-color: #333;
}

/* 주문 버튼 */
.order-step {
    margin-bottom: 10px;
}

.btn_container {
    display: flex;
    justify-content: center;
}

.btn-order-all,
.btn-order-selected {
    margin: 10px;
    padding: 15px 30px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.2em;
}

.btn-order-all:hover,
.btn-order-selected:hover {
    background-color: #555;
}
.check{
    width: 1px;
    height: 1px;
}
.box{

}
    
    

</style>