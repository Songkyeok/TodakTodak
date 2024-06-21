<template>
    <main class="mt-3">

        <div class="container goods_add">
            <h2 class="text-center"  style="margin: 30px">제품 등록</h2>

            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품명 *</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" v-model="goods.goods_nm">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">카테고리 *</label>
                <div class="col-md-9 inputRadio">
                    <div class="form-radio">
                        <input class="form-radio-input" type="radio" v-model="cate_check" value="유아식기" id="cate1" checked>
                        <label class="form-radio-label" for="cate1">유아식기</label>
                    </div>
                    <div class="form-radio ms-4">
                        <input class="form-radio-input" type="radio" v-model="cate_check" value="욕실용품" id="cate2">
                        <label class="form-check-label" for="cate2">욕실용품</label>
                    </div>
                    <div class="form-check ms-1">
                        <input class="form-radio-input" type="radio" v-model="cate_check" value="외출용품" id="cate3">
                        <label class="form-check-label" for="cate3">외출용품</label>
                    </div>
                    <div class="form-check ms-1">
                        <input class="form-radio-input" type="radio" v-model="cate_check" value="유아용품" id="cate4">
                        <label class="form-check-label" for="cate4">유아용품</label>
                    </div>
                    <div class="form-check ms-1">
                        <input class="form-radio-input" type="radio" v-model="cate_check" value="위생용품" id="cate4">
                        <label class="form-check-label" for="cate5">위생용품</label>
                    </div>
                    <div class="form-check ms-1">
                        <input class="form-radio-input" type="radio" v-model="cate_check" value="장난감" id="cate4">
                        <label class="form-check-label" for="cate6">장난감</label>
                    </div>
                </div>
            </div>

            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 가격 *</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" v-model="goods.goods_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
            </div>


            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">재고 *</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" v-model="goods.goods_cnt">
                        <span class="input-group-text">개</span>
                    </div>
                </div>
            </div>

            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">메인 이미지 * </label>
                <div class="col-md-9">
                    <div class="row">
                    </div>
                    <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 0)"> <!-- type 0 메인-->
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
                <label class="col-md-3 col-form-label">설명 이미지 *</label>
                <div class="col-md-9">
                    <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 1)"> <!-- type 1 상세-->
                    <div class="alert alert-secondary" role="alert">
                        <ul>
                            <li>파일 사이즈 : 5M 이하</li>
                            <li>파일 확장자 : png, jpg만 가능</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <div class="mb-3 row">
            <div class="col-6 d-grid p-1">
                <button type="button" class="btn btn-lg btn-light" @click="goToList">취소하기</button>
            </div>
            <div class="col-6 d-grid p-1">
                <button type="button" class="btn btn-lg btn-danger" @click="goodsInsert">저장하기</button>
            </div>
        </div> 
    </main>
</template>
<script>
import axios from 'axios';

export default {	
  data() {
    return {
      goods : {
        goods_nm: "",
        goods_category: 1,
        goods_price: 1,
        goods_cnt: 100,

        goods_img: "",
        goods_content: "",
      },
      cate_check: "",
    };
  },
  methods: {
    async uploadFile(file, type){

      let name = "";

      if(file){
        name = file[0].name;
      }
      else{
        return;
      }
      const formData = new FormData();
      
      formData.append('img',file[0]);

      for (let key of formData.keys()){
        console.log(key, ":", formData.get(key));
      }
      try{
        axios({
          url: `http://localhost:3000/goods/upload_img`,
          method: 'POST',
          headers: {'Content-Type' : 'multipart/form-data'},
          data: formData
        })
        .then((res) => {
          if(res.data.message == 'success'){
            alert("이미지 등록 성공")
            if(type == 0){
              this.goods.goods_img = name;
            }
            else if(type == 1){
              this.goods.goods_content = name;
            }
          }
        })
        .catch(e => {
          console.log(e);
        })
        return true;
      }catch(err){
        console.log(err);
        return false;
      }

    },
    goodsInsert(){
      
        axios({
          url: "http://localhost:3000/goods/addGoods",
          method: "POST",
          data: {
            goods_nm: this.goods.goods_nm,
            goods_category: this.goods.goods_category,
            goods_price: this.goods.goods_price,
            goods_cnt: this.goods.goods_cnt,

            goods_img: this.goods.goods_img,
            goods_content: this.goods.goods_content,
          },
        })
        .then((res) => {
          if(res.data.message == 'success'){
            alert("완료")
              .then(() => {
              window.location.href = "http://localhost:8080/main";
              })
          }else if(res.data.message == '실패'){
            alert("sql 쿼리문 오류");
          }else{
            alert("제품 등록 실패")
          }
        })
        .catch(() => {
          alert("오류 발생");
        })
      
    },
    Check(){
      if (this.goods.goods_nm == ""){
                alert("제품명은 필수 입력값입니다.");
                return false;
            }
            if (this.cate_check == '욕실용품'){
                this.goods.goods_category = 2;
            }
            else if (this.cate_check == '외출용품'){
                this.goods.goods_category = 3;
            }
            else if (this.cate_check == '위생용품'){
                this.goods.goods_category = 4;
            }
            else if (this.cate_check == '장난감'){
                this.goods.goods_category = 5;
            }
            else if (this.cate_check == '이벤트'){
                this.goods.goods_category = 6;
            }
            if (this.goods.goods_price == "" || this.goods.goods_price == 0){
                alert("제품 가격을 입력하세요.");
                return false;
            }
            if (this.goods.goods_img == ""){
                alert("제품 메인 이미지를 등록해주세요.");
                return false;
            }
            if (this.goods.goods_content == ""){
                alert("제품 상세 이미지를 등록해주세요.");
                return false;
            }
            return true;
    },
    goToList(){
            alert({
                title: '제품 등록을 취소하겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            this.$router.push({path:'/'});
                        // 나중엔 제품 목록 리스트로 돌아가게 수정하기
                    } 
                })
        },
  }
 
}
</script>