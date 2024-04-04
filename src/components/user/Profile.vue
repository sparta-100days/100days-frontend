<template>
  <div class="myinfo-profile-container">
    <div class="myinfo-profile-black-box">
      <div class="myinfo-profile-title"><h2>회원정보수정</h2></div>
      <!-- 이메일 입력 폼 -->
      <form @submit.prevent="submitModify">
        <div class="form-item">
          <input type="text" id="email" name="email" v-model="email" readonly />
        </div>
        <!-- 닉네임 입력 폼 -->
        <div class="form-item">
          <input type="text" id="nickname" name="nickname" v-model="ModifyMyInfoRequest.nickname">
        </div>
        <!-- 회원 ID 입력 폼 -->
        <div class="form-item">
          <input type="text" id="userId" name="userId" v-model="ModifyMyInfoRequest.accountId">
        </div>
        <!-- 생일 입력 폼 -->
        <div class="form-item">
          <input type="text" id="birthday" name="birthday" v-model="ModifyMyInfoRequest.birth">
        </div>
        <!-- 비밀번호 입력 폼 -->
        <div class="form-item">
          <input type="password" id="password" name="password" v-model="ModifyMyInfoRequest.password">
        </div>
        <!-- 비밀번호 변경 버튼을 클릭하면 openPasswordChangeMyInfoPopup 메서드를 호출하여 팝업을 엽니다. -->
        <button type="button" @click="openPasswordChangeMyInfoPopup" class="password-change-button">비밀번호변경</button>
        <PasswordChangeMyInfoPopup v-if="showPasswordChangeMyInfoPopup" @close="closePasswordChangeMyInfoPopup" @verified="handlePasswordChangeMyInfoPopup"/>
        <!-- 회원정보저장 버튼 -->
        <button type="submit" class="save-button">회원정보저장</button>
      </form>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index";
import PasswordChangeMyInfoPopup from "../../components/user/PasswordChangeMyInfoPopup.vue";
import { shallowRef } from "vue";
import Swal from "sweetalert2";

export default {
  setup() {
    // setup 함수 내에서 데이터 및 메서드 설정
    const email = shallowRef("");
    const userPasswordRequest = shallowRef({
      password: "",
      newPassword: "",
    });
    const ModifyMyInfoRequest = shallowRef({
      nickname: "",
      accountId: "",
      birth: "",
      password: "",
    });
    const showPasswordChangeMyInfoPopup = shallowRef(false);
    // 실제 컴포넌트에서 사용할 때는 .value로 접근
    return {
      email,
      userPasswordRequest,
      ModifyMyInfoRequest,
      showPasswordChangeMyInfoPopup,
    };
  },
  components: {
    PasswordChangeMyInfoPopup, // 비밀번호 변경 팝업 컴포넌트 등록
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
        const response = await apiClient.get(`/api/users/myinfo`, config);
        const userInfo = response.data;
        this.email = userInfo.email;
        this.ModifyMyInfoRequest.nickname = userInfo.nickname;
        this.ModifyMyInfoRequest.accountId = userInfo.accountId;
        this.ModifyMyInfoRequest.birth = userInfo.birth;
      } catch (error) {
        console.error("사용자 정보 요청 실패:", error.response.data);
      }
    },
    async submitModify() {
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
        const response = await apiClient.put(
          `/api/users`,
          this.ModifyMyInfoRequest,
          config
        );
        await Swal.fire({
          icon: "success",
          title: "성공!",
          text: "회원정보를 수정했습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#007bff",
        });
        console.log("회원정보 수정 성공:", response.data);
        await this.getUserInfo(accessToken); // 수정 후 사용자 정보 다시 가져오기
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "실패!",
          text: "회원정보를 수정하지 못했습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#007bff",
        });
        console.error("회원정보 수정 실패:", error.response.data);
      }
    },
    openPasswordChangeMyInfoPopup() {
      this.showPasswordChangeMyInfoPopup = true; // 비밀번호 변경 팝업 표시
    },
    closePasswordChangeMyInfoPopup() {
      this.showPasswordChangeMyInfoPopup = false; // 비밀번호 변경 팝업 닫기
    },
    handlePasswordChangeMyInfoPopup() {
      this.userPasswordRequest.password = "";
      this.showPasswordChangeMyInfoPopup = false;
    },
  },
};
</script>

<style src="../../assets/css/user/Profile.css" lang="css"></style>