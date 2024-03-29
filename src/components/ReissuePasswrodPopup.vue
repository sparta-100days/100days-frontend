<template>
  <div class="reissue-password-popup">
    <div class="popup-content">
      <h2>비밀번호 찾기</h2>
      <input type="email" v-model="email" placeholder="이메일 주소 입력" required>
      <button class="send-button" @click="submitEmail" :disabled="isEmailSending">확인</button>
      <button class="close-button" @click="closePopup">닫기</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      email: "",
      isEmailSending: false, // 이메일 전송 중 여부를 나타내는 변수
      isResending: false, // 재전송 중 여부를 나타내는 변수
      lastSentTime: null, // 마지막 이메일 전송 시간을 저장하는 변수
    };
  },
  methods: {
    async submitEmail() {
      // 마지막으로 이메일을 전송한 시간이 있고, 현재 시간과의 차이가 3초 미만인 경우 함수를 종료합니다.
      if (this.lastSentTime && Date.now() - this.lastSentTime < 3000) {
        await Swal.fire({
          icon: "warning",
          title: "메일 발송 간격이 너무 빠릅니다.",
          text: "3초 후에 다시 시도하세요.",
          confirmButtonText: "확인",
          confirmButtonColor: "#007bff",
        });
        return;
      }

      // 이메일 전송 중이거나 재전송 중인 경우 함수를 종료합니다.
      if (this.isEmailSending || this.isResending) return;

      // 이메일 전송 로직 실행 전에 이메일 전송 중 여부를 true로 설정합니다.
      this.isEmailSending = true;

      try {
        // 이메일 전송 로직
        // await sendEmail(); // 비동기 함수로 가정합니다.

        // 이메일 전송이 성공한 경우 마지막으로 이메일을 전송한 시간을 기록합니다.
        this.lastSentTime = Date.now();

        // 이메일 전송 완료 후에 알림을 표시합니다.
        await Swal.fire({
          icon: "success",
          title: "이메일 전송 완료",
          text: `${this.email}로 비밀번호를 재발급했습니다.`,
          confirmButtonText: "확인",
          confirmButtonColor: "#007bff",
        });
      } catch (error) {
        // 에러 발생 시 에러 처리 로직을 추가할 수 있습니다.
        console.error(error);
      } finally {
        // 이메일 전송 완료 후에 이메일 전송 중 여부를 false로 설정합니다.
        this.isEmailSending = false;
      }
    },
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style src="../assets/css/user/ReissuePasswrod.css" lang="css"></style>
