<template>
  <div class="password-reset-popup">
    <div class="popup-content">
      <h2>비밀번호 찾기</h2>
      <input type="email" v-model="email" placeholder="이메일 주소 입력" required>
      <button @click="submitEmail">확인</button>
      <button @click="closePopup">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submitEmail() {
      // 이메일 로직
      alert("비밀번호 재설정 이메일을 보냈습니다." + this.email);
      this.closePopup();
    },
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style src="../assets/css/PasswordReset.css" lang="css"></style>
