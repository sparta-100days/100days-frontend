<template>
  <div class="password-change-popup">
    <!-- 비밀번호 변경 팝업 내용 -->
    <div class="password-change-popup-content">
      <h2 class="password-change-title">비밀번호 변경</h2>
      <div class="password-change-popup-form">
        <form @submit.prevent="submitPassword">
          <div class="form-group">
            <input type="password" v-model="UserPasswordRequest.password" placeholder="새 비밀번호" required>
            <input type="password" v-model="UserPasswordRequest.newPassword" placeholder="새 비밀번호 확인" required>
          </div>
          <div class="form-group">
            <button type="submit" class="password-change-submit">변경</button>
            <button type="button" class="password-change-close" @click="closePopup">닫기</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      UserPasswordRequest: {
        password: "", // 새 비밀번호
        newPassword: "", // 새 비밀번호 확인
      },
    };
  },
  async mounted() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("토큰이 없습니다.");
        return;
      }
      await this.getUserInfo(accessToken); // 사용자 정보 가져오기
    } catch (error) {
      console.error("회원 정보 가져오기 실패:", error.response.data);
    }
  },
  methods: {
    async getUserInfo(accessToken) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await apiClient.put(
          `/api/users`,
          config
        );
        const userInfo = response.data;
        this.UserPasswordRequest.password = userInfo.password;
        this.UserPasswordRequest.newPassword = userInfo.newPassword;
      } catch (error) {
        console.error("사용자 정보 요청 실패:", error.response.data);
      }
    },
    async submitPassword() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("토큰이 없습니다.");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await apiClient.patch(
          `/api/users/passwordchange`, // API 경로 수정
          this.UserPasswordRequest,
          config
        );
        await Swal.fire({
          icon: "success",
          title: "성공!",
          text: "비밀번호를 수정했습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#007bff",
        });
        console.log("회원정보 수정 성공:", response.data);
        await this.getUserInfo(accessToken); // 수정 후 사용자 정보 다시 가져오기
      } catch (error) {
        console.error("회원정보 수정 실패:", error.response.data);
      }
    },
    closePopup() {
      // 팝업 닫기 메서드
      this.$emit("close"); // 부모 컴포넌트에 이벤트 전달
    },
  },
};
</script>

<style src="../../assets/css/user/PasswordChangeMyInfoPopup.css" lang="css"></style>