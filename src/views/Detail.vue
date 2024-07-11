<template>
  <div v-if="goods">
    <div class="detail">
      <div class="container">
        <div class="content">
          <div class="brand_wrap">
            <h4>{{getCategory(goods.goods_category)}}</h4>
          </div>
          <div class="product_wrapper">
            <div class="visual_area">
                <img class="product-img" :src="goods.goods_img? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`): '/goodsempty.jpg'" alt="상품 이미지"/>
            </div>
            <div class="product-info_wrap">
              <div class="details">
                <div class="title_wrap">
                  <strong class="title">{{ goods.goods_nm }}</strong>
                  <span class="like_box">
                  <button v-if="user.user_no === ''" class="heart-button" @click="likeInsert">
                    <i class="far fa-heart heart-icon"></i>
                  </button>
                  <button v-else-if="!isLiked" class="heart-button" @click="likeInsert">
                    <i class="far fa-heart heart-icon"></i>
                  </button>
                  <button v-else class="heart-button" @click="likeDelete">
                    <i class="fas fa-heart like-heart-icon"></i>
                  </button>
                  </span>
                </div>
                <div class="detail_wrap">
                
                  <h4>{{ like }}</h4>
                  <div class="price-box">
                    <li class="price_list">
                      <div class="price_name">
                        <span>판매가</span>
                      </div>
                        <span class="price">
                        <strong>{{ getCurrencyFormat(goods.goods_price) }}</strong>
                        </span>
                        <h5>원</h5>
                    </li>
                  </div>
                  <div class="detail-info-box">
                    <strong class="detail-info-tit">혜택안내</strong>
                    <ul class="detail-info-list">
                      <li>
                        <div class="tit">카드혜택</div>
                        <div class="info_box">
                          <span>
                            무이자 할부혜택
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="detail-info-box">
                    <strong class="detail-info-tit">배송안내</strong>
                    <ul class="detail-info-list">
                      <li>
                        <div class="tit">배송비</div>
                        <div class="info_box">
                          <span>
                            배송비 무료
                          </span>
                        </div>
                      </li>
                      <li>
                        <div class="tit">발송예정일</div>
                        <div class="info_box">
                          <span>
                            3일 이내 배송가능 (토,일,공휴일 제외)
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="detail-option-section">
                    <div class="detail-final-box">
                      <div class="input-group">
                        <span class="total">[택배배송]{{goods.goods_nm}} </span>
                        <div class="button-group">
                          <button class="btn decrease" @click="calculatePrice(-1)" :disabled="total === 1">-</button>
                          <input type="number" class="input-field" v-model="total" @input="updatePrice" min="1" :max="goods.goods_cnt"/>
                          <button class="btn increase" @click="calculatePrice(1)" :disabled="total === goods.goods_cnt">+</button>
                        </div>
                        <div class="input-group-price">{{getCurrencyFormat(this.totalPrice)}}원</div>
                      </div>
                    </div>
                  </div>
                  <div class="detail-total-box">
                    <span class="total-txt">총 합계</span>
                    <span>
                      <strong class="total-price">{{ getCurrencyFormat(this.totalPrice) }}</strong>원
                    </span>
                  </div>
                  <div class="detail-buy-box">
                    
                      <button class="add-to-cart" @click="addToCart()">장바구니</button>
                      <button class="buy-now" @click="goToBuy(goods.goods_no)">구매하기</button>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        
  

      </div>


      </div>
                <div class="cm-tab" style="position: sticky; padding-top: 20px; margin: 0 auto; z-index: 15; top: 0; left: 0; right: 0; width: 1080px;">

                  <div class="sticky-wrap" style="height: 46px;">
                    <div class="et-hero-tabs-container">
                      <a class="et-hero-tab" href="#tab-es6">상품 상세정보</a>
                      <a class="et-hero-tab" href="#tab-flexbox">고객리뷰</a>
                      <a class="et-hero-tab" href="#tab-react">상품 Q&A</a>
                      <span class="et-hero-tab-slider"></span>
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
      <section class="et-slide" id="tab-es6">
        <div style="text-align : center; margin-top: 30px;">
            <img :width="550" :src=" goods.goods_content ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_content}`): '/goodsempty.jpg'" alt="상품 디테일 이미지"/>
        </div>
      </section>
      <section id="tab-flexbox">

        <!-- 리뷰 넣으시면 됩니다. -->
