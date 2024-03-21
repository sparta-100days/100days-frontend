
<template>
  <div class="resolution-list">
    <h2>목표 목록</h2>
    <ul>
      <li v-for="resolution in testList" :key="resolution.id">
        <p class="resolution-info">
          <router-link :to="`/resolutions/${resolution.id}`">{{ resolution.title }}</router-link>
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
        { title: "test1", category: "test1", likeCount: 1, id: 1 },
        { title: "test2", category: "test2", likeCount: 2, id: 2 },
        { title: "test3", category: "test3", likeCount: 3, id: 3 },
      ],
    };
  },
};
</script>

<style src="../../assets/css/resolution/ResolutionList.css" lang="css"></style>
