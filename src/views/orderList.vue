<template>
    <main>
        <div class="container">
            <div class="myinfo">
                <div>
                    <h2 style="border-bottom: 1px solid #000;">주문 내역 조회</h2>
                </div>
                <div class="my">
                    <div class="table-responsive">
                        <table class="table" style="width:100%">
                            <thead>
                                <tr>
                                    <th class="goodsname">상품명</th>
                                    <th>상품금액</th>
                                    <th>수량</th>
                                    <th>배송상태</th>
                                    <th>취소</th>
                                    <th>리뷰</th>
                                </tr>
                                    <td colspan="6" style="border-top: 1px solid #000;"></td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <router-link to="/detail/:goodsNo" class="A">
                                            <!--상품 클릭시 상품 상세정보로 이동-->
                                    <td>
                                        <img src="../assets/logo.png" :width="70" style="border-radius: 10px;"
                                            alt="상품 이미지" />
                                        <!--상품 이미지 연결-->
                                    </td>
                                    </router-link>

                                    <span>
                                        외 1건
                                        <!--사용자가 여러 개의 상품 주문하면 제외한 나머지 상품 개수를 요약표시-->
                                    </span>
                                    </td>
                                    <td>
                                        6,900원
                                    </td>
                                    <td>
                                        1개
                                    </td>
                                    <td>
                                        <button @click="1" class="a" type="button">배송중</button>
                                            <!--특정주문의 상태가 '배송 중' 경우에만 구매확정 버튼을 표시-->
                                    </td>
                                    <td>
                                        <button @click="2" class="d" type="button">취소 신청</button>
                                    </td>
                                    <td>
                                        <button class="review" type="button" @click="goToReviewWrite()">리뷰 작성</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="7" style=" padding: 150px 0px;">주문 내역이 없습니다.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {	
    name:'',
    components:{},
    data() {
        return {
            sampleData: '',
            order_trade_no: 0
        };
    },
    mounted(){

    },
    methods: {
        orderPage(){
            axios({
                url:"http//localhost:3000/"
            })
        },

        goToReviewWrite() { // 리뷰작성 폼으로 라우팅
            const order_trade_no = this.order_trade_no;
            axios({
                url: `http://localhost:3000/review/addReviews/${order_trade_no}`,
                methods: "POST",
                data: { // 리뷰폼으로 보내야하는 데이터들
                    goods_no: this.goods_no,
                    order_trade_no: this.order_trade_no
                }
            }).then(data => {
                window.location.href = '/mypage/reviewwrite';
            })
        }
    }
}
</script>

<style scoped>
/* Container and Layout */
.container {
    min-width: 1500px;
    width: 90%;
    margin: 0 auto;
    padding: 20px;
}

.myinfo {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Header */
h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

/* Table */
.table-responsive {
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.table th, .table td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
}

.table th {
    background-color: #f4f4f4;
    font-weight: bold;
}

.table tbody tr:hover {
    background-color: #f1f1f1;
}

.table img {
    display: block;
    margin: 0 auto;
}

/* Buttons */
button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

button.a {
    background-color: #828282; 
    color: white;
}

button.d {
    background-color: #000000; 
    color: white;
}

button.f {
    background-color: #000000; 
    color: white;
}

button:hover {
    opacity: 0.9;
}

/* Links */
a {
    text-decoration: none;
    color: #000;
}

a:hover {
    text-decoration: underline;
}

/* Miscellaneous */
.goodsname {
    width: 35%;
}

td[colspan="7"] {
    text-align: center;
    color: #888;
}

img {
    border-radius: 10px;
    width: 70px;
}
</style>