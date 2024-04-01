<template>
  <div class="reissue-password-popup">
    <div class="reissue-password-popup-content">
      <h2>비밀번호 찾기</h2>
      <div class="reissue-password-popup-form">
        <input type="email" v-model="EmailRequest.email" placeholder="이메일 주소 입력" required>
        <button class="send-button" @click="submitEmail" :disabled="isEmailSending">확인</button>
        <button class="close-button" @click="closePopup">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { apiClient } from "@/index";
// import axios from "axios";

export default {
  data() {
    return {
      EmailRequest: {
        email: "",
      },
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
      }

      // 이메일 전송 중이거나 재전송 중인 경우 함수를 종료합니다.
      if (this.isEmailSending || this.isResending) return;

      // 이메일 전송 로직 실행 전에 이메일 전송 중 여부를 true로 설정합니다.
      this.isEmailSending = true;

      try {
        // Axios를 사용하여 백엔드 API 호출
        // const accessToken = localStorage.getItem("AccessToken");
        /*
        const response = await axios.patch(
          "http://localhost:8090/api/users/search/pass",
          {
            email: this.email,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/text/plain,",
            },
          }
        );*/
        const response = await apiClient.patch("/api/users/search/pass", {
          email: this.EmailRequest.email,
        });
        // API 응답을 확인하고 처리
        if (response.data.success) {
          this.lastSentTime = Date.now();
          console.log(response);

          await Swal.fire({
            icon: "success",
            title: "이메일 전송 완료",
            text: `${this.email}로 비밀번호를 재발급했습니다.`,
            confirmButtonText: "확인",
            confirmButtonColor: "#007bff",
          });
          await this.$router.push("/login");
        } else {
          throw new Error(response.data.message); // 에러 처리
        }
      } catch (error) {
        console.error(error);

        await Swal.fire({
          icon: "error",
          title: "오류",
          text: "이메일 전송에 실패했습니다. 잠시 후 다시 시도하세요.",
          confirmButtonText: "확인",
          confirmButtonColor: "#dc3545",
        });
      } finally {
        this.isEmailSending = false;
      }
    },
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style src="../../assets/css/user/ReissuePassword.css" lang="css"></style>
