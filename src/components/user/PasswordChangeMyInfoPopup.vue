<template>
  <div class="password-change-popup">
    <!-- 비밀번호 변경 팝업 내용 -->
    <div class="password-change-popup-content">
      <h2 class="password-change-title">비밀번호 변경</h2>
      <div class="password-change-popup-form">
        <div class="form-group">
          <input type="password" v-model="password" placeholder="새 비밀번호" required>
          <input type="password" v-model="newPassword" placeholder="새 비밀번호 확인" required>
        </div>
        <div class="form-group">
          <button class="password-change-submit" @click="submitPassword">변경</button>
          <button class="password-change-close" @click="closePopup">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '', // 새 비밀번호
      newPassword: '', // 새 비밀번호 확인
    };
  },
  methods: {
    submitPassword() {
      // 비밀번호 변경 처리 로직
      // this.password와 this.newPassword를 사용하여 비밀번호 변경 API를 호출하도록 구현
      // 성공 시 팝업을 닫거나 다른 처리를 수행할 수 있습니다.
      // 예시: apiClient.post('/api/change-password', { password: this.password, newPassword: this.newPassword })
      //      .then(response => {
      //        console.log('비밀번호 변경 성공');
      //        this.closePopup(); // 성공 시 팝업 닫기
      //      })
      //      .catch(error => {
      //        console.error('비밀번호 변경 실패:', error);
      //      });
      console.log('새 비밀번호:', this.password);
      console.log('새 비밀번호 확인:', this.newPassword);
    },
    closePopup() {
      // 팝업 닫기 메서드
      this.$emit('close'); // 부모 컴포넌트에 이벤트 전달
    },
  },
};
</script>

<style src="../../assets/css/user/PasswordChangeMyInfoPopup.css" lang="css"></style>