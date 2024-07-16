<!-- 나의 리뷰 조회 및 삭제 -->
<template>
    <div class="my-qna-list">
        <h2>나의 QnA</h2>
            <div class="qna-none" v-if="myqnaList.length === 0">나의 QnA가 없습니다.</div>
            <table class="qna-content-list" v-else>
                <thead>
                    <tr class="user-qna-title">
                        <th class="qna-goods">상품명</th>
                        <th class="qna-title">제목</th>
                        <!-- <th class="qna-content">내용</th> -->
                        <!-- <th class="qna-admin-answer">답변</th> -->
                        <th class="qna-answer">답변 여부</th>
                        <th class="qna-date">공개 여부</th>
                        <th class="qna-date">작성 날짜</th>
                        <th class="qna-delete">리뷰 삭제</th>
                    </tr>
                </thead>
    <tbody>
          <tr class="user-qna-content"  v-for="(myqna, i) in pageMyQnaList" :key="i">
              <th class="qna-goods value">
                <router-link :to="'/goodsDetail/' + myqna.goods_no">{{ myqna.goods_nm }}</router-link>
              </th>
              <th class="qna-title value">
                <a href="#" @click="toggleVisibility(i)">{{ myqna.qna_title }}</a>
              </th>
              <!-- <th class="qna-content value">{{ myqna.qna_content }}
              </th> -->
              <!-- <th class="qna-admin-answer value" v-if="myqna.qna_answer_admin == '미답변'"></th>
              <th class="qna-admin-answer value" v-else>{{myqna.qna_answer_admin}}</th> -->
              <th class="qna-answer value" v-if="myqna.qna_answer_admin == '미답변'">미답변</th>
              <th class="qna-answer value" v-else>답변완료</th>
              <th class="qna-secret value">
                <div v-if="myqna.qna_secret == 0">공개</div>
                <div v-else>비공개</div>
              </th>
              <th class="qna-date value">{{ new Date(myqna.qna_create).toISOString().split('T')[0] }}</th>
              <th><button type="button" class="qna-delete-btn" @click="goToDelete(myqna.qna_no)">삭제</button></th>
          </tr>
          <tr v-show="isVisible[i]" class="qna_cont_wrap">
            <td colspan="6">
                <div class="qna_cont qna_btns">
                    <p>ddd</p>
                    <!-- <a href="#" @click.prevent="toggleVisibility" class="qna_q rv_up">{{myqna.qna_content}}</a> -->
                    <!-- <a href="#" @click.prevent="toggleVisibility" class="qna_q rv_up">{{myqna.qna_answer_admin}}</a> -->
                </div>
            </td>
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
import { ref } from 'vue';

export default {
//     setup() {
//     const isVisible = ref([]);

//     function toggleVisibility(index) {
//       isVisible.value[index] = !isVisible.value[index];
//     }

//     return {
//       isVisible,
//       toggleVisibility,
//     };
//   },
    data() {
        return {
            cnt: 1,
            myqnaList: [],
            pageNum: 0,
            pageCnt: 0,
            onePageCnt: 5,
            qna_no: [],
            pageMyQnaList: [],
            isVisible: [],
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
            // this.pageMyQnaList = []
            this.pageNum = page - 1;
            this.sliceList();
        },

        sliceList() {
            const start = 0 + this.pageNum * this.onePageCnt
            this.pageMyQnaList = this.myqnaList.slice(start, start + this.onePageCnt);
            this.isVisible = new Array(this.pageMyQnaList.length).fill(false);
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
                this.pageCnt = Math.ceil(this.myqnaList.length / this.onePageCnt);
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
                    // window.location.href = `http://localhost:8080/mypage/qna`;
                })
                .catch((error) => {
                    console.error('error');
                });
            } else {
                window.location.href = `http://localhost:8080/mypage/qna`;
            }
        },
        toggleVisibility(index) {
            // 해당 인덱스의 isVisible 상태를 토글
            console.log("this.isVisible", this.isVisible);
            this.isVisible[index] = !this.isVisible[index];
        },
    },
};
</script>

<style scoped>
.my-qna-list {
    /* width: 1500px; */
    /* width: 75%;
    margin-top: 100px;
    padding: 0 5% 0 0%;
    display: inline-block;
    vertical-align: top; */
    width: 70%;
    padding: 0 5%;
    display: inline-block;
    vertical-align: top;
    margin-top: 100px;
}

.my-qna-list h2 {
    border-bottom: 1px solid #d4cdcd;
    /* padding-bottom: 100px; */
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.pagination {
    justify-content: center;
    display: flex;
    margin-top: 80px;
}

.qna-delete-btn {
    border: none;
    width: 50%;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 7px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 5px 0;
    font-weight: 600;
    text-align: center;
    margin-left: 30px;
}

.user-qna-title {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: large;
    color: #999696;
    text-align: left;
    background-color: #efecec;
}

.qna-title {
    width: 15%;
    padding: 30px;
}

.qna-goods {
    width: 12%;
    padding: 30px;
}


.qna-content {
    width: 20%;
    word-wrap: break-word; /* 긴 단어가 있을 때 줄바꿈 */
    word-break: break-all; /* 긴 단어가 있을 때 줄바꿈 */
    padding: 20px;
}

.qna-admin-answer {
    width: 20%;
    word-wrap: break-word; /* 긴 단어가 있을 때 줄바꿈 */
    word-break: break-all; /* 긴 단어가 있을 때 줄바꿈 */
    padding: 20px;
}

.qna-answer {
    width: 12%;
    padding: 30px;
}

.qna-date {
    width: 12%;
    padding: 30px;
}

.qna-secret {
    width: 12%;
    padding: 30px;
}

.qna-delete {
    width: 12%;
    padding: 30px;
}


.user-qna-content {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: small;
    color: #5d5b5b;
    font-weight: 50px;
}

.qna_cont_wrap {
  display: none;
}

.qna_cont_wrap[style*="display: table-row"] {
  display: table-row;
}



</style>