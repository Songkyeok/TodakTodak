<template>
  <div class="user-management">
    <h1>회원관리</h1>
    <br />
    <br />
    <table>
      <thead v-if="userList.length > 0">
        <tr class="userlist-title">
          <th class="user-number">회원번호</th>
          <th class="user-name">회원이름</th>
          <th class="user-address">주소</th>
          <th class="user-email">이메일</th>
          <th class="user-phone">번호</th>
          <th class="user-point">포인트</th>
          <th class="user-delete">삭제</th>
        </tr>
        <tr class="user-list" v-for="(user, i) in userList" :key="i">
            <!-- 반복문이고 userList를 배열로 받아왔으므로 [i]를 넣어야 됨 -->
              <th class="user-number value">{{ userList[i].user_no }}</th>
              <th class="user-name value">{{ userList[i].user_nm }}</th>
              <th class="user-address value">{{ userList[i].user_zipcode }} {{ userList[i].user_adr1 }} {{ userList[i].user_adr2 }}</th>
              <th class="user-email value">{{ userList[i].user_email }}</th>
              <th class="user-phone value">{{ userList[i].user_phone }}</th>
              <th class="user-point value">{{ userList[i].user_point }}포인트</th>
              <th class="user-delete-btn"><button type="button" class="btn-user-del btn=sm" @click="goToDelete(userList[i].user_no)">삭제</button></th>
        </tr>
        <br />
      </thead>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userList: [],
      userDelete: [],
    };
  },

  mounted() {
    this.selectUser();
  },

  methods: {
    selectUser() {
      axios({
        url: `http://localhost:3000/admin/userList`,
        method: "POST",
      }).then((results) => {
        console.log(results);
        this.userList = results.data;
      });
    },

    goToDelete(user_n) {
        axios({
            url: `http://localhost:3000/admin/userDelete`,
            method: "POST",
            data:{
                user_no: user_n, // user_no가 primarykey 설정이 되어있으니 user_no만 보내주면 됨
            }        
        }).then((results) => {
            if (confirm('정말 삭제하시겠습니까?')) {
                console.log(results);
            this.userDelete = results.data;
            window.location.href = `http://localhost:8080/userlist`;
            } else {
                window.location.href = `http://localhost:8080/userlist`;
            }
        });
    }
  },
};
</script>

<style scoped>
.user-management h1 {
    border-bottom: 1px solid #222222;
    margin-top: 20px;
    text-align: left;
    padding-bottom: 10px;
}

.userlist-title {
    border-bottom: 1px solid #d4cdcd;
    padding-bottom: 20px;
    font-size: large;
    color: #999696;
}

.user-number {
    width: 10%;
    padding-left: 10px;
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



</style>
