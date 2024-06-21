<template>
  <form id="formTerms" name="formTerms" method="post" action="../signup.vue" data-gtm-form-interact-id="0">
    <div class="signup-container">
        <div class="container">
            <h1>회원가입</h1>
        </div>
        <div class="agreement">
            <h4>약관동의</h4>
        </div>
        <div class="join_agreement_cont">
          <div class="join_agreement_box">
            <div class="form_element" id="termAgreeDiv">
              <input type="checkbox" v-model="joinAgreementBox1" id="termAgree">
              <label class="check on" for="termAgree">
                <strong>(필수)</strong>
                <em> 만 14세 이상입니다</em>
              </label>
            </div>
          </div>
          <br>
        <div class="join_agreement_box js_terms_view">
          <div class="form_element">
            <input type="checkbox" v-model="joinAgreementBox2" id="termsAgree1" class="require">
            <label class="check_s" for="termsAgree1">
            <strong>(필수)</strong>
            " 이용약관 "
            </label>
          </div>
          <div class="agreement_box">
            " 제 1조(목적) "
            <br>
            <br>
            " 표준약관 제10023호 "
            <br>
            <br>
            " 이 약관은 (주)토닥토닥 회사(전자거래 사업자)가 운영하는 TodakTodak.com 사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 
            이용함에 있어 사이버몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다. "
            <br>
            " ※ 「PC통신등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는한 이 약관을 준용합니다」 "
            <br>
            <br>
            <br>
            " 제 2조(정의) "
            <br>
            <br>
            " ① "몰"이란 (주)토닥토닥 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 
            가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다. "
            <br>
            " ② "이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다. "
            <br>
            " ③ ‘회원’이라 함은 "몰"에 개인정보를 제공하여 회원등록을 한 자로서, "몰"의 정보를 지속적으로 제공받으며, 
            "몰"이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다. "
            <br>
            " ④ ‘비회원’이라 함은 회원에 가입하지 않고 "몰"이 제공하는 서비스를 이용하는 자를 말합니다. "
            <br>
            <br>
            <br>
            " 제 3조 (약관동의 명시와 설명 및 개정) "
            <br>
            <br>
            " ① "몰"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호·모사전송번호·전자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보 보호책임자등을 이용자가 쉽게 알 수 있도록 "몰"의 초기 서비스화면(전면)에 게시합니다. 
            다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다. "
            <br>
            " ② "몰"은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회·배송책임·환불조건 등과 같은 
            중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다. "
            <br>
            " ③ "몰"은 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률, 
            방문판매등에관한법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다. "
            <br>
            " ④ "몰"이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일이전부터 적용일자 전일까지 공지합니다. "
            <br>
            " 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.  
            이 경우 "몰“은 개정전 내용과 개정후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. "
            <br>
            " ⑤ "몰"이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 
            다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간내에 "몰"에 송신하여 "몰"의 동의를 받은 경우에는 개정약관 조항이 적용됩니다. "
            <br>
            " ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래등에서의 소비자보호에 관한 법률, 
            약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자보호지침 및 관계법령 또는 상관례에 따릅니다. "
            <br>
            <br>
            <br>
            " 제4조(서비스의 제공 및 변경) "
            <br>
            <br>
            " ① "몰"은 다음과 같은 업무를 수행합니다. "
            <br>
            " 1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결 "
            <br>
            " 2. 구매계약이 체결된 재화 또는 용역의 배송 "
            <br>
            " 3. 기타 "몰"이 정하는 업무 "
            <br>
            " ② "몰"은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 
            이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다. "
            <br>
          </div>
        </div>
        <br>
        <div class="join_agreement_box js_terms_view">
          <div class="form_element">
            <input type="checkbox" v-model="joinAgreementBox3" id="termsAgree2" class="require">
            <label class="check_s" for="termsAgree2">
              <strong>(필수)</strong>
              " 개인정보 수집 및 이용 "
            </label>
          </div>
          <div class="agreement_box">
            " 회사는 회원가입, 민원 등 고객상담 처리, 본인확인(14세 미만 아동 확인) 등 의사소통을 위한 정보 활용 및 이벤트 등과 같은 마케팅용도 활용, 
            회원의 서비스 이용에 대한 통계, 이용자들의 개인정보를 통한 서비스 개발을 위해 아래와 같은 개인정보를 수집하고 있습니다. "
            <br>
            <br>
            " 1. 목적 : 이용자 식별 및 본인여부 확인 "
            <br>
            " 2. 목적 : 민원 등 고객 고충처리 "
            <br>
            " 3. 목적 : 만 14세 미만 아동 확인 "
            <br>
          </div>
        </div>
        <!-- <div class="important_check_box">
          <br>
          <strong class="important_check_on">이용약관과 개인정보 수집 및 이용에 대한 안내 모두 동의해주세요.</strong>
        </div> -->
        </div>
        <!-- 휴대폰 인증 보류 -->
        <!-- <br>
        <div class="join_certify_box">
          <h3>본인 인증방법 선택</h3>
          <div class="join_certify_list">
            <div class="form_element">
              <input type="radio" v-model="phoneAuth" id="authCellPhone">
              <label class="choice_s" for="authCellPhone">휴대폰 본인인증</label>
            </div>
          </div>
        </div> -->
        <br>
        <div class="btn_center_box">
          <button @click="goToNextStep" type="button" id="btnNextStep" class="btn-next-step">다음</button>
        </div>
      </div>
    </form>
</template>

<script>
export default {
  data() {
    return {
      joinAgreementBox1: false,
      joinAgreementBox2: false,
      joinAgreementBox3: false,
      // phoneAuth: false,
    }
  },
  methods: {
    goToNextStep() {
      if (!this.joinAgreementBox1 || !this.joinAgreementBox2 || !this.joinAgreementBox3) {
        alert ('약관에 동의해주세요.');
      }
      // else if (this.phoneAuth !== 'on') {
      //   alert ('휴대폰 인증을 완료해주세요.')
      //   return;
      // } 
      else {
        window.location.href = '/join';
        // alert ('인증이 완료되었습니다.');
      }
    }    
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

  .agreement {
    font-size: 10px;
    font-weight: normal;
    text-align: left; 
    border-bottom: 1px solid #434340;
    margin-bottom: 20px;
  }

  .agreement_box {
    border-style: solid;
    font-size: 12px;
    padding: 10px;
    margin: 10px;
  }

  .btn_center_box {
    text-align: center;
    align-items: center;
  }

  .join_certify_box {
    text-align: left;
  }

  .join_certify_list {
    text-align: center;
    align-items: center;
    border-style: solid; 
    border-color: #ccc;
    width: auto;
    height: 100px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }

  .btn_center_box button {
    margin: 12px;
  }
  .form_element input {
    vertical-align: middle;
    margin-right: 10px;
    cursor: pointer;
  }
  .form_element label {
    vertical-align: middle;
    cursor: pointer;
  }
  
  </style>