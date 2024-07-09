<!-- 아름 참고용이므로 무시해도 되는 파일입니다. ReviewWrite.vue가 찐입니다. -->
<template>
    <div class="review-form">
      <h2>리뷰작성</h2>
      <form @submit.prevent="submitReview">
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
        <div class="form-group">
          <label>내용</label>
          <input type="text" v-model="review_con" required />
        </div>
        <div class="form-group">
          <label>이미지</label>
          <input type="file" @change="handleFileUpload" accept="image/png, image/jpeg" />
          <p>파일 사이즈 : 5M 이하</p>
          <p>파일 확장자 : png, jpg만 가능</p>
        </div>
        <div class="form-buttons">
          <button type="button" @click="goBack">이전버튼</button>
          <button type="submit">리뷰등록버튼</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        review_con: '',
        review_img: null,
        sortCase: '별점 선택',
        isDropdownOpen: false,
        sortOption: 0,
      };
    },
    methods: {

    toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
    sortList(sortNum) {
        const stars = ['★★★★★', '★★★★', '★★★', '★★', '★'];
        this.sortCase = stars[sortNum];
        this.sortOption = sortNum + 1; // 별점은 1부터 5까지
        this.isDropdownOpen = false; // 드롭다운 닫음
    },

    handleFileUpload(event) {
        this.review_img = event.target.files[0];
      },
    submitReview() {
        if (!this.review_con) {
          this.$swal("내용을 입력해주세요.");
          return;
        }
  
        const formData = new FormData();
        formData.append('review_con', this.review_con);
        formData.append('review_rating', this.review_rating);
        formData.append('user_no', this.user_no);
        formData.append('goods_no', this.goods_no);
        formData.append('order_trade_no', this.order_trade_no);
        if (this.review_img) {
          formData.append('review_img', this.review_img);
        }
  
        axios.post('http://localhost:3000/review/addReview', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          this.$swal("리뷰가 성공적으로 등록되었습니다.");
          setTimeout(() => {
            this.$router.push({ path: '/mypage/review' });
          }, 2000);
        }).catch(error => {
          console.error(error);
          this.$swal("리뷰 등록에 실패하였습니다.");
        });
      },
      goBack() {
        this.$router.push({ path: '/mypage/review' }); // 이전 페이지 경로 설정
      }
    }
  };
  </script>
  
  <style scoped>
  .review-form {
    width: 70%;
    margin: 0 auto;
    text-align: center;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  .form-group input[type="text"],
  .form-group input[type="file"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  .form-buttons {
    display: flex;
    justify-content: space-between;
  }
  </style>
  

  <!-- 네번째 ㅎ -->
<!-- <template>
    <div class="container">
        <h2 class="text-center">리뷰 작성</h2>
        <div class="star-rating">
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
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">내용</label>
                     <div class="col-md-9 row">
                        <input type="text" v-model="review.review_con" class="form" placeholder="내용을 입력해주세요">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">이미지</label>
                    <div class="col-md-9">
                        <div class="row">
                        </div>
                        <input type="file" class="form-control-img" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 0)">
                        <div class="alert alert-secondary" role="alert">
                            <ul>
                                <li>이미지 사이즈 : 700*700</li>
                                <li>파일 사이즈 : 1M 이하</li>
                                <li>파일 확장자 : png, jpg만 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-sm btn-dark" @click="goToPre()">취소</button>
                    </div>
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-sm btn-danger" @click="goToNext()">리뷰 저장</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            review: {
                review_con: "",
            }
        }
    },

    computed: {
        user() {
            return this.$store.state.user; // 로그인 여부 확인
        }
    },

    mounted() {
        if(this.user.user_id == undefined) { // 로그인 상태 체크
            alert("로그인 후 작성할 수 있습니다.");
            window.location.href = 'http://localhost:8080/login';
        }
    },

    methods: {
        goToPre() {
            this.$router.push({ path: '/mypage/review' });
        },

        goToNext() {
            if(this.review.review_con == "") {
                alert('리뷰 내용을 입력해주세요');
                return;
            } else {
                axios({
                    url: "http://localhost:3000/review/newReview",
                    method: "POST",
                    data: {
                        reveiw_con: this.review_con,
                    }
                }).then(data => {
                    alert('리뷰가 등록되었습니다.');
                    window.location.href = '/mypage/review';
                })
            }

        }
    }

}
</script> -->



