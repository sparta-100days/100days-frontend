<template>
  <div class="myinfo-profile-container">
    <div class="myinfo-profile-black-box">
      <div class="myinfo-profile-title"><h2>회원정보수정</h2></div>
      <!-- 이메일 입력 폼 -->
      <div class="form-item">
        <input type="text" id="email" name="email" :value="user.email" readonly>
      </div>
      <!-- 닉네임 입력 폼 -->
      <div class="form-item">
        <input type="text" id="nickname" name="nickname" :value="user.nickname">
      </div>
      <!-- 회원 ID 입력 폼 -->
      <div class="form-item">
        <input type="text" id="userId" name="userId" :value="user.userId">
      </div>
      <!-- 생일 입력 폼 -->
      <div class="form-item">
        <input type="text" id="birthday" name="birthday" :value="user.birthday">
      </div>
      <!-- 비밀번호 입력 폼 -->
      <div class="form-item">
        <input type="password" id="password" name="password" :value="user.password">
      </div>
      <button class="password-change-button">비밀번호변경</button>
      <!-- 회원정보저장 버튼 -->
      <button class="save-button">회원정보저장</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "user@example.com",
        nickname: "사용자",
        userId: "@" + "idrandom12312",
        birthday: "1990-01-01",
        password: "********", // 비밀번호는 가려진 상태로 초기화
      },
    };
  },
};
</script>

<style src="../../assets/css/user/Profile.css" lang="css"></style>