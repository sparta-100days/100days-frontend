<template>
  <div class="email-verification-popup">
    <div class="email-verification-popup-content" :style="{ height: verificationPopupHeight }">
      <h2 class="email-verification-popup-title">이메일 인증</h2>
      <input type="email" v-model="EmailRequest.email" required placeholder="메일주소를 입력해주세요.">
      <button @click="sendVerificationCode">
        {{ isCodeSent ? "인증번호 재전송" : "인증 번호 보내기" }}
      </button>
      <!-- Timer and Error Message Display -->
      <div v-if="isCodeSent">
        <span class="timeer">{{ Math.floor(timeLeft / 60) }}:{{ ('0' + (timeLeft % 60)).slice(-2) }}</span>
        <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
      </div>
      <input type="text" v-model="code" placeholder="인증번호를 입력해주세요.">
      <button @click="verifyCode">인증하기</button>
      <button @click="closePopup">닫기</button>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      EmailRequest: {
        email: "", // 초기화 수정
      },
      code: "",
      isCodeSent: false,
      timer: null,
      timeLeft: 5 * 60, // 5 minutes in seconds
      errorMessage: "",
      verificationPopupHeight: "400px", // 초기 높이 설정
    };
  },
  methods: {
    async sendVerificationCode() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.EmailRequest.email.trim())) {
        // 이메일 주소가 유효하지 않은 경우
        await Swal.fire({
          icon: "error",
          title: "다시 확인해주세요.",
          text: `올바른 메일 주소가 아닙니다.`,
          confirmButtonText: "확인",
          confirmButtonColor: "#007bff",
        });
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
        return;
      }
      this.isCodeSent = true;
      this.verificationPopupHeight = "460px"; // 인증번호 보내기 버튼을 눌렀을 때 높이 변경
      try {
        const response = await apiClient.post("/api/mail/sendmail", {
          email: this.EmailRequest.email,
        });
        console.log(response);
        if (response.status === 200) {
          this.startTimer();
          await Swal.fire({
            icon: "success",
            title: "이메일 전송 완료",
            text: `${this.EmailRequest.email}로 코드를 전송했습니다.`,
            confirmButtonText: "확인",
            confirmButtonColor: "#007bff",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "메일 발송 실패",
            text: `유효한 메일 주소가 아닙니다.`,
            confirmButtonText: "확인",
            confirmButtonColor: "#007bff",
          });
        }
      } catch (error) {
        console.error("Error sending verification code:", error);
        this.errorMessage = "인증 코드 전송에 실패했습니다.";
        setTimeout(() => {
          this.errorMessage = ""; // 오류 메시지 초기화
        }, 5000); // 5초 후에 초기화 (5000ms)
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
    async verifyCode() {
      console.log(this.EmailRequest.email, this.code);
      try {
        const response = await apiClient.get(`/api/mail/verifycode`, {
          params: {
            code: this.code,
            email: this.EmailRequest.email,
          },
        });
        console.log(response);
        if (response.status === 200) {
          this.$emit("verified", this.EmailRequest.email);
          clearInterval(this.timer);
          await Swal.fire({
            icon: "success",
            title: "메일 인증에 성공했습니다.",
            text: `회원가입을 계속 진행해 주세요.`,
            confirmButtonText: "확인",
            confirmButtonColor: "#007bff",
          });
        } else {
          throw new Error("인증 번호가 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("Error verifying code:", error);
        this.errorMessage = "인증 번호가 올바르지 않습니다.";
        setTimeout(() => {
          this.errorMessage = "";
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

<style src="../../assets/css/user/EmailVerification.css" lang="css"></style>