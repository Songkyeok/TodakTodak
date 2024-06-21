<template>
    <main class="mt-3">
        <div class="container">
            <div class="row mb-2">
                <div class="col-12">
                </div>
            </div>
            <div class="list">
                <div class="col-xl-3 col-lg-4 col-md-6" :key="i" v-for="(product,i) in productList">
                    <div class="card" style="width: 18rem;">
                        <a @click="goTogoodsDetail(product.id);" style="cursor:pointer;">
                            <img :src="`/img/${product.id}/${product.path}`" class="card-img-top" alt="...">
                        </a>
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">장바구니 담기</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">주문하기</button>
                                </div>
                                <div class="text-dark text-size: 10px">상품가격 원</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            productList: []
        };
    },
    created() {
        this.getProductList();
    },
    methods: {
        async getProductList() {
            this.productList = await this.$api("/api/productList",{});
            console.log(this.productList);
        },
        goTogoodsDetail(product_id) {
            this.$router.push({ path:'/goodsDetail/:goodsno', query:{product_id:product_id}});
        }
    }
}
</script>