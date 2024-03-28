<template>
  <div class="mypage-container">
    <div class="side-mypage-menu">
      <ul>
        <li @click="selectMenu('my-resolution-list')">목표 리스트</li>
        <li @click="selectMenu('my-like-list')">좋아요 리스트</li>
        <li @click="selectMenu('my-password-update')">비밀번호 변경</li>
        <li @click="selectMenu('my-profile')">회원 정보 조회</li>
        <li @click="selectMenu('my-profile-update')">회원 정보 수정</li>
        <li @click="selectMenu('my-profile-delete')">회원 탈퇴</li>
      </ul>
    </div>
    <div class="my-pagelist-container">
      <div class="my-resolution-form" v-if="selectedMenu === 'my-resolution-list'">
        <h2>본인이 올린 목표 리스트</h2>
        <form class="my-resolution-list-box">
          <div class="resolution-list-container">
            <ul class="resolution-list">
              <li v-for="(resolution, index) in resolutions" :key="index" @click="goToResolutionDetail(resolution)">
                <h3>{{ resolution.title }}</h3>
                <p>카테고리: {{ resolution.category }}</p>
                <p>좋아요: {{ resolution.likeCount }}</p>
              </li>
            </ul>
          </div>
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage <= 1">이전</button>
            <button @click="nextPage" :disabled="currentPage >= pageCount">다음</button>
          </div>
        </form>
      </div>
      <div class="my-like-form" v-if="selectedMenu === 'my-like-list'">
        <h2>본인이 누른 좋아요 리스트</h2>
        <form class="my-like-list-box">
          <div class="like-list-container">
            <ul class="like-list">
              <li v-for="(like, index) in likes" :key="index" @click="goToLikeDetail(like)">
                <h3>{{ like.resolution.title }}</h3>
                <p>카테고리: {{ like.resolution.category }}</p>
                <!-- <p>좋아요: {{ like.likeCount }}</p> -->
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div class="my-password-form" v-if="selectedMenu === 'my-password-update'">
        <h2>비밀번호 변경</h2>
        <form class="my-password-box">
          <div class="my-password-container">
            <label for="updated-password">패스워드</label>
            <input type="text" id="update-password" v-model="UserPasswordRequest.password" required>
          </div>
          <div class="my-password-container">
            <label for="updated-password">패스워드 다시 입력해주세요!</label>
            <input type="text" id="update-password" v-model="UserPasswordRequest.newPassword" required>
            <button class="password-update-button" type="submit" @click="updateUserPassword(newPassword)">
              수정하기
            </button>
          </div>
        </form>
      </div>
      <div class="my-profile-form" v-if="selectedMenu === 'my-profile'">
        <h2>회원 정보 조회</h2>
        <form class="my-profile-box">
          <div class="profile-container">
            <div class="profile-list">
              <p>이메일: {{ user.email }}</p>
              <p>닉네임: {{ user.nickname }}</p>
              <p>생일: {{ user.birth }}</p>
            </div>
          </div>
        </form>
      </div>
      <div class="my-profile-update-form" v-if="selectedMenu === 'my-profile-update'">
        <h2>회원 정보 수정</h2>
        <div class="profile-text-align">
          <form class="my-profile-update-box" @submit.prevent="updateProfile">
            <div class="my-profile-update-container">
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mypage-form">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    비밀번호
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="비밀번호">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    @click="checkPassword('password')" type="button"> <!-- type을 button으로 변경하여 폼 제출을 방지 -->
                    확인
                  </button>
                  <p v-show="errorEmail" class="input-error">
                    비밀번호가 맞지 않습니다.
                  </p>
                </div>
                <div class="mypage-form">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="nickname">
                    닉네임
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nickname" type="text" placeholder="닉네임" v-model="user.nickname" required>
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    @click="checkDuplicate('nickname')" type="submit"> <!-- type을 button으로 변경하여 폼 제출을 방지 -->
                    중복확인
                  </button>
                  <p v-show="errorNickname" class="input-error">
                    닉네임이 중복됩니다. 다른 닉네임을 사용해주세요.
                  </p>
                </div>
                <div class="mypage-form">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="birthdate">
                    생년월일
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="birthdate" type="date" placeholder="생년월일" v-model="user.birth" required>
                  <div class="flex items-center justify-between">
                    <button class="profile-update-button" type="submit">
                      수정하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="my-profile-delete-form" v-if="selectedMenu === 'my-profile-delete'">
        <h2>회원 탈퇴</h2>
        <form class="my-profile-delete-box">
          <div class="my-profile-delete-container">
            <label for="delete-user">패스워드</label>
            <input type="text" id="delete-user" v-model="user.password" required>
            <button class="user-delete-button" type="submit">
              탈퇴하기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "./index.js"

