<template>
    
    <div class="order-management">
        <h1>주문관리</h1>
        <br />
        <br />
        <table>
            <thead v-if="pageOrderList.length > 0">
                <tr class="orderlist-title">
                    <th class="order-date">결제일</th>
                    <th class="order-number">주문번호</th>
                    <th class="order-name">고객명</th>
                    <th class="order-goods">상품명</th>
                    <th class="order-price">결제금액</th>
                    <th class="order-status">주문상태</th>
                    <th class="order-none"></th>
                    <th class="order-none"></th>
                </tr>
                <tr class="order-list" v-for="(order, i) in pageOrderList" :key="i">
                    <th class="order-date value">{{ pageOrderList[i].order_create }}</th>
                    <th class="order-number value">{{ pageOrderList[i].order_trade_no }}</th>
                    <th class="order-name value">{{ pageOrderList[i].order_nm }}</th>
                    <th class="order-goods value">{{ pageOrderList[i].goods_nm }}</th>
                    <th class="order-price value">{{ (pageOrderList[i].order_tp) }}원</th>
                    <th class="order-status value">{{ (pageOrderList[i].order_status) }}</th>
                    <th><button type="button" class="order-delivery-btn" @click="delivery(pageOrderList[i].order_trade_no)">배송중 처리</button></th>
                    <th><button type="button" class="order-finish-btn" @click="finish(pageOrderList[i].order_trade_no)">배송완료 처리</button></th>
                </tr>
                <br />
            </thead>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <ul v-for="i in pageCnt" :key="i" class="pagination justify-content-center">
                    <a href="#top" style="text-decoration: none;">
                        <li v-if="i != pageNum + 1" class="page-item page-link" @click="setPage(i)">{{ i }}</li>
                        <li v-else class="page-item page-link active" @click="setPage(i)">{{ i }}</li>
                    </a>
                </ul>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            orderList: [],
            pageOrderList: [],
            pageNum: 0,
            pageCnt: 0,
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    mounted() {
        if (this.user.user_no == '') {
            // 일단은 로그인 상태 체크 
            this.$swal("관리자 외 접근제한 페이지입니다.");
            this.$router.push({ path: '/login' });
        } else {
            axios({
                url: "http://localhost:3000/auth/admin_check",
                method: "POST",
                data: {
                    user_no: this.user.user_no,
                },
            }).then(res => {
                if (res.data.message == 'user') {
                    this.$swal("관리자 외 접근제한 페이지입니다.");
                    this.$router.push({ path: '/' });
                }
            }).catch(() => {
                this.$swal("접속 오류");
            });
        }
    },
    created() {
        this.getOrderList();
    },
    methods: {
        getOrderList() {
            axios({
                url: "http://localhost:3000/goods/orderList",
                method: "POST",
            }).then(results => {
                this.orderList = results.data;
                this.pageCnt = Math.ceil(this.orderList.length / 15)
                this.setPage(1)
            })

        },
        setPage(page) {
            this.pageOrderList = []
            this.pageNum = page - 1;
            this.sliceList()
        },
        sliceList() {
            const start = 0 + this.pageNum * 15
            this.pageOrderList = this.orderList.slice(start, start + 15);
        },
    },
    statusType(socialType) {
        if (socialType === 0) {
            return '구매미완료';
        } else if (socialType === 1) {
            return '구매완료';
        } else if (socialType === 2) {
            return '배송중';
        } else if (socialType === 3) {
            return '배송완료';
        } else {
            return 'null';
        }
    },
    getCurrencyFormat(value) {
        return this.$currencyFormat(value);
    },
    getFormatDateTime(dateTime) {
            // 이 부분에서 날짜 포맷 변경 함수를 사용합니다.
            if (!dateTime) return '';
            const date = new Date(dateTime);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
            const day = date.getDate();

            // 월과 일이 한 자리 수일 경우 앞에 0을 추가합니다.
            const formattedMonth = month < 10 ? `0${month}` : month;
            const formattedDay = day < 10 ? `0${day}` : day;

            return `${year}년 ${formattedMonth}월 ${formattedDay}일`;
        },
    delivery(ordertradeno) {
        this.$swal({
            title: `배송중으로 등록 하시겠습니까?`,
            icon: 'question',
            showCancelbutton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소',
            reverseButtons: true,
        }).then(result => {
                    if (result.value) {
                        axios({
                            url: `http://localhost:3000/goods/updatestatus`,
                            method: "POST",
                            data: {
                                order_trade_no: ordertradeno,
                                status: 2,
                                orderTradeNos: selectedOrdersWithStatus0
                            },
                        }).then(res => {
                            if (res.data.message == 'complete') {
                                this.$swal("변경되었습니다.");
                            }
                        }).catch(() => {
                            this.$swal("오류 발생");
                        });
                    }
                });
    },
    finish(ordertradeno) {
        this.$swal({
            title: `배송완료로 등록 하시겠습니까?`,
            icon: 'question',
            showCancelbutton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소',
            reverseButtons: true,
        }).then(result => {
                    if (result.value) {
                        axios({
                            url: `http://localhost:3000/goods/updatestatus`,
                            method: "POST",
                            data: {
                                order_trade_no: ordertradeno,
                                status: 3,
                                orderTradeNos: selectedOrdersWithStatus0
                            },
                        }).then(res => {
                            if (res.data.message == 'complete') {
                                this.$swal("변경되었습니다.");
                            }
                        }).catch(() => {
                            this.$swal("오류 발생");
                        });
                    }
                });
    }
};
</script>

<style scoped>

.order-management {
    /* border-bottom: 1px solid #222222;
    margin-top: 20px;
    text-align: left;
    padding-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px; */
    width: 80%;
    margin-top: 100px;
    padding: 0 10% 0 5%;
    display: inline-block;
    vertical-align: top;
}

.order-management h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 10px;
}

.orderlist-title {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: large;
    color: #999696;
    text-align: center;
}

.order-date {
    width: 20%;
    padding: 38px;
    align-items: center;
}

.oreder-number {
    width: 10%;
}

.order-name {
    width: 10%;
}

.order-goods {
    width: 10%;
}

.order-price {
    width: 10%;
}

.order-status {
    width: 10%;
}

.order-none {
    width: 20%;
}

.order-list {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: small;
    color: #5d5b5b;
    text-align: center;
    font-weight: 50px;
}

.order-delivery-btn {
    border: none;
    width: 50%;
    border: solid 3px rgb(151, 235, 118);
    border-radius: 5px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
    font-size: 15px;
}

.order-finish-btn {
    border: none;
    width: 50%;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 5px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}

</style>