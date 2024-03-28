<template>
  <div class="login-background">
    <div class="login-container">
      <h2>로그인</h2>
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="email"></label>
          <input type="email" id="email" v-model="loginRequest.email" required placeholder="example@email.com">
        </div>
        <div class="form-group">
          <label for="password"></label>
          <input type="password" id="password" v-model="loginRequest.password" required placeholder="8~16자의 영문, 숫자, 특수문자">
        </div>
        <div class="login-button-container">
          <button type="submit" class="login-button"><p class="login-text">Login</p></button>
        </div>
        <div class="forgot-password">
          <a href="#" class="forgot-password-link" @click.prevent="openPasswordResetPopup">비밀번호 찾기</a>
          <span class="separator">|</span>
          <a href="#" class="email-find-link">이메일 찾기</a>
        </div>
        <div class="social-login-buttons">
          <button class="google-login-button"><img src="@/assets/img/GOOGLE.png" class="google" alt="Google Logo"></button>
          <button class="kakao-login-button"><img src="@/assets/img/KAKAO.png" class="kakao" alt="Kakao Logo"></button>
        </div>
      </form>
      <PasswordResetPopup v-if="showPasswordResetPopup" @close="closePasswordResetPopup"/>
    </div>
  </div>
</template>

<script>
import PasswordResetPopup from "../../components/PasswordResetPopup.vue";
import {apiClient} from "../index.js"

export default {
  data() {
    return {
      loginRequest: {
        email: "",
        password: "",
      },
      showPasswordResetPopup: false,
    };
  },
  components: {
    PasswordResetPopup,
  },
  methods: {
    async submitLogin() {
      // 로그인 요청 로직을 여기에 구현
      const response = await apiClient.post(
        "/api/users/login",
        { email: this.loginRequest.email, password: this.loginRequest.password }
      );
      console.log("로그인 요청: ", response.data.accessToken);
      localStorage.setItem("AccessToken", response.data.accessToken);
      console.log("토큰: ", localStorage.getItem("AccessToken"));
      this.$router.push("/")
    },
    goToSignUp() {
      // 회원가입 페이지로 이동하는 로직을 여기에 구현합니다.
      this.$router.push("/signup");
    },
    closePasswordResetPopup() {
      this.showPasswordResetPopup = false;
    },
    openPasswordResetPopup() {
      this.showPasswordResetPopup = true;
    },
  },
};
</script>

<style src="../../assets/css/Login.css" lang="css"></style>