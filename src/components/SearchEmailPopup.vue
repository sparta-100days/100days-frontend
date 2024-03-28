<template>
  <div class="search-email-popup">
    <div class="search-email-popup-content">
      <div class="search-form" :class="{ searching: isSearching }">
        <input type="text" v-model="searchText" placeholder="닉네임을 입력해주세요" required>
        <button class="search-button" @click="searchByEmail">검색</button>
      </div>
      <transition name="fade">
        <div class="search-results" v-show="showResults" ref="searchResultsContainer">
          <ul>
            <li v-for="(result, index) in searchResults" :key="result.id">
              <span class="result-text">{{ result.email }}</span>
            </li>
          </ul>
          <transition name="cursor-blink" v-if="showResults">
            <span class="search-success cursor-blink">Search Successful</span>
          </transition>
          <span class="cursor-blink">. . . []</span>
        </div>
      </transition>
      <button class="close-results-button" @click="closePopup">닫기</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      searchText: "",
      searchResults: [],
      isSearching: false,
      showResults: false,
    };
  },
  methods: {
    async searchByEmail() {
      this.isSearching = true;
      this.searchResults = [];
      // 가짜 검색 결과 예시
      setTimeout(() => {
        this.searchResults = [
          { id: 1, email: "example1@example.com" },
          { id: 2, email: "example2@example.com" },
          { id: 3, email: "example3@example.com" },
          { id: 4, email: "example3@example.com" },
          { id: 5, email: "example3@example.com" },
          { id: 6, email: "example3@example.com" },
          { id: 7, email: "example3@example.com" },
          { id: 8, email: "example3@example.com" },
          { id: 9, email: "example3@example.com" },
          { id: 10, email: "example3@example.com" },
          { id: 11, email: "example3@example.com" },
          { id: 12, email: "example3@example.com" },
          { id: 13, email: "example3@example.com" },
        ];
        this.showResults = true;
        this.isSearching = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }, 1000);

      // 임시적으로 검색 실패 시 SweetAlert2로 알림 표시
      setTimeout(() => {
        this.isSearching = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "검색 중 오류가 발생했습니다!",
        });
      }, 2000);
    },
    closePopup() {
      this.$emit("close");
    },
    scrollToBottom() {
      this.$refs.searchResultsContainer.scrollTop = this.$refs.searchResultsContainer.scrollHeight;
    },
  },
};
</script>

<style src="../assets/css/user/SearchEmail.css" lang="css"></style>