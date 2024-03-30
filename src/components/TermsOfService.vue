<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="agreement-container">
        <div class="text-main-title">
          <h1>개인정보 수집 및 이용에 대한 동의</h1>
        </div>
        <div class="main-box">
          <div class="text-table-title">
            <h3>수집하는 개인정보 항목 및 수집 목적</h3>
            <p>본 사이트는 회원 가입 시 아래와 같은 개인정보를 수집합니다.</p>
            <div class="small-box">
              <div class="info-table">
                <div class="info-row">
                  <div class="info-cell">이메일 주소</div>
                  <div class="info-cell">닉네임</div>
                  <div class="info-cell">아이디</div>
                </div>
                <div class="info-row">
                  <div class="info-cell">비밀번호</div>
                  <div class="info-cell">생년월일</div>
                  <div class="info-cell">쿠키 정보</div>
                </div>
              </div>
            </div>
            <p>
              수집된 개인정보는 회원 관리, 서비스 제공 및 개선, 고객 상담 및
              민원 처리에 활용됩니다.
            </p>
            <h3>개인정보의 이용 및 보관 기간<br /></h3>
            <p>
              1-1. 회원가입 시 수집된 개인정보는 해당 서비스 이용에 필요한 최소한의 기간 동안만 사용됩니다. <br /><br />
              1-2. 회원이 탈퇴를 요청한 경우, 해당 개인정보는 탈퇴 신청일로부터 7일간 보관되며, 이후 지체없이 파기됩니다.
            </p>
              <h3>개인정보의 제3자 제공 및 위탁</h3><br />
            <p>
              2-1. 본 사이트는 회원의 동의 없이 개인정보를 외부에 제공하지 않습니다. <br /><br />
              2-2. 회원의 개인정보를 외부에 위탁하여 처리하는 경우, 사전에 해당 사실을 고지하고 회원의 동의를 받습니다.
            </p>
              <h3>개인정보의 파기<br /></h3>
            <p>
              3-1. 회원의 개인정보는 수집 및 이용 목적이 달성된 후에는 지체 없이 파기됩니다. <br /><br />
              3-2. 단, 관련 법령에 따라 보존할 필요가 있는 경우에는 해당 법령에서 정한 기간 동안 보관 후 파기됩니다.
            </p>
            <p>
              <br />
              위의 약관은 회원가입 시 동의란에 명시하여 회원의 동의를 얻은 후에 시행됩니다.
              회원은 언제든지 본인의 개인정보를 열람, 수정, 삭제할 수 있으며 개인정보 처리에 대한 동의를 철회할 수 있습니다. <br /><br />
              단, 회원탈퇴 시에는 7일간 정보를 보관한 후에 지체없이 파기됨을 유의해주시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
      <div class="checkbox-wrapper">
        <label for="agreement" class="agreement-container">
          <input type="checkbox" id="agreement" v-model="agreed" />
          <span class="checkmark"></span>
          위 내용에 동의합니다.
        </label>
      </div>
      <div class="button-wrapper">
        <button @click="handleSubmit" :disabled="!agreed">동의</button>
        <button @click="handleCancel">동의하지 않음</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agreed: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.agreed) {
        // 동의한 경우 SignUp 페이지로 이동
        this.$router.push("/SignUp");
      } else {
        alert("개인정보 수집 및 이용에 동의해야 합니다.");
      }
    },
    handleCancel() {
      // 동의하지 않은 경우 메인페이지로 이동
      alert("이용해주셔서 감사합니다.");
      this.$router.push("/");
    },
  },
};
</script>

<style src="../assets/css/user/TermsOfService.css" lang="css"></style>
