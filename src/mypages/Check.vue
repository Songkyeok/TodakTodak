<template>
    <main class="like_container">
        <div class="container">
            <div class="myinfo">
                <div>
                    <h2>나의 주문 내역</h2>
                </div>
                <div class="my">
                    <div class="table-responsive">
                        <div class="review-none" v-if="orderedList.length === 0">주문 내역이 없습니다.</div>
                        <table class="table" v-else>
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>주문 가격</th>
                                    <th>적립금 사용</th>
                                    <th>주문 수량</th>
                                    <th>주문 날짜</th>
                                    <th>주문 상태</th>
                                    <th>주문 취소</th>
                                    <th>리뷰</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ordered, i) in orderedList" :key="i">
                                    <td>{{formatDateTime(ordered.order_create)}}</td>
                                    <td>{{ordered.goods_nm}}</td>
                                    <td>{{ordered.ordered_price}}</td>
                                    <td>{{ordered.order_point}}</td>
                                    <td>{{ordered.order_goods_cnt}}</td>
                                    <td>{{formatStatus(ordered.order_status)}}</td>
                                    <td>
                                        <button v-if="ordered.order_status == 0" @click="order_cancel(ordered.order_detail_no, ordered.order_point)">주문 취소</button>
                                        <p v-else>-</p>
                                    </td>
                                    <td>
                                        <button v-if="ordered.order_status == 2 && ordered.hasReview == 0" @click="goToReview(ordered.goods_no, ordered.order_trade_no)">리뷰 작성</button>
                                        <p v-else-if="ordered.hasReview == 1">작성완료</p>
                                        <p v-else>-</p>
                                    </td>
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
import axios from "axios";
export default {
    data() {
        return {
            orderedList: [],
        }
    },
    mounted() {
        this.selectCheck();
    },
    methods: {
        selectCheck() {
            const user_no = this.$store.state.user.user_no;
            axios({
                url: "http://localhost:3000/mypage/selectCheck",
                method: "POST",
                data: {
                    user_no: user_no
                }
            }).then(res => {
                this.orderedList = res.data;
                console.log('rrrrrrrrrrrr',this.orderedList)
            });
        },
        formatStatus(status) {
            switch(status) {
                case 0:
                    return "결제 완료";
                case 1:
                    return "배송 중";
                case 2:
                    return "배송 완료";
                case 3:
                    return "결제 취소";
                default:
                    return "관리자 문의";
            }
        },
        order_cancel(order_detail_no, order_point) {
            if (confirm('해당 상품과 관련된 결제 주문이 전부 취소 됩니다. 정말 주문을 취소 하시겠습니까?')) {
                axios({
                    url: "http://localhost:3000/mypage/orderCancel",
                    method: "POST",
                    data: {
                        order_detail_no: order_detail_no,
                        order_point: order_point,
                        user_no : this.$store.state.user.user_no
                    }
                }).then(res => {
                    if(res.data.message == 'success') {
                        this.$swal("주문이 취소되었습니다.");
                        this.selectCheck();
                    
                    } else {
                        return;
                    }
                })
                window.location.reload();
            } else {
                return;
            }
        },
        goToReview(goods_no, order_trade_no) {
            this.$router.push({
                name: "ReviewWrite",
                query: {
                    goods_no: goods_no,
                    order_trade_no: order_trade_no
                }
            });
        },
    }
}
</script>

<style scoped>

a.imgSpace {
    color: inherit;
    text-decoration: none;
}

* {
    margin: 0;
    padding: 0;
}

ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
}

.like_container {
    width: 70%;
    padding: 0 5%;
    display: inline-block;
    vertical-align: top;
    margin-top: 100px;
}


h2 {
    margin-bottom: 20px;
}


.my .table {
    text-align: center;
    padding-right: 40px;
}

.my .table th {
    text-align: center;
    padding: 20px 0;
    /* border: 1px solid red; */
}

.my .detail {
    display: flex;
}

.btn {
    width: 70px;
    padding: 4px;
    border-radius: 6px;
    color: #ffffff;
    border: 1px solid #b4b4b4;
    background-color: #b4b4b4;
    font-family: GmarketSansMedium;
    cursor: pointer;
}

.btn2 {
    width: 50px;
    padding: 4px;
    border-radius: 6px;
    color: #ffffff;
    border: 1px solid #000000;
    background-color: #000000;
    font-family: GmarketSansMedium;
    cursor: pointer;

}

.my .table {
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 10px;
}

img {
    border-radius: 10%;
    background-color: #eeeeee;
}
.like_contents {
    vertical-align: middle;
}
td {
    background: #fff;
    vertical-align: middle;
}
td p {
    color: #212529;
    font-size: 1rem;
    font-weight: 400;
}

button {
    padding: 5px 8px;
    border: none;
    background-color: #767070;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    align-content: center;
    transition: all 0.3s;
}

button:hover {
    background-color: #0068FF;
    cursor: pointer;
}
</style>