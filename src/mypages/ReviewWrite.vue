<!-- 처음 만든 것 -->
<template>
    <div class="new-review">
        <h2 class="text-center">리뷰 등록</h2>
        <br />
        <br />
        <br />
        <form @submit.prevent="onSubmitReview" class="form-container">
            <!-- 사용자 이름 -->
            {{ this.user_nm }}
            <div class="write-form">
                <label class="col-md-3 col-form-label">★별점★</label>
                <div class="dropdown">
                    <button @click="toggleDropdown" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" style="border: none;">{{ sortCase }}</button>
                    <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(0)">★★★★★</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(1)">★★★★</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(2)">★★★</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(3)">★★</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(4)">★</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="review-con mb-3 row">
                <label class="col-md-3 col-form-label">내용</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" v-model="review.review_con" placeholder="내용을 입력해주세요">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">이미지 등록</label>
                <div class="col-md-9">
                    <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 0)">
                </div>
                <div class="alert alert-secondary" role="alert">
                    <ul>
                        <li>파일 사이즈 : 5M 이하</li>
                        <li>파일 확장자 : png, jpg만 가능</li>
                    </ul>
                </div>
            </div>
            <div class="text-center">
                <button type="button" class="btn btn-secondary" @click="goToPreStep()">이전</button>
                <button type="submit" class="btn btn-primary" @click="goToNextStep()">리뷰 등록</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {

    data() {
        return {
            sortCase: '별점 선택',
            isDropdownOpen: false,
            sortOption: 0,
            user_nm: {}, // 하나만 받으면 되므로
            review: {
                review_con: "",
                review_img: "",
                review_rating: 0,
                user_no: "",
                goods_no: "",
                order_trade_no: ""
            },
            addReviews: [],
        };
    },

    computed: {
        user() {
            return this.$store.state.user;
        },

        // uniqueOrderList() {
        //     const uniqueOrders = [];
        //     const tradeNo = [];

        //     for (const order of this.orderList) {
        //         if (!tradeNo.includes(order.ORDER_TRADE_NO)) {
        //             uniqueOrders.push({
        //                 ORDER_TRADE_NO: order.ORDER_TRADE_NO,
        //                 items: [order],
        //             });
        //             tradeNo.push(order.ORDER_TRADE_NO);
        //         } else {
        //             const index = uniqueOrders.findIndex((o) => o.ORDER_TRADE_NO === order.ORDER_TRADE_NO);
        //             uniqueOrders[index].items.push(order);
        //         }
        //     }

        //     return uniqueOrders;
        // },
    },

    created() {
        this.getUser();
        this.getReGoods();
    },

    methods: {

        getReGoods() {
            const user_no = this.$store.state.user.user_no;
            axios ({
                url: 'http://localhost:3000/review/getReGoods',
                method: "POST",
                data: {
                    user_no: user_no, // 메소드 안에 있는 것을 가져다 사용했기 때문에 this를 빼도 됨
                }
            })
        },
        
        // 별점 dropdown 버튼
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        sortList(sortNum) {
            const stars = ['★★★★★', '★★★★', '★★★', '★★', '★'];
            this.sortCase = stars[sortNum];
            this.review.review_rating = sortNum;
            this.sortOption = sortNum + 1; // 별점은 1부터 5까지
            this.isDropdownOpen = false; // 드롭다운 닫음
        },

        uploadFile(file, type) {
            let name = "";

            if (file) {
                name = file[0].name;

            } else {
                return;
            }

            const formData = new FormData();
            formData.append('img', file[0]);

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }
            axios({
                url: `http://localhost:3000/review/upload_img`,
                method: "POST",
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            }).then ((results)=> {
                if (results.data.message === 'success') {
                    this.$swal("이미지 등록 성공");

                    if (type == 0) {
                        this.review.review_img = name;
                    } else if (type == 1) {
                        this.review.review_con = name;
                    }
                }
            }).catch((error) => {
                console.error(error);
            });

            return true;
        },
        
        onSubmitReview() {
            if(this.user.user_no === '') {
                alert('로그인 후 이용 가능합니다.');
                this.$router.push({ path: '/login' });
            } else {
                axios({
                    url: `http://localhost:3000/review/addReviews`,
                    method: "POST",
                    data: {
                        review_con: this.review.review_con,
                        review_img: this.review.review_img,
                        review_rating: this.review.review_rating,
                        user_no:  this.$store.state.user.user_no,
                        goods_no: 7,
                        order_trade_no: 9,
                    },
                }).then((results) => {
                    console.log('결과', results);
                    this.addReviews = results.data;
                    alert('리뷰가 성공적으로 등록되었습니다.');
                    // this.goToNextStep();

                }).catch((error) => {
                    console.error(error);
                    alert('리뷰 등록에 실패하였습니다.');
                    // window.location.href = 'http://localhost:8080/mypage/reviewwrite'
                })
            }
        },

        async getUser() {
            try {
                const user_no = this.$store.state.user.user_no; // user_no 가져오려면 이렇게 써야함. params가 아님
                console.log('user_no:', user_no);
                const response = await axios.get(`http://localhost:3000/review/getUser/${user_no}`); // 여기서 params로 보냇음
                
                this.user_nm = response.data[0].user_nm;
                console.log('response.data:', response.data[0].user_nm);

                if (response.data && response.data.length > 0) {
                    this.user_no = response.data[0].user_no;
                } else {
                    alert('로그인 상태가 아닙니다.');
                }
            } catch(error) {
                console.error('사용자 정보 가져오기 오류:', error);
            }
        },
        
        goToPreStep() {
            window.location.href = 'http://localhost:8080/mypage/review'; // 동작함
        },

        goToNextStep() {
            // alert('리뷰가 성공적으로 등록되었습니다.');
            // window.location.href = 'http://localhost:8080/mypage/review'; // 동작함
        }
    },    
};

</script>

<style scoped>
.new-review {
    width: 70%;
    display: inline-block;
    padding: 0 5%;
}
</style>