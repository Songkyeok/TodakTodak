<template>
    <MypageSidebar />

    <div class="profile_container">
        <div class="signup-container">
            <div class="information">
                <h3>비밀번호 변경</h3>
            </div>
            <div class="form-group">
                <label>현재 비밀번호</label>
                <input type="password" v-model="user_pw" placeholder="현재 비밀번호" />
            </div>
            <div class="form-group">
                <label>새 비밀번호</label>
                <input type="password" v-model="user_pw_new" placeholder="새 비밀번호" />
            </div>
            <div class="form-group">
                <label>새 비밀번호 확인</label>
                <input type="password" v-model="user_pw_new_check" placeholder="새 비밀번호 확인" />
            </div>
            <div class="btn_container">
                <button type="button" class="btn-next-step updatePw" @click="updatePw">비밀번호 수정</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MypageSidebar from "../layouts/MypageSidebar.vue";

export default {
    data() {
        return {
            
        }
    },
    components: {
        MypageSidebar
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        updatePw() {
            const user_no = this.$store.state.user.user_no;

            if (!this.user_pw) {
                return this.$swal("현재 비밀번호를 입력해주세요.");
            } else if (!this.user_pw_new || !this.user_pw_new_check) {
                return this.$swal("새 비밀번호를 입력해주세요");
            } else if (this.user_pw_new !== this.user_pw_new_check) {
                return this.$swal("새 비밀번호가 동일하지 않습니다");
            } else {
                axios({
                    url: "http://localhost:3000/profile/updatePw",
                    method: "POST",
                    data: {
                        user_no: user_no,
                        user_pw: this.user_pw,
                        user_pw_new: this.user_pw_new
                    }
                }).then(res => {
                    if(res.data.message == 'current_pw_err') {
                        return this.$swal("입력하신 현재 비밀번호가 다릅니다.");
                    } else if(this.user_pw_new !== this.user_pw_new_check) {
                        return this.$swal("입력하신 새 비밀번호가 동일하지 않습니다.");
                    } else if(res.data.message == 'success') {
                        this.$swal("비밀번호가 변경되었습니다.");
                        return this.$router.push({ path: '/mypage' });
                    }
                })
            }
            
        }
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
    margin-bottom: 100px;
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
    transition: all 0.3s;
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
    cursor: auto;
    margin-right: 12px;
    transition: all 0.3s;
}
.btn_container button.active {
    background-color: #0068FF;
    cursor: pointer;
}

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
.updatePw:hover {
    background-color: #0068FF;
    cursor: pointer;
}
</style>