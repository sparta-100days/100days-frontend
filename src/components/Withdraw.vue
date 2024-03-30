<template>
  <div class="myinfo-withdraw-container">
    <div class="myinfo-withdraw-black-box">
      <div class="myinfo-title"><h2>회원탈퇴</h2></div>
      <div class="withdraw-info-container">
        <p>탈퇴 후 개인정보는 7일간 보관한 뒤 삭제됩니다.<br/>
          그 전에 다시 로그인하시면 정상이용 가능합니다.
        </p>
      </div>
      <div class="form-item">
        <input type="text" id="password" name="password" :value="user.password">
      </div>
      <button class="withdraw-button">회원탈퇴</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        password: "1234",
      },
    };
  },
};
</script>

<style src="../assets/css/user/Withdraw.css" lang="css"></style>