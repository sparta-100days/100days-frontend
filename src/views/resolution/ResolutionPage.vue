<template>
  <div class="resolution">
    <h2>제목</h2>
    <p>사용할 id: {{ resolutionId }}</p>
    <div class="info-box">
      <p class="description">설명</p>
      <p class="progress">진행도</p>
    </div>
    <div class="daily-ckeck-box">
      <p class="d-day">d - 100</p>
      <p class="daily-status">오늘 목표 완료</p>
    </div>
    <div class="daily-check">
      <p>달력 형식 or 스크롤 형식</p>
    </div>
    <footer class="footer" v-if="isAuthor">
      <button class="feedback-button">데일리 체크 하러 가기</button>
    </footer>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const route = useRoute();
    const resolutionId = ref(route.params.id);

    onMounted(() => {
      // 컴포넌트가 마운트 될 때 수행할 작업.
      console.log(`resolution #${resolutionId.value}`);
    });
    return {
      resolutionId,
    };
  },
  mounted() {
    this.checkAuthor();
  },
  data() {
    return {
      isAuthor: false,
    };
  },
  methods: {
    checkAuthor() {
      this.isAuthor = true;
    },
  },
};
</script>

<style src="../../assets/css/resolution/ResolutionPage.css" lang="css"></style>