<!-- 상품리뷰 리스트 조회 -->
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
              <th class="review-no">번호</th>
              <th class="review-star">만족도</th>
              <th class="review-user">작성자</th>
              <th class="review-photo">포토 리뷰</th>
              <th class="review-content">내용</th>
              <th class="review-date">등록 날짜</th>
          </tr>
      </thead>
      <br />
      <tbody>
          <tr class="user-review-content"  v-for="(review, i) in pageReviewList" :key="i">
          <!-- 반복문이고 reviewList를 배열로 받아왔으므로 [i]를 넣어야 됨 => for in에서 in에 있는 내용을 가져다 쓸 때만 [i]를 넣으면 됨 -->
           <!-- pageReviewList[i] = v-for에 있는 review와 같음 -->
              <th class="review-no value">{{ review.review_no }}</th> 
              <th class="review-star value">{{ review.review_rating }}</th>
              <th class="review-user value">{{ review.user_nm }}</th>
              <th class="review-photo value">
                <img class="review-img" :src="review.review_img? require(`../../../TodakTodak_Backend/uploads/uploadReviews/${review.review_img}`): '/goodsempty.jpg'" alt="사진 미첨부"/>
              </th>
                <!-- <img class="review-img" :src="review.review_img? require(`../../../TodakTodak_Backend/uploads/uploadReviews/${review.review_img}`): '/goodsempty.jpg'" alt="리뷰 이미지"/> -->
              <th class="review-content value">{{ review.review_con }}</th>
              <th class="review-date value">{{ new Date(review.review_create).toISOString().split('T')[0] }}</th>
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



      </section>     
      <section id="tab-react">

        <!-- QnA 넣으시면 됩니다. -->

      </section>

      
    </div>
    </div>

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<div>
  <div class="review-list">
    <h2>QnA</h2>
    <br />
    <br />
    <br />
    <div class="review-none" >등록된 상품 Q&A가 없습니다.</div>
    <table class="review-content-list" >
      <thead>
          <tr class="user-review-title">
              <th class="qna_no">번호</th>
              <th class="qna_now">답변상태</th>
              <th class="qna_menu">문의 유형</th>
              <th class="qna_title">제목</th>
              <th class="qna_user">작성자</th>
              <th class="qna_date">작성일</th>
          </tr>
      </thead>
      <br/>
      <tbody>
          <tr class="user-review-content"  v-for="(review, i) in pageReviewList" :key="i">
              <th class="qna_no value">QNA 번호</th> 
              <th class="qna_now value">{{  }}</th>
              <th class="qna_menu value">{{  }}</th>
              <th class="qna_title value">{{  }}</th>
              <th class="qna_user value">{{  }}</th>
              <th class="qna_date value">{{  }}</th>
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
      sortCase: '정렬 기준', // 리뷰조회 dropdown
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
    arrayReviewList() {  // 아래 배열에서 [...this.page~~]의 page~~와 for-in 에서 in의 함수명과 같은 이름이어야 됨
      let sortedArray = [...this.pageReviewList]; // ... : 배열일 때, 나머지 객체를 하나씩 가져와서 묶어주는 기능
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
  watch() {
    this.updatePrice();
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
    async goToBuy(goodsno) {
      if (this.user.user_no === "") {
        alert("로그인해주셈");
        this.$router.push({ path: "/login" });
      } else {
        const total = this.total;
        location.href = `http://localhost:8080/orderpay/0/${goodsno}/${total}`;
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
    updatePrice() {
      if (!isNaN(this.total) && this.total > 0 && this.total <= this.goods.goods_cnt) {
        this.totalPrice = this.total * this.goods.goods_price;
      } else {
        this.total = 1;
        this.totalPrice = this.total * this.goods.goods_price;
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
    // 리뷰 불러오는 실제 정렬 로직
    getReviewList(sortNum) {
        const goods_no = this.$route.params.goodsno;
      axios({
        url: `http://localhost:3000/review/reviewList/${goods_no}`,
        method: "GET",
        params: {
          sortCase: sortNum // back에서 sql (정렬 : order by)을 통해 정렬 값을 불러오려고 이 값을 보내줌
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

.detail {
  font-family: "Spoqa Han Sans Neo";
  
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
  unicode-bidi: isolate;  
}
.container {
  box-sizing: border-box;
  display: block;
  font-family: "Spoqa Han Sans Neo";
  font-size: 13px;
  line-height: 16.9px;
  width: auto;

}

.content {
  min-width: 1080px;
  width: 1080px;
  margin : 0 auto;
}

.brand_wrap {
  align-items: center;
  display: flex;
  font-family: "Spoqa Han Sans Neo";
  width: 1080px;
  min-height: 30px;
  line-height: 16.9px;
  padding-top: 30px;

}

.product_wrapper {
  /* align-items: flex-start; */
  box-sizing: border-box;
  display: flex;
  font-family: "Spoqa Han Sans Neo";
  font-size: 13px;
  height: 726.609px;
  letter-spacing: -0.4px;
  line-height: 16.9px;
  margin-top: 15px;
  position: relative;
  width: 1080px;
  z-index: 30;
}

.visual_area {
  box-sizing: border-box;
  display: block;
  height: 510px;
  letter-spacing: -0.4px;
  line-height: 16.9px;
  width: 540px;
  position: relative;
}


.product-img {
  box-sizing: border-box;
  display: block;
  width: 540px;
  height: 510px;
  overflow-x: hidden;
  overflow-y: hidden;
  letter-spacing: -0.4px;
  position: relative;
  unicode-bidi: isolate;
  text-align: center;
  word-break: break-all;

}


.details {
  flex: 2;
  margin-left: 20px;
  height: 500px;
}

.details h2 {
  margin-bottom: 10px;
}

.product-info_wrap {
  box-sizing: border-box;
  display: block;
  font-family: "Spoqa Han Sans Neo";
  height: 725.875px;
  font-size: 13px;
  line-height: 16.9px;
  letter-spacing: -0.4px;
  width: 540px;
  position: relative;
  word-break: break-all;
  z-index: 0;
  unicode-bidi: isolate;

}
.title_wrap {
  box-sizing: border-box;
  margin-top: 18px;
  height: 60px;
  width: 540px;
  word-break: break-all;
}

.like_box {
  height: 30px;
  top: 1px;
  width: 30px;
}

.title {
  box-sizing: border-box;
  display: inline-block;
  font-size: 24px;
  font-weight: 400;
  height: 60px;
  line-height: 30px;
  width: 505px;
  font-family: "Spoqa Han Sans Neo";
}

.price-box {
  border-bottom-color: rgb(227, 227, 227);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  box-sizing: border-box;
  display: block;
  font-family: "Spoqa Han Sans Neo";
  font-size: 13px;
  line-height: 16.9px;
  padding-bottom: 20px;
  padding-top: 20px;
  letter-spacing: -0.4px;

}

.price {
  align-items: center;
  box-sizing: border-box;
  font-family: "Spoqa Han Sans Neo";
  font-size: 30px;
  line-height: 16.9px;
  list-style-position: outside;
  text-align: left;

}

.price_name {
  display: block;
  font-family: "Spoqa Han Sans Neo";
  width: 100px;
  list-style-position: outside;
}

.total {
  display: block;
  width: 200px;
  padding-right: 18px;
  text-align: left;
}

.price_list {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-family: "Spoqa Han Sans Neo";
  font-size: 13px;
  height: 35px;
  line-height: 16.9px;
  list-style-position: outside;
  width: 540px;
}

.detail-info-box {
  border-bottom-color: rgb(227, 227, 227);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  box-sizing: border-box;
  display: block;
  font-family: "Spoqa Han Sans Neo";
  font-size: 13px;
  height: auto;
  line-height: 16.9px;
  padding-bottom: 20px;
  padding-top: 20px;
  letter-spacing: -0.4px;

}

.detail-info-tit{
  box-sizing: border-box;
  color: rgb(51, 51, 51);
  display: block;
  font-weight: 700;
  width: 540px;
  padding-bottom: 13px;
  word-break: break-all;
}


.tit {
  box-sizing: border-box;
  color: rgb(51, 51, 51);
  display: table-cell;
  font-family: "Spoqa Han Sans Neo";
  height: 33.8px;
  line-height: 16.9px;
  list-style-position: outside;
  list-style-type: none;
  text-align: left;
  vertical-align: middle;
  width: 120px;
}

.info_box {
  box-sizing: border-box;
  color: rgb(102, 102, 102);
  display: table-cell;
  font-family: "Spoqa Han Sans Neo";
  height: 33.8px;
  list-style-position: outside;
  vertical-align: middle;
}


.input-group {
  background-color: rgb(227, 227, 227);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
  height:50px;
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
}

.input-group-price{
  font-size:13px;
  margin-right: 40px;
}

.label {
  margin-right: 10px;
  font-size: 15px;
  font-weight: bold;
}

.button-group {
  display: flex;
  flex-direction: row;
}

.btn, .input-field {
  width: 60px; /* 버튼과 입력 필드의 기본 크기 설정 */
  height: 60px; /* 버튼과 입력 필드의 기본 크기 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0;
}

.input-field {
  text-align: center;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 3px;
  -moz-appearance: textfield;
  box-shadow: none;
  width: 40px;
  height: 20px;
}

.input-field::-webkit-outer-spin-button,
.input-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-field {
  -moz-appearance: textfield;
}

.btn {
  background-color: transparent;
  color: black;
  cursor: pointer;
  border: 1px solid #ccc;
  box-shadow: none;
  width: 20px;
  height: 20px;
}

.btn:disabled {
  background-color: transparent;
  color: grey;
  cursor: not-allowed;
  border: 1px solid #ccc;
}

.increase {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: none;
  
}

.decrease {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.detail-total-box {
  font-family: "Spoqa Han Sans Neo";
  display: block;
  line-height: 23.4px;
  padding-top: 20px;
  text-align: right;
}

.total-txt {
  display: inline;
  font-size: 18px;
  box-sizing: border-box;
  height: auto;
}

.total-price {
  font-size: 25px;
  display: inline-block;
  line-height: 23.4px;
  width: auto;
  min-width: 130px;
  height: 30px;
  padding-left: 10px;
}

.detail-buy-box {
  display: flex;
  padding-top: 20px;
  line-height: 16.9px;

}

.add-to-cart {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  background: #fff;
  font-weight: 500;
  height: 53px;
  font-size: 18px;
  color: #000;

}

.buy-now {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  background: #000;
  font-weight: 500;
  height: 53px;
  font-size: 18px;
  color: #fff;
  border-left: 0;
}



.cp-detail-info_inner {
  box-sizing: border-box;
  font-size: 13px;
  font-family: "Spoqa Han Sans Neo";
  line-height: 16.9px;

}


.et-hero-tabs,
.et-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #fff;
    text-align: center;
    padding: 0 2em;

}

.et-hero-tabs-container {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #fff;
    z-index: 10;
    &--top {
        position: fixed;
        top: 0;
    }
}

.et-hero-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: #000;
    letter-spacing: 0.1rem;
    transition: all 0.5s ease;
    font-size: 15px;
    font-weight: 500;
    &:hover {
      color:white;
      background: rgba(102,177,241,0.8);
      transition: all 0.5s ease;
    }
}

.et-hero-tab-slider {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 6px;
    background: #66B1F1;
    transition: left 0.3s ease;
}

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
    display: flex;
    /* justify-content: flex-end; 버튼을 오른쪽으로 정렬 */
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
  /* float: right; 버튼을 오른쪽으로 정렬 */
}

/* Optional: Adjust dropdown list items */
.dropdown-menu {
  width: 150px; /* 너비 */
  /* right: 0;
  top: 100%;
  float: right; */
}

/* Optional: Change dropdown items style */
.dropdown-menu .dropdown-item {
  font-size: 14px; /* 폰트 크기 */
  padding: 10px 15px; /* 패딩 */
  /* right: 0; */
  /* float: right;
  top: 100%; */
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
    width: 5%;
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


.qna_no {
    width: 5%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.qna_now {
    width: 6%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.qna_menu {
    width: 6%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.qna_title {
    width: 30%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.qna_user {
    width: 6%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.qna_date {
    width: 6%;
    padding-bottom: 20px;
    padding-top: 20px;
}

.review-img {
  width: 100px; /* 너비를 100px로 설정 */
  height: auto; /* 높이를 자동으로 설정하여 비율을 유지 */

}

</style>
