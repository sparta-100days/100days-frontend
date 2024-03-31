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
      <div class="resolution-list-pagination-container">
        <button class="resolution-list-button" @click="getPreviousPage" :disabled="pageCount <= 1">이전</button>
        <button class="resolution-list-button" @click="getNextPage" :disabled="pageCount >= totalPages">다음</button>
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
      totalPages: 1,
    };
  },
  mounted() {
    this.getAllData();
  },

  methods: {
    goToResolutionDetail(resolution) {
      this.$router.push(`/resolution/${resolution.id}`);
    },
    async getAllData() {
      const response = await apiClient.get(`/api/v1/resolution`);
      this.resolutions = response.data.content;
      this.totalPages = response.data.totalPages; // 총 페이지 수 업데이트
    },
    async getNextPage() {
      if (this.pageCount < this.totalPages) {
        this.pageCount++;
        await this.getAllData();
      }
    },
    async getPreviousPage() {
      if (this.pageCount > 1) {
        this.pageCount--;
        await this.getAllData();
      }
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
