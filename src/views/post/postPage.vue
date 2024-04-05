<template>
  <div class="resolution-list-background">
    <i class="fas fa-moon" id="first-moon"></i>
    <i class="fas fa-moon blur" id="first-moon-blur"></i>
    <div class="post-container">
      <div class="mainpage-resolution-box">
        <div class="main-resol-title-box">
          <h2 class="main-post-title">첫 번째 글</h2>
        </div>
        <hr />
        <div class="post-info-box">
          <a>작성자: test</a>
          <a>작성일: 2024-04-04</a>
        </div>
        <div class="post-content-box">
          <a>
            첫 번째 글의 내용입니다.
          </a>
        </div>
        <hr />
        <div class="post-comment-box">
          <a id="comment-top">댓글</a>
          <div v-for="(comment, index) in comments" :key="index" class="comment">
            <div class="comment-info">
              <a>{{ comment.author }}</a>
              <a>작성일: {{ comment.date }}</a>
            </div>
            <div class="comment-content">
              <p id="comment-content">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const comments = [
  { author: '댓글 작성자1', date: '2024-04-04', content: '댓글 내용 테스트1입니다.' },
  { author: '댓글 작성자2', date: '2024-04-04', content: '댓글 내용 테스트2입니다.' },
  // 더 많은 댓글 추가 가능
];
</script>

<style scoped lang="css">
.comment-info {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.comment-info a {
  font-size: 20px;
}
.resolution-list-background {
  overflow: auto;
}
.post-container {
  width: 800px;
  height: 950px;
  margin-top: 290px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.2);
}
.main-post-title {
  margin-left: 30px;
  font-size: 40px;
}
.post-info-box {
  display: flex;
  margin-left: 30px;
  margin-right: 30px;
  justify-content: space-between;
}
hr {
  width: 92%;
  background: rgba(197, 203, 232, 0.78);
  height: 1px;
  border: 0;
  margin-top: 50px;
}
.post-info-box,
.post-content-box a {
  font-size: 20px;
  font-weight: bold;
}

#comment-top {
  font-size: 30px;
  font-weight: bold;
}
#comment-content{
  font-size: 20px;
}
.post-content-box {
  margin-top: 50px;
  margin-left: 30px;
  margin-right: 30px;
}
.post-comment-box{
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>