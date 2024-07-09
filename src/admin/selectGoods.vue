<template>
    <main class="mt-3">
        <div class="container">
            <table class="table caption-top goodslist-table">
                <thead class="table-light">
                    <tr>
                        <th scope="col">이미지</th>
                        <th scope="col">상품명</th>
                        <th scope="col">카테고리</th>
                        <th scope="col">가격</th>
                        <th scope="col">남은수량</th>
                        <th scope="col"> </th>
                        <th scope="col"><button class="btn btn-primary" type="button" @click="goToAddGoods()">상품 등록</button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(goods, i) in pageGoodsList" :key="i">
                        <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
                                        <img :height="50"
                                            :src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                                            alt="상품 이미지">
                                    </a>
                        <td>{{ goods.goods_nm }}</td>
                        <td>{{ categoryType(goods.goods_category) }}</td>
                        <td>{{ getCurrencyFormat(goods.goods_price) }}원</td>
                        <td>{{ goods.goods_cnt }}개</td>
                        <td><button class="btn btn-light" @click="goToUpdateGoods(goods.goods_no)">수정</button></td>
                        <td><button class="btn btn-outline-danger" @click="goodsDelete(goods.goods_no)">삭제</button></td>
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <ul v-for="i in pageCnt" :key="i" class="pagination justify-content-center">
                        <a href="" style="text-decoration: none;">
                            <li v-if="i != pageNum + 1" class="page-item page-link" @click="setPage(i)">{{ i }}</li>
                            <li v-else class="page-item page-link active" @click="setPage(i)">{{ i }}</li>
                        </a>
                    </ul>
                </ul>
            </nav>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            goodsList: [],
            pageGoodsList: [],  // 한 페이지에 보여줄 굿즈 리스트를 잘라 담을 새 리스트
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
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            axios({
                url: "http://localhost:3000/goods/goodsList",
                method: "POST",
            }).then(results => {
                this.goodsList = results.data;
                this.pageCnt = Math.ceil(this.goodsList.length / 15)
                this.setPage(1)
            })

        },
        setPage(page) {
            this.pageGoodsList = []
            this.pageNum = page - 1;
            this.sliceList()
        },
        sliceList() {
            const start = 0 + this.pageNum * 15
            this.pageGoodsList = this.goodsList.slice(start, start + 15);
        },
        categoryType(socialType) {
            if (socialType === 1) {
                return '유아식기';
            } else if (socialType === 2) {
                return '욕실용품';
            } else if (socialType === 3) {
                return '외출용품';
            } else if (socialType === 4) {
                return '유아도서';
            } else if (socialType === 5) {
                return '위생용품';
            } else if (socialType === 6) {
                return '장난감';
            } else if (socialType === 7) {
                return '이벤트';
            } else {
                return 'null';
            }
        },
        getCurrencyFormat(value) {
            return this.$currencyFormat(value);
        },
        goToAddGoods() {
            this.$swal({
                title: `상품을 등록 하시겠습니까?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '등록',
                cancelButtonText: '취소',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.$router.push({ path: '/admin/goodscreate' });
                }
            });
        },
        goToUpdateGoods(goodsno) {
            window.location.href = `http://localhost:8080/admin/goodsupdate/${goodsno}`;
        },
        goToDetail(goodsno) {
            window.location.href = `http://localhost:8080/goodsDetail/${goodsno}`;
        },
        goodsDelete(goodsno) {
            this.$swal({
                title: `정말로 상품을 삭제하시겠습니까?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                reverseButtons: true,
            }).then(result => {
                if (result.value) {
                    axios({
                        url: `http://localhost:3000/goods/goodsDelete`,
                        method: "POST",
                        data: {
                            goods_no: goodsno
                        },
                    }).then(res => {
                        if (res.data.message == '상품 삭제') {
                            this.$swal("상품이 삭제되었습니다.");
                            window.location.href = `http://localhost:8080/admin/goods`;
                        }
                    }).catch(() => {
                        this.$swal("오류 발생");
                    });
                }
            });
        }
    }
};
</script>

<style scoped>

.goodslist-table {
    font-family: unset;
}

th,
td {
    vertical-align: middle;
    font-size: 15.5px;
}

img {
    border-radius: 10%;
    background-color: #eeeeee;
}

img:hover {
    transform: scale(1.12);
    transition: all 0.07s linear;
    background-color: #f1a87a;
}

img:not(:hover) {
    transform: scale(1.0);
    transition: all 0.07s linear;
}

.goToDetail {
    cursor: pointer;
}


.goToDetail:hover {
    color: #f1a87a;
    font-weight: bold;
    font-size: 16.5px;
}

</style>