<template>
    
    <div class="goods-management">
        <h1>상품관리</h1>
        <table>
            <thead>
                <tr class="goodslist-title">
                    <th class="goods-img-title">이미지</th>
                    <th class="goods-name">상품명</th>
                    <th class="goods-category">카테고리</th>
                    <th class="goods-price">가격</th>
                    <th class="goods-count">남은수량</th>
                    <th class="goods-none"></th>
                    <th class="goods-none"><button type="button" class="goods-create-btn" @click="goToAddGoods()">상품등록</button></th>
                </tr>
                <tr class="goods-list" v-for="(goods, i) in pageGoodsList" :key="i">
                    <th class="goods-img value">
                        <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
                        <img class="img" :src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'" alt="상품 이미지">
                        </a>
                    </th>
                    <th class="goods-name value">{{pageGoodsList[i].goods_nm}}</th>
                    <th class="goods-category value">{{categoryType(pageGoodsList[i].goods_category)}}</th>
                    <th class="goods-price value">{{getCurrencyFormat(pageGoodsList[i].goods_price)}}원</th>
                    <th class="goods-count value">{{pageGoodsList[i].goods_cnt}}개</th>
                    <th><button type="button" class="goods-update-btn" @click="goToUpdateGoods(pageGoodsList[i].goods_no)">수정</button></th>
                    <th><button type="button" class="goods-delete-btn" @click="goodsDelete(pageGoodsList[i].goods_no)">삭제</button></th>
                </tr>
                <br />
            </thead>
        </table>
        <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li v-for="i in pageCnt" :key="i" class="page-item">
          <a href="#" class="page-link" :class="{ active: i === pageNum + 1 }" @click.prevent="setPage(i)">{{ i }}</a>
        </li> 
      </ul>
    </nav>
    </div>          
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

.goods-management {
    /* border-bottom: 1px solid #222222;
    margin-top: 20px;
    text-align: left;
    padding-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px; */
    width: 80%;
    min-width: 80%;
    margin-top: 100px;
    padding: 0 10% 0 5%;
    display: inline-block;
    vertical-align: top;
    overflow-x: auto;
    flex-wrap: nowrap;
    box-sizing: border-box;
}

.goods-management h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 10px;
}

.goodslist-title {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: large;
    color: #999696;
    text-align: center;
    background-color: #f8f7f7;
}

.goods-img-title {
    width: 15%;
    padding: 23px;
    align-items: center;
}

.goods-img {
    height: 150px;
    width: 230px;
    align-items: center;
}

.goods-name {
    width: 10%;
}

.goods-category {
    width: 10%;
}

.goods-price {
    width: 10%;
}

.goods-count {
    width: 10%;
}

.goods-none {
    width: 10%;
}

.goods-list {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: small;
    color: #5d5b5b;
    text-align: center;
    font-weight: 50px;
}

.img{
    height: 100px;
    width: 100px;
}

.goods-create-btn {
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

.goods-update-btn {
    border: none;
    width: 50%;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 5px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}

.goods-delete-btn {
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