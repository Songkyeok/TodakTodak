<template>
  <div class="order-management">
    <div v-if="isVisibleGoods" class="goods-overlay">
      <div class="goods-popup">
        <div class="goods-popup_header">
          <div></div>
          <div>주문 상품 내역</div>
          <i class="fas fa-times popupCloseButton" @click="isVisibleGoods = false;"></i>
        </div>
        <div class="goods-popup_content">
          <table class="admin_goods-table" style="width: auto; margin-top:10px;">
            <thead>
              <tr>
                <th style="width: 110px;">상품번호</th>
                <th style="width: 200px;">상품이름</th>
                <th style="width: 110px;">수량</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(goods, i) in DetailList" :key="i">
                <td>{{goods.goods_no}}</td>
                <td>{{goods.goods_nm}}</td>
                <td>{{goods.order_goods_cnt}}</td>
              </tr>
            </tbody>
          </table>
          <div class="goods-popup_content_footer">
          </div>
        </div>
      </div>
    </div>
    <h1>주문관리</h1>
    <table>
      <thead v-if="selectOrder.length > 0">
        <tr class="orderlist-title">
          <th class="order-number">주문번호</th>
          <th class="user-name">고객명</th>
          <th class="user-address">주소</th> 
          <th class="user-phone">번호</th>
          <th class="user-email">결제상태</th>
          <th class="user-email">배송상태</th>
        </tr>
      </thead>
      <thead v-if="selectOrder.length == 0">
        <br>
        <p>주문이 없습니다.</p>
      </thead>
        <tbody>
        <tr class="order-list" v-for="(order, i) in pageSelectOrder" :key="i">
            <!-- 반복문이고 selectUser를 배열로 받아왔으므로 [i]를 넣어야 됨 -->
             <!-- 아래 값에서 selectUser[i]와 v-for에서 user의 값이 동일함. 그래서 바꿔서 사용해도 됨 -->
              <th class="order-number value" @click="getOrderDetail(order.order_trade_no), isVisibleGoods=true">{{ order.order_trade_no }}</th>
              <th class="order-name value">{{ order.order_nm }}</th>
              <th class="order-address value">{{ order.order_zipcode }}<br>{{ order.order_adr1 }}  {{ order.order_adr2 }}</th>
              <th class="order-phone value">{{ order.order_phone }}</th>
              <th class="order-status value">{{ getStatus(order.order_status) }}</th>
              <th><button type="button" :class="{ order_delivery_btn: getStatus(order.order_status)==='배송중', order_complete_btn:getStatus(order.order_status)==='배송완료', order_cancel_btn:getStatus(order.order_status)==='주문취소', order_payment_btn:getStatus(order.order_status)==='결제완료' }" @click="updateStatus(order.order_trade_no)">{{ getStatus(order.order_status) }}</button></th>
              <th><button type="button" class="order-delete-btn" @click="goToDelete(order.order_trade_no)">삭제</button></th>
        </tr>
        <br />
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li v-for="i in pageCnt" :key="i" class="page-item">
          <a href="#" class="page-link" :class="{ active: i === pageNum + 1 }" @click.prevent="setPage(i)">{{ i }}</a>
        </li> 
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectOrder: [],
      deleteUser: [],
      
      // 페이징
      pageSelectOrder: [], // 한 페이지에 보여줄 유저리스트를 잘라 담을 새 리스트
      pageNum: 0,
      pageCnt: 0,
      onePageCnt: 10,
      isVisibleGoods: false,
      DetailList: [],
    };
  },

  mounted() {
    this.AllSelectOrder();
    this.getStatus();
  },

  methods: {
    AllSelectOrder() {
      axios({
        url: `http://localhost:3000/admin/orderList`,
        method: "POST",
      }).then((results) => {
        this.selectOrder = results.data;
        console.log('orderList>>>>>>>>>>>>>>>',this.selectOrder)
        this.pageCnt = Math.ceil(this.selectOrder.length / this.onePageCnt)
        this.setPage(1)
      });
    },

    setPage(page) {
      this.pageNum = page - 1;
      this.sliceList();
    },
    
    sliceList() {
      const start = 0 + this.pageNum * this.onePageCnt;
      this.pageSelectOrder = this.selectOrder.slice(start, start + this.onePageCnt);
    },

    goToDelete(order_no) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
            url: `http://localhost:3000/admin/deleteOrder`,
            method: "POST",
            data:{
                order_trade_no : order_no, // user_no가 primarykey 설정이 되어있으니 user_no만 보내주면 됨
            }        
        }).then((results) => {
            if(results.data.message === '주문 정보 삭제 완료'){
              alert('주문 삭제가 완료 되었습니다.')
              window.location.reload();
            }
        })
            
      }
    },
    getStatus(status){
        if(status == 0){
            return "결제완료";
        }else if(status == 1){
            return "배송중"
        }else if(status == 2){
            return "배송완료"
        }else if(status == 3){
            return "주문취소"
        }
    },
    updateStatus(trade_no){
        let status;
        this.$swal({
            title: "결제 상태를 변경하겠습니다.",
            showCancelButton: true,
            showDenyButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            cancelButtonText: '주문취소',
            denyButtonText: '배송완료',
            confirmButtonText: '배송중',
            
        }).then((results) => {
            if(results.isConfirmed){
                console.log('배송');
                status = 1;
            }else if(results.isDenied){
                console.log('배송완료');
                status = 2;
            } else if (results.dismiss === this.$swal.DismissReason.close) {
                // X 버튼을 눌렀을 때 아무 동작도 하지 않습니다.
                window.location.reload();
            } else if (results.dismiss === this.$swal.DismissReason.cancel) {
                console.log('주문취소');
                status = 3;
            }
            axios({
                url: `http://localhost:3000/admin/updateStatus`,
                method: "POST",
                data: {
                    order_trade_no : trade_no,
                    order_status : status,
                }
            })
        window.location.reload();
        })
        
    },
    getOrderDetail(trade_no){
      axios({
        url: `http://localhost:3000/admin/getOrderDetail`,
        method: "POST",
        data: {
          order_trade_no : trade_no,
        }
      }).then((results) => {
        this.DetailList = results.data;
        console.log(this.DetailList)
      })
    },
  },
};
</script>

