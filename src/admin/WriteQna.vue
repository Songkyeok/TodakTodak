<template>
    <div class="write_qna_container">
        <h1>Q&amp;A 답변 작성</h1>
        

        <!-- 상품명, Q&A 제목, Q&A 내용, Q&A 작성일,  -->
        <div class="list_container">
            <div>
                <p>상품명</p>
                <p>{{selectQnaObj.goods_nm}}</p>
            </div>
            <div>
                <p>Q&amp;A 제목</p>
                <p>{{selectQnaObj.qna_title}}</p>
            </div>
            <div>
                <p>Q&amp;A 내용</p>
                <p>{{selectQnaObj.qna_content}}</p>
            </div>
            <div>
                <p>Q&amp;A 작성일</p>
                <p>{{ formatDateTime(selectQnaObj.qna_create) }}</p>
            </div>
            <div>
                <p>Q&amp;A 답변</p>
                <textarea name="" id="" cols="30" rows="10" placeholder="내용을 입력해주세요" v-model="qna_answer_admin"></textarea>
            </div>
        </div>
        <div class="text-center">
            <button type="button" class="btn btn-secondary button-margin-right" @click="goToPreStep()">이전</button>
            <button type="submit" class="btn btn-primary custom-btn" @click="goToNextStep()">Q&amp;A 등록</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectQnaObj: {},
            qna_answer_admin: ""
        }
    },
    mounted() {
        this.selectQna();
    },
    methods: {
        selectQna() {
            axios({
                url: `http://localhost:3000/qna/selectQna/${this.$route.query.qna_no}`,
                method: "GET"
            }).then((res) => {
                this.selectQnaObj = res.data.data[0];
            })
        },
        createQna() {
            
        },
        goToPreStep() {
            this.$router.go(-1);
        },
        goToNextStep() {
            if(!this.qna_answer_admin) {
                alert("Q&A 답변을 입력해주세요.")
            } else {
                axios({
                    url: `http://localhost:3000/qna/updateQna/${this.$route.query.qna_no}`,
                    method: "GET",
                    params: {
                        qna_answer_admin: this.qna_answer_admin
                    }
                }).then(res => {
                    this.$swal({
                        position: 'top',
                        icon: 'success',
                        title: 'Q&A 답변이 등록됐습니다.',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        this.$router.push({name: 'QnA'})
                    })
                    
                })
            }
;
        }
    }
}
</script>

<style scoped>
.write_qna_container {
    width: 80%;
    margin-top: 100px;
    padding: 0 10% 0 5%;
    display: inline-block;
    vertical-align: top;
}

.write_qna_container h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 10px;
}
.list_container {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin: 30px 0 0 10px;
}
.list_container > div {
    display: flex;
    margin-bottom: 20px;
}
.list_container > div:last-child {
    margin-bottom: 0;
}
.list_container > div > p:first-child {
    width: 120px;
    margin-right: 30px;
    font-weight: bold;
}
.list_container p {
    font-size: 1.2em;
    color: #212529;
    margin: 0;
}

.list_container textarea {
    height: 140px;
    flex: 1;
    padding: 10px;
}
.text-center {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.text-center button:first-child {
    margin-right: 20px;
}


</style>