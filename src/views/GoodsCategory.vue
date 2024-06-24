<!-- 삭제할 예정인 파일입니다 참고해주세요 -->
<!-- 삭제할 예정인 파일입니다 참고해주세요 -->
<!-- 삭제할 예정인 파일입니다 참고해주세요 -->
<!-- 삭제할 예정인 파일입니다 참고해주세요 -->
<!-- 삭제할 예정인 파일입니다 참고해주세요 -->
<!-- 삭제할 예정인 파일입니다 참고해주세요 -->

<template>
  <div>
    <div class="content cate-list">
      <h2 class="home_title">유아식기</h2>
      <div v-if="tableGoodsList.length > 0">
        <div class="tablecatelist" v-for="(goods, i) in tableGoodsList" :key="i">
          <div class="img">
            <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
              <img class="img" :src="goods.goods_img ? require(`'/Users/areumAREUM/Downloads/TodakTodak/vscode/node-back/TodakToack_Backend/uploads/uploadGoods/${goods.goods_img}'`) : '/goodsempty.jpg'"
                            alt="상품 이미지">
              <!-- <img :src="`/img/${product.id}/${product.path}`" class="card-img-top" alt="..."> -->
            </a>
            <a @click="goToDetail()"></a>
          </div>
          <div class="name">{{ goods.goods_nm }}</div>
          <div class="span">{{ getCurrencyFormat(goods.goods_price) }}</div>
        </div>
      </div>
      <h2 class="home_title">욕실용품</h2>
      <div v-if="bathGoodsList.length > 0">
        <div class="bathcatelist" v-for="(goods, i) in bathGoodsList" :key="i">
          <div class="img">
            <a :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
              <img class="img" :src="goods.goods_img ? require(`'/Users/areumAREUM/Downloads/TodakTodak/vscode/node-back/TodakToack_Backend/uploads/uploadGoods/${goods.goods_img}'`) : '/goodsempty.jpg'"
                            alt="상품 이미지">
              <!-- <img :src="`/img/${product.id}/${product.path}`" class="card-img-top" alt="..."> -->
            </a>
            <a @click="goToDetail()"></a>
          </div>
          <div class="name">{{ goods.goods_nm }}</div>
          <div class="span">{{ getCurrencyFormat(goods.goods_price) }}</div>
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
      categories: [
        { id: 1, name: "유아식기" },
        { id: 2, name: "욕실용품" },
        { id: 3, name: "외출용품" },
        { id: 4, name: "유아용품" },
        { id: 5, name: "위생용품" },
        { id: 6, name: "장난감" },
      ],
      goods: [],
    };
  },
  methods: {
    fetchGoods(categoryId) {
      axios
        .get(`http://localhost:3000/goods/categories/${categoryId}/goods`)
        .then((response) => {
          this.goods = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
