<template>  
    <div v-if="goods">
        <div class="detail">
            <div class="img">
                <img :width="500"
                    :src="goods.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                    alt="상품 이미지"> 
            </div>
            <!-- <div class="info">
              <div class="header">
              <h2>{{categoryType(goods.goods_category)}}/{{goods.goods_nm}}</h2>
              <button v-if="user.user_no === ''" class="heart-button" @click="likeInsert">
                <i class="far fa-heart heart-icon"></i>
              </button>
              <h4>{{like}}</h4>
              </div>
            </div> -->
        </div>
    </div>
 

</template>

<script>
import axios from 'axios';

export default {	
    data() {
        return {
            goods: {},
        };
    },
    beforeCreate() {},
    created() {
        this.getGoods();
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {
        async getGoods() {
            try {
                const goodsno = this.$route.params.goodsno;
                const response = await axios.get(`http://localhost:3000/goods/goodsDetail/${goodsno}`);
                this.goods = response.data[0];
                console.log(this.goods);
            }catch(error){
                console.error(error);
            }
        }
    }
}
</script>