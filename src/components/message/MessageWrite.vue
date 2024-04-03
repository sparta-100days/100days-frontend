<template>
  <div class="message-write-container">
    <div class="message-write-black-box">
      <div class="message-write-title">
        <h2>메세지 보내기</h2>
      </div>
        <form @submit.prevent="submitMessage">
          <input type="text" id="receiverNickname" name="nickname" class="message-submit-nickname" placeholder="아이디"
            v-model="CreateMessageRequest.receiverAccountId" required />
          <button type="button" class="search-nickname-button" @click.prevent="openSearchAccountIdByMessagesPopup">ID
            검색</button>
          <div class="form-item">
            <input type="text" id="title" name="title" class="message-submit-title" placeholder="제목"
              v-model="CreateMessageRequest.title" required />
          </div>
          <div class="form-item">
            <input type="text" id="content" name="content" class="message-submit-content" placeholder="본문"
              v-model="CreateMessageRequest.content" required />
          </div>
      <button type="submit" class="message-submit-btn">발송</button>
      </form>
      <SearchAccountIdByMessagesPopup v-if="showSearchAccountIdByMessagesPopup"
        @close="closeSearchAccountIdByMessagesPopup" />
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index";
import SearchAccountIdByMessagesPopup from "../message/SearchAccountIdByMessagePopup.vue"

export default {
  data() {
    return {
      CreateMessageRequest: {
        title: '',
        receiverAccountId: '',
        content: '',
      },
      showSearchAccountIdByMessagesPopup: false,
    };
  },
  components: {
    SearchAccountIdByMessagesPopup,
  },
  methods: {
    async submitMessage() {
      console.log(this.CreateMessageRequest)
      const response = await apiClient.post(
        "/api/messages", { title: this.CreateMessageRequest.title, receiverAccountId: this.CreateMessageRequest.receiverAccountId, content: this.CreateMessageRequest.content }
      );
      alert("쪽지가 전송되었습니다.");
      console.log(response)
    },
    openSearchAccountIdByMessagesPopup() {
      this.showSearchAccountIdByMessagesPopup = true;
    },
    closeSearchAccountIdByMessagesPopup() {
      this.showSearchAccountIdByMessagesPopup = false;
    },
  },
};
</script>

<style src="../../assets/css/message/MessageWrite.css" lang="css"></style>