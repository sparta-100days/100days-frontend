<template>
<div class="message-write-container">
  <div class="message-write-black-box">
    <div class="message-write-title">
      <h2>메세지 보내기</h2>
    </div>
      <input type="text" id="receiverNickname" name="nickname" class="message-submit-nickname" placeholder="닉네임">
      <button type="button" class="search-nickname-button">검색</button>
    <div class="form-item">
      <input type="text" id="title" name="title" class="message-submit-title" placeholder="제목">
    </div>
    <div class="form-item">
      <input type="text" id="content" name="content" class="message-submit-content" placeholder="본문">
    </div>
    <button type="button" class="message-submit-btn">발송</button>
  </div>
</div>
</template>

<script>

</script>

<style src="../../assets/css/message/MessageWrite.css" lang="css"></style>