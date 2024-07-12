<template>

  <div class="user-management">
    <h1>회원관리</h1>
    <br />
    <br />
    <table>
      <thead v-if="selectUser.length > 0">
        <tr class="userlist-title">
          <th class="user-number">회원번호</th>
          <th class="user-name">회원이름</th>
          <th class="user-address">주소</th> 
          <th class="user-email">이메일</th>
          <th class="user-phone">번호</th>
          <th class="user-point">포인트</th>
          <th class="user-delete">삭제</th>
        </tr>
        </thead>
        <tbody>
        <tr class="user-list" v-for="(user, i) in pageSelectUser" :key="i">
            <!-- 반복문이고 selectUser를 배열로 받아왔으므로 [i]를 넣어야 됨 -->
             <!-- 아래 값에서 selectUser[i]와 v-for에서 user의 값이 동일함. 그래서 바꿔서 사용해도 됨 -->
              <th class="user-number value">{{ user.user_no }}</th>
              <th class="user-name value">{{ user.user_nm }}</th>
              <th class="user-address value">{{ user.user_zipcode }} {{ user.user_adr1 }}<br>{{ user.user_adr2 }}</th>
              <th class="user-email value">{{ user.user_email }}</th>
              <th class="user-phone value">{{ user.user_phone }}</th>
              <th class="user-point value">{{ user.user_point }}포인트</th>
              <th><button type="button" class="user-delete-btn" @click="goToDelete(user.user_no)">삭제</button></th>
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
import AdminpageSidebar from "../layouts/AdminpageSidebar.vue";

export default {
  components: {
    AdminpageSidebar
  },

  data() {
    return {
      selectUser: [],
      deleteUser: [],
      
      // 페이징
      pageSelectUser: [], // 한 페이지에 보여줄 유저리스트를 잘라 담을 새 리스트
      pageNum: 0,
      pageCnt: 0,
      onePageCnt: 10,
    };
  },

  mounted() {
    this.AllSelectUser();
  },

  methods: {
    AllSelectUser() {
      axios({
        url: `http://localhost:3000/admin/selectUser`,
        method: "POST",
      }).then((results) => {
        // console.log(results);
        this.selectUser = results.data;
        this.pageCnt = Math.ceil(this.selectUser.length / this.onePageCnt)
        this.setPage(1)
      });
    },

    setPage(page) {
      this.pageNum = page - 1;
      this.sliceList();
    },
    
    sliceList() {
      const start = 0 + this.pageNum * this.onePageCnt;
      this.pageSelectUser = this.selectUser.slice(start, start + this.onePageCnt);
    },

    goToDelete(user_n) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
            url: `http://localhost:3000/admin/deleteUser`,
            method: "POST",
            data:{
                user_no: user_n, // user_no가 primarykey 설정이 되어있으니 user_no만 보내주면 됨
            }        
        }).then((results) => {
            console.log(results);
            this.deleteUser = results.data;
            this.AllSelectUser(); // 유저 삭제 후 목록을 갱신
            window.location.href = `http://localhost:8080/admin/userlist`;
            })
            .catch((error) => {
              console.error('error');
            });
        } else {
          window.location.href = `http://localhost:8080/admin/userlist`;
        }
    },
  },
};
</script>

<style scoped>
.user-management {
    /* border-bottom: 1px solid #222222;
    margin-top: 20px;
    text-align: left;
    padding-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px; */
    width: 80%;
    margin-top: 100px;
    padding: 0 10% 0 5%;
    display: inline-block;
    vertical-align: top;
}

.user-management h1 {
  text-align: left;
  border-bottom: 1px solid #d4cdcd;
  padding-bottom: 10px;
}

.userlist-title {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: large;
    color: #999696;
    text-align: center;
}

.user-number {
    width: 12%;
    padding: 38px;
    align-items: center;
}

.user-name {
    width: 10%;
}

.user-address {
    width: 20%;
}

.user-email {
    width: 15%;
}

.user-phone {
    width: 15%;
}

.user-point {
    width: 10%;
}

.user-list {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: small;
    color: #5d5b5b;
    text-align: center;
    font-weight: 50px;
}

.user-delete-btn {
    border: none;
    width: 25%;
    border: solid 2px rgb(151, 235, 118);
    border-radius: 5px;
    background-color: rgb(151, 235, 118);
    color: rgb(0, 0, 0);
    padding: 7px 0;
    font-weight: 600;
}


</style>
