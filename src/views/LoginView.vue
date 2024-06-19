<template>
    <div>
        <a id="custom-login-btn" @click="kakaoLogin()">
            <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="222">
        </a>
        <a @click="kakaoLogout()">로그아웃</a>

        <div id="naverIdLogin" @click="naverlogin" img src="../assets/naver.png"></div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            user_id: '',
            naver_id: '',
            user_pw: '',
            naverLogin: [],
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    mounted() {
        console.log("this.$store.state ===>>>", this.$store.state);
        this.naverLogin = new window.naver.LoginWithNaverId({
            clientId: "LQsxeMjDjQpARzFM3jwf",
            callbackUrl: "http://localhost:8080/auth",
            isPopup: false,
            loginButton: {
                color: "green", type: 3, height: 48,
            },
        });
        // this.$store.commit("naverLogin", this.naverLogin);

        this.naverLogin.init();

        this.naverLogin.getLoginStatus((status) => {
            if (status) {
                const id = this.naverLogin.user.id;
                const email = this.naverLogin.user.email;
                const name = this.naverLogin.user.name;

                console.log("this.naverLogin.user.id ====>>>", id);
                console.log("this.naverLogin.user.email ====>>>", email);
                console.log("this.naverLogin.user.name ====>>>", name);

            } else {
                console.log("callback처리 실패");
            }
        });
    },
    methods: {
        // 카카오 로그인
        kakaoLogin() {
            window.Kakao.Auth.login({
                scope: 'profile_nickname, account_email',
                success: this.getKakaoAccount
            })
        },
        getKakaoAccount() {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: res => {
                    const kakao_account = res.kakao_account
                    const nickname = kakao_account.profile.nickname
                    const email = kakao_account.email

                    console.log("nickname ===>>> ", nickname);
                    console.log("email ===>>> ", email);

                    axios({
                        url: "http://localhost:3000/auth/kakaoLogin",
                        method: "POST",
                        data: {
                            user_id: email,
                            user_nm: nickname
                        }
                    }).then(res => {
                        if(res.data.message == "저장완료") {
                            this.$swal({
                                position: 'top',
                                icon: 'success',
                                title: '회원 가입이 완료 되었습니다.',
                                showConfirmButton: false,
                                timer: 1000
                            });
                        } else {
                            this.$store.commit("user", {
                                user_id: email,
                                user_no: res.data.message
                            })
                            this.$swal({
                                position: 'top',
                                icon: 'success',
                                title: '로그인 하였습니다.',
                                showConfirmButton: false,
                                timer: 1000
                            }).then(() => {
                                window.location.href = "http://localhost:8080";
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                },
                fail: err => {
                    console.log(err);
                }
            })
        },
        kakaoLogout() {
            window.Kakao.Auth.logout(res => {
                console.log(res)
            })
        },
        naverlogin() {
            axios({
                url: "http://localhost:3000/auth/naverlogin",
                method: "POST",
                data: {
                    naverlogin: this.naverLogin.user,
                },
            }).then(res => {
                if (res.data.message == '저장완료') {
                    this.$swal({
                        position: 'top',
                        icon: 'success',
                        title: '네이버 회원 가입이 완료 되었습니다.',
                        showConfirmButton: false,
                        timer: 1000
                    });
                } else {
                    this.$store.commit("user", {
                        user_id: this.naverLogin.user.id,
                        user_email: this.naverLogin.user.email,
                        user_nm: this.naverLogin.user.name
                    })

                    this.$swal({
                        position: 'top',
                        icon: 'success',
                        title: '네이버 로그인 하였습니다.',
                        showConfirmButton: false,
                        timer: 1000,
                    }).then(() => {
                        window.location.href = "http://localhost:8080";
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
    }
}
</script>