export default {
  data() {
    return {
      resolutions: [],
      likes: [],
      user: {
        birth: '',
        nickname: '',
        password: ''
      },
      selectedMenu: '',
    };
  },
  mounted() {
    this.getResolutionAllData();
    this.getLikeAllData();
    this.getUserInfoData();
  },

  methods: {
    selectMenu(menu) {
      this.selectedMenu = menu;
    },
    goToResolutionDetail(resolution) {
      this.$router.push(`/resolution/${resolution.id}`);
    },
    goToLikeDetail(like) {
      this.$router.push(`/likes/${like.id}`);
    },
    async getResolutionAllData() {
      const response = await apiClient.get("/api/v1/resolution")
      this.resolutions = response.data.content;
    },
    async getLikeAllData() {
      const response = await apiClient.get("/api/likes");
      this.likes = response.data.content;
    },
    async getUserInfoData() {
      const response = await apiClient.get("/api/users/myinfo");
      this.user = response.data;
    },
  },
};
</script>

<style>
/* 기본 설정 */
/* body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
} */
.side-mypage-menu {
  margin: 100px;
  width: 200px;
  border-right: 1px solid #eee;
}

.side-mypage-menu li {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}

.my-pagelist-container {
  margin: 10px 10px 10px 10px;
  width: 30%;
  display: flex;
  position: relative;
  left: 370px;
  top: -400px;
  flex-direction: row;
  justify-content: flex-start;
}

/* 목표 및 좋아요 리스트 컨테이너 스타일 */
.resolution-list-container,
.like-list-container,
.profile-container {
  max-width: 300px;
  margin: 20px auto 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px 10px 20px 10px;
}

/* 제목 스타일 */
h2 {
  color: #333;
}

.mypage-form {
  margin-bottom: 20px;
  /* 폼 간격 조정 */
}

.mypage-form label,
.my-profile-delete-box label,
.my-password-box label {
  display: flex;
  flex-direction: column;
  color: rebeccapurple;
  margin-bottom: 8px;
  /* 라벨과 입력 필드 간격 */
  font-size: 0.875rem;
  /* 14px */
  font-weight: bold;
}

.mypage-form input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  color: #4a5568;
}

.mypage-form input:focus {
  outline: none;
  border-color: #63b3ed;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.mypage-form button {
  display: inline-block;
  background-color: #4299e1;
  color: white;
  font-weight: bold;
  margin: 10px 0px;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.profile-update-button {
  display: inline-block;
  background-color: #4299e1;
  color: white;
  font-weight: bold;
  margin: 10px 0px;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.user-delete-button,
.password-update-button {
  display: inline-block;
  background-color: #4299e1;
  color: white;
  font-weight: bold;
  margin: 10px 0px;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 90%;
}

.mypage-form button:hover {
  background-color: #2b6cb0;
}

/* 추가적인 레이아웃 조정을 위한 Flex 스타일 */
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex button {
  margin-top: 20px;
}

/* 리스트 아이템 스타일 */
.my-resolution-list,
.my-like-list,
.my-profile-list {
  list-style: none;
  padding: 0;
}

.my-resolution-list li,
.my-like-list li {
  padding: 10px;
  border-bottom: 1px solid #f089da;
  cursor: pointer;
}

.my-resolution-list li:hover,
.my-like-list li:hover {
  background-color: #f8f8f8;
}
</style>
