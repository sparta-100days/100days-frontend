<template>
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
  // 메세지 디테일 연결?
</template>

<script>

</script>


<style scoped lang="css">

</style>