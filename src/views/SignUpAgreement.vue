<template>
  <form id="formTerms" name="formTerms" method="post" action="../signup.vue" data-gtm-form-interact-id="0">
    <div class="signup-container">
        <div class="container">
            <h1>회원가입</h1>
        </div>
        <div class="agreement">
            <h3>약관동의</h3>
        </div>
        <div class="join_agreement_cont">
          <div class="join_agreement_box">
            <div class="form_element" id="termAgreeDiv">
              <input type="checkbox" id="termAgree" name="under14ConsentFl" value="y" data-gtm-form-interact-field-id="0">
              <label class="check on" for="termAgree">
                <strong>(필수)</strong>
                <em>만 14세 이상입니다</em>
              </label>
            </div>
          </div>
        <div class="join_agreement_box">
          <div class="form_element">
            <input type="checkbox" id="allAgree">
            <label class="check" for="allAgree">
              <em>토닥토닥의 모든 약관을 확인하고 전체 동의합니다.</em>
            </label>
            <span>(전체동의, 선택항목도 포함됩니다.)</span>
          </div>
        </div>
        <div class="join_agreement_box js_terms_view">
          <div class="form_element">
            <input type="checkbox" id="termsAgree1" name="agreementInfoFl" class="require">
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
            " 이 약관은 (주)이폴리움 회사(전자거래 사업자)가 운영하는 TodakTodak.com 사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 
            이용함에 있어 사이버몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다. "
            <br>
            " ※ 「PC통신등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는한 이 약관을 준용합니다」 "
            <br>
            <br>
            <br>
            " 제 2조(정의) "
            <br>
            <br>
            " ① "몰"이란 (주)이폴리움 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 
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
        <div class="join_agreement_box js_terms_view">
          <div class="form_element">
            <input type="checkbox" id="termsAgree2" name="privateApprovalFl" class="require">
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
            " 1. - 목적 : 이용자 식별 및 본인여부 확인 "
            <br>
            " 2. - 목적 : 민원 등 고객 고충처리 "
            <br>
            " 3. – 목적 : 만 14세 미만 아동 확인 "
            <br>
            <br>
            <br>
          </div>
        </div>
        <div class="important_check_box">
          <strong class="important_check_on">이용약관과 개인정보 수집 및 이용에 대한 안내 모두 동의해주세요.</strong>
        </div>
        </div>
        <div class="join_certify_box">
          <h3>본인 인증방법 선택</h3>
          <div class="join_certify_list">
            <ul>
              <li>
                <div class="form_element">
                  <input type="radio" id="authCellPhone" name="RnCheckType" value="authCellPhone">
                  <label class="choice_s" for="authCellPhone">휴대폰 본인인증</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="btn_center_box">
          <button type="button" id="btnPrevStep" class="btn_member_prev">이전단계</button>
          <button type="button" id="btnNextStep" class="btn_member_next">다음단계</button>
        </div>
      </div>
    </form>
</template>

<script type="text/javascript">
        var setCriteoGoodsPrice = 0;
            
        function set_criteo_price() {
            if (typeof $('#frmViewLayer input[name="set_goods_price"]').val() == 'undefined') {
                var tmpGoodsPrice = parseFloat($('#frmView input[name="set_goods_price"]').val());
                var tmpOptionPrice = parseFloat($('#frmView input[name="set_option_price"]').val());
                var tmpTextPrice = parseFloat($('#frmView input[name="set_option_text_price"]').val());
            } else {
                var tmpGoodsPrice = parseFloat($('#frmViewLayer input[name="set_goods_price"]').val());
                var tmpOptionPrice = parseFloat($('#frmViewLayer input[name="set_option_price"]').val());
                var tmpTextPrice = parseFloat($('#frmViewLayer input[name="set_option_text_price"]').val());
            }
            if (tmpOptionPrice > 0) { tmpOptionPrice = tmpOptionPrice / goodsTotalCnt; }
            if (tmpTextPrice > 0) { tmpTextPrice = tmpTextPrice / goodsTotalCnt; }
            
            setCriteoGoodsPrice = tmpGoodsPrice + tmpOptionPrice + tmpTextPrice;
        }
        
        function criteoCartEvent(goodsNo, price, quantity) {
            window.criteo_q = window.criteo_q || [];
            var deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";
            window.criteo_q.push(
                { event: "setAccount", account: "96165" },
                { event: "setEmail", email: "", hash_method: "sha256" },
                { event: "setZipcode", zipcode: "" },
                { event: "setSiteType", type: deviceType },
                { event: "addToCart", item: [
                    { id: goodsNo, price: price, quantity: quantity }
                    ]
                }
            );
        }
</script>

<!-- <script defer="" async="" src="https://cdn.megadata.co.kr/dist/prod/v2/mtm.js?adverId=wmilk01&amp;device=W"></script>

