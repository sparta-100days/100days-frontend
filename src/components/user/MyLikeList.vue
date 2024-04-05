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
                  <td>{{ like.likeCount }}</td>
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
        { resolution: { title: "추후 구현 예정입니다.", category: "아래는 더미입니다."}, likeCount: 10 },
        { resolution: { title: "하루에 운동 30분", category: "운동" }, likeCount: 15 },
        { resolution: { title: "책 한달에 10권 읽기", category: "독서" }, likeCount: 5 },
        { resolution: { title: "만보계", category: "운동" }, likeCount: 8 },
        { resolution: { title: "간식 안먹기대회", category: "다이어트" }, likeCount: 2 },
        { resolution: { title: "영어 하루 1시간 회화", category: "공부" }, likeCount: 3 },
        { resolution: { title: "청소잘하시나요?", category: "생활" }, likeCount: 22 },
        { resolution: { title: "코딩공부하기", category: "공부" }, likeCount: 28 },
        { resolution: { title: "자전거 타고 10km", category: "운동" }, likeCount: 30 },
        { resolution: { title: "독서감상회", category: "독서" }, likeCount: 1 },
        { resolution: { title: "물 하루에 5잔마시기", category: "생활" }, likeCount: 7 },
        { resolution: { title: "일찍 잘 사람 구함", category: "생활" }, likeCount: 5 },
        { resolution: { title: "하루 한끼 요리하기", category: "생활" }, likeCount: 3 },
        { resolution: { title: "책 1주 1권", category: "독서" }, likeCount: 15 },
        { resolution: { title: "시험공부 합시다.", category: "공부" }, likeCount: 12 },
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

<style src="../../assets/css/user/MyLikeList.css" lang="css"></style>