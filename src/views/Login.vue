<template>
    <main class="mt-5">
        <div class="login-form">
            <div class="logo">
                <img src='../assets/logo.png'>
            </div>
            <div>
                <input type="id" @keyup.enter="login()" class="form-control" placeholder="아이디" v-model="user_id" />
                <label for="floatingInput"></label>
            </div>

            <div>
                <input type="password" @keyup.enter="login()" class="form-control" placeholder="비밀번호" v-model="user_pw" />
                <label for="floatingPassword"></label>
            </div>

            <div>
                <button type="button" class="btn" @click="login">로그인</button>
            </div>



            <div class="find" @click="goToFind">아이디 / 비밀번호 찾기</div>
        </div>
    </main>
</template>