<template>
    <MypageSideBar />
    
    <div class="profile_container">
        
        <div class="signup-container">
            <div class="information">
                <h3>개인정보 수정</h3>
            </div>
            <div class="form-group">
                <label for="user_id">아이디</label>
                <input type="text" id="user_id" v-model="user_id" placeholder="아이디" disabled />
            </div>

            <!-- <div class="form-group">
                <label for="user_pw">비밀번호</label>
                <input type="password" id="user_pw" v-model="user_pw" placeholder="비밀번호" disabled />
            </div> -->

            <!-- 이메일, 휴대폰 번호, 주소  -->
            <div class="form-group">
                <label for="name">이름</label>
                <input type="text" id="name" v-model="user_nm" placeholder="이름" value="123" disabled />
            </div>

            <div class="form-group">
                <label for="email">이메일</label>
                <input type="email" id="email" v-model="user_email" placeholder="이메일을 입력해주세요." />
            </div>

            <div class="form-group">
                <label for="phone">휴대폰번호</label>
                <input type="text" id="phone" v-model="user_phone" name="phone" maxlength="11" placeholder="- 제외하고 입력해주세요." />
            </div>
            <div class="form-group" v-if="error_phone == true">
                <p class="red">휴대폰 번호가 정확한지 확인해 주세요.</p>
            </div>
            <div class="form-group" v-else>
                <p class="blue">사용 가능한 휴대폰 번호 입니다.</p>
            </div>

            <div class="form-group form-group-ad">
                <label for="address">주소</label>
                <div class="address_postcode">
                <div>
                    <input type="text" name="zonecode" readonly="readonly" v-model="user_zipcode" />
                </div>
                <div>
                    <button type="button" id="btnPostcode" class="btn_post_search">우편번호검색</button>
                </div>
                </div>
            </div>
            <div class="form-group form-group-ad">
                <div class="address_input_box" style="display: flex; justify-content: space-between">
                <div class="member_warning" style="margin-left: 128px; width: 100%;">
                    <input type="text" v-model="user_adr1" readonly="readonly" value="" />
                </div>
                </div>
            </div>
            <div class="form-group form-group-ad">
                <div class="address_input_box" style="display: flex; justify-content: space-between">
                <div class="member_warning js_address_sub" style="margin-left: 128px; width: auto; ">
                    <input type="text" v-model="user_adr2" value="" placeholder="상세 주소를 입력해주세요."/>
                </div>
                </div>
            </div>

            <div class="btn_container">
                <button type="button" class="btn-next-step">비밀번호 수정</button>
                <button type="button" class="btn-next-step">변경하기</button>
                <button type="button" class="btn-next-step">취소하기</button>
            </div>
        </div>
    </div>
</template>
<script>
import MypageSideBar from "../layouts/MypageSideBar.vue";
import axios from "axios";

export default {
    data() {
        return {
            user_id: "",
            user_nm: "",
            user_email: "",
            user_phone: "",
            user_zipcode: "",
            user_adr1: "",
            user_adr2: "",

            error_phone: true,
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    components: {
        MypageSideBar
    },
    watch: {
      'user_phone': function () {
        this.checkUserPhone()
      },
    },
    mounted() {
        console.log("this.$store.state.user ===>", this.$store.state.user.user_no);
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            const user_no = this.$store.state.user.user_no;
            axios({
                url: "http://localhost:3000/profile/selectProfile",
                method: "POST",
                data: {
                    user_no: user_no
                }
            }).then(res => {
                console.log("res ===>>", res.data)
                this.user_id = res.data.USER_ID;
                this.user_nm = res.data.USER_NM;
                this.user_email = res.data.USER_EMAIL;
                this.user_phone = res.data.USER_PHONE;
                this.user_zipcode = res.data.USER_ZIPCODE;
                this.user_adr1 = res.data.USER_ADR1;
                this.user_adr2 = res.data.USER_ADR2;
                console.log("res.data.USER_EMAIL ==>>", res.data.USER_EMAIL)
            })
            
        },
        checkUserPhone() {
            const validatedPhone = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

            // 사용 불가능
            if (!validatedPhone.test(this.user_phone) || !this.user_phone) {
                this.error_phone = true;
            // 사용 가능
            } else {
                this.error_phone = false;
            }
        },
    }
}
</script>
<style scoped>
.profile_container {
    width: 1080px;
    margin-top: 100px;
    padding: 0 0 0 10%;
    display: inline-block;
    vertical-align: top;
}

.signup-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 50px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.signup-container h1 {
    text-align: left;
    font-size: 30px;
    color: #222222;
    border-bottom: 1px solid #434340;
}

.signup-container h4 {
    text-align: left;
    font-size: 20px;
    color: #222222;
    margin-left: 10px;
    margin-bottom: 20px;
}

.container {
    padding: 0 0 17px;
    margin-bottom: 50px;
    margin-top: 0;
    font-size: 18px;
    color: #222222;
}

.information {
    font-size: 18px;
    font-weight: normal;
    text-align: left;
    margin-bottom: 30px;
}

.note {
    font-size: 15px;
    color: #d9534f;
    margin-bottom: 20px;
    text-align: right;
}

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-left: 50px;
    margin-right: 50px;
    line-height: 1.5;
}

.form-group label {
    width: 120px;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
}

.form-group .required::after {
    content: "*";
    color: #c9302c;
    margin-left: 5px;
}

.form-group input[type="text"],
.form-group input[type="password"],
.form-group input[type="email"] {
    flex: 1;
    padding: 8px;
    border: 2px solid #ccc;
    border-radius: 5px;
}

.form-group button[type="button"] {
    margin-left: 10px;
    padding: 8px 12px;
    border: none;
    background-color: #767070;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

.chosen-select {
    margin-left: 10px;
    padding: 8px 12px;
    border: solid #ccc;
    background-color: #fff;
    color: #333;
    border-radius: 4px;
}

.form-group-ad button[type="button"]:hover {
    background-color: #c78683;
}

.form-group-ad {
    flex-direction: row;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.form-group-ad label {
    width: 120px;
    font-weight: bold;
    color: #222;
    margin-right: 10px;
}
.btn_container {
    display: flex;
    margin-top: 50px;
    justify-content: center;
}
.btn_container button {
    /* margin-left: 50%; */
    /* margin-top: 50px; */
    padding: 8px 12px;
    border: none;
    background-color: #767070;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 12px;
}
/* .btn_container button.active {
    background-color: #0068FF;
} */

.btn_container button:last-child {
    margin-right: 0;
}

button[type="submit"] {
    display: grid;
    height: 50px;
    align-items: end;
    width: 30%;
    padding: 10px 0;
    border: none;
    background-color: #767070;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    align-content: center;
    margin-left: 35%;
    margin-top: 80px;
}

button[type="submit"]:hover {
    background-color: #767070;
}

.address_input_box {
    width: auto;
}

.red {
    color: #ff3f3f;
}

.blue {
    color: blue;
}

.address_postcode {
    display: flex;
    justify-content: space-between;
}

input:disabled {
    background: #dddddd;
}

</style>