<!-- 다시 만들어 봄 -->

<!-- <template>
    <div @submit.prevent="onSubmitReview" class="form-container">
        <form class="write-form">
            <div class="ALL">
                <label class="top" style="font-size: 40px; font-style: bold;">리뷰 작성</label>
                <div class="star-rating">
                    <label for="star" class="form-labet">★별점★</label>
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
                <div class="form-group">
                    <label for="write_content" class="form-label">내용</label>
                    <textarea v-model="review_con" class="form" placeholder="내용을 입력해주세요."></textarea>
                </div>
                <button type="button" class="btn btn-secondary" @click="goToPreStep()">이전</button>
                <button type="submit" class="btn btn-submit" @click="goToNextStep()">리뷰 등록</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            review_con: '',
        }
    },
    
    computed: {
        user() {
            return this.$store.state.user; // 로그인 확인
        }
    },

    mounted() {
        if (this.user.user_id == '') {
            // 로그인 상태 체크
            this.$swal("로그인 후 작성 가능합니다.");
            this.$router.push({ path: '/login' });
        }
    },

    methods: {
        // 별점 dropdown 버튼
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        sortList(sortNum) {
            const stars = ['★★★★★', '★★★★', '★★★', '★★', '★'];
            this.sortCase = stars[sortNum];
            this.sortOption = sortNum + 1; // 별점은 1부터 5까지
            this.isDropdownOpen = false; // 드롭다운 닫음
        },
        
        onSubmitReview() {
            axios.post("http://localhost:3000/review/addReviews", {
                user_no: this.user.user_no,
                review_con: this.review_con
            }).then (response => {
                console.log(response.data);
                this.$swal("작성 완료");
            }).catch(error => {
                console.log(error);
            });
            this.$router.push('/mypage/review');
        },

        goToPreStep() {
            window.location.href = 'http://localhost:8080/mypage/review';
        },

        goToNextStep() {
            window.location.href = 'http://localhost:8080/mypage/review';
        }
    }


}
</script>

<style scoped>
.form-container {
    width: 70%;
    display: inline-block;
    padding: 0 5%;
}



.form-input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
}

</style> -->


<!-- 세번째 시도 -->

