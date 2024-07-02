<template>
  <div v-if="goods">
    <div class="detail">
      {{ getCategory(goods.goods_category) }}
      <div class="container">
        <div class="image">
          <img :width="450" :src="goods.goods_img? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`): '/goodsempty.jpg'" alt="상품 이미지"/>
        </div>
        <div class="details">
          {{ goods.goods_nm }}
          <button v-if="user.user_no === ''" class="heart-button" @click="likeInsert">
            <i class="far fa-heart heart-icon"></i>
          </button>
          <button v-else-if="!isLiked" class="heart-button" @click="likeInsert">
            <i class="far fa-heart heart-icon"></i>
          </button>
          <button v-else class="heart-button" @click="likeDelete">
            <i class="fas fa-heart like-heart-icon"></i>
          </button>
          <h4>{{ like }}</h4>
          <div class="price">{{ getCurrencyFormat(goods.goods_price) }}원</div>
          <div class="input-group">
            <span>수량</span>
            <button class="input-group-text" @click="calculatePrice(-1)" :disabled="total === 1">-</button>
            <input type="text" style="width: 40px" v-model="total" />
            <button class="input-group-text" @click="calculatePrice(1)" :disabled="total === goods.goods_cnt">+</button>
          </div>
          <div class="totalPrice">
            <div>
              <h4>총 금액</h4>
            </div>
            <div>
              <h4>{{ getCurrencyFormat(this.totalPrice) }}</h4>
            </div>
          </div>
          <div class="buttons">
            <button class="add-to-cart" @click="addToCart()">장바구니</button>
            <button class="buy-now" @click="goToBuy()">구매하기</button>
          </div>
        </div>
      </div>
      <!-- <div class="info">
                    <div class="header">
                    <h2>{{categoryType(goods.goods_category)}}/{{goods.goods_nm}}</h2>
                    <button v-if="user.user_no === ''" class="heart-button" @click="likeInsert">
                        <i class="far fa-heart heart-icon"></i>
                    </button>
                    <h4>{{like}}</h4>
                    </div>
                    </div> -->
    </div>

    <div class="d-flex justify-content-center">
      <div class="content">
        <img :width="550" :src=" goods.goods_content ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_content}`): '/goodsempty.jpg'" alt="상품 디테일 이미지"/>
      </div>
    </div>
  </div>


  <br />
  <br />
  <br />
  <br />
  <br />
  <!-- 상품리뷰 리스트 -->
