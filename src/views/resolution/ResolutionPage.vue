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
          <PostList v-if="showPostList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import PostList from "@/views/post/PostList.vue";

export default {
  setup() {
    const route = useRoute();
    const resolutionId = ref(route.params.id);

    onMounted(() => {
      console.log(`resolution #${resolutionId.value}`);
    });

    const showPostList = ref(false);

    return {
      resolutionId,
      showPostList,
    };
  },
  data() {
    return {
      progress: 0,
      containerColor: "rgba(255, 255, 255, 0.2)",
      isAuthor: false,
    };
  },
  mounted() {
    this.checkAuthor();
    setInterval(this.updateProgressBar, 1000);
  },
  computed: {
    progressBarBackground() {
      const percent = this.progress / 100;

      if (percent < 0.1) {
        return "#0F2027";
      } else if (percent < 0.2) {
        return this.interpolateColor('#0F2027', '#141e30', (percent - 0.1) * 10);
      } else if (percent < 0.4) {
        return this.interpolateColor('#141e30', '#3f2d60', (percent - 0.2) * 10);
      } else if (percent < 0.6) {
        return this.interpolateColor('#494380', '#6383a2', (percent - 0.4) * 5);
      } else if (percent < 0.8) {
        return this.interpolateColor('#63a2a0', '#96d2a5', (percent - 0.6) * 5);
      } else if (percent < 0.9) {
        return this.interpolateColor('#fbd786', '#f7797d', (percent - 0.8) * 10);
      } else {
        return "#f5afb2";
      }
    },
  },
  methods: {
    checkAuthor() {
      this.isAuthor = true;
      // 연결된 게시판의 글을 보여주기 위해 showPostList를 true로 변경
      this.showPostList = true;
    },
    updateProgressBar() {
      if (this.progress === 100) {
        this.progress = 0;
      } else {
        this.progress += 1;
      }
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
  components: {
    PostList,
  },
};
</script>

<style src="../../assets/css/resolution/ResolutionPage.css" lang="css"></style>
