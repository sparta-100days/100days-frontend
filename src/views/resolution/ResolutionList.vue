<template>
  <div class="resolution-list-background">
    <div class="resolution-list-detail">
      <div class="resolution-list-container">
        <i class="fas fa-moon"></i>
        <i class="fas fa-moon blur"></i>
        <div class="search-container">
          <h1 class="resolution-list-title">목표 리스트</h1>
          <input type="text" v-model="searchQuery" placeholder="목표 검색..." class="resolution-list-search-input"/>
          <button @click="searchResolutions(searchQuery)" class="resolution-list-search-button"> 검색하기 </button>
        </div>
        <div>
          <table class="resolution-list-table">
            <thead>
              <tr>
                <th>제목</th>
                <th>카테고리</th>
                <th>좋아요</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(resolution, index) in resolutions" :key="index" @click="goToResolutionDetail(resolution)">
                <td>{{ resolution.title }}</td>
                <td>{{ resolution.category }}</td>
                <td>{{ resolution.likeCount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="resolution-list-pagination-container">
        <button class="resolution-list-button" @click="changPage(currentPage - 1)" :disabled="currentPage <= 0">이전</button>
        <a class="resolution-page-check">페이지 {{ currentPage + 1 }} / {{ totalPages }}</a>
        <button class="resolution-list-button" @click="changPage(currentPage + 1)" :disabled="currentPage >= totalPages - 1">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index";

export default {
  data() {
    return {
      searchQuery: "",
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
      await this.getAllData();
    } catch (error) {
      console.error("회원 정보 가져오기 실패:", error.response.data);
    }
  },

  methods: {
    goToResolutionDetail(resolution) {
      console.log(resolution.id);
      this.$router.push(`/resolution/${resolution.id}`);
    },
    async getAllData() {
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
      this.getAllData();
    },
    async searchResolutions(query) {
      const response = await apiClient.get(
        `/api/v1/resolution?page=${this.pageCount}&query=${query}`
      );
      this.resolutions = response.data.content;
      // 여기서 적절한 방식으로 페이지 수 업데이트 처리 가능
    },
  },
};
</script>

<style src="../../assets/css/resolution/ResolutionList.css" lang="css"></style>
