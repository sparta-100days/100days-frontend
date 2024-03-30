<template>
  <div class="main-report">
    <div class="container mx-auto p-8">
      <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
        <div class="md:flex">
          <div class="w-full p-5">
            <div class="text-center mb-6">
              <h3 class="report-title">유저 신고하기</h3>
            </div>
            <div>
              <label class="report-status" for="category">신고 상태</label>
              <select id="category" class="report-status-category">
                <option>SPAM</option>
                <option>HARMFUL</option>
                <option>ILLEGAL</option>
              </select>
            </div>
            <div>
              <label class="report-nickname" for="nickname">닉네임</label>
              <input class="report-nickname-text" id="nickname" type="text" placeholder="Enter your nickname">
            </div>
            <div>
              <label class="report-content" for="report-content">신고할 내용</label>
              <textarea class="report-content-text" rows="10" id="report-content"
                placeholder="Describe the issue"></textarea>
            </div>
            <div class="report-button">
              <button class="report-button-text" type="button">
                신고하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "./index.js"

export default {
  data() {
    return {
      report: [],
      selectedMenu: '',
    };
  },
  mounted() {
  },

  methods: {

  },
};
</script>

<style>
/* Additional styles */
.main-report {
  max-width: 350px;
  width: 100%;
  margin: 100px 50px 50px 80px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 30px;
  left: 600px;
  color: rgb(65, 35, 95);
}

.container {
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .1);
}

h3 {
  color: #333;
  margin: 10px;
}

label {
  margin-bottom: .5rem;
}

.report-status,
.report-nickname,
.report-content {
  margin: 1000px 10px 10px 10px;
  padding: 10px;
}

.report-content-text {
  width: 85%;
  margin: 15px;
}

input[type="text"],
textarea,
select {
  background-color: #edf2f7;
  color: #1a202c;
  margin: 15px;
  border: 2px solid #edf2f7;
  /* Slightly thicker border for better visual appeal */
  transition: border-color .3s, box-shadow .3s;
  /* Smooth transition for focus states */
}

.report-button-text {
  width: 85%;
  margin: 15px;
  height: 45px;
  background-color: rgb(255, 176, 176);
  border: 2px solid #edf2f7;
  border-radius: 10px;

}
</style>