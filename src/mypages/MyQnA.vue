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
                    <th class="qna-answer">답변 여부</th>
                    <th class="qna-date">공개 여부</th>
                    <th class="qna-date">작성 날짜</th>
                    <th class="qna-delete">리뷰 삭제</th>
                </tr>
            </thead>
            <tbody v-for="(myqna, i) in pageMyQnaList" :key="i">
                <tr class="user-qna-content">
                    <td class="qna-goods value">
                        <router-link :to="'/goodsDetail/' + myqna.goods_no">{{ myqna.goods_nm }}</router-link>
                    </td>
                    <td class="qna-title value" @click="toggleAnswer(myqna.qna_no)">
                        {{ myqna.qna_title }}
                    </td>
                    <td class="qna-answer value" v-if="myqna.qna_answer_admin == '미답변'">미답변</td>
                    <td class="qna-answer value" v-else>답변완료</td>
                    <td class="qna-secret value">
                        <div v-if="myqna.qna_secret == 0">공개</div>
                        <div v-else>비공개</div>
                    </td>
                    <td class="qna-date value">{{ new Date(myqna.qna_create).toISOString().split('T')[0] }}</td>
                    <td><button type="button" class="qna-delete-btn" @click="goToDelete(myqna.qna_no)">삭제</button></td>
                </tr>

                <tr :class="['qna_answer_container', 'qna_answer_container'+myqna.qna_no, showAnswer ? 'show' : '']">
                    <td class="qna_cont qna_btns qna_box">
                        <p>Q: {{ myqna.qna_content }} </p>
                        <p v-if="myqna.qna_answer_admin == '미답변'">아직 답변이 완료되지 않았습니다.</p>
                        <p v-else>
                            A: {{ myqna.qna_answer_admin }}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li v-for="i in visiblePageNumbers" :key="i" class="page-item">
                    <a href="#" class="page-link" :class="{ active: i === pageNum + 1 }"
                        @click.prevent="setPage(i)">{{ i }}</a>
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
            showAnswer: false,
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
                })
                .catch((error) => {
                    console.error('error');
                });
            } else {
                window.location.href = `http://localhost:8080/mypage/qna`;
            }
        },
        toggleAnswer(qna_no) {
            const temp = this.$el.querySelector(".qna_answer_container"+qna_no);

            if (temp.classList.contains('show')) {
                temp.classList.remove('show');
            } else {
                temp.classList.add('show');
            }
        }
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
    /* margin-bottom: 20px; */
}

.pagination {
    justify-content: center;
    display: flex;
    margin-top: 80px;
}

.qna-delete-btn {
    border: none;
    width: 50%;
    border-radius: 7px;
    background-color: #767070;
    color: #fff;
    padding: 9px 8px;
    font-weight: 600;
    text-align: center;
    margin-left: 30px;
}
button:hover {
    background-color: #0068FF;
    cursor: pointer;
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
    cursor: pointer;
    
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
    border-top: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: small;
    color: #5d5b5b;
    /* position: relative; */
}
.qna_answer_container {
    /* position: absolute;
    top: 0;
    left: 0; */
 
    display: none;
}
.qna_answer_container.show {
    display: block;
}
.qna-content-list, .qna-content-list tr {
    text-align: center;
}
.qna_box {
    padding: 20px 0;
}
.qna_box p {
    color: #333;
}
.qna_box > p:first-child {
}

.qna_box > p:last-child {
    margin-top: 10px;
    /* background: url(https://static.elandrs.com/f/img/pc/bg_qna_ques_new.gif) 0 0 repeat-x; */
}
.qna_cont {
    text-align: left;
    /* border-bottom: 1px solid #d4cdcd; */
    min-width: 1140px;
    padding-left: 20px;
}
</style>