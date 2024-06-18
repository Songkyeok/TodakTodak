<template>
    <html>
    <head> </head>
    <body class="body-member body-join pc">
        <div class="top area"></div>
        <div id="wrap">
            <div id="header_wrap">
                <div id="container">
                    <div id="contents">
                        <div class="location_wrap"></div>
                        <div class="sub_content">
                            <div class="content_box">
                                <div class="join_base_wrap">
                                    <div class="member_tit">
                                        <h2>회원가입</h2>
                                        <ol> </ol>
                                    </div>
                                    <div class="member_cont">
                                        <form id="formJoin" name="formJoin" action="http://localhost:8080/join" method="post" novalidate="novalidate">
                                            <input type="hidden" name="rncheck" value="authCellphone">
                                            <input type="hidden" name="pakey" value>
                                            <input type="hidden" name="foreigner" value="0">
                                            <input type="hidden" name="adultFl" value="y">
                                            <input type="hidden" name="mode" value="join">
                                            <!-- 회원가입 기본정보 -->
                                            <div class="base_info_box">       
                                                <h3>기본정보</h3>
                                                <span class="important">표시는 반드시 입력하셔야 하는 항목입니다.</span>
                                                <div class="base_info_sec"></div>
                                            </div>
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <colgroup>
                                                <col width="25%">
                                                <col width="75%">
                                            </colgroup>
                                            <tbody>
                                            <tr>
                                                <th><span class="important">아이디</span></th>
                                                <td>
                                                    <div class="member_warning">
                                                        <input type="text" id="memId" name="memId" data-pattern="gdMemberId">
                                                    </div>
                                                </td>

                                            </tr>
                                            <tr class="">
                                                <th><span class="important">비밀번호</span></th>
                                                <td class="member_password">
                                                    <div class="member_warning">
                                                        <input type="password" id="newPassword" name="memPw" autocomplete="off" placeholder="">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="">
                                                <th><span class="important">비밀번호 확인</span></th>
                                                <td>
                                                    <div class="member_warning">
                                                        <input type="password" class="check-id" name="memPwRe" autocomplete="off">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><span class="important">이름</span></th>
                                                <td>
                                                    <div class="member_warning">
                                                        <input type="text" name="memNm" data-pattern="gdMemberNmGlobal" value="" maxlength="30" readonly="">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><span class="important">이메일</span></th>
                                                <td class="member_email">
                                                    <div class="member_warning">
                                                        <input type="text" name="email" id="email" value="" tabindex="-1">
                                                        <select id="emailDomain" name="emailDomain" class="chosen-select" style="display: none;">
                                                            <option value="self">직접입력</option>
                                                            <option value="naver.com">naver.com</option>
                                                            <option value="hanmail.net">hanmail.net</option>
                                                            <option value="daum.net">daum.net</option>
                                                            <option value="nate.com">nate.com</option>
                                                            <option value="hotmail.com">hotmail.com</option>
                                                            <option value="gmail.com">gmail.com</option>
                                                            <option value="icloud.com">icloud.com</option>
                                                        </select><div class="chosen-container chosen-container-single chosen-container-single-nosearch" style="width: 120px;" title="" id="emailDomain_chosen"><a class="chosen-single"><span>직접입력</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" readonly=""></div><ul class="chosen-results"></ul></div></div>
                                                    </div>
                                                    <div class="member_warning js_email"></div>
                                                </td>
                                                </tr>                                               
                                            <tr>
                                                <th><span class="important">휴대폰번호</span></th>
                                                <td class="member_address">
                                                    <div class="address_postcode">
                                                        <input type="text" id="cellPhone" name="cellPhone" maxlength="12" placeholder="- 없이 입력하세요." data-pattern="gdNum" value="" readonly="">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><span>전화번호</span></th>
                                                <td>
                                                    <div class="member_warning">
                                                        <input type="text" id="phone" name="phone" maxlength="12" placeholder="- 없이 입력하세요." data-pattern="gdNum" value="">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><span>주소</span></th>
                                                <td class="member_address">
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
                                                </td>
                                            </tr>                                      
                                         </tbody>
                                         </table>
                                         </form>
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
                </div>
        </body>
    </html>
</template>

<style scoped>
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.input-error {
    line-height: 16px;
    font-size: 11px;
    color: red;
}

.title-danger {
    color: red;
}

.input-danger {
    border-bottom: 1px solid red !important;
}


.background {
    background: linear-gradient(180deg, rgb(253, 238, 204), rgb(253, 245, 221));
    height: auto;
    width: 90%;
    max-width: 450px;
    padding: 10px;
    margin: 0 auto;
    border-radius: 30px;
    box-shadow: 0px 1px 30px 2px rgb(238, 238, 238);
    text-align: center;
    position: relative;
    top: 50px;

}

div.join_box{
    position: padding;
    height: 750px;
    
}
form {
    align-items: center;
    display: flex;
    padding: 30px;
    flex-direction: column;
   
}

input,
.addinput {
    border: none;
    border-bottom: 2px solid #d49f00;
    background: none;
    padding: 10px;
    font-weight: 700;
    transition: .2s;
    width: 75%;
    font-family: 'GmarketSansMedium';
}

input:active,
input:focus,
input:hover {
    outline: none;
    border-bottom-color: #473500;
    
}

.btn {
    border: none;
    width: 75%;
    border: solid 2px rgb(255, 204, 122);
    border-radius: 8px;
    background-color: rgb(255, 210, 107);
    color: rgb(0, 0, 0);
    padding: 15px 0;
    font-weight: 600;

    cursor: pointer;
    transition: .2s;
    font-family: 'GmarketSansMedium';
}

.btn:hover {
    background-color:  rgb(255, 184, 19);
}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user_id: '',
            user_nick: '',
            user_email: '',
            user_pw: '',
            user_mobile: '',
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
                url: "http://localhost:3000/auth/join_process",
                method: "POST",
                data: {
                    user_id: this.user_id,
                    user_nick: this.user_nick,
                    user_email: this.user_email,
                    user_pw: this.user_pw,
                    user_mobile: this.user_mobile,
                    user_zipcode: this.user_zipcode,
                    user_adr1: this.user_adr1,
                    user_adr2: this.user_adr2,
                },
            })
                .then(res => {
                    if (res.data.message == 'already_exist_id') {
                        this.$swal("이미 존재하는 아이디입니다.")
                    }
                    else if (res.data.message == 'DB_error') {
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

            if (this.user_nick == "") {
                this.$swal("닉네임을 입력하세요.");
                return false;
            }

            if (this.user_email == "") {
                this.$swal("이메일 주소를 입력하세요.");
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

            if (this.user_mobile == "") {
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
    },
}


</script>