<template>
  <div class="message-receive-container">
    <div class="message-receive-black-box">
      <div class="message-receive-title">
        <h2>받은 쪽지함</h2>
      </div>
      <div class="message-receive-list-box">
        <div class="receive-list-container">
          <div class="message-receive-table-container">
            <button @click="" class="message-delete-btn">삭제</button>
            <table class="receive-table">
              <thead>
              <tr>
                <th>
                  <input type="checkbox" v-model="selectAll" @click="toggleSelectAll" />
                </th>
                <th>보낸사람</th>
                <th class="title-section">제목</th>
                <th>받은날짜</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(message, index) in receiveMessages" :key="index" @click="selectMessage(message)">
                <td>
                  <input type="checkbox" v-model="message.selected" @click.stop />
                </td>
                <td colspan="ellipsis">{{ message.senderNickname }}</td>
                <td>{{ message.title }}</td>
                <td>{{ message.sentAt }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="message-receive-pagination-container">
        <button @click="prevPage" :disabled="currentPage <= 1">이전</button>
        <button @click="nextPage" :disabled="currentPage >= pageCount">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index"

export default {
  data() {
    return {
      currentPage: 1,
      pageCount: 3,
      message: [],
      itemsPerPage: 10,
      receiveMessages: [
        {
          id: '',
          senderNickname: '',
          title: '',
          content: '',
          sentAt: '',
          readStatus: false,
        },
      ],
    };    
  },
  conputed: {
    receiveMessages() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.message.slice(startIndex, endIndex);
    },
    selectedMessage: null,
    selectAll: false
  },
  mounted() {
    this.receiverMessage();
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    selectMessage() {

    },
    async receiverMessage() {
      const response = await apiClient.get(
        "/api/messages/receiver"
      );
      this.receiveMessages = response.data.content
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
    },
    selectMessage(message) {
      this.selectedMessage = message;
      this.selectedMenu = this.$router.push;
    },
  },
};
</script>

<style src="@/assets/css/message/MessageReceived.css" lang="css"></style>