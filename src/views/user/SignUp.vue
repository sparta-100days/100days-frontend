<template>
  <div class="signup-container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">이메일 주소</label>
        <input type="email" class="form-control" id="email" v-model="signUpRequest.email"
               :disabled="true" placeholder="example@email.com">
        <button type="button" @click="openEmailVerificationPopup" class="verification-btn">인증하기</button>
      </div>
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input type="text" class="form-control" id="nickname" v-model="signUpRequest.nickname"
               required pattern="^([a-zA-Zㄱ-ㅎ가-힣]{2,50})$"  placeholder="영문 또는 한글로 이루어진 2~50자 사이">
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" class="form-control" id="password" v-model="signUpRequest.password"
               required placeholder="8~16자의 영문 대소문자, 숫자, 특수문자">
      </div>
      <div class="form-group">
        <label for="newPassword">비밀번호 재확인</label>
        <input type="password" class="form-control" id="newPassword" v-model="signUpRequest.newPassword" required>
      </div>
      <div class="form-group">
        <label for="birth">생년월일</label>
        <input type="date" class="form-control" id="birth" v-model="signUpRequest.birth">
      </div>
      <button type="submit" class="btn btn-primary">회원가입</button>
    </form>
    <EmailVerificationPopup v-if="showEmailVerificationPopup" @close="closeEmailVerificationPopup" @verified="handleEmailVerified"/>
  </div>
</template>

<script>
import EmailVerificationPopup from "../../components/EmailVerificationPopup.vue"; // Adjust the path as necessary

export default {
  data() {
    return {
      signUpRequest: {
        email: '',
        nickname: '',
        password: '',
        newPassword: '',
        birth: ''
      },
      showEmailVerificationPopup: false,
    };
  },
  components: {
    EmailVerificationPopup
  },
  methods: {
    openEmailVerificationPopup() {
      this.showEmailVerificationPopup = true;
    },
    closeEmailVerificationPopup() {
      this.showEmailVerificationPopup = false;
    },
    handleEmailVerified(email) {
      this.signUpRequest.email = email;
      this.showEmailVerificationPopup = false;
    },
    submitForm() {
      console.log(this.signUpRequest);
      // 회원가입 요청 로직 구현
    },
  },
};

</script>

<style src="../../assets/css/user/SignUp.css" lang="css"></style>