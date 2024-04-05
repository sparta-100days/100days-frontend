<template>
  <div class="myinfo-resolution-list-container">
    <div class="myinfo-resolution-list-black-box">
      <div class="myinfo-resolution-list-title">
        <h2>나의 목표 리스트</h2>
      </div>
      <div class="my-resolution-list-box">
        <div class="my-resolution-list-container">
          <div class="my-resolution-list-table-container">
            <table class="resolution-table">
              <thead>
                <tr>
                  <th>제목</th>
                  <th>카테고리</th>
                  <th>좋아요</th>
                </tr>
              </thead>
              <tbody>
                <!-- 예시 데이터 -->
                <tr v-for="(resolution, index) in resolutions" :key="index" @click="goToResolutionDetail(resolution)">
                  <td class="ellipsis">{{ resolution.title }}</td>
                  <td>{{ resolution.category }}</td>
                  <td>{{ resolution.likeCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="my-resolution-pagination-container">
        <button class="my-resol-btn" @click="changPage(currentPage - 1)" :disabled="currentPage <= 0">이전</button>
        <a class="my-resol-page-check">페이지 {{ currentPage + 1 }} / {{ totalPages }}</a>
        <button class="my-resol-btn" @click="changPage(currentPage + 1)" :disabled="currentPage >= totalPages - 1">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index";

export default {
  data() {
    return {
      resolutions: [],
      pageCount: 1,
      currentPage: 0,
      sortOrder: "CREATED_AT",
      totalPages: 1,
    };
  },
  async mounted() {
    console.log(localStorage.getItem("accessToken"));
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("토큰이 없습니다.");
        return;
      }
      await this.getMyResolutionData();
    } catch (error) {
      console.error("회원 정보 가져오기 실패:", error.response.data);
    }
  },
  methods: {
    goToResolutionDetail(resolution) {
      console.log(resolution.id);
      this.$router.push(`/resolution/${resolution.id}`);
    },
    async getMyResolutionData() {
      const response = await apiClient.get(`/api/v1/resolution`, {
        params: {
          page: this.currentPage,
          sortOrder: this.sortOrder,
        },
      });
      this.resolutions = response.data.content;
      this.totalPages = response.data.totalPages; // 총 페이지 수 업데이트
    },
    changPage(page) {
      this.currentPage = page;
      this.getMyResolutionData();
    },
  },
};
</script>

<style src="../../assets/css/user/MyInfoResolutionList.css" lang="css"></style>