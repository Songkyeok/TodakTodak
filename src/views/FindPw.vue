<template>
  <div class="section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center align-self-center py-5">
          <div class="section pb-5 pt-5 pt-sm-2 text-center">
            <div class="title">
              <h1>비밀번호 찾기</h1>
            </div>
            <div class="card-3d-wrap mx-auto">
              <div class="card-3d-wrapper">
                <div class="card-front">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <h4 class="top" mb-4 pb-3>회원 비밀번호 찾기</h4>
                      <div class="form-group">
                        <input type="text" class="form-style" placeholder="아이디" autocomplete="off" v-model="user_id" @keyup.enter="findPw">
                      </div>
                      <div class="form-group mt-2">
                        <input type="text" maxlength="11" class="form-style" placeholder="휴대폰 번호" autocomplete="off" v-model="user_phone" @keyup.enter="findPw">
                      </div>
                      <button @click="findPw" class="btn2">비밀번호 찾기</button>
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
import axios from 'axios'
export default {
  data() {
    return {
      user_id: "",
      user_phone: "",
      user_pw: "",
    }
  },
  methods: {
    findPw() {
      if(!this.user_id) {
        alert("아이디를 입력해 주세요.")
      } else if(!this.user_phone) {
        alert("휴대폰 번호를 입력해 주세요.")
      } else {
        axios({
          url: "http://localhost:3000/auth/findPw",
          method: "POST",
          data: {
            user_id: this.user_id,
            user_phone: this.user_phone
          }
        }).then(res => {
            if(res.data.message == "user_not_found") {
                this.$swal("입력하신 정보와 일치하는 계정이 없습니다.");
            } else if(res.data.message == "user_found") {
                this.$swal(`임시 비밀번호는 ${res.data.user_pw} 입니다. 로그인 후 꼭 변경해 주세요.`);
            }
        })
      }
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
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    z-index: 20;
    display: block;
  }


  .form-group {
    position: relative;
    display: block;
    margin: 0 auto;
    padding: 0;
    width: 300px;
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
    margin-top: 20px;
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
  .w_50 {
    width: 60%;
  }
  .receiveNum_btn {
    width: calc(40% - 10px);
    margin-left: 10px;
    padding: 12px 0;
    border: none;
    background-color: #767070;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }

  .receiveNum_btn:hover {
    background-color: #c78683;
  }
</style>