<!-- <template>
    <div @submit.prevent="onSubmitReview" class="form-container">
        <form class="write-form">
            <div class="ALL">
                <label class="top" style="font-size: 40px; font-style: bold;">리뷰 작성</label>
                <div class="star-rating">
                    <label for="star" class="form-labet">★별점★</label>
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
        <td v-if="order.items[0].REVIEW_CHECK === 0 && order.items[0].ORDER_STATUS === 3">
                        <button @click="handleReview(order.items[0])" class="rebtn">리뷰 작성</button>
                    </td>
                    
                    <div class="wrapper" v-if="showModal === true">
                        <div class="review_container">
                            <h3>리뷰 작성</h3>
                            <div class="star-rating">
                                <div class="star" v-for="index in 5" :key="index" @click="check(index)">
                                    <span v-if="index < review_rating + 1"><i class="fa fa-star"></i></span>
                                    <span v-if="index >= review_rating + 1"><i class="fa fa-star-o"></i></span>
                                </div>
                                <span style="padding-left: 5px;">({{ review_rating }})</span>
                            </div>
                            <div class="review-area">
                                <div class="img_form">
                                    <div class="img_box">
                                        <label for="input-file" v-if="review_img">
                                            <img class="img_preview"
                                                :src="require(`../../../TodakTodak_Backend/uploads/uploadReviews/${review_img}`)"
                                                alt="...">
                                        </label>
                                    </div>
                                    <input type="file" id="input-file" class="fomr-control" accept="image/png, image/jpeg"
                                    @change="uploadFile($event.target.files)" style="display: none;">
                                </div>
                                <textarea placeholder="내용을 입력하세요." v-model="review_con" class="review_content"></textarea>
                            </div>
                            <div class="btn_area">
                                <button class="rebtn" @click="submitReview">작성</button>
                                <button @click="closeModal()" class="modal-exit-btn rebtn">닫기</button>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
            </form>
            </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            loginUser: {},
            orderList: [],
            showModal: false,
            review_con: '',
            review_img: '',
            review_rating: 5,
        };
    },

    computed: {
        user() {
            return this.$store.state.user;
        },

        uniqueOrderList() {
            const uniqueOrders = [];
            const tradeNos = [];

            for (const order of this.orderList) {
                if (!tradeNos.includes(order.ORDER_TRADE_NO)) {
                    uniqueOrders.push({
                        ORDER_TRADE_NO: order.ORDER_TRADE_NO,
                        items: [order],
                    });
                    tradeNos.push(order.ORDER_TRADE_NO);
                } else {
                    const index = uniqueOrders.findIndex((o) => o.ORDER_TRADE_NO === order.ORDER_TRADE_NO);
                    uniqueOrders[index].items.push(order);
                }
            }
            return uniqueOrders;
        },
    },

    created() {
        this.getUser();
        this.getOrderList();
    },

    methods: {
        check(index) { // 리뷰 별점 체크
            this.review_rating = index;
        },
        async uploadFile(file) {
            let name = "";
            let pastname = this.review_img;

            if (file) {
                name = file[0].name;
            } else {
                return; // 파일 미선택 시 반환
            }

            const formData = new FomrData();
            fomrData.append('img', file[0]);

            try {
                axios({
                    url: `http://localhost:3000/goods/upload_img`,
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                })
                .then((res) => {
                    if (res.data.message == 'success') {
                        this.review_img = name;
                        axios({
                            url: `http://localhost:3000/goods/delete_img`,
                            method: 'POST',
                            data: {
                                pastname: pastname
                            }
                        })
                    } else {
                        this.$swal("DB 에러");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        async getUser() {
            try {
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                this.loginUser = response.data[0];
            } catch (error) {
                console.error(error);
            }
        },

        async getOrderList() {
            try {
                const response = await axios.get(`http://localhost:3000/goods/orderlist/${this.user.user_no}`);
                this.orderList = response.data;
            } catch (error) {
                console.error(error);
            }
        },

        handleReview(order) {
            if (!order.ORDER_STATUS === 3) {
                this.$swal("배송완료 후에 리뷰를 작성할 수 있습니다.");
            } else {
                this.showModal = true;
                this.orderT = order;
            }
        },

        closeModal() {
            this.showModal = false; // 모달 닫기
            axios({
                url: `http://localhost:3000/goods/delete`,
                method: 'POST',
                data: {
                    pastname: this.review_img
                }
            })
            this.review_con = '';
            this.review_img = '';
            this.review_rating = 5;
        },

        submitReview() {
            axios.post("http://localhost:3000/review/addReivews", {
                content: this.review_con,
                user_no: this.user.user_no,
                goods_no: this.orderT.GOODS_NO,
                order_no: this.orderT.ORDER_TRADE_NO,
                order_status: this.orderT.ORDER_STATUS,
                review_img: this.review_img,
                review_rating: this.review_rating
            })
            .then((res) => {
                if (res.data.message == 'review_complete')
                this.$swal("리뷰 작성 완료");
            })
            .catch(error => {
                this.$swal("에러 발생: ", error);
            });
            this.showModal = false;
            window.location.href = `http://localhost:8080/mypage/review`;
        }
    },
};
</script> -->