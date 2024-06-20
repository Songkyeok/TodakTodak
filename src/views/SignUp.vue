<template>
  <div class="signup-container">
    <div class="container">
      <h1>회원가입</h1>
    </div>
    <div class="information">
      <h4>기본정보</h4>
    </div>
    <p class="note">* 표시는 반드시 입력하셔야 하는 항목입니다.</p>

    <form @submit.prevent="onSubmitForm" id="sendForm">
      <div class="form-group">
        <label for="user_id" class="required">아이디</label>
        <input type="text" id="user_id" v-model="user_id" placeholder="아이디" />
        <button type="button" @click="checkUserId">중복확인</button>
        <span v-if="user_idSuccess">{{ user_idSuccess }}</span>
      </div>

      <div class="form-group">
        <label for="user_pw" class="required">비밀번호</label>
        <input type="password" id="user_pw" v-model="user_pw" placeholder="비밀번호" />
      </div>

      <div class="form-group">
        <label for="passwordConfirm" class="required">비밀번호 확인</label>
        <input type="password" id="passwordConfirm" v-model="user_pw_ck" placeholder="비밀번호 확인"/>
      </div>

      <div class="form-group">
        <label for="name" class="required">이름</label>
        <input type="text" id="name" v-model="user_nm" placeholder="이름" />
      </div>

      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="user_email" placeholder="이메일" />
        <select id="emailDomain" name="emailDomain" class="chosen-select">
        <input type="text" v-model="emailDomainPart" placeholder="직접입력">
        <lable for="domain-list">도메인 리스트</lable>  
        <select v-model="selectedDomain" @change="updateDomain"></select>
          <option value="self">직접입력</option>
          <option value="naver.com">@naver.com</option>
          <option value="hanmail.net">@hanmail.net</option>
          <option value="daum.net">@daum.net</option>
          <option value="nate.com">@nate.com</option>
          <option value="hotmail.com">@hotmail.com</option>
          <option value="gmail.com">@gmail.com</option>
          <option value="icloud.com">@icloud.com</option>
          <option v-for="domain in domains" :key="domain" :value="domain">{{ domain }}</option>
        </select>
        <div
          class="chosen-container chosen-container-single chosen-container-single-nosearch"
          style="width: 120px"
          title=""
          id="emailDomain_chosen"
        ></div>
      </div>

      <div class="form-group">
        <label for="phone" class="required">휴대폰번호</label>
        <input
          type="text"
          id="phone"
          v-model="user_phone"
          name="phone"
          maxlength="12"
          placeholder="- 제외하고 입력하세요."
        />
      </div>

      <div class="form-group form-group-ad">
        <label for="address">주소</label>
        <div
          class="address_postcode"
          style="display: flex; justify-content: space-between"
        >
          <div>
            <input type="text" name="zonecode" readonly="readonly" value="" />
          </div>
          <div>
            <button type="button" id="btnPostcode" class="btn_post_search">우편번호검색</button>
            <span v-show="zipinput" class="addinput">{{ user_zipcode }}</span>
                <span v-show="zipinput" class="addinput">{{ user_adr1 }}</span>
                <input type="text" v-show="zipinput" v-model="user_adr2" placeholder="상세주소 입력">
          </div>
        </div>
        <!-- <div class="form-group form-group-ad">
            
            <input type="hidden" v-model="user_zipcode" name="zipcode" value="">
          </div> -->

        <!-- <div class="address_input">
            <div class="member_warning">
                <input type="text" v-model=user_adr1 name="address" readonly="readonly" value="">
            </div>
            <div class="member_warning js_address_sub">
                <input type="text" v-model="user_adr2" name="addressSub" value="">
            </div>
          </div> -->
      </div>
      <div class="form-group form-group-ad">
        <div class="address_input_box" style="display: flex; justify-content: space-between">
          <div class="member_warning" style="margin-left: 128px; width: 100%;">
            <input type="text" v-model="user_adr1" name="address" readonly="readonly" value="" />
          </div>
        </div>
        <!-- <div class="address_input" style="display: flex; justify-content: space-between">
          <div class="member_warning js_address_sub">
            <input type="text" v-model="user_adr2" name="addressSub" value="" />
          </div>
        </div> -->
      </div>
      <div class="form-group form-group-ad">
        <div class="address_input_box" style="display: flex; justify-content: space-between">
            <div class="member_warning js_address_sub" style="margin-left: 128px; width: auto; ">
              <input type="text" v-model="user_adr2" name="addressSub" value="" />
            </div>
        </div>
      </div>

      <button @click="goToNextStep" type="button" id="btnNextStep" class="btn-next-step">회원가입</button>
      <p v-if="!user_id && showWarning" class="warning-message"></p>
      <p v-if="!user_pw && showWarning" class="warning-message"></p>
      <p v-if="user_pw !== user_pw_ck && showWarning" class="warning-message"></p>
      <p v-if="!user_pw_ck && showWarning" class="warning-message"></p>
      <p v-if="!user_nm && showWarning" class="warning-message"></p>
      <p v-if="!user_phone && showWarning" class="warning-message"></p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user_id: "",
      user_pw: "",
      user_nm: "",
      user_email: "",
      user_phone: "",
      user_zipcode: "",
      user_adr1: "",
      user_adr2: "",
  
      user_pw_ck: "",
      zipinput: false,
    };
  },

  methods: {
    goToNextStep() {
      if (!this.user_id) {
        this.showWarning = true;
        alert ('아이디를 입력해주세요');
        return;
      } else if (!this.user_pw) {
        this.showWarning = true;
        alert ('비밀번호를 입력해주세요');
        return;
      } else if (!this.user_pw_ck) {
        this.showWarning = true;
        alert ('비밀번호 확인을 입력해주세요');
        return;
      } else if (this.user_pw !== this.user_pw_ck) {
        this.showWarning = true;
        alert ('비밀번호가 동일하지 않습니다');
      } else if (!this.user_nm) {
        this.showWarning = true;
        alert ('이름을 입력해주세요');
        return;
      } else if (!this.user_phone) {
        this.showWarning = true;
        alert ('휴대폰번호를 입력해주세요');
        return;
      } else {
        this.showWarning = false;
        alert ('회원가입이 완료되었습니다.');
        window.location.href = '/login';  
      }
    },

    checkUserId() {
      axios({
        url: "http://localhost:3000/auth/checkUserId",
        method: "POST",
        data: {
          user_id: this.user_id
        }
      }).then(results => {
        // console.log(" this.user_id ==>>>>",this.user_id);
        console.log("results ===>>> ", results)
        // user_id = test 
        if(results.data.length > 0) {
          alert("중복입니다.");
        } else {
          alert("사용할 수 있습니다.")
        }
      })
      
      
      
      // .then (res => {
      //   if (res.data.message == 'already_exist_id') {
      //     this.$swal("이미 존재하는 아이디입니다")
      //   } else if (res.data.message == 'DB_error') {
      //     this.$swal("DB에러 발생")
      //   } else {
      //     this.user_idError = "",
      //     this.user_idSuccess = "사용가능한 아이디입니다";
      //     alert ('사용가능한 아이디입니다');
      //   }
      // })
      // .catch (err => {
      //   console.log(err);
      // })
      
    }
    // checkUserId() {
    //   axios ({
    //     url: "http://localhost:3000/auth/join",
    //     method: "post",
    //     data: {
    //       user_id: this.user_id,
    //       user_email: this.user_email,
    //       user_pw: this.user_pw,
    //       user_nm: this.user_nm,
    //       user_phone: this.user_phone,
    //       user_zipcode: this.user_zipcode,
    //       user_adr1: this.user_adr1,
    //       user_adr2: this.user_adr2,
    //     },
    //   })
    //   .then (res => {
    //     if (res.data.message == 'already_exist_id') {
    //       this.$swal("이미 존재하는 아이디입니다")
    //     } else if (res.data.message == 'DB_error') {
    //       this.$swal("DB에러 발생")
    //     } else {
    //       this.user_idError = "",
    //       this.user_idSuccess = "사용가능한 아이디입니다";
    //       alert ('사용가능한 아이디입니다');
    //     }
    //   })
    //   .catch (err => {
    //     console.log(err);
    //   })
    // }

    
  }
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

.signup-container h4 {
  text-align: left;
  font-size: 20px;
  color: #222222;
  margin-left: 10px;
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
  font-size: 15px;
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

.btn-next-step {
  margin-left: 50%;
  margin-top: 50px;
  padding: 8px 12px;
  border: none;
  background-color: #767070;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

/* .address-input {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.address-input {
  margin-bottom: 5px;
} */

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
</style>

