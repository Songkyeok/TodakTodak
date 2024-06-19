<template>
    <div>
        <a id="custom-login-btn" @click="kakaoLogin()">
            <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="222">
        </a>
    </div>
    <div>
        <a @click="kakaoLogout()">로그아웃</a>
    </div>
</template>
<script>
import axios from 'axios';
export default {
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
        }
    }
}
</script>