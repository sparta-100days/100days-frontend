<template>
  <div class="main-view">
    <div class="section section1">
      <video class="background-video" autoplay loop muted @click="handleVideoClick">
        <source src="@/assets/img/13495-248644905.mp4" type="video/mp4">
      </video>
      <div class="overlay">
        <h1>작심백일</h1>
        <p>이루고 싶은 목표가 무엇인가요? </p>
      </div>
    </div>
    <div class="section section2">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleVideoClick() {
    }
  }
};
</script>

<style src="../assets/css/Main.css" lang="css"></style>
