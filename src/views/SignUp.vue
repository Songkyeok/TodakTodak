<template>
    <div class="signup-container">
        <div class="container">
            <h1>회원가입</h1>
        </div>
        <div class="information">
            <h3>기본정보</h3>
        </div>
            <p class="note">* 표시는 반드시 입력하셔야 하는 항목입니다.</p>
  
      <form @submit.prevent="onSubmitForm">
        <div class="form-group">
          <label for="username" class="required">아이디</label>
          <input type="text" id="username" v-model="username" />
          <button type="button" @click="checkUsername">중복확인</button>
            <span v-if="user_idError">{{ user_idError }}</span>
            <span v-if="user_idSuccess">{{ user_idSuccess }}</span>
        </div>
        
        <div class="form-group">
          <label for="password" class="required">비밀번호</label>
          <input type="password" id="password" v-model="password" />
        </div>
        
        <div class="form-group">
          <label for="passwordConfirm" class="required">비밀번호 확인</label>
          <input type="password" id="passwordConfirm" v-model="passwordConfirm" />
        </div>
        
        <div class="form-group">
          <label for="name" class="required">이름</label>
          <input type="text" id="name" v-model="name" />
        </div>
        
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="email" />
            <select id="emailDomain" name="emailDomain" class="chosen-select">
                <option value="self">직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="daum.net">daum.net</option>
                <option value="nate.com">nate.com</option>
                <option value="hotmail.com">hotmail.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="icloud.com">icloud.com</option>
            </select><div class="chosen-container chosen-container-single chosen-container-single-nosearch" style="width: 120px;" title="" id="emailDomain_chosen"></div>
        </div>
        
        <div class="form-group">
          <label for="phone" class="required">휴대폰번호</label>
          <input type="text" id="phone" name="phone" maxlength="12" placeholder="- 제외하고 입력하세요.">
        </div>
        
        <div class="form-group form-group-ad">
          <label for="address">주소</label>
          <input type="text" id="address" v-model="address" />
          <button type="button">우편번호검색</button>
          <input type="hidden" name="zipcode" value="">
          <div class="address_input">
            <div class="member_warning">
                <input type="text" name="address" readonly="readonly" value="">
            </div>
            <div class="member_warning js_address_sub">
                <input type="text" name="addressSub" value="">
            </div>
          </div>
        </div>
        
        <button type="submit">회원가입</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        user_id: '',
            user_pw: '',
            user_name: '',
            user_email: '',
            user_phone: '',
            user_zipcode: '',
            user_adr1: '',
            user_adr2: '',

            user_pw_ck: '',
            zipinput: false,
      };
    },
    
    methods: {
        onSubmitForm() {
            if (!this.validationCheck()) {
                return;
            }
            axios({
                url: "http://localhost:3000/auth/join",
                method: "POST",
                data: {
                    user_id: this.user_id,
                    user_pw: this.user_pw,
                    user_name: this.user_name,
                    user_email: this.user_email,
                    user_phone: this.user_phone,
                    user_zipcode: this.user_zipcode,
                    user_adr1: this.user_adr1,
                    user_adr2: this.user_adr2,
                },
            })
                .then(res => {
                  if (res.data.message == 'DB_error') {
                        this.$swal("DB 에러 발생")
                    }
                    else {
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '회원가입이 완료되었습니다!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.$router.push({ path: '/login' }); // 로그인 화면으로 이동
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        alert('회원가입 완료!');
      },
        // 아이디 중복 확인 로직
        async checkUser_Id() {
                if (!this.user_id) {
                    this.user_idError = '아이디를 입력하세요.';
                    this.user_idSuccess = '';
                    return;
                }

                try {
                    const response = await axios.post('/api/check-user_id', { user_id: this.user_id });
                    if (response.data.exists) {
                        this.user_idError = '아이디가 이미 존재합니다.';
                        alert ('아이디가 이미 존재합니다.');
                        this.user_idSuccess = '';
                    } else {
                        this.user_idError = '';
                        this.user_idSuccess = '사용 가능한 아이디입니다.';
                    }
                } catch (error) {
                    console.error(error);
                    this.user_idError = '아이디 확인중 오류가 발생했습니다.';
                    this.user_idSuccess = '';
                }
            },
            async register() {
                if (this.user_idError || !this.user_idSuccess) {
                    return;
                }

                this.isSubmitting = true;                
                }
            },

            zipload() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
                    var extraAddr = '';
                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }
                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            // addr += ' ';
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            // addr += ' ';
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                    }
                    this.user_zipcode = data.zonecode;
                    this.user_adr1 = addr;
                    this.user_adr2 = extraAddr;
                    this.zipinput = true;
                }
            }).open();
        },
        validationCheck() {
            if (this.user_id == "") {
                this.$swal("아이디를 입력하세요.");
                return false;
            }

            if (this.user_pw == "") {
                this.$swal("비밀번호를 입력하세요.");
                return false;
            }

            if (this.user_pw_ck !== this.user_pw) {
                this.$swal("비밀번호가 일치하지 않습니다.");
                return false;
            }

            if (this.user_phone == "") {
                this.$swal('전화번호를 정확히 입력해주세요.');
                return false;
            }

            if (!this.zipinput) {
                this.$swal("우편번호를 입력하세요.");
                return false;
            }
            return true;
        },
        validatePhoneNumber() {
            this.user_mobile = this.user_mobile.replace(/\D/g, ''); // 숫자 이외의 문자 제거
        },
        
      }
    

  </script>
  
  <style scoped>
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
  }

  .note {
    font-size: 12px;
    color: #d9534f;
    margin-top: 10; 
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
    content: '*';
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
    color: #333;
    margin-right: 10px;
  }

  button[type="submit"] {
    display: block;
    width: 100%;
    padding: 10px 0;
    border: none;
    background-color: #767070;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #767070;
  }
  </style>
  