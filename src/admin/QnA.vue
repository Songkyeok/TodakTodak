<template>
    <main class="qna_container">
        <h1>상품관리</h1>
        <table class="table caption-top goodslist-table">
            <thead class="table-light">
                <tr>
                    <th scope="col">문의날짜</th>
                    <th scope="col">상품명</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성자</th>
                    <th scope="col">답변상태</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class="table-data" v-if="qnaList.length>0">
                <tr v-for="(qna, index) in qnaList" :key="index">
                        <td>{{ qna.qna_create }}</td>
                        <td>{{ qna.goods_nm }}</td>
                        <td>{{ qna.qna_title }}</td>
                        <td>{{ qna.user_nm}}</td>
                        <td v-if="qna.qna_answer_admin == '미답변'">미답변</td>
                        <td v-else>답변완료</td>
                        <td class="qwer">
                            <button v-if="qna.qna_answer_admin == '미답변'" class="btn btn-light" @click="goToWriteQna(qna.qna_no)">답변작성</button>
                            <button v-else class="btn btn-outline-danger answer_btn" @click="answer_btn(qna.qna_no)">답변삭제</button>                               
                        </td>
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
    </main>
</template>

<script>
import axios from 'axios';
import AdminpageSidebar from "../layouts/AdminpageSidebar.vue";

export default {	
    components:{
        AdminpageSidebar
    },
    data() {
        return {
            sampleData: '',
            qnaList: [],
            pageNum: 0,
            pageCnt: 0,
            pageqnaList: []
        };
    },
    mounted() {
        this.allQnaList()
    },
    methods: {
        allQnaList() {
            axios({
                url: "http://localhost:3000/admin/qnaList",
                method: "POST",
            }).then(res => {
                this.qnaList = res.data.results;
                this.pageCnt = Math.ceil(this.qnaList.length / 15)
                this.setPage(1)
                // 날짜 format 변경
                for(let i=0; i<this.qnaList.length; i++) {
                    let qna_create = this.qnaList[i].qna_create
                    // 문자열을 Date 객체로 변환
                    let dateObj = new Date(qna_create);
                    // Date 객체에서 연, 월, 일 추출
                    let year = dateObj.getFullYear();
                    let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
                    let day = String(dateObj.getDate()).padStart(2, '0');

                    // 추출한 값 변수에 할당
                    let formattedDate = `${year}-${month}-${day}`;

                    // qnaList.qna_create에 추출한 값 할당
                    this.qnaList[i].qna_create = formattedDate;
                }
            })
        },
        answer_btn(qna_no) {
            axios({
                url: "http://localhost:3000/admin/qnaDelete",
                method: "POST",
                data: {
                    qna_no: qna_no
                }
            }).then(() => {
                this.$swal('QnA가 삭제되었습니다.');
                this.allQnaList();
            })
        },
        // allDeleteQna(){
        //     axios({
        //         url: "http://localhost:3000/admin/qnaDelete",
        //         method: "POST",
        //         data: {
                    
        //         }
        //     }).then(results => {
        //         this.deleteQna = results.data;
        //         console.log(deleteQna)
        //     })
        // }



        setPage(page) {
            this.pageqnaList = []
            this.pageNum = page - 1;
            this.sliceList()
        },
        sliceList() {
            const start = this.pageNum * this.itemsPerPage; // 시작 인덱스 계산
            const end = start + this.itemsPerPage; // 끝 인덱스 계산
            this.pageqnaList = this.qnaList.slice(start, end); // 페이지에 맞는 목록 추출
        },
        // qna 답변
        goToWriteQna(qna_no) {
            this.$router.push({name: "WriteQna", query: {qna_no: qna_no}});
        }
    }
}
</script>
<style scoped>
.goodslist-table {
    font-family: unset;
}
.qna_container {
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
.qna_container h1 {
    text-align: left;
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 30px;
}
.table-light tr {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: large;
    color: #999696;
    text-align: center;
    background-color: #f8f7f7;
}
.table-light tr th {
    padding: 23px;
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