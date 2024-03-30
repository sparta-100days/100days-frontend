<template>
  <div class="write-form" v-if="selectedMenu === 'write'">
    <h2>쪽지 작성</h2>
    <form @submit.prevent="summitMessage">
      <div class="info-box">
        <div class="form-group">
          <label for="receiverNickname">받는 사람 닉네임</label>
          <input type="text" id="receiverNickname" v-model="CreateMessageRequest.receiverNickname" required />
          <label for="title">제목</label>
          <input type="text" id="title" v-model="CreateMessageRequest.title" required />
          <label for="content">내용</label>
          <textarea rows="10" id="content" v-model="CreateMessageRequest.content" required></textarea>
        </div>
      </div>
      <button type="submit" class="submit-btn">보내기</button>
    </form>
  </div>
</template>

<script>

</script>

<style scoped lang="css">

</style>