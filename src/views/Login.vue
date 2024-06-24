<template>
  <div class="section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center align-self-center py-5">
          <div class="section pb-5 pt-5 pt-sm-2 text-center">
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
                        <input type="email" class="form-style" placeholder="아이디" autocomplete="off" v-model="user_id" @keyup.enter="login()">
                        <i class="input-icon uil uil-at"></i>
                      </div>
                      <div class="form-group mt-2">
                        <input type="password" class="form-style" placeholder="비밀번호" autocomplete="off" v-model="user_pw" @keyup.enter="login()">
                        <i class="input-icon uil uil-lock-alt"></i>
                      </div>
                      <!-- sns 로그인 추가 -->
                      <div>
                          <a id="custom-login-btn" class="" @click="kakaoLogin()">
                              <img class="mt-2" src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="222">
                          </a>
                          <!-- <a @click="kakaoLogout()">로그아웃</a> -->

                          <div id="naverIdLogin" class="mt-2" @click="naverlogin" img src="../assets/naver.png"></div>
                      </div>
                      <button @click="login" class="btn1">로그인</button>
                      <button @click="goToFindId" class="btn2">아이디 찾기</button>
                      <button @click="goToFindPw" class="btn3">비밀번호 찾기</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
        user_no: '',
        user_id: '',
        naver_id: '',
        user_pw: '',
        naverLogin: [],
    }
  },
  computed: {
    user() {
        return this.$store.state.user;
    }
  },
  mounted() {
    console.log("this.$store.state ===>>>", this.$store.state);
    this.naverLogin = new window.naver.LoginWithNaverId({
        clientId: "LQsxeMjDjQpARzFM3jwf",
        callbackUrl: "http://localhost:8080",
        isPopup: false,
        loginButton: {
            color: "green", type: 3, height: 48,
        },
    });
    // this.$store.commit("naverLogin", this.naverLogin);

    this.naverLogin.init();

    this.naverLogin.getLoginStatus((status) => {
        if (status) {
            const id = this.naverLogin.user.id;
            const email = this.naverLogin.user.email;
            const name = this.naverLogin.user.name;

            // console.log("this.naverLogin.user.id ====>>>", id);
            // console.log("this.naverLogin.user.email ====>>>", email);
            // console.log("this.naverLogin.user.name ====>>>", name);

        } else {
            console.log("callback 처리 실패");
        }
    });
  },
  methods: {
    goToFindId() {
      this.$router.push({ name: "FindId" });
    },
    goToFindPw() {
      this.$router.push({ name: "FindPw" });
    },
    // 로컬 로그인
    login() {
      if(!this.user_id) {
        alert("아이디를 입력해주세요.");
        return;
      } else if(!this.user_pw) {
        alert("비밀번호를 입력해주세요.")
        return;
      } else {
        axios({
          url: "http://localhost:3000/auth/login",
          method: "POST",
          data: {
            user_id: this.user_id,
            user_pw: this.user_pw
          }
        }).then(res => {
          if(res.data.message == 'undefined_id') {
            this.$swal("존재하지 않는 아이디입니다.");
          } else if(res.data.message == 'incorrect_pw') {
            this.$swal("비밀번호가 틀렸습니다.");
          } else {
            this.$store.commit("user", {
              user_id: this.user_id,
              user_no: res.data.message
            })
            this.$swal({
                position: 'top',
                icon: 'success',
                title: '로그인 되었습니다.',
                showConfirmButton: false,
                timer: 1000
            })
            this.$router.push({ path: '/' });
          }
        })
      }
    },
    // 카카오 로그인
    kakaoLogin() {
        window.Kakao.Auth.login({
            scope: 'profile_nickname, account_email',
            success: this.getKakaoAccount
        })
    },
    getKakaoAccount() {
        window.Kakao.API.request({
            url: '/v2/user/me',
            success: res => {
                const kakao_account = res.kakao_account
                const nickname = kakao_account.profile.nickname
                const email = kakao_account.email

                // console.log("nickname ===>>> ", nickname);
                // console.log("email ===>>> ", email);

                axios({
                    url: "http://localhost:3000/auth/kakaoLogin",
                    method: "POST",
                    data: {
                        user_id: email,
                        user_nm: nickname
                    }
                }).then(res => {
                    if(res.data.message == "저장완료") {
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '회원 가입이 완료 되었습니다.',
                            showConfirmButton: false,
                            timer: 1000
                        });
                    } else {
                        this.$store.commit("user", {
                            user_id: email,
                            user_no: res.data.message
                        })
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '로그인 하였습니다.',
                            showConfirmButton: false,
                            timer: 1000
                        }).then(() => {
                            window.location.href = "http://localhost:8080";
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },
    kakaoLogout() {
        window.Kakao.Auth.logout(res => {
            console.log(res)
        })
    },
    naverlogin() {
        axios({
            url: "http://localhost:3000/auth/naverlogin",
            method: "POST",
            data: {
                naverlogin: this.naverLogin.user,
            },
        }).then(res => {
            if (res.data.message == '저장완료') {
                this.$swal({
                    position: 'top',
                    icon: 'success',
                    title: '네이버 회원 가입이 완료 되었습니다.',
                    showConfirmButton: false,
                    timer: 1000
                });
            } else {
                this.$store.commit("user", {
                    user_id: this.naverLogin.user.id,
                    user_email: this.naverLogin.user.email,
                    user_nm: this.naverLogin.user.name
                })

                this.$swal({
                    position: 'top',
                    icon: 'success',
                    title: '네이버 로그인 하였습니다.',
                    showConfirmButton: false,
                    timer: 1000,
                }).then(() => {
                    window.location.href = "http://localhost:8080";
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
  }
}
</script>

<style scoped>
  .title {
    font-family: 'normal';
    color: #222222;
    text-align: left;
    border-bottom: 1px solid #434340;
  }

  body {
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

  h6 span {
    padding: 0 20px;
    text-transform: uppercase;
    font-weight: 700;
  }

  .section {
    position: relative;
    width: 100%;
    display: block;
  }

  [type="checkbox"]:checked,
  [type="checkbox"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  .checkbox:checked+label,
  .checkbox:not(:checked)+label {
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

  .checkbox:checked+label:before,
  .checkbox:not(:checked)+label:before {
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

  .checkbox:checked+label:before {
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
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: all 600ms ease-out;
  }

  .card-front,
  .card-back {
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

  .checkbox:checked~.card-3d-wrap .card-3d-wrapper {
    transform: rotateY(180deg);
  }

  .center-wrap {
    position: absolute;
    width: 100%;
    padding: 0 35px;
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 35px) perspective(100px);
    z-index: 20;
    display: block;
  }


  .form-group {
    position: relative;
    display: block;
    margin: 0 auto;
    padding: 0;
    width: 222px;
    box-sizing: border-box;
  }
  .form-group input {
    color: white;
  }

  .form-style {
    padding: 13px 20px;
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
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  }

  .form-style:focus,
  .form-style:active {
    border: none;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
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

  .form-group input:-ms-input-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input::-moz-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:-moz-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input::-webkit-input-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:focus:-ms-input-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:focus::-moz-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:focus:-moz-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:focus::-webkit-input-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .btn1 {
    display: inline-block;
    margin: 10px;
    /* 버튼 사이의 간격 설정 */
    background-color: #c4c3ca;
    position: relative;
    /* top: 55px; */
    padding: 10px 20px;
    /* 여백 조정 */
    background-color: #7fc481;
    /* 배경색 */
    color: white;
    /* 글자색 */
    border: none;
    /* 테두리 제거 */
    border-radius: 5px;
    /* 둥근 모서리 */
    font-size: 12px;
    /* 글자 크기 */
    cursor: pointer;
    /* 커서 모양 변경 */
  }

  .btn2 {
    display: inline-block;
    margin: 10px;
    /* 버튼 사이의 간격 설정 */
    background-color: #c4c3ca;
    position: relative;
    padding: 10px 20px;
    /* 여백 조정 */
    background-color: #7fc481;
    /* 배경색 */
    color: white;
    /* 글자색 */
    border: none;
    /* 테두리 제거 */
    border-radius: 5px;
    /* 둥근 모서리 */
    font-size: 12px;
    /* 글자 크기 */
    cursor: pointer;
    /* 커서 모양 변경 */
  }

  .btn3 {
    display: inline-block;
    margin: 10px;
    /* 버튼 사이의 간격 설정 */
    background-color: #c4c3ca;
    position: relative;
    padding: 10px 20px;
    /* 여백 조정 */
    background-color: #7fc481;
    /* 배경색 */
    color: white;
    /* 글자색 */
    border: none;
    /* 테두리 제거 */
    border-radius: 5px;
    /* 둥근 모서리 */
    font-size: 12px;
    /* 글자 크기 */
    cursor: pointer;
    /* 커서 모양 변경 */
  }

  .btn {
    align-items: end;
  }

  .btn:active,
  .btn:focus {
    background-color: #d7ea56;
    color: #53524e;
  }

  .btn:hover {
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