<template>
    <footer class="form">
        <div class="f_add">
            <p>&copy; 2024</p>
            <p>회사소개 | 개인정보처리방침 | 이용약관 | 사업자정보<br>
            대표자 | TodakTodak | 사업자등록번호 | 123-12-12345<br>주소 서울특별시 종로구 종로 78 미려빌딩 이젠아카데미컴퓨터학원<br>
            팩스 | 02-123-1234 | 이메일 | todaktodak@todak.com</p>
        </div>
    </footer>
</template>

<script>
export default ({
    name: 'Footer'
})
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
  
.form{
    margin: 0;
    padding: 0;
    left: 0;   
    bottom: 0;
    list-style: none;
    text-decoration: none;
}
    .f_add{
        position: relative;
        height: auto;
        width: 100%;
        left: 0;       
        bottom: 0; 
        padding: 10px;
        background: #f2f2f2;
    }

    p{
        margin-left: 20px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(173, 173, 173);
    }
</style>