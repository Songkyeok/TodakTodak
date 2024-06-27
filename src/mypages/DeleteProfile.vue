<template>
    <MypageSidebar />

    <div class="delete_profile_container">
        <div class="content">
            <div class="mypage_cont">
                <form id="formHackOut" name="formHackOut" action="../mypage/my_page_ps.php" method="post"
                    novalidate="novalidate">
                    <div class="hack_out">
                        <div class="mypage_zone_tit">
                            <h2>회원탈퇴</h2>
                        </div>
                        <div class="mypage_unregister">
                            <div class="mypage_zone_tit">
                                <h3>회원탈퇴 안내</h3>
                            </div>
                            <div class="unregister_info">
                                TodakTodak.com 탈퇴안내<br>
                                <br>
                                회원님께서 회원 탈퇴를 원하신다니 저희 쇼핑몰의 서비스가 많이 부족하고 미흡했던 것 같습니다. <br>
                                불편하셨던 점이나 불만사항을 알려주시면 적극 반영해서 고객님의 불편함을 해결해 드리도록 노력하겠습니다.<br>
                                <br>
                                ■ 아울러 회원 탈퇴시의 아래 사항을 숙지하시기 바랍니다.<br><br/>
                                1. 회원 탈퇴 시 회원님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서의 소비자 보호에 관한 법률에 의거한 <br>
                                고객정보 보호정책에 따라 관리됩니다.<br>
                                2. 탈퇴 시 회원님께서 보유하셨던 쿠폰 및 적립금은 삭제되며 재가입 시 복원되지 않습니다.<br>
                                3. 상품 등에 올린 리뷰 및 댓글은 탈퇴 시 자동 삭제되지 않고 그대로 남아 있습니다.<br>
                                &nbsp;&nbsp;&nbsp; - 삭제를 원하는 게시글이 있다면, 반드시 탈퇴 전 비공개 처리하거나 삭제하시기 바랍니다.<br>
                                &nbsp;&nbsp;&nbsp; - 탈퇴 후에는 회원정보가 삭제되어 본인 여부를 확인할 수 있는 방법이 없어, 게시글을 임의로 삭제해드릴 수 없습니다.<br>
                                4. 탈퇴 후에는 사용 중인 아이디로 다시 가입할 수 없으며 아이디와 데이터는 복구할 수 없습니다.<br>
                            </div>
                            <div class="form_element" id="">
                                <input type="checkbox" id="agreeBox" v-model="isChecked">
                                <label class="check on" for="agreeBox">
                                    <em> 안내 사항을 모두 확인하였으며, 이에 동의합니다.</em>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="btn_center_box">
                        <button type="button" @click="goToPrev" class="btn_claim_cancel btn_prev"><em>이전으로</em></button>
                        <button type="button" @click="deleteProfile" class="btn_claim_ok"><em>탈퇴</em></button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>
<script>
    import MypageSidebar from "../layouts/MypageSidebar.vue";
    import axios from "axios";

    export default {
        data() {
            return {
                isChecked: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        components: {
            MypageSidebar
        },
        methods: {
            goToPrev() {
                this.$router.go(-1);
            },
            deleteProfile() {
                const user_no = this.$store.state.user.user_no;

                if(this.isChecked) {
                    if(confirm("탈퇴 시 보유 중인 회원혜택은 모두 삭제됩니다. 정말로 탈퇴하시겠습니까?")) {
                        console.log("yes")
                        axios({
                            url: "http://localhost:3000/profile/deleteProfile",
                            method: "POST",
                            data: {
                                user_no: user_no
                            }
                        }).then(res => {
                            if(res.message = "success") {
                                alert("탈퇴가 정상적으로 처리되었습니다.");
                                this.$store.commit("user", {});
                                this.$router.push({ path: '/' }).then(() => {
                                    window.location.reload();
                                })
                                
                            }
                        })
                    } else {
                        console.log("no");
                    }
                } else {
                    alert("탈퇴 안내를 확인하고 약관에 동의해 주세요.")
                }
            },
        }
    }
</script>
<style scoped>
    .delete_profile_container {
        width: 1080px;
        margin-top: 100px;
        padding: 0 0 0 10%;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 50px;
    }

    .mypage_zone_tit {
        margin: 0 0 50px 0;
        padding: 0 0 10px 0;
        font-size: 14px;
        border-bottom: 1px solid #999999;
    }

    .mypage_unregister .mypage_zone_tit {
        margin: 0;
        padding: 0 0 10px 0;
        font-size: 14px;
        border-bottom: none 0;
    }

    .mypage_unregister .mypage_zone_tit {
        margin: 0;
        padding: 0 0 10px 0;
        font-size: 14px;
        border-bottom: none 0;
    }

    .mypage_zone_tit h3 {
        display: inline-block;
        font-size: 16px;
    }

    .mypage_unregister .unregister_info {
        margin: 0 0 40px 0;
        padding: 15px 15px 15px 15px;
        color: #717171;
        border: 1px solid #dadada;
    }

    .mypage_unregister .mypage_zone_tit {
        margin: 0;
        padding: 0 0 10px 0;
        font-size: 14px;
        border-bottom: none 0;
    }

    .mypage_table_type table {
        width: 100%;
        border: 0;
        border-spacing: 0;
        border-collapse: collapse;
        text-align: center;
    }

    .mypage_table_type .table_left {
        border-top: 1px solid #999999;
    }

    .mypage_table_type .table_left th {
        padding: 15px 10px 14px 20px;
        border-top: none 0;
        background: #f7f7f7;
        text-align: left;
    }

    .mypage_table_type .table_left td {
        height: 31px;
        padding: 12px 10px 11px 15px;
        text-align: left;
        color: #777777;
        border-bottom: 1px solid #dbdbdb;
    }

    .form_element {
        display: inline-block;
        overflow: hidden;
        position: relative;
    }

    .mypage_unregister .hack_out_list li {
        float: left;
        width: 35%;
        padding: 0 0 7px 0;
    }

    /* .form_element input {
        position: absolute;
        top: 3px;
        left: 1px;
        width: 0;
        z-index: -1;
        visibility: hidden;
    } */

    input[type="checkbox"] {
        /* width: 13px; */
        height: 13px;
        vertical-align: top;
    }

    .btn_center_box {
        text-align: center;
    }

    .btn_claim_cancel {
        display: inline-block;
        min-width: 80px;
        height: 42px;
        padding: 0 10px 0 10px;
        line-height: 40px;
        color: #3e3d3c;
        font-size: 14px;
        border: 1px solid #cccccc;
        background: #ffffff;
        text-align: center;
        border: 1px solid #333;
        color: #333;
        margin-right: 10px;
    }

    .btn_claim_ok {
        min-width: 100px;
        height: 44px;
        padding: 0 10px 0 10px;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        vertical-align: top;
        border: 1px solid #333;
        background: #333;
        color: #ffffff;
    }
    .agreeBox {
        margin-top: 50px;
    }
    .form_element {
        margin-bottom: 40px;
    }
    .form_element input {
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;
    }
    .form_element label {
        vertical-align: middle;
        cursor: pointer;
    }
</style>