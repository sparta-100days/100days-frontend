<template>
  <div class="email-verification-popup">
    <div class="popup-content" :style="{ height: popupHeight }">
      <h2 class="popup-title">이메일 인증</h2>
      <input
        type="email"
        v-model="emailInput"
        required
        placeholder="메일주소를 입력해주세요."
      />
      <button @click="sendVerificationCode">
        {{ isCodeSent ? "인증번호 재전송" : "인증 번호 보내기" }}
      </button>
      <!-- Timer and Error Message Display -->
      <div v-if="isCodeSent">
        <span class="timeer"
          >{{ Math.floor(timeLeft / 60) }}:{{
            ("0" + (timeLeft % 60)).slice(-2)
          }}</span
        >
        <span v-if="errorMessage" class="error-message">{{
          errorMessage
        }}</span>
      </div>
      <input
        type="text"
        v-model="verificationCodeInput"
        placeholder="인증번호를 입력해주세요."
      />
      <button @click="verifyCode">인증하기</button>
      <button @click="closePopup">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailInput: "",
      verificationCodeInput: "",
      isCodeSent: false,
      timer: null,
      timeLeft: 5 * 60, // 5 minutes in seconds
      errorMessage: "",
      popupHeight: "400px", // 초기 높이 설정
    };
  },
  methods: {
    sendVerificationCode() {
      this.isCodeSent = true;
      this.startTimer();
      // 이메일로 인증 코드 전송 로직을 구현하세요
      // 예: this.fakeSendVerificationCode();
      this.popupHeight = "460px"; // 인증번호 보내기 버튼을 눌렀을 때 높이 변경

      if (!this.emailInput.trim()) {
        this.errorMessage = "메일주소를 입력해주세요.";
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timeLeft = 5 * 60; // Reset timer to 5 minutes
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          clearInterval(this.timer);
          this.isCodeSent = false; // Reset
        }
      }, 1000);
    },
    verifyCode() {
      if (this.verificationCodeInput === "123456") {
        this.$emit("verified", this.emailInput);
        clearInterval(this.timer);
      } else {
        this.errorMessage = "인증 번호가 올바르지 않습니다.";
        setTimeout(() => {
          this.errorMessage = ""; // 일정 시간 후에 에러 메시지 초기화
        }, 5000); // 5초 후에 초기화 (5000ms)
      }
    },
    closePopup() {
      clearInterval(this.timer);
      this.$emit("close");
    },
  },
};
</script>

<style src="../assets/css/user/EmailVerification.css" lang="css"></style>
