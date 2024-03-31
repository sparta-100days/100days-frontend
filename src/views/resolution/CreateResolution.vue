<template>
  <div class="create-resolution-background">
    <div class="create-resolution-container">
      <div class="headlight"></div>
      <h2>새 목표 만들기</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input class="create-resolution-title" type="text" id="title" v-model="resolution.title" required />
          <span>{{ validationMessages.title }}</span>
        </div>
        <div class="form-group">
          <textarea class="create-resolution-description" id="description" v-model="resolution.description" required></textarea>
          <span>{{ validationMessages.description }}</span>
        </div>
        <div class="form-group">
          <input type="text" id="category" v-model="resolution.category" required>
          <span>{{ validationMessages.category }}</span>
        </div>
        <button type="submit" class="create-resolution-btn">목표 생성</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resolution: {
        title: '',
        description: '',
        category: ''
      },
      validationMessages: {
        title: '',
        description: '',
        category: ''
      }
    };
  },
  methods: {
    submitForm() {
      // 여기에서 폼 검증 로직을 추가할 수 있습니다.
      // 예를 들어, 각 필드가 비어 있지 않은지 확인하고, 조건을 만족하지 않으면 validationMessages를 업데이트합니다.
      // 폼 데이터가 유효하면 백엔드 API로 데이터를 전송하는 로직을 추가합니다.
      console.log("Form submitted:", this.resolution);
      // API 호출 로직은 여기에 추가합니다.
    },
  }
};
</script>

<style src="@/assets/css/resolution/CreateResolution.css" lang="css"></style>
