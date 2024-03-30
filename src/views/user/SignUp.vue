<template>
  <div class="signup-background">
    <div class="signup-container">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <h2>회원가입</h2>
        </div>
        <div class="form-group">
          <input type="email" class="form-control" id="email" v-model="signUpRequest.email" :disabled="true" placeholder="이메일 주소"/>
          <button type="button" @click="openEmailVerificationPopup" class="verification-btn">인증하기</button>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="nickname" v-model="signUpRequest.nickname"
            required
            pattern="^([a-zA-Zㄱ-ㅎ가-힣]{2,50})$"
            placeholder="닉네임"
          />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="password" v-model="signUpRequest.password"
            required
            placeholder="비밀번호"
          />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="newPassword" v-model="signUpRequest.newPassword" 
            required
            placeholder="비밀번호 재확인"
          />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="birth" v-model="formattedBirth" @input="formatInput" placeholder="생년월일 : YYYY / MM / DD">
        </div>
        <div class="signup-button-container">
          <button type="submit" class="signup-button">회원가입</button>
          <div class="signup-button-background"></div>
        </div>
      </form>
      <EmailVerificationPopup v-if="showEmailVerificationPopup" @close="closeEmailVerificationPopup" @verified="handleEmailVerified"/>
    </div>
  </div>
</template>

<script>
import EmailVerificationPopup from "../../components/EmailVerificationPopup.vue";

export default {
  data() {
    return {
      signUpRequest: {
        email: "",
        nickname: "",
        password: "",
        newPassword: "",
        birth: "",
      },
      showEmailVerificationPopup: false,
    };
  },
  components: {
    EmailVerificationPopup,
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
    // 생년월일
    formatInput() {
      // 사용자 입력을 YYYY/MM/DD 형식으로 변환
      let inputValue = this.formattedBirth.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
      if (inputValue.length > 4) {
        inputValue = inputValue.replace(/(\d{4})(\d{2})(\d{2})/, "$1/$2/$3");
      } else if (inputValue.length > 2) {
        inputValue = inputValue.replace(/(\d{4})(\d{2})/, "$1/$2");
      }
      this.formattedBirth = inputValue;
      this.signUpRequest.birth = inputValue; // 실제 데이터에 반영
    },
  },
};
</script>

<style src="../../assets/css/user/SignUp.css" lang="css"></style>
