
<template>
  <div class="resolution-list">
    <h2>목표 목록</h2>
    <ul>
      <li v-for="resolution in testList" :key="resolution.id">
        <p class="resolution-info">
          {{ resolution.title }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testList: [
        { title: "test1", category: "test1", likeCount: 1 },
        { title: "test2", category: "test2", likeCount: 2 },
        { title: "test3", category: "test3", likeCount: 3 },
      ],
    };
  },
};
</script>

<style src="../assets/css/ResolutionList.css" lang="css"></style>