<style scoped>
.order-management {
    /* border-bottom: 1px solid #222222;
    margin-top: 20px;
    text-align: left;
    padding-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px; */
    width: 80%;
    min-width: 80%;
    margin-top: 100px;
    padding: 0 10% 0 5%;
    display: inline-block;
    vertical-align: top;
    overflow-x: auto;
    flex-wrap: nowrap;
    box-sizing: border-box;
}

.order-management h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 30px;
}

.orderlist-title {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: large;
    color: #999696;
    text-align: center;
    background-color: #f8f7f7;

}

.order-number {
    width: 162px;
    padding: 20px;
    align-items: center;
    cursor: pointer;

}
.order-number:hover {
  color:white;
  background: rgba(102,177,241,0.8);
  transition: all 0.5s ease;
}

.order-name {
    width: 108px;
}

.order-address {
    width: 216px;
}

.order-status {
    width: 162px;
}

.order-phone {
    width: 162px;
}

.order-list {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: small;
    color: #5d5b5b;
    text-align: center;
    font-weight: 50px;
}

.order-delete-btn {
    border: none;
    width: 80px;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 5px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}

.order_delivery_btn {
    border: none;
    width: 80px;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 5px;
    background-color: skyblue;
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}

.order_complete_btn {
    border: none;
    width: 80px;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 5px;
    background-color: salmon;
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}

.order_cancel_btn {
    border: none;
    width: 80px;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 5px;
    background-color: gray;
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}

.order_payment_btn {
  border: none;
  width: 80px;
  border: solid 2px rgb(151, 235, 118);
  border-radius: 5px;
  background-color: sandybrown;
  color: rgb(0, 0, 0);
  padding: 7px 0;
  font-weight: 600;
}

.goods-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.goods-popup {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  border-radius: 12px;

  padding: 20px;
  /* visibility: collapse; */
  flex-direction: column;
}

.goods-popup_header {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  justify-content: space-between;
}

.popupCloseButton {
  cursor: pointer;
}

.goods-popup_content {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-size : 15px;
  font-weight: 1000;
}

.goods-popup_content_header {
  width: 100%;
  margin-bottom: 10px;
}
.admin_goods-table tr th{
  border: 1px solid black;
}

.admin_goods-table td {
  border: 1px solid black;
}

.admin_goods-table {
  border: 1px solid black;
  text-align: center;
  
}

.goods-popup_content_input {
  width: 100%;
  flex-grow: 1;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
}

.goods-popup_content_footer {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.goods-popup_content_ok {
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 12px;
  display: flex;
  width: 70px;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}



</style>
