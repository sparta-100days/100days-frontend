<template>
  <div class="message-container">
    <div class="side-message-menu">
      <ul>
        <p @click="selectMenu('write')">쪽지 작성</p>
        <p @click="selectMenu('sent')">보낸 쪽지함</p>
        <p @click="selectMenu('received')">받은 쪽지함</p>
        <p @click="selectMenu('admin')">관리자에게 받은 쪽지함</p>
      </ul>
    </div>
    <div class="main-content">
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
      <div class="table-form" v-if="selectedMenu === 'sent'">
        <h2>보낸 쪽지함</h2>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="selectAll" @click="toggleSelectAll" />
              </th>
              <th>받는사람</th>
              <th>제목</th>
              <th>보낸 날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(message, index) in sendMessages" :key="index" @click="selectMessage(message)">
              <td>
                <input type="checkbox" v-model="message.selected" @click.stop />
              </td>
              <td>{{ message.receiverNickname }}</td>
              <td>{{ message.title }}</td>
              <td>{{ message.sentAt }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="deleteSendMessages(sendMessage.id)">선택된 쪽지 삭제</button>
      </div>
      <div class="table-form" v-if="selectedMenu === 'received'">
        <h2>받은 쪽지함</h2>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="selectAll" @click="toggleSelectAll" />
              </th>
              <th>보낸사람</th>
              <th>제목</th>
              <th>받은 날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(message, index) in receiveMessages" :key="index" @click="selectMessage(message)">
              <td>
                <input type="checkbox" v-model="message.selected" @click.stop />
              </td>
              <td>{{ message.senderNickname }}</td>
              <td>{{ message.title }}</td>
              <td>{{ message.sentAt }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="deleteData()">선택된 쪽지 삭제</button>
      </div>
      <div class="table-form" v-if="selectedMenu === 'admin'">
        <h2>관리자 쪽지</h2>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="selectAll" @click="toggleSelectAll" />
              </th>
              <th>보낸사람</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(message, index) in adminMessages" :key="index" @click="selectMessage(message)">
              <td>
                <input type="checkbox" v-model="message.selected" @click.stop />
              </td>
              <td>{{ message.senderNickname }}</td>
              <td>{{ message.title }}</td>
              <td>{{ message.sentAt }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="deleteData()">선택된 쪽지 삭제</button>
      </div>
      <div class="message-detail" v-if="selectedMenu === 'detail' && selectedMessage">
        <h2>쪽지 상세보기</h2>
        <div><strong>작성자:</strong> {{ selectedMessage.senderNickname || 'N/A' }}</div>
        <div><strong>수신자:</strong> {{ selectedMessage.receiverNickname || 'N/A' }}</div>
        <div><strong>전송 시간:</strong> {{ selectedMessage.sentAt }}</div>
        <hr>
        <h3>{{ selectedMessage.title }}</h3>
        <p>{{ selectedMessage.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from '../index';

export default {
  data() {
    return {
      selectedMenu(menu) {
        this.selectedMenu = menu;
      },
      message: [],

      CreateMessageRequest: {
        title: '',
        receiverNickname: '',
        content: '',
      },
      sendMessages: [
        {
          id: '',
          receiverNickname: '',
          title: '',
          content: '',
          sentAt: '',
          readStatus: false,
        },
      ],
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
      selectedMessage: '',
      selectAll: false,
    };
  },
  mounted() {
    this.sendMessage();
    this.receiverMessage();
    this.adminMessage();
  },
  methods: {
    selectMenu(menu) {
      this.selectedMenu = menu;
    },
    async summitMessage() {
      const response = await apiClient.post(
        "/api/messages", { title: this.CreateMessageRequest.title, receiverNickname: this.CreateMessageRequest.receiverNickname, content: this.CreateMessageRequest.content }
      );
      alert("쪽지가 전송되었습니다.");
      console.log(response)
      localStorage.setItem(response.data)
    },
    async sendMessage() {
      const response = await apiClient.get(
        "/api/messages/sender"
      );
      this.sendMessages = response.data.content
    },
    async receiverMessage() {
      const response = await apiClient.get(
        "/api/messages/receiver"
      );
      this.receiveMessages = response.data.content
    },
    async adminMessage() {
      const response = await apiClient.get(
        "/api/messages/admins"
      );
      this.adminMessages = response.data.content
    },
    async deleteSendMessages(id) {
      try {
        const response = await apiClient.delete(
          `/api/messages/${id}`
        )
        this.sendMessage = this.sendMessage.filter(sendMessage => sendMessage.id !== id)
      } catch (Error) {
        console.error('실패했습니다.', Error);
      }
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
      // this.sentMessages.forEach((message) => {
      //   message.selected = this.selectAll;
      // });
    },
    selectMessage(message) {
      this.selectedMessage = message;
      this.selectedMenu = "detail";
    },
    deleteSelectedMessages() {
      this.sentMessages = this.sentMessages.filter(
        (message) => !message.selected
      );
    },
  },
};
</script>

<style src="@/assets/css/message/Message.css" lang="css"></style>
