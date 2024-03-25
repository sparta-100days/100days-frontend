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
export default {
  data() {
    return {
      searchQuery: '',
      resolutions: [
        // 샘플 데이터
        { title: "목표 1", category: "건강", likeCount: 10, id: 1 },
        { title: "목표 2", category: "학습", likeCount: 20, id: 2 },
        { title: "목표 3", category: "취미", likeCount: 5, id: 3 },
        // 추가 샘플 데이터
      ],
    };
  },

  methods: {
    goToResolutionDetail(resolution) {
      // 클릭한 목표의 상세 페이지로 네비게이션
      this.$router.push(`/resolution/${resolution.id}`);
      console.log('상세 페이지로 이동:', resolution.title);
    },
    // eslint-disable-next-line no-unused-vars
    searchResolutions(query) {
      // 검색 로직 구현
    }

  },
};
</script>

<style src="../../assets/css/resolution/ResolutionList.css" lang="css"></style>
