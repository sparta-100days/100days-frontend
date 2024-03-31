<template>
  <div class="message-admin-container">
    <div class="message-admin-detail" v-if="selectedMessage">
      <h2>쪽지 상세보기</h2>
      <div><strong>작성자:</strong> {{ selectedMessage.senderNickname || 'N/A' }}</div>
      <div><strong>수신자:</strong> {{ selectedMessage.receiverNickname || 'N/A' }}</div>
      <div><strong>전송 시간:</strong> {{ selectedMessage.sentAt }}</div>
      <hr>
      <h3>{{ selectedMessage.title }}</h3>
      <p>{{ selectedMessage.content }}</p>
      <button @click="selectedMessage = null">목록으로 돌아가기</button>
    </div>
    <div v-else class="message-admin-black-box">
      <div class="message-admin-title">
        <h2>관리자 쪽지</h2>
      </div>
      <div class="message-admin-list-box">
        <div class="admin-list-container">
          <div class="message-admin-table-container">
            <button @click="" class="message-delete-btn">삭제</button>
            <table class="admin-table">
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
              <tr v-for="(message, index) in senderMessages" :key="index" @click="selectMessage(message)">
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
      <div class="message-admin-pagination-container">
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
      adminMessages: [
        {
          id: '',
          receiverNickname: '',
          title: '',
          content: '',
          sentAt: '',
          readStatus: false,
        },
      ],
    };
  },
  conputed: {
    adminMessages() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.message.slice(startIndex, endIndex);
    },
    selectedMessage: null,
    selectAll: false
  },
  mounted() {
    this.adminMessage();
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
    async adminMessage() {
      const response = await apiClient.get(
        "/api/messages/admins"
      );
      this.adminMessages = response.data.content
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
    },
    selectMessage(message) {
      this.selectedMessage = message;
      this.selectedMenu = "detail";
    },
  },
};
</script>

<style src="@/assets/css/message/MessageAdmin.css" lang="css"></style>