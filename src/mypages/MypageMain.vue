<template>
    <div class="mypage_container">
        <div class="mypage_top_info">
            <div class="mypage_top_txt">
                <div class="grade_txt">
                    <p>{{ user_nm }}님의</p>
                    <p> 회원등급은
                        <span v-if="user_grade == 0">골드</span>
                        <span v-else-if="user_grade == 1">플레티넘</span>
                        <span v-else>다이아</span>
                        입니다.
                    </p>
                    <!-- <div class="btn_layer">
                        <span class="btn_gray_list">
                            <a href="#lyGrade" class="btn_gray_small"><em>등급혜택보기</em></a>
                        </span>

                        <div id="lyGrade" class="layer_area" style="display:none;">
                            <div class="ly_wrap grade_layer">
                                <div class="ly_tit">
                                    <strong>등급혜택 안내</strong>
                                </div>
                                <div class="ly_cont">
                                    <div class="grade_list">
                                        <dl>
                                            <dt>회원 등급</dt>
                                            <dd>NEW회원등급</dd>
                                        </dl>
                                        <dl>
                                            <dt>추가 할인</dt>
                                            <dd><strong>0원이상 구매시 상품 판매금액의 0.0% 추가 할인</strong></dd>
                                        </dl>
                                        <dl>
                                            <dt>중복 할인</dt>
                                            <dd><strong>0원이상 구매시 상품 판매금액의 0.0% 추가 할인</strong></dd>
                                        </dl>
                                        <dl>
                                            <dt>추가 적립</dt>
                                            <dd>0원이상 구매 시 구매금액당 0.0% 추가 적립</dd>
                                        </dl>
                                    </div>
                                </div>
                                <a href="#lyGrade" class="ly_close"><img src="https://blanc1tr2775.cdn-nhncommerce.com/data/skin/front/coslab2023/img/common/layer/btn_layer_close.png" alt="닫기"></a>
                            </div>
                        </div>

                    </div> -->
                </div>
                <!-- //grade_txt -->
            </div>
            <!-- //mypage_top_txt -->

            <div class="mypage_top_wallet">
                <ul>
                    <li>
                        <span><img src="../assets/img/mypage/icon_like.png" alt=""></span>
                        <span>
                            <em>LIKE</em>
                            <a href="http://localhost:8080/mypage/like">
                                <strong>{{ like_count }}</strong>
                            </a> 개
                        </span>
                    </li>
                    <li>
                        <span><img src="../assets/img/mypage/icon_mileage.png" alt=""></span>
                        <span><em>적립금</em><a href="#"><strong>{{ $currencyFormat(user_point) }}</strong></a>원</span>
                    </li>
                </ul>
            </div>
            <!-- //mypage_top_wallet -->

        </div>

        <!-- 주문처리 현황 -->
        <div class="mypage_order_info">
            <div class="mypage_zone_tit">
                <h3>진행 중인 주문<span>최근 30일 내에 진행중인 주문정보입니다.</span></h3>
            </div>
            <div class="mypage_order_info_cont">
                <ol>
                    <!-- <li class="active">
                        <b>입금대기</b>
                        <strong>1</strong>
                    </li> -->
                    <li class="status">
                        <b>결제완료</b>
                        <strong>{{this.status0}}</strong>
                    </li>
                    <!-- <li class="">
                        <b>상품준비중</b>
                        <strong>0</strong>
                    </li> -->
                    <li class="status">
                        <b>배송중</b>
                        <strong>{{this.status1}}</strong>
                    </li>
                    <li class="status">
                        <b>배송완료</b>
                        <strong>{{this.status2}}</strong>
                    </li>
                    <!-- <li class="">
                        <b>구매확정</b>
                        <strong>0</strong>
                    </li> -->
                </ol>
                <!-- <div class="order_case_list">
                    <ul>
                        <li>
                            <b>• 취소</b>
                            <span>1건</span>
                        </li>
                        <li>
                            <b>• 교환</b>
                            <span>0건</span>
                        </li>
                        <li>
                            <b>• 반품</b>
                            <span>0건</span>
                        </li>
                    </ul>
                </div> -->
            </div>
            <!-- //mypage_order_info_cont -->
        </div>

    </div>

    
</template>
<script>
import axios from 'axios';
import MypageSidebar from "../layouts/MypageSidebar.vue";

