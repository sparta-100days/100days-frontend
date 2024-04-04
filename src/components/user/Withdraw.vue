<template>
  <div class="myinfo-withdraw-container">
    <div class="myinfo-withdraw-black-box">
      <div class="myinfo-title"><h2>회원탈퇴</h2></div>
      <div class="withdraw-info-container">
        <p>탈퇴 후 개인정보는 7일간 보관한 뒤 삭제됩니다.<br/>
          그 전에 다시 로그인하시면 정상이용 가능합니다.
        </p>
      </div>
      <form @submit.prevent="withdraw">
        <div class="form-item">
          <input type="password" id="password" name="password" v-model="WithdrawRequest.password" placeholder="비밀번호">
        </div>
        <button class="withdraw-button">회원탈퇴</button>
      </form>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      WithdrawRequest: {
        password: "",
      },
    };
  },
  methods: {
    async withdraw() {
      try {
        const response = await apiClient.delete("/api/users", {
          data: {
            password: this.WithdrawRequest.password,
          },
        });
        await Swal.fire({
          icon: "success",
          title: "탈퇴되었습니다.",
          text: "지금까지 이용해주셔서 감사합니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#007bff",
        });
        console.log("회원탈퇴 성공:", response);
        // 회원탈퇴 성공 시 처리 (예: 로그아웃 등)
      } catch (error) {
        console.error("회원탈퇴 실패:", error.response.data);
        // 회원탈퇴 실패 시 에러 처리 (예: 메시지 표시 등)
      }
    },
  },
};
</script>


<style src="../../assets/css/user/Withdraw.css" lang="css"></style>