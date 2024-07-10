<!-- 처음 만든 것 -->
<template>
    <div class="new-review">
        <br />
        <h2 class="text-center">리뷰 작성</h2>
        <br />
        <br />
        <br />
        <form @submit.prevent="onSubmitReview">
            <!-- 사용자 이름 -->
            <div class="mb-3 row align-items-center">
                <label class="col-sm-2 col-form-label bold-label">작성자</label>
                <div class="col-sm-10 d-flex align-items-center">{{ this.user_nm }}</div>
            </div>
            <div class="mb-3 row align-items-center">
                <label class="col-sm-2 col-form-label bold-label">상품 만족도</label>
                <div class="col-sm-10 d-flex align-items-center">
                <div class="dropdown">
                    <button @click="toggleDropdown" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" style="border: none;">{{ sortCase }}</button>
                    <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(4)">★★★★★</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(3)">★★★★</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(2)">★★★</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(1)">★★</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(0)">★</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="reviewContent" class="col-sm-2 col-form-label bold-label">내용</label>
                <div class="col-sm-10">
                    <textarea id="reviewContent" class="form-control review-textarea" v-model="review.review_con" placeholder="내용을 입력해주세요"></textarea>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-2 col-form-label bold-label">이미지 등록</label>
                <div class="col-md-10">
                    <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 0)">
                </div>
                <div class="alert alert-secondary mt-2" role="alert">
                    <ul>
                        <li>파일 사이즈 : 5M 이하</li>
                        <li>파일 확장자 : png, jpg만 가능</li>
                    </ul>
                </div>
            </div>
            <div class="text-center">
                <button type="button" class="btn btn-secondary button-margin-right" @click="goToPreStep()">이전</button>
                <button type="submit" class="btn btn-primary custom-btn" @click="goToNextStep()">리뷰 등록</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {

    data() {
        return {
            sortCase: '점수 선택',
            isDropdownOpen: false,
            sortOption: 0,
            user_nm: {}, // 하나만 받으면 되므로
            review: {
                review_con: "",
                review_img: "",
                review_rating: 5,
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
    },

    mounted() {
        this.user_nm;
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
            const stars = ['★', '★★', '★★★', '★★★★', '★★★★★'];
            this.sortCase = stars[sortNum];
            this.review.review_rating = sortNum + 1;
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
                        goods_no: 7, // orderList 완성 후 변경필요
                        order_trade_no: 9, // orderList 완성 후 변경필요
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
            window.location.href = 'http://localhost:8080/mypage/review';
        },

        goToNextStep() {
            // window.location.href = 'http://localhost:8080/mypage/review';
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

.review-textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
}

.button-margin-right {
    margin-right: 30px;
}

.bold-label {
  font-weight: bold;
  font-size: 1.2em; /* 글씨 크기를 키우기 위해 1.2em으로 설정 (필요에 따라 조정 가능) */
}

.custom-btn {
    background-color: rgb(151, 235, 118);
    border-color: rgb(151, 235, 118);
    color: #222222;
}


</style>