<template>
        <div class="container_goods_update">
            <h2 class="text-center" style="margin: 30px">상품 수정</h2>

            <div v-if="goods.goods_img">
                <img :height="200" :src="require(`../../../TodakTodak_Backend/uploads/uploadGoods/` + `${goods.goods_img}`)"
                alt="상품 이미지">
            </div>

            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품명 *</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" v-model="goods.goods_nm">
                </div>
            </div>


            <div class="mb-3 row">
                        <label class="col-md-3 col-form-label">카테고리 *</label>
                        <div class="col-md-9 inputRadio">
                            <div class="form-radio ms-4">
                                <input class="form-radio-input" type="radio" v-model="goods.goods_category" value="1"
                                    id="cate1">
                                <label class="form-check-label" for="cate1">유아식기</label>
                            </div>
                            <div class="form-radio ms-4">
                                <input class="form-radio-input" type="radio" v-model="goods.goods_category" value="2"
                                    id="cate2">
                                <label class="form-check-label" for="cate2">욕실용품</label>
                            </div>
                            <div class="form-check ms-1">
                                <input class="form-radio-input" type="radio" v-model="goods.goods_category" value="3"
                                    id="cate3">
                                <label class="form-check-label" for="cate3">외출용품</label>
                            </div>
                            <div class="form-check ms-1">
                                <input class="form-radio-input" type="radio" v-model="goods.goods_category" value="4"
                                    id="cate4">
                                <label class="form-check-label" for="cate4">유아도서</label>
                            </div>
                            <div class="form-check ms-1">
                                <input class="form-radio-input" type="radio" v-model="goods.goods_category" value="5"
                                    id="cate5">
                                <label class="form-check-label" for="cate5">위생용품</label>
                            </div>
                            <div class="form-check ms-1">
                                <input class="form-radio-input" type="radio" v-model="goods.goods_category" value="6"
                                    id="cate6">
                                <label class="form-check-label" for="cate6">장난감</label>
                            </div>
                            <div class="form-check ms-1">
                                <input class="form-radio-input" type="radio" v-model="goods.goods_category" value="7"
                                    id="cate7">
                                <label class="form-check-label" for="cate7">이벤트</label>
                            </div>
                        </div>
                    </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 가격 *</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" v-model="goods.goods_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
            </div>


            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">재고 *</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" v-model="goods.goods_cnt">
                        <span class="input-group-text">개</span>
                    </div>
                </div>
            </div>

            <div class="mb-3 row">
            <div class="col-6 d-grid p-1">
                <button type="button" class="btn btn-lg btn-light" @click="goToList">취소하기</button>
            </div>
            <div class="col-6 d-grid p-1">
                <button type="button" class="btn btn-lg btn-danger" @click="goodsUpdate">저장하기</button>
            </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            goods: {},
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    created() {
        this.getGoodsInfo();
    },
    mounted() {
        if (this.user.user_no == '') {
            // 일단은 로그인 상태 체크 
            this.$swal("관리자 외 접근제한 페이지입니다.");
            this.$router.push({ path: '/login' });
        }
        else {
            axios({
                url: "http://localhost:3000/auth/admin_check",
                method: "POST",
                data: {
                    user_no: this.user.user_no,
                },
            })
                .then(res => {
                    if (res.data.message == 'user') {
                        this.$swal("관리자 외 접근제한 페이지입니다.");
                        this.$router.push({ path: '/' });
                    }
                })
                .catch(() => {
                    this.$swal("접속 오류");
                })
        }

    },
    methods: {
        getGoodsInfo() {
            // 굿즈 정보 가져오기
            const goodsno = this.$route.params.goodsno;

            axios({
                url: `http://localhost:3000/goods/get_goods_info`,
                method: "POST",
                data: {
                    goodsno
                }
            })
                .then((res) => {
                    this.goods = res.data[0];
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        goodsUpdate() {
            if (!this.validationCheck()) {
                return;
            }
            else {
                axios({
                    url: "http://localhost:3000/goods/update_goods",
                    method: "POST",
                    data: {
                        goods: this.goods
                    },
                })
                    .then((res) => {
                        if (res.data.message == 'update_complete') {
                            this.$swal({
                                position: 'top',
                                icon: 'success',
                                title: '제품 수정 성공!',
                                showConfirmButton: false,
                                timer: 1000
                            })
                                .then(() => {
                                    window.location.href = "http://localhost:8080/admin/goods";
                                })
                        }
                        else {
                            this.$swal("제품 수정 실패");
                        }
                    })
                    .catch(() => {
                        this.$swal("오류 발생")
                    })
            }
        },
        validationCheck() {
            if (this.goods.goods_nm == "") {
                this.$swal("제품명은 필수 입력값입니다.");
                return false;
            }
            if (this.goods.goods_price == "" || this.goods.goods_price == 0) {
                this.$swal("제품 가격을 입력하세요.");
                return false;
            }
            return true;
        },
        goToList() {
            this.$swal({
                title: '제품 수정을 취소하겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ path: '/admin/goods' });
                    }
                })
        },

    }
}
</script>
<style scoped>
.container_goods_update{
    display: inline-block;
    width: 80%;
    min-width: 80%;
    margin-top: 50px;
    padding: 0 10% 0 5%;
    display: inline-block;
    vertical-align: top;
    overflow-x: auto;
    flex-wrap: nowrap;
    box-sizing: border-box;
}
.inputRadio .btn-group-toggle .btn {
    margin-bottom: 10px;
}

.inputRadio .btn-group-toggle .btn input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
}
</style>