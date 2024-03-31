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
                <tr v-for="(resolution, index) in displayedResolutions" :key="index" @click="goToResolutionDetail(resolution)">
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
        <button class="my-resol-btn" @click="prevPage" :disabled="currentPage <= 1">이전</button>
        <button class="my-resol-btn" @click="nextPage" :disabled="currentPage >= pageCount">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageCount: 3, // 총 페이지 수
      resolutions: [
        { title: "목표 1", category: "운동", likeCount: 10 },
        { title: "목표 2", category: "공부", likeCount: 15 },
        { title: "목표 3", category: "다이어트", likeCount: 20 },
        { title: "목표 4", category: "독서", likeCount: 5 },
        { title: "목표 5", category: "건강", likeCount: 8 },
        { title: "목표 6", category: "취미", likeCount: 12 },
        { title: "목표 7", category: "여행", likeCount: 18 },
        { title: "목표 8", category: "음악", likeCount: 3 },
        { title: "목표 9", category: "예술", likeCount: 6 },
        { title: "목표 10", category: "사업", likeCount: 14 },
        { title: "목표 11", category: "봉사활동", likeCount: 9 },
        { title: "목표 12", category: "자기계발", likeCount: 7 },
        { title: "목표 13", category: "자전거 타기", likeCount: 22 },
        { title: "목표 14", category: "수영 배우기", likeCount: 11 },
        { title: "목표 15", category: "요리 공부", likeCount: 13 },
      ],
      itemsPerPage: 10, // 페이지당 보여줄 항목 수
    };
  },
  computed: {
    displayedResolutions() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.resolutions.slice(startIndex, endIndex);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    goToResolutionDetail(resolution) {
      console.log("Go to resolution detail:", resolution);
      // 여기에 상세 페이지로 이동하는 로직을 추가하세요.
    },
  },
};
</script>

<style src="../../assets/css/user/MyInfoResolutionList.css" lang="css"></style>