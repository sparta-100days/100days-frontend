<template>
  <div class="message-send-container">
    <div class="message-send-black-box">
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
                    <input type="checkbox" v-model="selectAll" @click="toggleSelectAll" />
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
                  <td colspan="ellipsis">{{ message.receiverNickname }}</td>
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
export default {
  data() {
    return {
      currentPage: 1,
      pageCount: 3,
      message: [
        { receiverNickname: "이름", title: "안녕하세요.", sentAt: 20240331 },
      ],
      itemsPerPage: 10,
    };
  },
  conputed: {
    sendMessages() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.message.slice(startIndex, endIndex);
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

    }
  },
};
</script>


<style src="@/assets/css/message/MessageSend.css" lang="css"></style>