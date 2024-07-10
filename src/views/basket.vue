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
                                    <th class="checkAll"><input class="box" type="checkbox" name="checkbox" @click="toggleSelectAll" />
                                    전체 선택/해제</th>
                                    <th class="goodsname">선택사항/상품이미지</th>
                                    <th>상품명</th>
                                    <th>상품금액</th>
                                    <th>수량</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>

                            <tbody class="QWER" v-if="basketList.length > 0">
                                <tr class="img_container" v-for="(goods, i) in basketList" :key="i">
                                    <input class="check" type="checkbox" v-model="goods.checked" @click="toggleCartItem(goods)" />
                                    <td>
                                        <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
                                            <img class="img" :src="goods.basket_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.basket_img}`) : '/goodsempty.jpg'" alt="상품 이미지" />
                                        </a>
                                    </td>
                                    <td class="basketName">{{ goods.basket_nm }}</td>
                                    <td class="basketPrice">{{ formatPrice(goods.basket_cnt * goods.basket_price) }}</td>
                                    <td>

                                        
                                    <div class="goods-cnt d-flex align-items-center">
                                        <button class="input-group-text" @click="updateBasketCnt2(goods);" :disabled="goods.basket_cnt === 1">-</button>
                                        <div>{{ goods.basket_cnt }}</div>
                                        <button class="input-group-text" @click="updateBasketCnt(goods);" :disabled="goods.basket_cnt === goods.goods_cnt">+</button>
                                    </div>
                                    </td>
                                    <td>
                                        <button @click="basketDelete(goods.goods_no)">삭제</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-center btn_container">
                        <div class="buttons">
                            <button class="btn-order-all" @click="buyAll()">전체상품 주문</button>
                            <button class="btn-order-selected" @click="goToBuy()">선택상품 주문</button>
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
            totalPrice: [],
            cnt: 1,
        };
    },
    created(){
        
    },
    mounted(){
        this.getBasketList(); 
    },
    computed: {
        user(){
                return this.$store.state.user;
            },
            selectedTotalPrice() {
            const selectedCarts = this.selectedCartList();
            return selectedCarts.reduce((total, goods) => {
                return this.totalPrice = total + goods.basket_cnt * goods.basket_price;
            }, 0);
        },
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
                goods.basket_cnt++;
            },

            updateBasketCnt2(goods) {
                if (goods.basket_cnt > 1) {
                    goods.basket_cnt--;
                }
            },

            formatPrice(price) {
            if (price !== undefined) {
                const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return `${formattedPrice} 원`;
            }
            return '';
            },

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
            },

            toggleCartItem(goods) {
                goods.checked = goods.checked;
            },

            toggleSelectAll() {
                const allChecked = this.basketList.every(goods => goods.checked);
                console.log("allchecked",allChecked)
                this.basketList.forEach(goods => {
                    goods.checked = !allChecked;
                });
            },

            buyAll() {
            this.basketList.forEach(goods => {
                this.toggleCartItem(goods);
            });
                this.goToBuy();
            },

            async goToBuy(){

                const selectedCarts = this.basketList.filter(goods => goods.checked);
                const basketNos = selectedCarts.map(goods => goods.basket_no);
                const basketCount = selectedCarts.map(goods => goods.basket_cnt);
                const price = selectedCarts.map(goods => goods.basket_price);
                console.log("selectedCarts", selectedCarts)
                console.log("basketNos", basketNos)
                console.log("basketCount", basketCount)
                if(this.user.user_no === ''){
                    alert('로그인해주셈');
                    this.$router.push({ path: '/login'});
                }else{
                    axios({
                        url: "http://localhost:3000/goods/updateBasket",
                        method: "POST",
                        data: {
                            basket_no: basketNos,
                            basket_cnt: basketCount,
                        }
                    })
                    .then(res => {

                        if (res.data.message === '장바구니 업데이트 성공') {
                            location.href = `http://localhost:8080/orderpay/1/${basketNos}/${basketCount}`;

                        } else {
                            this.$swal('결제 실패');
                        }
                    })
                    .catch(() => {
                        this.$swal('오류 발생');
                    });
                }
            },
            selectedCartList() {
            return this.basketList.filter(goods => goods.checked);
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
    width: 33.04px;
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
    
}

    

</style>