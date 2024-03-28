<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="loginRequest.email" required placeholder="example@email.com">
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="loginRequest.password" required placeholder="8~16자의 영문, 숫자, 특수문자">
      </div>
      <button type="submit" class="login-button">로그인</button>
      <button type="button" @click="goToSignUp" class="signup-button">회원가입</button>
      <a href="#" class="forgot-password" @click.prevent="openPasswordResetPopup">비밀번호 찾기</a>
    </form>
    <PasswordResetPopup v-if="showPasswordResetPopup" @close="closePasswordResetPopup"/>
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

