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
              <label for="receiverNickname">받는 사람 닉네임:</label>
              <input
                type="text"
                id="receiverNickname"
                v-model="CreateMessageRequest.receiverNickname"
                required
              />
              <label for="title">제목</label>
              <input type="text" id="title" v-model="CreateMessageRequest.title" required />
              <label for="content">내용:</label>
            <textarea
              id="content"
              v-model="CreateMessageRequest.content"
              required
            ></textarea>
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
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @click="toggleSelectAll"
                />
              </th>
              <th>받는사람</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(message, index) in sentMessages"
              :key="index"
              @click="selectMessage(message)"
            >
              <td>
                <input type="checkbox" v-model="message.selected" @click.stop />
              </td>
              <td>{{ message.receiverNickname }}</td>
              <td>{{ message.title }}</td>
              <td>{{ message.date }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="deleteSelectedMessages">선택된 쪽지 삭제</button>
      </div>
      <div class="table-form" v-if="selectedMenu === 'received'">
        <h2>받은 쪽지함</h2>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @click="toggleSelectAll"
                />
              </th>
              <th>보낸사람</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(message, index) in receivedMessages"
              :key="index"
              @click="selectMessage(message)"
            >
              <td>
                <input type="checkbox" v-model="message.selected" @click.stop />
              </td>
              <td>{{ message.senderNickname }}</td>
              <td>{{ message.title }}</td>
              <td>{{ message.date }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="deleteSelectedMessages">선택된 쪽지 삭제</button>
      </div>
      <div class="table-form" v-if="selectedMenu === 'admin'">
        <h2>관리자 쪽지</h2>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @click="toggleSelectAll"
                />
              </th>
              <th>보낸사람</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(message, index) in adminMessages"
              :key="index"
              @click="selectMessage(message)"
            >
              <td>
                <input type="checkbox" v-model="message.selected" @click.stop />
              </td>
              <td>{{ message.senderNickname }}</td>
              <td>{{ message.title }}</td>
              <td>{{ message.date }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="deleteSelectedMessages">선택된 쪽지 삭제</button>
      </div>
      <div class="message-detail" v-if="selectedMenu === 'detail' && selectedMessage">
        <h2>쪽지 상세보기</h2>
        <div><strong>작성자:</strong> {{ selectedMessage.senderNickname || 'N/A' }}</div>
        <div><strong>수신자:</strong> {{ selectedMessage.receiverNickname || 'N/A' }}</div>
        <div><strong>전송 시간:</strong> {{ selectedMessage.date }}</div>
        <hr>
        <h3>{{ selectedMessage.title }}</h3>
        <p>{{ selectedMessage.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from '.';

export default {
  data() {
    return {
      selectedMenu(menu) {
        this.selectedMenu = menu;
      },
    
      CreateMessageRequest: {
        title: '',
        receiverNickname: '',
        content: '',
      },
      sentMessages: [
        {
          id: 1,
          receiverNickname: "test_member",
          title: "test_title",
          content: "test_content",
          date: "24-03-26 [13:40]",
          selected: false,
        },
      ],
      receivedMessages: [
        {
          id: 2,
          senderNickname: "test_member",
          title: "test_title",
          content: "test_content",
          date: "24-03-26 [13:40]",
          selected: false,
        },
      ],
      adminMessages: [
        {
          id: 3,
          senderNickname: "test_member",
          title: "test_title",
          content: "test_content",
          date: "24-03-26 [13:40]",
          selected: false,
        },
      ],
      selectedMessage: null,
      selectAll: false,
    };
  },
  methods: {
    selectMenu(menu) {
      this.selectedMenu = menu;
    },
    async summitMessage() {
      const response = await apiClient.post(
        "/api/messages",{title: this.CreateMessageRequest.title, receiverNickname: this.CreateMessageRequest.receiverNickname, content: this.CreateMessageRequest.content}
      );
      alert("쪽지가 전송되었습니다.");
      console.log(response)
      localStorage.setItem(response.data)
      // //초기화
      // this.message.title = "";
      // this.message.receiverNickname = "";
      // this.message.content = "";
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
    deleteSelectedMessages() {
      this.sentMessages = this.sentMessages.filter(
        (message) => !message.selected
      );
    },
  },
};
</script>

<style>
.message-container {
  display: grid;
  grid-template-columns: 15% 60%;
  height: 100%;
}

.side-message-menu {
  margin: 100px;
  width: 200px;
  border-right: 1px solid #eee;
  cursor: pointer;
}
.side-message-menu p {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #f1e2d9;
}
.main-content {
  margin: 100px 100px 100px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.form-group label{
  color: rebeccapurple;
}

.info-box {
  display: flex;
  justify-content: flex-start;
  border: none;
}
.table-form {
  width: 80%;
}

.table-form table {
  width: 100%;
  border-collapse: collapse;
}

.table-form th,
.table-form td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

.table-form th {
  background-color: #f2f2f2;
}
.table-form tr {
  cursor: pointer;
}
.table-form tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table-form tr:hover {
  background-color: #eaeaea;
}

.table-form button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.table-form button:hover {
  background-color: #45a049;
}
.table-form th:first-child,
.table-form td:first-child {
  width: 30px;
  text-align: center;
}
.table-form th:nth-child(2),
.table-form td:nth-child(2) {
  width: 150px;
}
.table-form th:nth-child(4),
.table-form td:nth-child(4) {
  width: 150px;
}
</style>
