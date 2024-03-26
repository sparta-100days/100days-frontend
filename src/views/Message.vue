<template>
  <div class="message-container">
    <div class="side-message-menu">
      <ul>
        <li @click="selectMenu('write')">쪽지 작성</li>
        <li @click="selectMenu('sent')">보낸 쪽지함</li>
        <li @click="selectMenu('received')">받은 쪽지함</li>
        <li @click="selectMenu('admin')">관리자에게 받은 쪽지함</li>
      </ul>
    </div>
    <div class="main-content">
      <div v-if="selectedMenu === 'write'">
        <h2>쪽지 작성</h2>
        <form @submit.prevent="submitMessage">
          <div class="form-group">
            <label for="title">제목:</label>
            <input type="text" id="title" v-model="message.title" required>
          </div>
          <div class="form-group">
            <label for="receiverNickname">받는 사람 닉네임:</label>
            <input type="text" id="receiverNickname" v-model="message.receiverNickname" required>
          </div>
          <div class="form-group">
            <label for="content">내용:</label>
            <textarea id="content" v-model="message.content" required></textarea>
          </div>
          <button type="submit" class="submit-btn">보내기</button>
        </form>

      </div>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      selectedMenu: "write",
      message: {
        title: "",
        receiverNickname: "",
        content: "",
      },
    };
  },
  methods: {
    selectMenu(menu) {
      this.selectedMenu = menu;
    },
    summitMessage() {
      // 여기에 쪽지 전송 구현
      alert("쪽지가 전송되었습니다.");
      //초기화
      this.message.title = "";
      this.message.receiverNickname = "";
      this.message.content = "";
    },
  },
};
</script>


<style>
.side-message-menu {
  flex: 1;
  margin-top: 100px;
}
.side-message-menu li {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}
.main-content {
  flex: 3;
}
</style>