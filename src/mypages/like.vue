<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div>
                    <h2>나의 찜 목록</h2>
                </div>
                <div class="my">
                    <div class="table-responsive">
                        <table class="table" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>상품이미지</th>
                                    <th>상품명</th>
                                    <th>상품금액</th>
                                    <th>장바구니</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(like, i) in likeList" :key="i">
                                    <td>
                                        <img :width="100" style="border-radius: 10px;"
                                            :src="like.goods_img ? require(`../../../TodakTodak_Backend/uploads/uploadGoods/${like.goods_img}`) : '/goodsempty.jpg'"
                                            alt="상품 이미지">
                                    </td>
                                    <td>{{ like.goods_nm }}</td>
                                    <td>{{ formatPrice(like.goods_price) }} </td>
                                    <td><button class="btn" @click="addToCart(like)">장바구니</button></td>
                                    <td><button class="btn2" @click="likeDelete(like.goods_no)">삭제</button></td>
                                </tr>
                                <tr v-if="likeList.length === 0">
                                    <td colspan="5" style=" padding: 150px 0px;">찜 목록 내역이 없습니다.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
  
<script>
import axios from 'axios';

export default {
    // el: "#app",

    data() {
        return {
            likeList: [],
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    created() {
        this.getLikeList();
    },
    mounted() {
        this.getLikeList();
    },
    methods: { 
        async getLikeList() {
            try {
                const response = await axios.post(`http://localhost:3000/profile/likeList/${this.user.user_no}`);
                this.likeList = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        formatPrice(price) {
            if (price !== undefined) {
                const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return `${formattedPrice} 원`;
            }
            return "";
        },   
        async addToCart(like) {
            this.likeL = like;
            axios({
                url: "http://localhost:3000/goods/basketInsert",
                method: "POST",
                data: {
                    user_no: this.user.user_no,
                    basket_price: this.likeL.goods_price,
                    basket_nm: this.likeL.goods_nm,
                    basket_img: this.likeL.goods_img,
                    basket_cnt: 1,
                    goods_no: this.likeL.goods_no,
                },
            })
                .then(res => {
                    if (res.data.message == '이미 담겨 있는 상품입니다.') {
                        this.$swal("이미 장바구니에 담긴 상품입니다")
                    }
                    else {
                        this.$swal({
                                title: '상품이 장바구니에 담겼습니다.',
                                showDenyButton: true,
                                confirmButtonText: '장바구니로 이동',
                                denyButtonText: `계속 쇼핑하기`,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.href="http://localhost:8080/basket"
                                } else if (result.isDenied) {
                                    location.reload();
                                }
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        likeDelete(goods_no) {
            axios({
                url: 'http://localhost:3000/goods/likeDelete',
                method: 'POST',
                data: {
                    goods_no: goods_no,
                    user_no: this.user.user_no
                }
            })
            .then(res => {
                if (res.data.message === '좋아요 삭제') {
                    this.$swal('상품이 삭제되었습니다.');
                    this.getLikeList(); // 삭제 후 목록 다시 불러오기
                } else {
                    console.warn('404:', res.data);
                }
            })
            .catch((error) => {
                console.error("삭제 메소드 오류:", error);
                this.$swal('오류 발생');
            });
        },
    },
};
</script>


<style scoped>
a.imgSpace {
    color: inherit;
    text-decoration: none;
}

* {
    margin: 0;
    padding: 0;
}

ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
}

.container {
    margin: 40px 30px;
    font-family: unset;
}

h2 {
    margin: 20px 0;
}

.myinfo {
    margin-top: 30px;
    /* background-color: #fff2c9; */
}

.my .table {
    text-align: center;
    padding-right: 40px;
}

.my .table th {
    text-align: center;
    padding: 20px 0;
    /* border: 1px solid red; */
}

.my p {
    width: 100px;
    font-size: 1rem;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    margin: 0px 30px 16px 0px;
    /* border: 1px solid red; */
}

.my .detail {
    display: flex;
}


/* --------------------------------------------------------------------------------------------------------------- */


@media screen and (max-width: 768px) {

    .TopBar {
        display: inline-block;
        align-items: center;
        height: 300px;
        width: 100%;
        padding: 0px;
        background-color: #ffffff;
        border: none;
    }

    /* ------------------------------------------------------barcat */


    .myinfo {
        position: relative;
        top: -60px;
    }

}

.btn {
    margin-top: 8px;
}

.btn {
    width: 70px;
    padding: 4px;
    border-radius: 6px;
    color: #ffffff;
    border: 1px solid #b4b4b4;
    background-color: #b4b4b4;
    font-family: GmarketSansMedium;
    cursor: pointer;
}

.btn2 {
    width: 50px;
    padding: 4px;
    border-radius: 6px;
    color: #ffffff;
    border: 1px solid #000000;
    background-color: #000000;
    font-family: GmarketSansMedium;
    cursor: pointer;

}

.my .table {
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 10px;
}

img {
    border-radius: 10%;
    background-color: #eeeeee;
}
</style>