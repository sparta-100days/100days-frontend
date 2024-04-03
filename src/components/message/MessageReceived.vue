<template>
  <div class="message-receive-container">
    <div class="message-receive-detail" v-if="selectedMessage">
      <h2>쪽지 상세보기</h2>
      <div><strong>작성자:</strong> {{ selectedMessage.senderAccountId || 'N/A' }}</div>
      <div><strong>수신자:</strong> {{ selectedMessage.receiverAccountId || 'N/A' }}</div>
      <div><strong>전송 시간:</strong> {{ selectedMessage.sentAt }}</div>
      <hr>
      <h3>{{ selectedMessage.title }}</h3>
      <p>{{ selectedMessage.content }}</p>
      <button @click="selectedMessage = null">목록으로 돌아가기</button>
    </div>
    <div v-else class="message-receive-black-box">
      <div class="message-receive-title">
        <h2>받은 쪽지함</h2>
      </div>
      <div class="message-receive-list-box">
        <div class="receive-list-container">
          <div class="message-receive-table-container">
            <table class="receive-table">
              <thead>
              <tr>
                <th>
                  <input type="checkbox" v-model="selectAll" @click.stop="toggleSelectAll" />
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
                <td>{{ message.senderAccountId }}</td>
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
          senderAccountId: '',
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
    receiveMessages() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.message.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.receiverMessage();
  },
  watch: {
    // 개별 메시지 선택 상태를 감시하여 전체 선택 체크박스 상태 업데이트
    receiveMessages: {
      handler(newMessages) {
        this.selectAll = newMessages.every(message => message.selected);
      },
      deep: true,
    },
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
      this.receiveMessages.forEach(message => {
        message.selected = this.selectAll;
      });
    },
    selectMessage(message) {
      this.selectedMessage = message;
      this.selectedMenu = 'detail';
    },
  },
};
</script>

<style src="@/assets/css/message/MessageReceived.css" lang="css"></style>