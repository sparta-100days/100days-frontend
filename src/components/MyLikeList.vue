<template>
  <div class="myinfo-like-list-container">
    <div class="myinfo-like-list-black-box">
      <div class="myinfo-like-list-title">
        <h2>좋아요 한 목표 리스트</h2>
      </div>
      <div class="myinfo-like-list-box">
        <div class="like-list-container">
          <div class="myinfo-like-table-container">
            <table class="like-table">
              <thead>
                <tr>
                  <th>제목</th>
                  <th>카테고리</th>
                  <th>좋아요</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(like, index) in displayedLikes" :key="index" @click="goToLikeDetail(like)">
                  <td class="ellipsis">{{ like.resolution.title }}</td>
                  <td>{{ like.resolution.category }}</td>
                  <td>{{ like.likeCount.likeCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="my-like-pagination-container">
        <button @click="prevPage" :disabled="currentPage <= 1">이전</button>
        <button @click="nextPage" :disabled="currentPage >= pageCount">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageCount: 3,
      likes: [
        { resolution: { title: "목표 1", category: "운동" }, likeCount: 10 },
        { resolution: { title: "목표 2", category: "공부" }, likeCount: 15 },
        { resolution: { title: "목표 3", category: "다이어트" }, likeCount: 20 },
      ],
      itemsPerPage: 10,
    };
  },
  computed: {
    displayedLikes() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.likes.slice(startIndex, endIndex);
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
    goToLikeDetail(like) {
      console.log("go to like detail:", like);
    },
  },
};
</script>

<style src="../assets/css/user/MyLikeList.css" lang="css"></style>