<!-- <template>
    <main class="mt-5">
        <div class="login-form">
            <div class="logo">
                <img src='../assets/logo2.png'>
            </div>
            <div>
                <input type="id" @keyup.enter="login()" class="form-control" placeholder="아이디" v-model="user_id" />
                <label for="floatingInput"></label>
            </div>

            <div>
                <input type="password" @keyup.enter="login()" class="form-control" placeholder="비밀번호" v-model="user_pw" />
                <label for="floatingPassword"></label>
            </div>

            <div>
                <button type="button" class="btn" @click="login">로그인</button>
            </div>



            <div class="find" @click="goToFind">아이디 / 비밀번호 찾기</div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user_id: '',
            naver_id: '',
            user_pw: '',
            naverLogin: [],
        };
    },
    computed: {
        user() {
            return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
        },
    },

    methods: {
        login() {
            axios({
                url: "http://localhost:3000/auth/login_process",
                method: "POST",
                data: {
                    user_id: this.user_id,
                    user_pw: this.user_pw
                },
            })
                .then(res => {
                    if (res.data.message == 'undefined_id') {
                        this.$swal("존재하지 않는 아이디입니다.")
                    }
                    else if (res.data.message == 'incorrect_pw') {
                        this.$swal("비밀번호가 틀렸습니다.")
                    }
                    else {
                        this.$store.commit("user", { user_id: this.user_id, user_no: res.data.message })
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '로그인 성공!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        this.$router.push({ path: '/' });  // 메인 화면으로 이동
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },

        goToFind() {
            this.$router.push({ path: 'find' });
        },
    },
};
</script>

<style scoped>
.login-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 50px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

.logo img {
    width: auto;
    height: auto;
    max-width: 300px;
    display: block;
    margin: auto;
    position: relative;
    top: 40px;
}

.login-form {
    display: grid;
    width: 400px;
    height: 500px;
    margin: 6% auto;
    border: solid 2px rgb(237, 237, 237);
    background-color: #fcf9db;
    background: linear-gradient(180deg, rgb(253, 238, 204), rgb(253, 245, 221));
    box-shadow: 0px 1px 30px 2px rgb(238, 238, 238);
    border-radius: 30px;
}

.login-form .form-control {
    height: 48px;
    width: 240px;
    font-size: 16px;
    display: inline;
    margin-left: 20%;
    margin-bottom: 10px;
    border: solid 2px rgb(237, 237, 237);
    text-align: center;
    border-radius: 8px;
    position: relative;
    top: 90px;
}

input::placeholder {
    color: #aaa;
}

input:focus {
    outline: 2px solid #ffc905;
}

.login-form .btn {
    height: 48px;
    width: 242px;
    font-size: 16px;
    display: inline;
    margin-left: 20%;
    margin-bottom: 50px;
    border: solid 2px rgb(255, 204, 122);
    border-radius: 8px;
    background-color: rgb(255, 210, 107);
    position: relative;
    top: 110px;
}

.login-form .btn:hover {
    cursor: pointer;
}

.find {
    position: fixed;
    bottom: 20px;
    height: 30px;
    text-align: center;
    padding-top: 10px;
    font-size: 0.8rem;
    color: #aaa;
    cursor: pointer;
    /* border: 1px solid red; */
}
</style> -->





<template>
<div class="section">
    <div class="container">
      <div class="row full-height justify-content-center">
        <div class="col-12 text-center align-self-center py-5">
          <div class="section pb-5 pt-5 pt-sm-2 text-center">
            <a href="/login" class="head" mb-0 pb-3><h6><span>로그인</span></h6></a>
            <a href="/join" class="head" mb-0 pb-3><h6><span>회원가입</span></h6></a>
            <div class="title">
                <h1>로그인</h1>
            </div>
            <div class="card-3d-wrap mx-auto">
              <div class="card-3d-wrapper">
                <div class="card-front">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <h4 class="top" mb-4 pb-3>회원 로그인</h4>
                      <div class="form-group">
                        <input type="email" name="user_id" class="form-style" placeholder="아이디" id="logemail" autocomplete="off">
                        <i class="input-icon uil uil-at"></i>
                      </div>  
                      <div class="form-group mt-2">
                        <input type="password" name="user_pw" class="form-style" placeholder="비밀번호" id="logpass" autocomplete="off">
                        <i class="input-icon uil uil-lock-alt"></i>
                      </div>
                      <!-- <div class="btn123"> -->
                      <button @click="login" class="btn1">로그인</button>
                      <button @click="findId" class="btn2">아이디 찾기</button>
                      <button @click="findPw" class="btn3">비밀번호 찾기</button>
                      <!-- </div> -->
                        </div>
                      </div>
                    </div>
                <!-- <div class="card-back">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <h4 class="mb-4 pb-3">Sign Up</h4>
                      <div class="form-group">
                        <input type="text" name="logname" class="form-style" placeholder="Your Full Name" id="logname" autocomplete="off">
                        <i class="input-icon uil uil-user"></i>
                      </div>  
                      <div class="form-group mt-2">
                        <input type="email" name="logemail" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off">
                        <i class="input-icon uil uil-at"></i>
                      </div>  
                      <div class="form-group mt-2">
                        <input type="password" name="logpass" class="form-style" placeholder="Your Password" id="logpass" autocomplete="off">
                        <i class="input-icon uil uil-lock-alt"></i>
                      </div>
                      <a href="#" class="btn mt-4">submit</a>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<!-- <script>
export default {
    setup() {
        
    },
}
</script> -->

<style scoped>
.title {
    font-family: 'normal';
    color: #222222;
    text-align: left;
    border-bottom: 1px solid #434340;
}

body{
  font-family: 'normal';
  font-weight: 300;
  font-size: 15px;
  line-height: 1.7;
  color: #c4c3ca;
  background-color: #1f2029;
  overflow-x: hidden;
}
a {
  cursor: pointer;
  transition: all 200ms linear;
}
a:hover {
  text-decoration: none;
}
.link {
  color: #c4c3ca;
}
.link:hover {
  color: #ffeba7;
}
p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}
h4 {
  font-weight: 600;
}
h6 span{
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}
.section{
  position: relative;
  width: 100%;
  display: block;
}
.full-height{
  min-height: 100vh;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked){
  position: absolute;
  left: -9999px;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label{
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #ffeba7;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before{
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffeba7;
  background-color: #ccc;
  font-family: 'unicons';
  content: '\eb4f';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}


.card-3d-wrap {
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 400px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 60px;
  margin-left: 500px;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position:absolute;    
  top: 0;
  left: 0;  
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out; 
}
.card-front, .card-back {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}
.center-wrap{
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}


.form-group{ 
  position: relative;
  display: block;
    margin: 0;
    padding: 0;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #222222;
  background-color: #565252;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ffeba7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.form-group input:-ms-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-webkit-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-ms-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-webkit-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.btn1 {
  display: inline-block;
  margin: 10px; /* 버튼 사이의 간격 설정 */
  background-color: #c4c3ca;
  position: relative;
  top: 55px;
  padding: 10px 20px; /* 여백 조정 */
  background-color: #7fc481; /* 배경색 */
  color: white; /* 글자색 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 둥근 모서리 */
  font-size: 12px; /* 글자 크기 */
  cursor: pointer; /* 커서 모양 변경 */
}

.btn2 {
  display: inline-block;
  margin: 10px; /* 버튼 사이의 간격 설정 */
  background-color: #c4c3ca;
  position: relative;
  top: 55px;
  padding: 10px 20px; /* 여백 조정 */
  background-color: #7fc481; /* 배경색 */
  color: white; /* 글자색 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 둥근 모서리 */
  font-size: 12px; /* 글자 크기 */
  cursor: pointer; /* 커서 모양 변경 */
}

.btn3 {
  display: inline-block;
  margin: 10px; /* 버튼 사이의 간격 설정 */
  background-color: #c4c3ca;
  position: relative;
  top: 55px;
  padding: 10px 20px; /* 여백 조정 */
  background-color: #7fc481; /* 배경색 */
  color: white; /* 글자색 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 둥근 모서리 */
  font-size: 12px; /* 글자 크기 */
  cursor: pointer; /* 커서 모양 변경 */
}

.btn {
  align-items: end;
}

.btn:active,
.btn:focus{  
  background-color: #d7ea56;
  color: #53524e;
}
.btn:hover{  
  background-color: #d7ea56;
  color: #53524e;
}

.head {
  display: inline-block;
  color: #2a2b38;
  margin-bottom: 40px;
}
.btn button {
  margin: 5px;
}

.logo {
  position: absolute;
  top: 30px;
  right: 30px;
  display: block;
  z-index: 100;
  transition: all 250ms linear;
}

.top {
  text-align: center;
  color: #222222;
  margin-bottom: 50px;
}



</style>