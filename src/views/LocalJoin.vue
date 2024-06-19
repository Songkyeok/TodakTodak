<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 -->
<!-- 삭제할 예정입니다 -->
<template>
    <head> </head>
    <body class="body-member body-join pc">
        <div class="top area"></div>
        <div id="wrap">
            <div class="location_wrap"></div>
                <div class="sub_content">
                    <div class="content_box">
                        <div class="contanier">
                            <div class="header">
                                <h2>회원가입</h2>
                                <ol> </ol>
                            </div>
                                <div class="singup-form">
                                    <div class="form-section">
                                        <!-- 회원가입 기본정보 -->     
                                        <h3>기본정보</h3>
                                        <span class="required-note">* 표시는 반드시 입력하셔야 하는 항목입니다.</span>
                                        <div class="form-group">
                                            <label for="user-id">아이디 <span class="required">*</span></label>
                                            <input type="text" id="user-id" name="user-id">
                                            <button type="button" @click="checkUser_Id">아이디 중복확인</button>
                                                <span v-if="user_idError">{{ user_idError }}</span>
                                                <span v-if="user_idSuccess">{{ user_idSuccess }}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="password">비밀번호 <span class="required">*</span></label>
                                            <input type="password" id="password" name="password">
                                        </div>
                                        <div class="form-group">
                                            <label for="confirm-password">비밀번호 확인 <span class="required">*</span></label>
                                            <input type="password" id="confirm-password" name="confirm-password">
                                        </div>
                                        <div class="form-group">
                                            <label for="name">이름 <span class="required">*</span></label>
                                            <input type="text" id="name" name="name">
                                        </div>                                            
                                        <div class="form-group">
                                            <label for="email">이메일 <span class="required"> </span></label>
                                            <input type="email" id="email" name="email">
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
                                            <label for="phone">휴대폰번호<span class="required">*</span></label>
                                            <input type="text" id="phone" name="phone" maxlength="12" placeholder="- 제외하고 입력하세요.">
                                        </div>
                                        <div class="form-group">
                                            <label for="phone">주소<span class="required">*</span></label>
                                                    <div class="address_postcode">
                                                    <input type="text" name="zonecode" readonly="readonly" value="">
                                                    <button type="button" id="btnPostcode" class="btn_post_search">우편번호검색</button>
                                                    <input type="hidden" name="zipcode" value="">
                                                    </div>
                                                                                   
                                                    <div class="address_input">
                                                        <div class="member_warning">
                                                            <input type="text" name="address" readonly="readonly" value="">
                                                        </div>
                                                        <div class="member_warning js_address_sub">
                                                            <input type="text" name="addressSub" value="">
                                                        </div>
                                                    </div>
                                                </div>                              
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       
                <br />
                <div class="btn_center_box">
					<button type="button" id="btnCancel" class="btn_member_cancel">취소</button>
					<button type="button" class="btn_comfirm js_btn_join" value="회원가입">회원가입</button>
				</div>
        </body>
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
        }
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
        },
        
        methods: {
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
body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 300px;
    padding: 100px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 40px; /* 양쪽에 여백 추가 */
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
}

.header h1 {
    font-size: 24px;
    margin: 0;
}

.header nav {
    font-size: 14px;
    color: #666;
}

.header nav a {
    color: #666;
    text-decoration: none;
    margin-right: 5px;
}

.header nav span {
    color: #d9534f;
}

.signup-form {
    margin-top: 20px;
}

.form-section {
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
}

.form-section h2 {
    font-size: 18px;
    margin-bottom: 10px;
}

.required-note {
    color: #d9534f;
    margin-bottom: 20px;
}

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.form-group label {
    width: 120px;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
}

.form-group .required {
    color: #d9534f;
}

.form-group input[type="text"],
.form-group input[type="password"],
.form-group input[type="email"] {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group select {
    margin-left: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group label {
    display: flex;
    align-items: center;
}

</style><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 --><!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->
<!-- SignUp으로 변경하였기 때문에 삭제할 예정입니다 -->