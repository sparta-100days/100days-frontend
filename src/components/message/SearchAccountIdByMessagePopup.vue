<template>
    <div class="search-accountId-popup">
      <div class="search-accountId-popup-content">
        <div class="search-accountId-form" :class="{ searching: isSearching }">
          <input type="text" v-model="nickname" placeholder="닉네임을 입력해주세요" required>
          <button class="search-accountId-button" @click="searchByAccountId">검색</button>
        </div>
        <transition name="fade">
          <div class="search-accountId-results" v-show="showAccountId" ref="searchResultsContainer">
            <table>
              <thead>
              <tr>
                <th>계정 아이디</th>
                <th>닉네임</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(result, index) in AccountSearchResponse" :key="index">
                <td>{{ result.accountId }}</td>
                <td>{{ result.nickname }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </transition>
        <button class="close-results-accountId-button" @click="closePopup">닫기</button>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  import { apiClient } from "@/index";
  
  export default {
    data() {
      return {
        nickname: "",
        accountId:'',
        AccountSearchResponse: [], // 배열로 변경
        showAccountId: false,
        isSearching: false,
      };
      
    },
    methods: {
      async searchByAccountId() {
        try {
          this.isSearching = true;
          const response = await apiClient.get(
            `/api/users/searchAccountId`,
            {
            params: { nickname: this.nickname }, // 검색어를 쿼리 파라미터로 전달
          });
          this.AccountSearchResponse = response.data; // 서버에서 받은 검색 결과 설정
          this.showAccountId = true;
          this.isSearching = false;
        } catch (error) {
          console.error(error);
          this.isSearching = false;
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "검색 중 오류가 발생했습니다!",
          });
        }
      },
      closePopup() {
        this.$emit("close");
      },
    },
  };
  </script>
  
<style>
.search-accountId-popup {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
}

.search-accountId-popup-content {
    background: white;
    padding: 20px;
    border-radius: 3px;
    width: 500px; /* 적당한 너비 설정 */
    height: 400px; /* 세로 길이 조정 */
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 검색 버튼이 항상 최하단에 붙도록 */
}

.close-results-accountId-button {
    width: 100%;
    height: 50px;
    padding: 10px;
    margin-top: 10px;
    background-color: #ffb0b0;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: background-color 0.5s ease;
}

.search-accountId-results {
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    width: 500px;
    max-height: 400px;
    overflow-y: auto;
    border-radius: 10px;
}

.search-accountId-button {
    width: 40%;
}

.search-accountId-form input[type="text"] {
    width: 80%;
    height: 24px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    flex: 1;
    margin-right: 10px;
    background-color: white;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;
}

.search-accountId-results th,
.search-accountId-results td {
    padding: 8px; /* 셀 안의 내용과 여백 조정 */
    text-align: center; /* 셀 내용을 가운데 정렬 */
}

.search-accountId-results table {
    width: 100%;
    text-align: center; /* 표 전체를 가운데 정렬 */
}

</style>