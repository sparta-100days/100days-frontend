<template>
  <div class="board-container">
    <div class="board-header">나의 기록들</div>
    <div class="board-content">
      <ul>
        <li
          v-for="post in posts"
          :key="post.id"
          @click="showPostDetails(post)"
          class="post-item"
        >
          <div class="post-date">{{ formatDate(post.date) }}</div>
          <div class="post-info">
            <div class="post-title">{{ truncateText(post.title, 20) }}</div>
            <div class="post-content">{{ truncateText(post.content, 50) }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const posts = ref([
  {
    id: 1,
    title: "첫 번째 글",
    content: "첫 번째 글의 내용입니다.",
    author: "작성자1",
    date: "2024-03-31",
  },
  {
    id: 2,
    title: "두 번째 글",
    content: "두 번째 글의 내용입니다.",
    author: "작성자2",
    date: "2024-04-01",
  },
  {
    id: 3,
    title: "세 번째 글",
    content: "세 번째 글의 내용입니다.",
    author: "작성자3",
    date: "2024-04-02",
  },
]);

const router = useRouter();

const showPostDetails = (post) => {
  // 해당 게시글의 상세 페이지로 이동
  router.push(`/posts/${post.id}`);
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};
</script>

<style src="@/assets/css/post/PostList.css" lang="css"></style>
