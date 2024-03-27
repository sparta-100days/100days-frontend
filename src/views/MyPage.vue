<template>
  <div class="mypage-container">
      <div class="side-message-menu">
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
          <h2>본인이 누른 목표 리스트</h2>
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
                  <ul class="password-change">
                      <li v-for="(like, index) in likes" :key="index" @click="goToLikeDetail(like)">
                          <h3>{{ like.title }}</h3>
                          <p>카테고리: {{ like.category }}</p>
                          <p>좋아요: {{ like.likeCount }}</p>
                      </li>
                  </ul>
              </div>
          </form>
      </div>
      <div class="my-profile-form" v-if="selectedMenu === 'my-profile'">
          <h2>회원 정보 조회</h2>
          <form class="my-profile-box">
              <div class="my-profile-container">
                  <ul class="my-profile-list">
                      <li v-for="(user, index) in likes" :key="index" @click="goToUserDetail(user)">
                          <p>이메일: {{ user.email }}</p>
                          <p>닉네임: {{ user.nickname }}</p>
                          <p>생일: {{ user.birth }}</p>
                      </li>
                  </ul>
              </div>
          </form>
      </div>
      <div class="my-profile-update-form" v-if="selectedMenu === 'my-profile-update'">
    <h2>회원 정보 수정</h2>
    <div class = "profile-text-align">
    <form class="my-profile-update-box" @submit.prevent="updateProfile">
        <div class="my-profile-update-container">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mypage-form">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="nickname">
                        닉네임
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nickname" type="text" placeholder="닉네임" v-model="users.nickname" required>
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        중복확인
                    </button>
                  </div>
                <div class="mypage-form">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        이메일
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="이메일" v-model="users.email" required>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        중복확인
                    </button>
                  </div>
                <div class="mypage-form">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="birthdate">
                        생년월일
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="birthdate" type="date" placeholder="생년월일" v-model="users.birth" required>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        변경하기
                    </button>
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
                <input type="text" id="delete-user" v-model="users.password" required>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        탈퇴하기 
                    </button>
                <span>{{ users.isDeleted }}</span>
                  <ul class="my-profile-delete-list">
                      <li v-for="(user, index) in likes" :key="index" @click="goToUserDetail(user)">
                        <p>이메일: {{ user.email }}</p>
                          <p>닉네임: {{ user.nickname }}</p>
                          <p>생일: {{ user.birth }}</p>
                      </li>
                  </ul>
              </div>
          </form>
      </div>
</div>
</div>
</template>

<script>
import axios from "axios";

export default {
data() {
  return {
    resolutions: [],
    likes: [],
    users: {
      nickname: '',
      email: '',
      birth: '',
      isDeleted: ''
    },
    selectedMenu: '',
  };
},
mounted(){
  this.getResolutionAllData();
  this.getLikeAllData();
},

methods: {
  selectMenu(menu) {
    this.selectedMenu = menu;
  },
  goToResolutionDetail(resolution) {
    this.$router.push(`/resolution/${resolution.id}`);
  },
  goToLikeDetail(like){
    this.$router.push(`/likes/${like.id}`);
  },
  goToUserDetail(user){
    this.$router.push(`/users/${user.id}`);
  },
  async getResolutionAllData(){
    const token = localStorage.getItem("AccessToken");
    const response = await axios.get("http://localhost:8080/api/resolutions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.resolutions = response.data.content;
  },
  async getLikeAllData(){
    const token = localStorage.getItem("AccessToken");
    const response = await axios.get("http://localhost:8080/api/likes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.likes = response.data.content;
  },
  async updateProfile(){
    try {
                const response = await axios.put("http://localhost:8080/api/users", this.user, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('회원 정보가 성공적으로 업데이트되었습니다.');
            } catch (error) {
                console.error('회원 정보 업데이트 실패:', error);
                alert('회원 정보 업데이트에 실패하였습니다.');
            }
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
.resolution-list-container, .like-list-container {
  max-width: 300px;
  margin: 20px auto 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.my-like-container, .like-list-container {
  max-width: 300px;
  margin: 20px auto 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 제목 스타일 */
h2 {
  color: #333;
}

.mypage-form {
    margin-bottom: 20px; /* 폼 간격 조정 */
  }

.mypage-form label {
  display: flex;
  flex-direction: column;
  color: rebeccapurple; 
  margin-bottom: 8px; /* 라벨과 입력 필드 간격 */
  font-size: 0.875rem; /* 14px */
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

/* 검색 입력 및 버튼 스타일 */
.search-input, .check-button {
  padding: 10px;
  margin: 10px 0;
  display: block;
  width: 95%;
}

.check-button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.check-button:hover {
  background-color: #0056b3;
}

/* 리스트 아이템 스타일 */
.my-resolution-list, .my-like-list {
  list-style: none;
  padding: 0;
}

.my-resolution-list li, .my-like-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.my-resolution-list li:hover, .my-like-list li:hover {
  background-color: #f8f8f8;
}

.button-container {
    position: relative;
    height: 100px; /* 높이는 예시입니다. 필요에 따라 조정하세요. */
}

.custom-button {
    position: relative;
    top: -30px; /* 상단으로부터 50% 위치 */
    left: 290px; /* 왼쪽으로부터 50% 위치 */
    transform: translate(-50%, -50%); /* 정확한 중앙 정렬 */
    background-color: #007bff;
    color: white;
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.custom-button:hover {
    background-color: #0056b3;
}

</style>

