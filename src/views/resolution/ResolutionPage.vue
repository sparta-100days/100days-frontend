<template>
  <div class="mainpage-resolution-background">
    <i class="fas fa-moon"></i>
    <i class="fas fa-moon blur"></i>
    <div class="mainpage-resolution-container">
      <div class="mainpage-resolution-box">
        <div class="main-resol-title-box">
          <h2 class="main-resol-title">작성 목표 제목</h2>
          <p class="main-resol-userId">| {{ resolutionId }}</p>
        </div>
        <div class="mainpage-resolution-description-box">
          <p class="mainpage-resolution-description">
            설명 : 예시를위해길게적어볼게요예시를위해길게적어볼게요
            예시를위해길게적어볼게요예시를위해길게적어볼게요
            예시를위해길게적어볼게요예시를위해길게적어볼게요
            예시를위해길게적어볼게요예시를위해길게적어볼게요
            예시를위해길게적어볼게요예시를위해길게적어볼게요
          </p>
        </div>
        <div class="mainpage-resolution-progress-box">
          <div class="progress-container" :style="{ backgroundColor: containerColor }">
            <div class="progress-bar" :style="{ width: progress + '%', backgroundColor: progressBarBackground }">{{ progress }}%</div>
          </div>
        </div>
        <div class="mainpage-resolution-daily-status-box">
          <div class="mainpage-resolution-d-day-box">
            <p class="mainpage-resolution-like-check">♥</p>
            <footer class="footer" v-if="isAuthor">
              <button class="resol-feedback-button">데일리 체크 하러 가기</button>
            </footer>
          </div>
        </div>
        <div class="mainpage-resolution-daily-check">
          <!-- 달력 형식이나 스크롤 형식 컴포넌트 추가 -->
        </div>
      </div>
    </div>
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
  data() {
    return {
      progress: 0, // 초기 프로그레스 값
      containerColor: "rgba(255, 255, 255, 0.2)", // 초기 배경색 설정
      isAuthor: false,
    };
  },
  mounted() {
    this.checkAuthor();
    setInterval(() => {
      const randomValue = Math.floor(Math.random() * 101); // 0부터 100까지의 랜덤한 값
      this.updateProgressBar(randomValue);
    }, 1000); // 1초마다 업데이트
  },
  computed: {
    progressBarBackground() {
      const percent = this.progress / 100;

      if (percent < 0.1) {
        return '#0F2027'; // #0F2027
      } else if (percent < 0.2) {
        return this.interpolateColor('#0F2027', '#141e30', (percent - 0.1) * 10); // 중간값 계산
      } else if (percent < 0.4) {
        return this.interpolateColor('#141e30', '#3f2d60', (percent - 0.2) * 10); // 중간값 계산
      } else if (percent < 0.6) {
        return this.interpolateColor('#2d3560', '#b26ca2', (percent - 0.4) * 5); // 중간값 계산
      } else if (percent < 0.8) {
        return this.interpolateColor('#6c8db2', '#a1eaea', (percent - 0.6) * 5); // 중간값 계산
      } else if (percent < 0.9) {
        return this.interpolateColor('#C6FFDD', '#fff9f0', (percent - 0.8) * 10); // 중간값 계산
      } else {
        return "#fff8f8"; // 흰색으로
      }
    },
  },
  methods: {
    checkAuthor() {
      this.isAuthor = true;
    },
    updateProgressBar(data) {
      this.progress = data;
    },
    interpolateColor(color1, color2, factor) {
      const result = color1.slice(1).match(/.{2}/g).map((channel, index) => {
          const value1 = parseInt(channel, 16);
          const value2 = parseInt(color2.slice(1).match(/.{2}/g)[index], 16);
          const delta = value2 - value1;
          const computedValue = value1 + Math.round(delta * factor);
          return computedValue.toString(16).padStart(2, "0");
        });
      return `#${result.join("")}`;
    },
  },
};
</script>

<style src="../../assets/css/resolution/ResolutionPage.css" lang="css"></style>
