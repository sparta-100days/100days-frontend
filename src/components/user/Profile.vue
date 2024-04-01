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
        <!-- 비밀번호 변경 버튼을 클릭하면 openPasswordChangeMyInfoPopup 메서드를 호출하여 팝업을 엽니다. -->
        <button type="button" @click="openPasswordChangeMyInfoPopup" class="password-change-button">비밀번호변경</button>
      <PasswordChangeMyInfoPopup v-if="showPasswordChangeMyInfoPopup" @close="closePasswordChangeMyInfoPopup" @verified="handlePasswordChangeMyInfoPopup"/>
        <!-- 회원정보저장 버튼 -->
      <button type="button" class="save-button">회원정보저장</button>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index";
import PasswordChangeMyInfoPopup from  "../../components/user/PasswordChangeMyInfoPopup.vue"

export default {
  data() {
    return {
      userPasswordRequest: {
        password: "",
        newPassword: "",
      },
      user: {
        email: "user@example.com",
        nickname: "사용자",
        userId: "@" + "idrandom12312",
        birthday: "1990-01-01",
        password: "********", // 비밀번호는 가려진 상태로 초기화
      },
      showPasswordChangeMyInfoPopup: false, // 비밀번호 변경 팝업 표시 여부
    };
  },
  components: {
    PasswordChangeMyInfoPopup, // 비밀번호 변경 팝업 컴포넌트 등록
  },
  methods: {
    openPasswordChangeMyInfoPopup() {
      this.showPasswordChangeMyInfoPopup = true; // 비밀번호 변경 팝업 표시
    },
    closePasswordChangeMyInfoPopup() {
      this.showPasswordChangeMyInfoPopup = false; // 비밀번호 변경 팝업 닫기
    },
    handlePasswordChangeMyInfoPopup() {
      this.userPasswordRequest.password = "";
      this.showPasswordChangeMyInfoPopup = false;
    },
    submitPassword() {
      // 비밀번호 변경 처리 로직
      apiClient.post('/api/change-password', { password: this.password, newPassword: this.newPassword })
        .then(response => {
          console.log('비밀번호 변경 성공');
          this.closePasswordChangeMyInfoPopup(); // 성공 시 팝업 닫기
        })
        .catch(error => {
          console.error('비밀번호 변경 실패:', error);
        });
    },
  },
};
</script>

<style src="../../assets/css/user/Profile.css" lang="css"></style>