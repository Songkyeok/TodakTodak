<!-- 나의 리뷰 조회 및 삭제 -->
<template>
    <div class="my-qna-list">
        <h2>나의 QnA</h2>
        <br />
        <br />
        <br />
            <div class="qna-none" v-if="myqnaList.length === 0">나의 QnA가 없습니다.</div>
            <table class="qna-content-list" v-else>
                <thead>
                    <tr class="user-qna-title">
                        <th class="qna-goods">상품명</th>
                        <th class="qna-title">제목</th>
                        <th class="qna-content">내용</th>
                        <th class="qna-date">작성 날짜</th>
                        <th class="qna-date">공개 여부</th>
                        <th class="qna-delete">리뷰 삭제</th>
                    </tr>
                </thead>
        <br />
    <tbody>
          <tr class="user-qna-content"  v-for="(myqna, i) in pageMyQnaList" :key="i">
              <th class="qna-user value">{{ myqna.goods_nm }}</th>
              <th class="qna-title value">
                <router-link :to="'/goodsDetail/' + myqna.goods_no">
                    {{ myqna.qna_title }}
                </router-link>
              </th>
              <th class="qna-content value">
                <router-link :to="'/goodsDetail/' + myqna.goods_no">
                    {{ myqna.qna_content }}
                </router-link>
              </th>
              <th class="qna-date value">{{ new Date(myqna.qna_create).toISOString().split('T')[0] }}</th>
              <th class="qna-secret value">{{ qna_secret }}</th>
              <th><button type="button" class="qna-delete-btn" @click="goToDelete(myqna.qna_no)">삭제</button></th>
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
            myqnaList: [],
            pageNum: 0,
            pageCnt: 0,
            onePageCnt: 5,
            qna_no: [],
            pageMyQnaList: [],
        };
    },

    computed: {
        user() {
            return this.$store.state.user;
        },
        pageCnt() {
            return Math.ceil(this.myqnaList.length / this.onePageCnt);
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
        this.getMyQnaList();
    },

    methods: {
        setPage(page) {
            this.pageMyQnaList = []
            this.pageNum = page - 1;
            this.sliceList();
        },

        sliceList() {
            const start = 0 + this.pageNum * this.onePageCnt
            this.pageMyQnaList = this.myqnaList.slice(start, start + this.onePageCnt);
        },


        getMyQnaList() {
            const user_no = this.$store.state.user.user_no; // 가져다 사용하는 것이므로 user_no를 추가해야 됨
            axios({
                url: `http://localhost:3000/qna/myqnaList/${user_no}`,
                method: "GET",
                // params: {
                //     user_no: this.$store.state.user.user_no, // url에서 ${user_no}로 보냈으므로 params로 안보내도 됨
                // }
            }).then((results) => {
                this.myqnaList = results.data;
                console.log(results);
                this.pageCnt = parseInt(this.myqnaList.length / this.onePageCnt) + 1
                this.setPage(1)
            }).catch(error => {
                console.error(error);
            });
        },

        goToDelete(qna_n) {
            if (confirm('정말 삭제하시겠습니까?')) {
                axios({
                    url: `http://localhost:3000/qna/deleteQna`,
                    method: "POST",
                    data: {
                        qna_no: qna_n,
                    }
                }).then((results) => {
                    console.log(results);
                    this.deleteQna = results.data;
                    this.getMyQnaList(); // Qna 삭제 후 목록 갱신
                    window.location.href = `http://localhost:8080/mypage/qna`;
                })
                .catch((error) => {
                    console.error('error');
                });
            } else {
                window.location.href = `http://localhost:8080/mypage/qna`;
            }
        },
    },
};
</script>

<style scoped>
.my-qna-list {
    /* width: 1500px; */
    width: 80%;
    margin-top: 100px;
    padding: 0 5% 0 0%;
    display: inline-block;
    vertical-align: top;
}

.my-qna-list h2 {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 15px;
}

.pagination {
    justify-content: center;
    display: flex;
    margin-top: 80px;
}

.qna-delete-btn {
    border: none;
    width: 25%;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 7px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}

.user-qna-title {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: large;
    color: #999696;
    text-align: left;
}


.qna-user {
    width: 10%;
}

.review-img {
    width: 20%;
}

.qna-content {
    width: 30%;
    word-wrap: break-word; /* 긴 단어가 있을 때 줄바꿈 */
    word-break: break-all; /* 긴 단어가 있을 때 줄바꿈 */
}

.qna-date {
    width: 10%;
}

.qna-delete {
    width: 10%;
}

.user-qna-content {
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