<template>
  <div class="about">
    <div class="titleArea">
      <h2>EVENT</h2>
    </div>
    <div id="mall_company">
      <ul class="mall-company" v-if="eventList.length>0">
        <li class="event_li" v-for="(event, i) in eventList" :key="i">
            <div class="event_cont">
                <div class="board_img">
                    <a href="#">
                        <img :src="require(`../../../TodakTodak_Backend/uploads/uploadGoods/${event.GOODS_IMG}`)" width="800" height="350" class="js_image_load">
                    </a>
                </div>
                <div class="event_info_cont">
                    <div class="board_tit">
                        <p class="subject">
                            <a href="#">
                                {{ event.GOODS_NM }}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {        
            eventList: []
        };
    },
    mounted() {
        this.getEventList()
    },
    methods: {
        getEventList() {
            axios({
                url: "http://localhost:3000/goods/getEventList",
                method: "GET"
            }).then(res => {
                this.eventList = res.data;
            })
        }
    }
}
</script>

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

  .event_li {
    border: 1px solid #ccc;
    margin-bottom: 40px;
  }
  .event_li .event_cont {
    display: table;
  }
  .event_li .board_img {
    overflow: hidden;
    display: table-cell;
    position: relative;
    width: auto;
    /* min-height: 200px; */
    text-align: center;
    border: 1px solid #ebebeb;
    vertical-align: middle;
  }
  .event_li .event_info_cont {
    display: inline-block;
    padding: 0 10px 0 50px;
    width: 740px;
    height: 350px;
    position: relative;
  }
  .event_li .board_tit{
    text-align: left;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: relative;
    z-index: 2;
  }
  .event_li .board_tit .subject {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.4px;
    color: black;
    font-size: 20px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
</style>