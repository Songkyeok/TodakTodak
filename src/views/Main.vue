<template>
    <div>
        <div id="MainSlider">
            <splide :options="options">
                <splide-slide>
                    <img class="slider-image" src="../assets/banner1.png" alt="main1" />
                </splide-slide>
                <splide-slide>
                    <img class="slider-image" src="../assets/banner2.png" alt="main1" />
                </splide-slide>
                <splide-slide>
                    <img class="slider-image" src="../assets/banner3.png" alt="main2" />
                </splide-slide>
            </splide>
        </div>
        <hr>
        <div class="d-flex justify-content-left">
            <div class="content cate-list">
                <h2 class="home_title">BEST SELLER</h2>
                <!-- <div class="card" v-for="(goods, index) in filteredGoodsList(1),slice(0,4)" :key="index">
                </div> -->
            </div>
        </div>
        <hr>
    </div>
</template>
<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';


export default {	
    name:'MainSlider',
    components:{
        Splide,
        SplideSlide,
    },
    data() {
        return {
            goodsList: [],
            options: {
                type: 'fade',
                rewind: true,
                speed: 800,
                interval: 3000,
                perPage: 1,
                autoplay: true,
                wheel: true,
                wheelSleep: 500,
            }
        };
    },
    methods: {
        filteredGoodsList(category){
            return this.goodsList.filter((goods) => goods.GOODS_CATEGORY === category);
        }
    }
}
</script>

<style scoped>
.hr{
    width: 100%;
    height: 10px;
    border: 3px solid black;
}
.slider-image {
    width: 50%;
    height: 300px;
    object-fit: cover;
}

.home_title{
    font-size: 30px;
    font-weight: bold ;
}

</style>