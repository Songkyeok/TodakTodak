<template>
  <div v-if="goods">
    <div class="detail">
      {{ getCategory(goods.goods_category) }}
      <div class="container">
        <div class="image">
          <img
            :width="450"
            :src="
              goods.goods_img
                ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`)
                : '/goodsempty.jpg'
            "
            alt="상품 이미지"
          />
        </div>
        <div class="details">
          {{ goods.goods_nm }}
          <button
            v-if="user.user_no === ''"
            class="heart-button"
            @click="likeInsert"
          >
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
            <button
              class="input-group-text"
              @click="calculatePrice(-1)"
              :disabled="total === 1"
            >
              -
            </button>
            <input type="text" style="width: 40px" v-model="total" />
            <button
              class="input-group-text"
              @click="calculatePrice(1)"
              :disabled="total === goods.goods_cnt"
            >
              +
            </button>
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
        <img
          :width="550"
          :src="
            goods.goods_content
              ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_content}`)
              : '/goodsempty.jpg'
          "
          alt="상품 디테일 이미지"
        />
      </div>
    </div>
  </div>

  <!-- 상품리뷰 리스트 -->
  <div class="review-list">
    <h2>고객 리뷰</h2>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
        data-bs-toggle="dropdown" aria-expanded="false" style="border: none">{{ sortCase }}</button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a class="dropdown-item" href="#" @click="sortList(0)">최근 순</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="sortList(1)">오래된 순</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="sortList(2)">별점 높은 순</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="sortList(3)">별점 낮은 순</a>
        </li>
      </ul>
    </div>
    <div v-if="reviewList.length === 0">고객 리뷰가 없습니다.</div>
        <div v-else>
        <tr class="user-review-title">
          <th class="review-no">리뷰 번호</th>
          <th class="review-star">별점</th>
          <th class="review-user">작성자</th>
          <th class="review-photo">포토</th>
          <th class="review-content">내용</th>
          <th class="review-date">날짜</th>
        </tr>
        <tr class="user-review-content"  v-for="(review, i) in reviewList" :key="i">
          <!-- 반복문이고 reviewList를 배열로 받아왔으므로 [i]를 넣어야 됨 -->
          <th class="user-review-content value">{{ reviewList[i].review_no }}</th>
          <th class="user-review-content value">{{ reviewList[i].review_rating }}</th>
          <th class="user-review-content value">{{ reviewList[i].user_nm }}</th>
          <th class="user-review-content value">{{ reviewList[i].review_img }}</th>
          <th class="user-review-content value">{{ reviewList[i].review_con }}</th>
          <th class="user-review-content value">{{ reviewList[i].review_create }}</th>
        </tr>
        </div>
        <br />
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
      sortCase: "최근 순", // 리뷰조회 dropdown
      reviewList: [],
      goods_no:this.goods_no,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
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
        return "유아용품";
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
          url: "http://localhost:3000/goods/orderpay",
          method: "POST",
          data: {
            user_no: this.user.user_no,
            order_tp: this.totalPrice,
            order_tc: this.total,
            goods_no: this.goods.goods_no,
            goods_img: this.goods.goods_img,
          },
        });
        window.location.href = "http://localhost:8080/orderpay";
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

    // 리뷰조회 dropdown
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
    },
    // 실제 정렬 로직
    getReviewList(sortCase) {
        const goods_no = this.$route.params.goodsno;
        console.log(goods_no)
      axios({
        url: `http://localhost:3000/review/reviewList/${goods_no}`, // const로 정의한 goods_no를 여기에 넣었기때문에 아래에서 params로 다시 받지 않아도 됨
        method: "GET",
        // params: { // get 방식이므로 params로 보내야 됨
        //     goods_no: goods_no // key: 값
        // }
      }).then((results) => {
        console.log(results);
        this.reviewList = results.data;
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

.btn {
  align-content: end;
}
</style>