export default {
    components: {
        MypageSidebar
    },
    data() {
        return {
            user_nm: '',
            user_point: 0,
            user_grade: 0,
            like_count: 0,
            order_status: {},
            status0: 0,
            status1: 0,
            status2: 0,
            status3: 0,
        }
    },
    mounted() {
    },
    created() {
        this.getInfo();
        this.getOrder();
    },
    methods: {
        getInfo() {
            const user_no = this.$store.state.user.user_no;

            Promise.all([
                axios({
                    url: "http://localhost:3000/mypage/getInfo",
                    method: "POST",
                    data: { user_no: user_no }
                }),
                axios({
                    url: "http://localhost:3000/mypage/likeCount",
                    method: "POST",
                    data: { user_no: user_no }
                })
            ]).then(res => {
                this.user_nm = res[0].data[0].user_nm;
                this.user_point = res[0].data[0].user_point;
                this.user_grade = res[0].data[0].user_grade;
                this.like_count = res[1].data.length;
            })
            
            
        },
        getOrder(){
            const user_no = this.$store.state.user.user_no;
            axios({
                url:`http://localhost:3000/mypage/orderCount`,
                method: "POST",
                data: { user_no: user_no}
            })
            .then((res) => {
                this.order_status = res.data;
                this.status0 = this.order_status[0].status_count
                this.status1 = this.order_status[1].status_count
                this.status2 = this.order_status[2].status_count
                this.status3 = this.order_status[3].status_count
            })
        }
    },
    
}
</script>

<style scoped>
.mypage_container {
    width: 1080px;
    /* width: 80%; */
    margin-top: 100px;
    padding: 0 0 0 10%;
    display: inline-block;
    vertical-align: top;
    /* background-color: coral; */
}
.mypage_top_info {
    display: table;
    width: 100%;
    margin: 0 0 35px 0;
    border: 2px solid #e3e3e3;
    background: #f7f9f8;
}
.mypage_top_txt {
    display: table-cell;
    width: 30%;
    padding: 20px 0 20px 0;
    text-align: center;
    vertical-align: middle;
    background: #f7f9f8;
}
.mypage_top_wallet {
    display: table-cell;
    width: 69%;
    vertical-align: middle;
    background: #ffffff;
}
.mypage_top_wallet ul {
    width: 100%;
    padding: 27px 10px 27px 10px;
    font-size: 0;
    line-height: 1;
}
.mypage_top_wallet ul li {
    display: inline-block;
    width: 50%;
    font-size: 14px;
    text-align: center;
    border-left: 1px solid #e1e3e2;
}
.mypage_top_wallet ul li:first-child {
    border-left: none 0;
}
.mypage_top_wallet li span {
    display: block;
    padding: 0 10px 0 10px;
}
.mypage_top_wallet li em {
    display: block;
    padding: 15px 0 15px 0;
    font-weight: bold;
}
/* 주문처리 현황 */
.mypage_zone_tit {
    margin: 0 0 0 0;
    padding: 0 0 10px 0;
    font-size: 16px;
}
.mypage_zone_tit h3 {
    display: inline-block;
    font-size: 16px;
}
.mypage_zone_tit span {
    padding: 0 0 0 5px;
    color: #777777;
    font-size: 12px;
    font-weight: normal;
}
.mypage_order_info_cont {
    margin: 0 0 30px 0;
    padding: 35px 0 35px 0;
    font-size: 0;
    border: 1px solid #e3e3e3;
    border-top: 1px solid #999999;
    text-align: center;
    
}
.mypage_order_info_cont ol {
    display: inline-block;
    width: 100%;
    font-size: 0;
    /* border-right: 1px solid #e3e3e3; */
    vertical-align: middle;
    
}
.mypage_order_info_cont ol li {
    display: inline-block;
    width: 16%;
    min-width: 66px;
    padding: 0 10px 0 30px;
    font-size: 13px;
    background: url("../assets/img/mypage/mypgae_ing_next_bg.png") no-repeat left 50px;
    text-align: center;
    
}
.mypage_order_info_cont ol li:first-child {
    padding-left: 10px;
    background: none 0;
}
.mypage_order_info_cont ol li b {
    display: block;
    padding: 0 0 15px 0;
}
.mypage_order_info_cont ol li strong {
    display: inline-block;
    width: 52px;
    height: 52px;
    padding: 10px 0 0 0;
    color: #ffffff;
    font-size: 18px;
    background: url("../assets/img/mypage/mypgae_ing_list_bg.png") no-repeat 0 0;
    text-align: center;
    vertical-align: middle;
}


.mypage_order_info_cont .active strong {
    background: url("../assets/img/mypage/mypgae_ing_deliver_bg.png") no-repeat 0 0;
}

.status{
    padding-right: 80px;
}

</style>