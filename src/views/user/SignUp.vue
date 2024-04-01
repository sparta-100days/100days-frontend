<template>
  <div class="signup-background">
    <div class="signup-container">
      <div class="form-group">
        <h2>회원가입</h2>
      </div>
      <form @submit.prevent="submitSignUp">
        <div class="form-group">
          <input type="email" class="form-control" id="email" v-model="signUpRequest.email" :disabled="true" required placeholder="이메일 주소"/>
          <button type="button" @click="openEmailVerificationPopup" class="verification-btn">인증하기</button>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="nickname" v-model="signUpRequest.nickname" required pattern="^([a-zA-Zㄱ-ㅎ가-힣]{2,50})$" placeholder="닉네임"/>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="accountId" v-model="signUpRequest.accountId" required placeholder="회원 ID : 공백일 경우 랜덤하게 발급됩니다."/>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="password" v-model="signUpRequest.password" required placeholder="비밀번호"/>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="newPassword" v-model="signUpRequest.newPassword" required placeholder="비밀번호 재확인"/>
        </div>
        <div class="form-group">
          <input type="date" class="form-control" id="birth" v-model="signUpRequest.birth" required>
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
import { apiClient } from "@/index.js";
import EmailVerificationPopup from "../../components/user/EmailVerificationPopup.vue";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      signUpRequest: {
        email: "",
        nickname: "",
        accountId: "",
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
    async submitSignUp() {
      console.log(this.signUpRequest);
      try {
        await apiClient.post("/api/users/signup", {
          email: this.signUpRequest.email,
          nickname: this.signUpRequest.nickname,
          accountId: this.signUpRequest.accountId,
          password: this.signUpRequest.password,
          newPassword: this.signUpRequest.newPassword,
          birth: this.signUpRequest.birth,
        });

        await Swal.fire({
          icon: "success",
          title: "회원가입에 성공했습니다.",
          text: "가입해 주셔서 감사합니다!",
          confirmButtonText: "확인",
          confirmButtonColor: "#007bff",
        });
        await this.$router.push("/");
      } catch (error) {
        console.log(error.response.data);
      }
    },
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
  },
};
</script>

<style src="../../assets/css/user/SignUp.css" lang="css"></style>
