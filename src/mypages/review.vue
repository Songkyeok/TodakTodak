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
                        <th class="review-user">작성자</th>
                        <th class="review-img">포토</th>
                        <th class="review-content">내용</th>
                        <th class="review-date">작성 날짜</th>
                        <th class="user-delete">리뷰 삭제</th>
                    </tr>
                </thead>
        <br />
    <tbody>
          <tr class="user-review-content"  v-for="(myreview, i) in pageMyReviewList" :key="i">
              <th class="review-star value">{{ myreview.review_rating }}</th>
              <th class="review-user value">{{ myreview.user_nm }}</th>
              <th class="review-photo value">
                <router-link :to="'/goodsDetail/' + myreview.goods_no">
                    <img class="review-img" :src="myreview.review_img? require(`../../../TodakTodak_Backend/uploads/uploadReviews/${myreview.review_img}`): '/goodsempty.jpg'" alt="사진 미첨부"/>
                </router-link>
              </th>
                <!-- <img class="review-img" :src="review.review_img? require(`../../../TodakTodak_Backend/uploads/uploadReviews/${review.review_img}`): '/goodsempty.jpg'" alt="리뷰 이미지"/> -->
              <th class="review-content value">{{ myreview.review_con }}</th>
              <th class="review-date value">{{ new Date(myreview.review_create).toISOString().split('T')[0] }}</th>
              <th><button type="button" class="user-delete-btn" @click="goToDelete(myreview.review_no)">삭제</button></th>
          </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-for="i in pageCnt" :key="i" class="page-item">
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
    },

    mounted() {
        this.getMyReviewList();
    },

    methods: {
        setPage(page) {
            this.pageMyReviewList = []
            this.pageNum = page - 1;
            this.sliceList()
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
    width: 1500px;
    /* width: 80%; */
    margin-top: 100px;
    padding: 0 5% 0 5%;
    display: inline-block;
    vertical-align: top;
}

.pagination {
    justify-content: center;
    display: flex;
    margin-top: 80px;
}

.user-delete-btn {
    border: none;
    width: 25%;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 7px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}
</style>