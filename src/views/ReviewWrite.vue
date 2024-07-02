<template>
    <div>
        <h2 class="text-center">리뷰 등록</h2>
        <form @submit.prevent="submitReview">
            <div class="mb-3 row">
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
                <div class="mb-3 row">
                <label class="col-md-3 col-form-label">리뷰 내용</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" v-model="reviewContent">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">이미지 등록</label>
                <div class="col-md-9">
                    <input type="file" class="form-control" @change="handleFileUpload">
                </div>
            </div>
            <div class="text-center">
                <button type="submit" class="goToPreStep()">이전</button>
                <button type="submit" class="goToNextStep()">리뷰 등록</button>
            </div>
        </form>
    </div>
</template>

<script>
// import axios from "axios";

// export default {
//     data() {
//         return {
//             sortCase: '별점 선택',
//             isDropdownOpen: false,
//             sortOption: 0,
//             reviewContent: '',
//             reviewImage: null,
//             addReview: [],
//             goods_no: this.goods.goods_no,
//             user_no: this.user.user_no,
//         };
//     },

//     mounted() {
//         this.addReviews();
//     },

//     methods: {
//         // 별점 dropdown 버튼
//         toggleDropdown() {
//             this.isDropdownOpen = !this.isDropdownOpen;
//         },
//         sortList(sortNum) {
//             if (sortNum == 0) {
//                 this.sortCase = "5";
//             } else if (sortNum == 1) {
//                 this.sortCase = "4";
//             } else if (sortNum == 2) {
//                 this.sortCase = "3";
//             } else if (sortNum == 3) {
//                 this.sortCase = "2";
//             } else {
//                 this.sortCase = "1";
//             }
//             this.sortOption = sortNum;
//             this.isDropdownOpen = false; // 드롭다운 닫음
//         },
//         handleFileUpload(event) {
//             this.reviewImage = event.target.files[0];
//         },
//         submitReview() {
//             const formData = new FormData();
//             formData.append('rating', this.sortOption);
//             formData.append('content', this.reviewContent);
//             if (this.reviewImage) {
//                 formData.append('image', this.reviewImage);
//             }
//         },

//         addReviews() {
//             axios({
//                 url: `http://localhost:3000/review/addReview`,
//                 method: "POST",
//                 data: {
//                     goods_no: this.goods.goods_no,
//                     user_no: this.user.user_no,
//                 }
//             }).then((results) => {
//                 console.log(results);
//                 this.addReview = results.data;
//             }).catch((error) => {
//                 console.error(error);
//                 alert('리뷰 등록에 실패하였습니다.');
//             });
//         },

//         goToPreStep() {
//             window.location.href = '/mypage';
//         },

//         goToNextStep() {
//             if (this.addReview) {
//                 alert('리뷰가 성공적으로 등록되었습니다.');
//                 window.location.href = '/mypage';
//             }
//         },
//     }
// }
</script>

<style scoped>

</style>