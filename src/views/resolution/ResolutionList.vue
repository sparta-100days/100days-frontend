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
import axios from "axios";

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
      const token = localStorage.getItem("AccessToken");
      // 클릭한 목표의 상세 페이지로 네비게이션
      const data = await axios.get("http://localhost:8080/api/v1/resolution", {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰을 추가합니다.
        },
      });
      console.log(data);
      this.resolutions = data.data.content;
    },
    // eslint-disable-next-line no-unused-vars
    searchResolutions(query) {
      // 검색 로직 구현
    }

  },
};
</script>

<style src="../../assets/css/resolution/ResolutionList.css" lang="css"></style>
