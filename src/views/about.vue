<template>
  <div class="about">
    <div class="titleArea">
      <h2>ABOUT</h2>
    </div>
    <div id="mall_company">
      <ul class="mall-company">
        <li class="text">
          <h2 class="scroll-fade dj-viewport motion4">
            특별한 순간을 선물하는<br />
            토닥토닥
          </h2>
          <p class="scroll-fade dj-viewport motion1">
            아이가 태어나고 성장하는 일상을 탐구하고<br />
            우리 아이와 엄마에게 행복함을 선물하는<br />
            프리미엄 유아동 침구&amp;라이프스타일 브랜드입니다. <br /><br />
            아이들에게 달콤한 꿈을 선물하는 토닥토닥은<br />
            재미를 꿈꾸는 아이들의 좋은 친구입니다.
          </p>
        </li>

        <li class="img_zone scroll-fade"><img
            src="../assets/img/brand/about.jpg"
            alt="토닥토닥 브랜드 이미지" /></li>

        <li class="text">
          <p class="scroll-fade dj-viewport motion2">
            소중한 우리 아이를 위한 유아용품<br />
            토닥토닥에서 만나보세요.
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .about {
    position: relative;
    overflow: hidden;
    clear: both;
    margin: 80px 5% 20px;
  }
  .titleArea {
    min-height: 30px;
    padding: 0 0 34px;
    text-align: center;
    transition: all 0.5s;
    animation: dj-mov-left-right 2s 1;
    animation-timing-function: ease;
    animation-direction: normal;
  }
  .titleArea h2 {
    font-size: 26px;
    letter-spacing: 0.08em;
    font-weight: normal;
  }
  #mall_company {
    width: 100%;
    margin: 0 auto;
  }
  #mall_company .text {
    text-align: center;
    line-height: 1.4;
  }
  #mall_company .text h2 {
    font-size: 40px;
    letter-spacing: -0.05em;
    padding: 50px 0 0;
  }
  #mall_company .text p {
    line-height: 1.8;
    padding: 60px 0 50px;
    font-size: 20px;
    font-weight: 300;
    letter-spacing: -0.03em;
  }
  #mall_company .img_zone {
    text-align: center;
  }
  #mall_company .img_zone img {
    max-width: 100%;
    padding: 40px 0 40px;
  }
  #mall_company .text {
    text-align: center;
    line-height: 1.4;
  }
</style>