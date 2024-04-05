<template>
  <div class="create-resolution-background">
    <i class="fas fa-moon" id="second-moon"></i>
    <i class="fas fa-moon blur" id="second-moon-blur"></i>
    <div class="post-ranking-container">
      <div class="ranking-top">
        <h2>인기 목표 랭킹</h2>
      </div>
      <div class="ranking-header">
        <span class="header-rank">순위</span>
        <span class="header-title">목표 제목</span>
        <span class="header-category">카테고리</span>
        <span class="header-like">좋아요</span>
      </div>
      <div v-for="(resolution, index) in resolutions" :key="index" class="ranking-item">
        <div class="ranking-info">
          <span class="ranking-number">{{ index + 1 }}</span>
          <span class="goal-title">{{ resolution.title }}</span>
          <span class="goal-category">{{ resolution.category }}</span>
          <span class="goal-likes">{{ resolution.likeCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { apiClient } from "@/index";

const resolutions = ref([
  { title: '목표 제목 1', category: '카테고리 1', likeCount: 32, id: 1 },
  { title: '목표 제목 2', category: '카테고리 2', likeCount: 25, id: 2 },
  { title: '목표 제목 3', category: '카테고리 3', likeCount: 23, id: 3 },
  { title: '목표 제목 4', category: '카테고리 1', likeCount: 19, id: 4 },
  { title: '목표 제목 5', category: '카테고리 2', likeCount: 16, id: 5 },
  { title: '목표 제목 6', category: '카테고리 3', likeCount: 12, id: 6 },
  { title: '목표 제목 7', category: '카테고리 1', likeCount: 9, id: 7 },
  { title: '목표 제목 8', category: '카테고리 2', likeCount: 6, id: 8 },
  { title: '목표 제목 9', category: '카테고리 3', likeCount: 5, id: 9 },
  { title: '목표 제목 10', category: '카테고리 1', likeCount: 4, id: 10 }
]);

// onMounted(async () => {
//   try{
//     const response = await apiClient.get("/api/v1/resolution/ranking");
//     resolutions.value = await response.data;
//   } catch (error) {
//     console.log(error);
//   }
// });
</script>


<style scoped lang="css">
.ranking-header {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
  height: 20px;
  background-color: rgba(79, 79, 79, 0.2);
  padding: 10px;
  margin-top: 10px;
  font-weight: bold;
}
.ranking-top h2 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
  margin-top: -10px;
}
.ranking-item {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px;
  margin-top: 10px;
}
.ranking-info {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
  height: 20px;
}
.header-rank,
.ranking-number {
  font-weight: bold;
}
.header-title,
.goal-title {
  flex: 2;
  margin-left: 10px;
}
.header-category,
.goal-category {
  flex: 1.5;
  margin-left: 10px;
}
.header-like,
.goal-likes {
  flex: 1;
  margin-left: 5px;
  margin-right: -10px;
}
.post-ranking-container {
  max-width: 350px;
  width: 100%;
  height: 600px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5); /* 투명도 조정 */
  padding: 30px;
  text-align: center;
  position: relative;
  z-index: 0; /* 로그인 버튼 위에 보이도록 */
  margin-left: 30px;
  margin-top: 70px;
}
</style>