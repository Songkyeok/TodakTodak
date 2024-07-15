<!-- 나의 리뷰 조회 및 삭제 -->
<template>
    <div class="my-review-list">
        <h2>나의 리뷰</h2>
        <br />
        <br />
        <br />
            <div class="review-none" v-if="myreviewList.length === 0">나의 리뷰가 없습니다.</div>
            <table class="review-content-list" v-else>
                <thead>
                    <tr class="user-review-title">
                        <th class="review-star">별점</th>
                        <th class="review-goods">상품명</th>
                        <th class="review-img">포토</th>
                        <th class="review-content">내용</th>
                        <th class="review-date">작성 날짜</th>
                        <th class="review-delete">리뷰 삭제</th>
                    </tr>
                </thead>
        <br />
    <tbody>
          <tr class="user-review-content"  v-for="(myreview, i) in pageMyReviewList" :key="i">
              <th class="review-star value">{{ getStarRating(myreview.review_rating) }}</th>
              <th class="review-user value">{{ myreview.goods_nm }}</th>
              <th class="review-img value">
                <router-link :to="'/goodsDetail/' + myreview.goods_no">
                    <img v-if="myreview.review_img.length > 0" class="review-img" :src="myreview.review_img? require(`../../../TodakTodak_Backend/uploads/uploadReviews/${myreview.review_img}`): '../goodsempty.jpg'" alt="사진 미첨부"/>
                    <p v-else>-</p>    
                </router-link>
              </th>
                <!-- <img class="review-img" :src="review.review_img? require(`../../../TodakTodak_Backend/uploads/uploadReviews/${review.review_img}`): '../goodsempty.jpg'" alt="리뷰 이미지"/> -->
              <th class="review-content value">
                <router-link :to="'/goodsDetail/' + myreview.goods_no">
                    {{ myreview.review_con }}
                </router-link>
              </th>
              <th class="review-date value">{{ new Date(myreview.review_create).toISOString().split('T')[0] }}</th>
              <th><button type="button" class="review-delete-btn" @click="goToDelete(myreview.review_no)">삭제</button></th>
          </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-for="i in visiblePageNumbers" :key="i" class="page-item">
          <a href="#" class="page-link" :class="{ active: i === pageNum + 1 }" @click.prevent="setPage(i)">{{ i }}</a>
        </li> 
      </ul>
    </nav>
    <br />
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            cnt: 1,
            myreviewList: [],
            pageNum: 0,
            mageCnt: 0,
            onePageCnt: 5,
            review_no: [],
            pageMyReviewList: [],
        };
    },

    computed: {
        user() {
            return this.$store.state.user;
        },
        pageCnt() {
            return Math.ceil(this.myreviewList.length / this.onePageCnt);
        },
        // 보여질 페이지 번호 계산
        visiblePageNumbers() {
            // 보여질 페이지 번호 배열 초기화
            let visiblePages = [];

            // 실제 데이터가 있는 페이지 번호까지만 추가
            for (let i = 1; i <= this.pageCnt; i++) {
                visiblePages.push(i);
            }
            return visiblePages;
        },
    },

    mounted() {
        this.getMyReviewList();
    },

    methods: {
        setPage(page) {
            this.pageMyReviewList = []
            this.pageNum = page - 1;
            this.sliceList();
        },

        sliceList() {
            const start = 0 + this.pageNum * this.onePageCnt
            this.pageMyReviewList = this.myreviewList.slice(start, start + this.onePageCnt);
        },


        getMyReviewList() {
            const user_no = this.$store.state.user.user_no; // 가져다 사용하는 것이므로 user_no를 추가해야 됨
            axios({
                url: `http://localhost:3000/review/myreviewList/${user_no}`,
                method: "GET",
                // params: {
                //     user_no: this.$store.state.user.user_no, // url에서 ${user_no}로 보냈으므로 params로 안보내도 됨
                // }
            }).then((results) => {
                this.myreviewList = results.data;
                console.log(results);
                this.pageCnt = parseInt(this.myreviewList.length / this.onePageCnt) + 1
                this.setPage(1)
            }).catch(error => {
                console.error(error);
            });
        },

        getStarRating(rating) {
            return '★'.repeat(rating) + '☆'.repeat(5 - rating);
        },

        

        goToDelete(review_n) {
            if (confirm('정말 삭제하시겠습니까?')) {
                axios({
                    url: `http://localhost:3000/review/deleteReview`,
                    method: "POST",
                    data: {
                        review_no: review_n,
                    }
                }).then((results) => {
                    console.log(results);
                    this.deleteReview = results.data;
                    this.getMyReviewList(); // 리뷰 삭제 후 목록 갱신
                    window.location.href = `http://localhost:8080/mypage/review`;
                })
                .catch((error) => {
                    console.error('error');
                });
            } else {
                window.location.href = `http://localhost:8080/mypage/review`;
            }
        },
    },
};
</script>

<style scoped>
.my-review-list {
    /* width: 1500px; */
    width: 80%;
    margin-top: 100px;
    padding: 0 5% 0 0%;
    display: inline-block;
    vertical-align: top;
}

.my-review-list h2 {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 15px;
}

.pagination {
    justify-content: center;
    display: flex;
    margin-top: 80px;
}

.review-delete-btn {
    border: none;
    width: 25%;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 7px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}

.user-review-title {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: large;
    color: #999696;
    text-align: left;
}

.review-star {
    width: 12%;
    padding: 38px;
    align-items: center;
}

.review-user {
    width: 10%;
}

.review-img {
    width: 20%;
}

.review-img-value {
    width: 200px;
    height: auto;
}

.review-content {
    width: 30%;
    word-wrap: break-word; /* 긴 단어가 있을 때 줄바꿈 */
    word-break: break-all; /* 긴 단어가 있을 때 줄바꿈 */
}

.review-date {
    width: 10%;
}

.review-delete {
    width: 10%;
}

.user-review-content {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: small;
    color: #5d5b5b;
    text-align: left;
    font-weight: 50px;
}

.user-delete-btn {
    border: none;
    width: 25%;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 5px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}



</style>