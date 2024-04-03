<template>
  <div class="message-send-container">
    <div class="message-sender-detail" v-if="selectedMessage">
      <h2>쪽지 상세보기</h2>
      <div><strong>작성자:</strong> {{ selectedMessage.senderAccountId || 'N/A' }}</div>
      <div><strong>수신자:</strong> {{ selectedMessage.receiverAccountId || 'N/A' }}</div>
      <div><strong>전송 시간:</strong> {{ selectedMessage.sentAt }}</div>
      <hr>
      <h3>{{ selectedMessage.title }}</h3>
      <p>{{ selectedMessage.content }}</p>
      <button @click="selectedMessage = null">목록으로 돌아가기</button>
    </div>
    <div v-else class="message-send-black-box">
      <div class="message-send-title">
        <h2>보낸 쪽지함</h2>
      </div>
      <div class="message-send-list-box">
        <div class="send-list-container">
          <div class="message-send-table-container">
            <button @click="" class="message-delete-btn">삭제</button>
            <table class="send-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" v-model="selectAll" class="messages-all" @click="toggleSelectAll" />
                  </th>
                  <th>받는사람</th>
                  <th class="title-section">제목</th>
                  <th>보낸날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(message, index) in sendMessages" :key="index" @click="selectMessage(message)">
                  <td>
                    <input type="checkbox" v-model="message.selected" @click.stop />
                  </td>
                  <td colspan="ellipsis">{{ message.receiverAccountId }}</td>
                  <td>{{ message.title }}</td>
                  <td>{{ message.sentAt }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="message-send-pagination-container">
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
      sendMessages: [
        {
          id: '',
          receiverAccountId: '',
          title: '',
          content: '',
          sentAt: '',
          readStatus: false,
        },
      ],
      selectedMessage: null,
      selectAll: false,
    };
  },
  conputed: {
    sendMessages() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.message.slice(startIndex, endIndex);
    },
    selectedMessage: null,
    selectAll: false
  },
  mounted() {
    this.sendMessage();
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
    async sendMessage() {
      const response = await apiClient.get(
        "/api/messages/sender"
      );
      this.sendMessages = response.data.content
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
      this.sentMessages.forEach((message) => {
        message.selected = this.selectAll;
      });
    },
    selectMessage(message) {
      this.selectedMessage = message;
      this.selectedMenu = "detail";
    },
  },
};
</script>


<style src="@/assets/css/message/MessageSend.css" lang="css"></style>