<div>
  <div class="review-list">
    <h2>고객 리뷰</h2>
    <br />
    <div class="dropdown">
      <button @click="toggleDropdown" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" style="border: none">{{ sortCase }}</button>
      <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
        <li>
          <a class="dropdown-item" href="#" @click.prevent="sortList(0)">최근 순</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click.prevent="sortList(1)">오래된 순</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click.prevent="sortList(2)">별점 높은 순</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click.prevent="sortList(3)">별점 낮은 순</a>
        </li>
      </ul>
    </div>
    <br />
    <br />
    <div class="review-none" v-if="pageReviewList.length === 0">고객 리뷰가 없습니다.</div>
    <table class="review-content-list" v-else>
      <thead>
          <tr class="user-review-title">
              <th class="review-no">리뷰 번호</th>
              <th class="review-star">별점</th>
              <th class="review-user">작성자</th>
              <th class="review-photo">포토</th>
              <th class="review-content">내용</th>
              <th class="review-date">날짜</th>
          </tr>
      </thead>
      <br />
      <tbody>
          <tr class="user-review-content"  v-for="(review, i) in pageReviewList" :key="i">
          <!-- 반복문이고 reviewList를 배열로 받아왔으므로 [i]를 넣어야 됨 -->
              <th class="review-no value">{{ review.review_no }}</th>
              <th class="review-star value">{{ review.review_rating }}</th>
              <th class="review-user value">{{ review.user_nm }}</th>
              <th class="review-photo value">{{ review.review_img }}</th>
              <th class="review-content value">{{ review.review_con }}</th>
              <th class="review-date value">{{ review.review_create }}</th>
          </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
              <ul v-for="i in pageCnt" :key="i" class="pagination justify-content-center">
                  <li v-if="i != pageNum + 1" class="page-item page-link" @click="setPage(i)">{{ i }}</li>
                  <li v-else class="page-item page-link active" @click="setPage(i)">{{ i }}</li>
              </ul>
          </ul>
      </nav>
    <br />
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      goods: {},
      total: 1,
      totalPrice: 0,
      cnt: 1,
      isLiked: false,
      sortCase: '최근 순', // 리뷰조회 dropdown
      isDropdownOpen: false,
      reviewList: [],
      sortOption: 0,
      goods_no:this.goods_no,

      // 리뷰 페이징
      pageReviewList: [],
      pageNum: 0,
      pageCnt: 0,
      onePageCnt: 5,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },

    // 드롭박스 메뉴대로 정렬되도록 하는 로직
    reviewList() { // 함수명이 위에서 v-for을 사용할 때 in에 명시한 이름과 동일해야 됨
      let sortedArray = [...this.reviewList];
      if (this.sortOption == 0) {
        sortedArray.sort((a, b) => new Date(b.review_create) - new Date(a.review_create));
      } else if (this.sortOption == 1) {
        sortedArray.sort((a, b) => new Date(a.review_create) - new Date(b.review_create));
      } else if (this.sortOption == 2) {
        sortedArray.sort((a, b) => b.review_rating - a.review_rating);
      } else if (this.sortOption == 3) {
        sortedArray.sort((a, b) => a.review_rating - b.review_rating);
      }
      return sortedArray;
    },
  },

  created() {
    this.getGoods();
    this.likeCheck();
  },

  mounted() {
    this.getReviewList();
  },

  methods: {
    setPage(page) {
      this.pageReviewList = []
      this.pageNum = page - 1;
      this.sliceList()
    },
    sliceList() {
        const start = 0 + this.pageNum * this.onePageCnt
        this.pageReviewList = this.reviewList.slice(start, start + this.onePageCnt);
    },
    async getGoods() {
      try {
        const goodsno = this.$route.params.goodsno;
        const response = await axios.get(
          `http://localhost:3000/goods/goodsDetail/${goodsno}`
        );
        this.goods = response.data[0];
        this.totalPrice = this.goods.goods_price;
      } catch (error) {
        console.error(error);
      }
    },
    calculatePrice(cnt) {
      const total = this.total + cnt;
      if (total < 1) total = 1;
      this.total = total;
      this.totalPrice = this.goods.goods_price * this.total;
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    getCategory(cate) {
      if (cate == 1) {
        return "유아식기";
      } else if (cate == 2) {
        return "욕실용품";
      } else if (cate == 3) {
        return "외출용품";
      } else if (cate == 4) {
        return "유아도서";
      } else if (cate == 5) {
        return "위생용품";
      } else if (cate == 6) {
        return "장난감";
      } else if (cate == 7) {
        return "이벤트";
      }
    },
    addToCart() {
      if (this.user.user_no === "") {
        alert("로그인해주셈");
        this.$router.push({ path: "/login" });
      } else {
        axios({
          url: "http://localhost:3000/goods/basketInsert",
          method: "POST",
          data: {
            user_no: this.user.user_no,
            basket_price: this.goods.goods_price,
            basket_nm: this.goods.goods_nm,
            basket_img: this.goods.goods_img,
            basket_cnt: this.total,
            goods_no: this.goods.goods_no,
          },
        })
          .then((res) => {
            if (res.data.message == "이미 담겨 있는 상품입니다.") {
              this.$swal("이미 장바구니에 담긴 상품입니다");
            } else {
              this.$swal({
                title: "상품이 장바구니에 담겼습니다.",
                showDenyButton: true,
                confirmButtonText: "장바구니로 이동",
                denyButtonText: `계속 쇼핑하기`,
              }).then((result) => {
                if (result.isConfirmed) {
                  location.href = "http://localhost:8080/basket";
                } else if (result.isDenied) {
                  location.reload();
                }
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async goToBuy() {
      if (this.user.user_no === "") {
        alert("로그인해주셈");
        this.$router.push({ path: "/login" });
      } else {
        axios({
          url: "http://localhost:3000/goods/orderpay/0",
          method: "POST",
          data: {
            user_no: this.user.user_no,
            order_tp: this.totalPrice,
            order_tc: this.total,
            goods_no: this.goods.goods_no,
            goods_img: this.goods.goods_img,
          },
        });
        window.location.href = "http://localhost:8080/orderpay/0";
      }
    },
    async likeCheck() {
      axios({
        url: "http://localhost:3000/goods/likeCheck",
        method: "POST",
        data: {
          user_no: this.user.user_no,
          goods_no: this.$route.params.goodsno,
        },
      }).then((res) => {
        if (res.data.message == "좋아요 성공") {
          this.isLiked = res.data.isLiked;
        } else {
          this.isLiked = false;
        }
      });
    },
    async likeInsert() {
      if (this.user.user_no === "") {
        alert("로그인해주셈");
        this.$router.push({ path: "/login" });
      } else {
        axios({
          url: "http://localhost:3000/goods/likeInsert",
          method: "POST",
          data: {
            user_no: this.user.user_no,
            goods_no: this.goods.goods_no,
          },
        }),
          (this.isLiked = true);
      }
    },
    likeDelete() {
      if (this.user.user_no === "") {
        alert("로그인해주셈");
        this.$router.push({ path: "/login" });
      } else {
        axios({
          url: "http://localhost:3000/goods/likeDelete",
          method: "POST",
          data: {
            user_no: this.user.user_no,
            goods_no: this.goods.goods_no,
          },
        }),
          (this.isLiked = false);
      }
    },

    // 리뷰조회 dropdown 버튼
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    sortList(sortNum) {
      if (sortNum == 0) {
        this.sortCase = "최근 순";
      } else if (sortNum == 1) {
        this.sortCase = "오래된 순";
      } else if (sortNum == 2) {
        this.sortCase = "별점 높은 순";
      } else {
        this.sortCase = "별점 낮은 순";
      }
      this.getReviewList(sortNum);
      this.sortOption = sortNum;
      this.isDropdownOpen = false; // 드롭다운을 닫음
    },
    changePage(page) {
      this.currentPage = page;
    },
    // 실제 정렬 로직
    getReviewList(sortNum) {
        const goods_no = this.$route.params.goodsno;
      axios({
        url: `http://localhost:3000/review/reviewList/${goods_no}`,
        method: "GET",
        params: {
          sortCase: sortNum
        }
      }).then((results) => {
        this.reviewList = results.data;
        this.pageCnt = parseInt(this.reviewList.length / this.onePageCnt) + 1
        this.setPage(1)
      })
      .catch(error => {
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.image {
  flex: 1;
  text-align: center;
}

.details {
  flex: 2;
  margin-left: 20px;
  height: 500px;
}

.details h2 {
  margin-bottom: 10px;
}

.details .price {
  font-size: 24px;
  color: #e67e22;
  margin-bottom: 10px;
}

.details .input-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.details .total-price {
  font-size: 20px;
  color: #e74c3c;
  margin-bottom: 20px;
}

.details .description {
  font-size: 16px;
  line-height: 1.5;
}

.details .quantity input {
  width: 60px;
  padding: 5px;
  font-size: 16px;
}

/* .btn {
  align-content: end;
} */


.review-none {
    font-size: medium;
    color: #817f7f;
}

.review-list {
    margin-left: 12%;
    width: 75%;
}

.review-list h2 {
    border-bottom: 2px solid #817f7f;
    padding: 20px;
}

.dropdown {
    text-align: end;
    padding-right: 50px;
    position: relative;
    /* display: inline-block; */
}

/* Dropdown Button Style */
.dropdown .btn {
  width: 100px; /* 너비 */
  height: 40px; /* 높이 */
  padding: 10px; /* 패딩 */
  font-size: 14px; /* 폰트 크기 */
  background-color: #89939e; /* 배경 색상 */
  color: #fff; /* 텍스트 색상 */
  border: none; /* 테두리 제거 */
  border-radius: 4px; /* 둥근 테두리 */
}

/* Optional: Adjust dropdown list items */
.dropdown-menu {
  width: 150px; /* 너비 */
  right: 0;
}

/* Optional: Change dropdown items style */
.dropdown-menu .dropdown-item {
  font-size: 14px; /* 폰트 크기 */
  padding: 10px 15px; /* 패딩 */
}


.user-review-title {
    border-bottom: 1px solid #817f7f;
    font-size: large;
}

.user-review-content {
    border-bottom: 1px solid #bbb8b8;
    font-size: small;
}

.review-no {
    width: 5%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.review-star {
    width: 3%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.review-user {
    width: 7%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.review-photo {
    width: 17%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.review-content {
    width: 30%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.review-date {
    width: 10%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.page-item {
    margin: 0 5px;
    cursor: pointer;
}

.page-item.active {
    font-weight: bold;
}

</style>