<iframe allow="join-ad-interest-group" data-tagging-id="AW-954432226" data-load-time="1718766237723" height="0" width="0" 
  src="https://td.doubleclick.net/td/rul/954432226?random=1718766237720&amp;cv=11&amp;fst=1718766237720&amp;fmt=3&amp;bg=ffffff&amp;guid=ON&amp;async=1&amp;gtm=45be46h0v9177819199za200&amp;gcd=13l3l3l3l1&amp;dma=0&amp;tag_exp=0&amp;u_w=1470&amp;u_h=956&amp;url=https%3A%2F%2Fwww.blanc101.com%2Fmember%2Fjoin_agreement.php%3FmemberFl%3Dpersonal&amp;ref=https%3A%2F%2Fwww.blanc101.com%2Fmember%2Fjoin_method.php&amp;hn=www.googleadservices.com&amp;frm=0&amp;tiba=%EB%B8%94%EB%9E%91101&amp;npa=0&amp;pscdl=noapi&amp;auid=891236645.1718007324&amp;uaa=arm&amp;uab=64&amp;uafvl=Google%2520Chrome%3B125.0.6422.60%7CChromium%3B125.0.6422.60%7CNot.A%252FBrand%3B24.0.0.0&amp;uamb=0&amp;uam=&amp;uap=macOS&amp;uapv=14.5.0&amp;uaw=0&amp;fledge=1&amp;data=event%3Dgtag.config" style="display: none; visibility: hidden;"></iframe>
  #document (https://td.doubleclick.net/td/rul/954432226?random=1718766237720&cv=11&fst=1718766237720&fmt=3&bg=ffffff&guid=ON&async=1&gtm=45be46h0v9177819199za200&gcd=13l3l3l3l1&dma=0&tag_exp=0&u_w=1470&u_h=956&url=https%3A%2F%2Fwww.blanc101.com%2Fmember%2Fjoin_agreement.php%3FmemberFl%3Dpersonal&ref=https%3A%2F%2Fwww.blanc101.com%2Fmember%2Fjoin_method.php&hn=www.googleadservices.com&frm=0&tiba=%EB%B8%94%EB%9E%91101&npa=0&pscdl=noapi&auid=891236645.1718007324&uaa=arm&uab=64&uafvl=Google%2520Chrome%3B125.0.6422.60%7CChromium%3B125.0.6422.60%7CNot.A%252FBrand%3B24.0.0.0&uamb=0&uam=&uap=macOS&uapv=14.5.0&uaw=0&fledge=1&data=event%3Dgtag.config)
<iframe data-siteid="11442" data-platform="godomall" style="position: fixed; border: none; box-sizing: border-box; z-index: -99999;"></iframe>

<div id="criteo-tags-div" style="display: none;"></div>
<script type="text/javascript" id="" charset="UTF-8" src="//t1.daumcdn.net/kas/static/kp.js"></script>
<script type="text/javascript" id="">!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version="2.0",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","1798482097159592");fbq("track","PageView");</script>
<noscript>
<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1798482097159592&amp;ev=PageView&amp;noscript=1">
</noscript>
<div id="ch-plugin" class="notranslate" style="z-index: 100000 !important;">
  <div id="ch-plugin-entry">
    <div style="display: block !important;">
</div>
</div>      
<div id="ch-plugin-script" style="display:none;" class="ch-messenger-hidden">
<iframe id="ch-plugin-script-iframe" title="Channel chat" style="position:relative!important;height:100%!important;width:100%!important;border:none!important;"></iframe>
</div>
  <style data-styled="active" data-styled-version="5.3.9"></style>
</div>
<iframe allow="join-ad-interest-group" data-tagging-id="AW-954432226" data-load-time="1718766565446" height="0" width="0" src="https://td.doubleclick.net/td/rul/954432226?random=1718766565436&amp;cv=11&amp;fst=1718766565436&amp;fmt=3&amp;bg=ffffff&amp;guid=ON&amp;async=1&amp;gtm=45be46h0v9177819199za200&amp;gcd=13l3l3l3l1&amp;dma=0&amp;tag_exp=0&amp;u_w=1470&amp;u_h=956&amp;url=https%3A%2F%2Fwww.blanc101.com%2Fmember%2Fjoin_agreement.php%3FmemberFl%3Dpersonal&amp;ref=https%3A%2F%2Fwww.blanc101.com%2Fmember%2Fjoin_method.php&amp;hn=www.googleadservices.com&amp;frm=0&amp;tiba=%EB%B8%94%EB%9E%91101&amp;npa=0&amp;pscdl=noapi&amp;auid=891236645.1718007324&amp;uaa=arm&amp;uab=64&amp;uafvl=Google%2520Chrome%3B125.0.6422.60%7CChromium%3B125.0.6422.60%7CNot.A%252FBrand%3B24.0.0.0&amp;uamb=0&amp;uam=&amp;uap=macOS&amp;uapv=14.5.0&amp;uaw=0&amp;fledge=1&amp;data=event%3Dform_start" style="display: none; visibility: hidden;"></iframe>
<script type="text/javascript" id="">kakaoPixel("5936787149110723607").pageView();
</script> -->

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
    font-size: 18px;
    font-weight: normal;
    text-align: left;   
    border-bottom: 1px solid #434340;
  }
/*  */
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

  .address-input {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  .address-input {
    margin-bottom: 5px;
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