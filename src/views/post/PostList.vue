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
import {onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import {apiClient} from "@/index";
const props = defineProps({
  resolutionId: Number,
});

const posts = ref([]);
console.log("posts");
const router = useRouter();

const showPostDetails = async (post) => {
  // 해당 게시글의 상세 페이지로 이동
  return await router.push(`/post/${post.id}`);
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
};

const truncateText = (text, maxLength) => {
  if (text == null) {
    return text;
  } else {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
};

const getPostList = async () => {
  try {
    const response = await apiClient.get(`/api/posts/${props.resolutionId}`);
    posts.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(getPostList);
</script>

<style src="@/assets/css/post/PostList.css" lang="css"></style>
