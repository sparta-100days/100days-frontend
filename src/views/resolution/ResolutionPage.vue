<template>
  <div class="mainpage-resolution-background">
    <i class="fas fa-moon" id="first-moon"></i>
    <i class="fas fa-moon blur" id="first-moon-blur"></i>
    <div class="mainpage-resolution-container">
      <div class="mainpage-resolution-box">
        <div class="main-resol-title-box">
          <h2 class="main-resol-title">{{ resolution.title }}</h2>
          <button @click="toggleLike" :class="{ 'button-liked': likeStatus, 'button-not-liked': !likeStatus }">
            <a style="font-size: 1.5em">{{ likeStatus ? "♥" : "♡" }}</a>
            <br />
            <a>{{ likeCount }}</a>
          </button>
        </div>
        <div class="mainpage-resolution-description-box">
          <p class="mainpage-resolution-description">
            {{ resolution.description }}
          </p>
        </div>
        <div class="mainpage-resolution-progress-box">
          <div class="progress-container" :style="{ backgroundColor: containerColor }">
            <div class="progress-bar" :style="{ width: resolution.progress + '%', backgroundColor: progressBarBackground }">{{ resolution.progress }}%</div>
          </div>
        </div>
        <div class="mainpage-resolution-daily-status-box">
          <div class="mainpage-resolution-d-day-box">
            <p class="d-day">d - {{ dDay }}</p>
            <p class="daily-status">
              오늘 목표 완료:
              <span v-if="resolution.dailyStatus" class="completed">완료</span>
              <span v-else class="not-completed">미완료</span>
            </p>
          </div>
        </div>
        <div class="mainpage-resolution-daily-check">
          <PostList v-if="showPostList" :resolutionId="resolutionId" />
        </div>
      </div>
      <DailyCheckPopup v-if="showDailyCheckPopup" :resolutionId="resolutionId" @close="toggleDailyCheckPopup"/>
    </div>
  </div>
  <footer class="resol-feedback-footer" v-if="isAuthor">
    <button class="resol-feedback-button" @click="toggleDailyCheckPopup" :disabled="resolution.dailyStatus">데일리 체크 하러 가기</button>
  </footer>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { apiClient } from "@/index.js";
import PostList from "@/views/post/PostList.vue";
import DailyCheckPopup from "@/components/resolution/DailyCheckPopup.vue";

export default {
  setup() {
    const route = useRoute();
    const resolutionId = ref(route.params.id);
    const resolution = ref({});
    const dDay = ref(0);
    const likeStatus = ref(false);
    const likeCount = ref(0);
    const showDailyCheckPopup = ref(false);
    function getDDay(deadline) {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      const dateDiff = deadlineDate - now;

      return Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
    }
    const fetchResolution = async () => {
      try {
        console.log("ID: ", resolutionId.value);
        const response = await apiClient.get(
          `/api/v1/resolution/${resolutionId.value}`
        );
        resolution.value = response.data;
        dDay.value = getDDay(resolution.value.deadline);
        likeStatus.value = await getLikeStatus();
        likeCount.value = resolution.value.likeCount;
        console.log("resolution: ", resolution.value);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    const getLikeStatus = async () => {
      try {
        const response = await apiClient.get(`/api/likes`, {
          params: {
            resolutionId: resolutionId.value,
          },
        });
        console.log("status: ", response.data.status);
        return response.data.status;
      } catch (error) {
        console.log(error.response.data);
        return false;
      }
    };
    const toggleLike = async () => {
      if (likeStatus.value) {
        try {
          await apiClient.delete("/api/likes", {
            params: {
              resolutionId: resolutionId.value,
            },
          });
          likeStatus.value = await getLikeStatus();
          likeCount.value--;
        } catch (error) {
          console.log(error.response.data);
        }
      } else {
        try {
          await apiClient.post("/api/likes", null, {
            params: {
              resolutionId: resolutionId.value,
            },
          });
          likeStatus.value = await getLikeStatus();
          likeCount.value++;
        } catch (error) {
          console.log(error.response.data);
        }
      }
    };

    function toggleDailyCheckPopup() {
      if (showDailyCheckPopup.value) {
        console.log("close popup", showDailyCheckPopup.value);
        showDailyCheckPopup.value = false;
      } else {
        console.log("open popup", showDailyCheckPopup.value);
        showDailyCheckPopup.value = true;
        console.log(showDailyCheckPopup.value);
      }
    }

    onMounted(fetchResolution);

    const showPostList = ref(false);

    return {
      resolutionId,
      showPostList,
      resolution,
      dDay,
      likeStatus,
      toggleLike,
      likeCount,
      toggleDailyCheckPopup,
      showDailyCheckPopup,
    };
  },
  data() {
    return {
      containerColor: "rgba(255, 255, 255, 0.2)",
      isAuthor: false,
    };
  },
  mounted() {
    this.checkAuthor();
  },
  computed: {
    progressBarBackground() {
      const progress = this.resolution.progress;
      const percent = progress / 100;

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
    DailyCheckPopup,
    PostList,
  },
};
</script>

<style src="../../assets/css/resolution/ResolutionPage.css" lang="css"></style>
