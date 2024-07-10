<template>
    <div class="container">
        <h1>상품 문의</h1>
        <form action="submit_form.php" method="post">
            <table>
                <tr>
                    <th><label for="inquiryType">말머리</label></th>
                    <td>
                        <select id="inquiryType" name="inquiryType">
                            <option value="">문의내용</option>
                            <option value="">주문확인</option>
                            <option value="">기타</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th><label for="writer">작성자</label></th>
                    <td><input type="text" id="writer" name="writer" v-model="user.user_nm"></td>
                </tr>
                <tr>
                    <th><label for="phone">휴대폰</label></th>
                    <td><input type="tel" id="phone" name="phone" value="010-1234-5678" required></td>
                </tr>
                <tr>
                    <th><label for="subject">제목</label></th>
                    <td><input type="text" id="subject" name="subject" required></td>
                </tr>
                <tr>
                    <th><label for="content">본문</label></th>
                    <td><textarea id="content" name="content" rows="10" required></textarea></td>
                </tr>
            </table>
            <div class="btn-container">
                <button type="button" onclick="history.back()">이전</button>
                <button type="submit">저장</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';

export default {	
    name:'',
    components:{},
    data() {
        return {
           qnaUpdateList: {},
        //    user: {
        //     user_nm: '',
        //     user_phone: '',
        //    },
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    created(){
        this.getQnaUpdateList();
    },
    mounted(){
        // if (this.user.user_no == '') {
        //     // 일단은 로그인 상태 체크 
        //     this.$swal("로그인 이후 사용가능합니다.");
        //     this.$router.push({ path: '/login' });
        // }
    },
    methods: {

        getQnaUpdateList() {
        axios({
            url: "http://localhost:3000/qna/updateQna",
            method: "POST",
            data: {
                user_no: this.user.user_no // 클라이언트에서 필요한 데이터를 전송
            }
        }).then(response => {
            // 서버에서 받은 데이터를 변수에 할당
            this.qnaUpdateList = response.data;

            // 테스트를 위해 콘솔에도 출력
            console.log(this.qnaUpdateList);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

        // getQnaUpdateList(){
        //     console.log(this.qnaUpdateList);
        //     axios({
        //         url:"http://localhost:3000/qna/updateQna",
        //         method:"POST",
        //         data: {
        //         user_no: this.user.user_no // 클라이언트에서 필요한 데이터를 전송
        //     }
        //     }).then(results => {
        //         this.qnaUpdateList = results.data;
        //     }).catch(error => {
        //     console.error('Error fetching data:', error);
        // });
        // }
    }
}
</script>
<style scoped>
body {
    font-family: Arial, sans-serif;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    text-align: left;
}

th {
    width: 150px;
    background-color: #f4f4f4;
}

input, select, textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    box-sizing: border-box;
}

textarea {
    resize: vertical;
}

.btn-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color:black;
    color: #FFFFFF;
}
</style>