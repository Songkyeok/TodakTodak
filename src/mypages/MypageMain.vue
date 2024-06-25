<template>
    <MypageSideBar />

    <div class="mypage_container">
        <div class="mypage_top_info">
            <div class="mypage_top_txt">
                <div class="grade_txt">
                    <p>송기혁님의</p><p> 회원등급은 <span>NEW회원등급</span> 입니다.
                    </p><div class="btn_layer">
                        <!--span class="btn_gray_list"><a href="#lyGrade" class="btn_gray_small"><em>등급혜택보기</em></a></span-->

                        <!-- N : 회원등급혜택 레이어 시작 -->
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
                                            <dt>추가  적립</dt>
                                            <dd>0원이상 구매 시 구매금액당 0.0% 추가 적립</dd>
                                        </dl>
                                    </div>
                                </div>
                                <!-- //ly_cont -->
                                <a href="#lyGrade" class="ly_close"><img src="https://blanc1tr2775.cdn-nhncommerce.com/data/skin/front/coslab2023/img/common/layer/btn_layer_close.png" alt="닫기"></a>
                            </div>
                            <!-- //ly_wrap -->
                        </div>
                        <!-- N : 회원등급혜택 레이어 끝 -->

                    </div>
                </div>
                <!-- //grade_txt -->
            </div>
            <!-- //mypage_top_txt -->

            <div class="mypage_top_wallet">
                <ul>
                    <li>
                        <span><img src="../assets/img/mypage/icon_coupon.png" alt=""></span>
                        <span><em>LIKE</em><a href="#"><strong>0</strong></a>장</span>
                    </li>
                    <li>
                        <span><img src="../assets/img/mypage/icon_mileage.png" alt=""></span>
                        <span><em>적립금</em><a href="#"><strong>3,000</strong></a>원</span>
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
                    <li class="active">
                        <b>입금대기</b>
                        <strong>1</strong>
                    </li>
                    <li class="">
                        <b>결제완료</b>
                        <strong>0</strong>
                    </li>
                    <li class="">
                        <b>상품준비중</b>
                        <strong>0</strong>
                    </li>
                    <li class="">
                        <b>배송중</b>
                        <strong>0</strong>
                    </li>
                    <li class="">
                        <b>배송완료</b>
                        <strong>0</strong>
                    </li>
                    <li class="">
                        <b>구매확정</b>
                        <strong>0</strong>
                    </li>
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
import MypageSideBar from "../layouts/MypageSideBar.vue";

export default {
    components: {
        MypageSideBar
    }
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
</style>