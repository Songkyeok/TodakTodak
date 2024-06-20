<template>
    <div>
        <div class="content cate-list">
            <div class="cate-header">
                <mark><span>"{{ keyword }}" 검색 결과</span></mark>
                <p class="h6"> 총 <strong>{{ goodsList.length }}</strong> 개</p>
            </div>
            <hr>
            <div class="s1" v-for="(row, rowIndex) in rowList" :key="rowIndex" style="height: 230px;">
                <div class="card" style="width: 230px; height: 360px; border:none; margin: 0 1%"
                    v-for="(goods, index) in row" :key="index">
                    <a class="imgSpace" :href="'http://localhost:8080/goodsDetail/' + goods.goods_no">
                        <img :width="230"
                            :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                            alt="상품 이미지">
                    </a>
                    <div class="card-body" style="padding: 1px;">
                        <p class="card-text align-left goods-nm" @click="goToDetail(goods.goods_no)"> {{ goods.goods_nm }}
                        </p>
                        <p class="card-text align-left goods-price"> {{ formatPrice(goods.goods_price) }} </p>
                    </div>
                </div>
            </div>

            <div v-if="goodsList.length == 0" class="s1">
                <h1><img src="../assets/img_notReady.png" alt="..." style="text-align: center"></h1>
            </div>
            <nav aria-label="Page">
                <ul class="pagination justify-content-center">
                    <ul v-for="i in pageCnt" :key="i" class="pagination justify-content-center">
                        <a href="#top" style="text-decoration: none;">
                            <li v-if="i != pageNum + 1" class="page-item page-link page_btn" @click="setPage(i)">{{ i }}
                            </li>
                            <li v-else class="page-item page-link bg-secondary page_btn btn_active" @click="setPage(i)">{{ i
                            }}</li>
                        </a>
                    </ul>
                </ul>
            </nav>
        </div>
    </div>
</template>
  
  
<script>

export default {
    data() {
        return {
            goodsList: [],
            rowList: [],
            isResultShow: true,
            keyword: this.$route.query.keyword,
            pageGoodsList: [],
            pageNum: 0,
            pageCnt: 0,
            onePageCnt: 12,
        };
    },
    created() {
        this.getGoodsList(0);
    },
    methods: {
        setPage(page) {
            this.pageGoodsList = []
            this.pageNum = page - 1;
            this.sliceList()
        },
        sliceList() {
            const start = 0 + this.pageNum * this.onePageCnt
            this.pageGoodsList = this.goodsList.slice(start, start + this.onePageCnt);
            this.arrangeRows();
        },
        goToDetail(goodsno) {
            window.location.href = `http://localhost:8080/goodsDetail/${goodsno}`;
        },
        arrangeRows() {
            this.rowList = [];
            const rowSize = 4;
            let row = [];

            this.pageGoodsList.forEach((goods, index) => {
                row.push(goods);
                if ((index + 1) % rowSize === 0 || index === this.pageGoodsList.length - 1) {
                    this.rowList.push(row);
                    row = [];
                }
            });
        },
        formatPrice(price) {
            const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return `${formattedPrice} 원`;
        },
    },
    watch: {
        '$route'() {
            // this.getGoodsList();
        },
        goodsList: {
            immediate: true,
            handler() {
                this.arrangeRows();
            }
        }
    }

};
</script>

<style scoped>

.page_btn {
    border-radius: 100px;
    color: #b68824;
    border: none;
}

.btn_active {
    color: white;
    background-color: #b68824;
}


.cate-list {
    font-family: unset;
}

.goods-nm {
    font-size: 14px;
    color: gray;
    font-weight: bold;
}

.goods-nm:hover {
    color: black;
    cursor: pointer;
}

.goods-price {
    font-size: 13px;
}

.cate-header {
    display: flex;
    justify-content: space-between;
}

.cate-header mark {
    height: 36px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    color: black;
    background-color: #ffffff;
}

.cate-header .h6 {
    font-size: 14px;
    margin: auto;
}

/* 이미지 확대 */
.imgSpace {
    max-width: 230px;
    max-height: 230px;
    min-width: 100px;
    min-height: 100px;
    overflow: hidden;
    padding: auto;
    border-radius: 15%;
    background-color: #eeeeee;
}

a img {
    margin: auto;
    width: 100%;
    height: 100%;

}

a:hover img {
    transform: scale(1.12);
    transition: all 0.1s linear;
}

a:not(:hover) img {
    transform: scale(1.0);
    transition: all 0.1s linear;
}

/* ----------------------------- */

.card-text {
    margin: 3px;
    margin-top: 5px;
}

.card-text.align-left {
    text-align: left;
}

.card {
    flex-direction: column;
    flex-wrap: wrap;
}

.s1 {
    display: flex;
    margin-bottom: 150px;
}

.content {
    max-width: 1040px;
    width: 80%;
    margin: auto;
    padding-top: 30px;

}

@media screen and (max-width: 768px) {

    img {
        width: auto;
        height: 200px;
        /* object-fit: contain; 이미지 비율 */
    }
}
</style>


