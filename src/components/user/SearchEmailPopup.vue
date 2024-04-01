<template>
  <div class="search-email-popup">
    <div class="search-email-popup-content">
      <div class="search-form" :class="{ searching: isSearching }">
        <input type="text" v-model="nickname" placeholder="닉네임을 입력해주세요" required>
        <button class="search-button" @click="searchByEmail">검색</button>
      </div>
      <transition name="fade">
        <div class="search-results" v-show="showResults" ref="searchResultsContainer">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(result, index) in EmailResponse" :key="index">
              <td>{{ result.id }}</td>
              <td>{{ result.email }}</td>
              <td>{{ result.createdAt }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </transition>
      <button class="close-results-button" @click="closePopup">닫기</button>
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
      EmailResponse: [], // 배열로 변경
      isSearching: false,
      showResults: false,
    };
  },
  methods: {
    async searchByEmail() {
      try {
        this.isSearching = true;
        const response = await apiClient.get(
          `/api/users/search/email`,
          {
          params: { nickname: this.nickname }, // 검색어를 쿼리 파라미터로 전달
        });
        this.EmailResponse = response.data; // 서버에서 받은 검색 결과 설정
        this.showResults = true;
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

<style src="../../assets/css/user/SearchEmail.css" lang="css"></style>