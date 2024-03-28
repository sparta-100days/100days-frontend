<template>
  <div class="resolution-list-container">
    <h1>목표 리스트</h1>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="목표 검색..." class="search-input"/>
      <button @click="searchResolutions(searchQuery)" class="search-button"> 검색하기 </button>
    </div>
    <ul class="resolution-list">
      <li v-for="(resolution, index) in resolutions" :key="index" @click="goToResolutionDetail(resolution)">
        <h3>{{ resolution.title }}</h3>
        <p>카테고리: {{ resolution.category }}</p>
        <p>좋아요: {{ resolution.likeCount }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {apiClient} from "../index.js"

export default {
  data() {
    return {
      searchQuery: '',
      resolutions: [
      ],
    };
  },
  mounted(){
    this.getAllData();
  },

  methods: {
    goToResolutionDetail(resolution) {
      this.$router.push(`/resolution/${resolution.id}`)
    },
    async getAllData(){
      const response = await apiClient.get("/api/v1/resolution")
      this.resolutions = response.data.content;
    },
    // eslint-disable-next-line no-unused-vars
    searchResolutions(query) {
      // 검색 로직 구현
    }

  },
};
</script>

<style src="../../assets/css/resolution/ResolutionList.css" lang="css"></style>
