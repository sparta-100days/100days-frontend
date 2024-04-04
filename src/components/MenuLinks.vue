<template>
  <div class="fixed-menu" :class="{ 'show-menu': isMenuFixed || showDropdown }">
    <div class="menu-links">
      <img :class="{ 'logo': true, 'centered-logo': windowWidth <= 768 }" src="../assets/img/logo.svg" alt="Logo" @click="goToMainPage">
      <router-link to="/" class="main-title-text">100DAYS</router-link>
      <div v-if="isLoggedIn && windowWidth > 768" class="links">
        <router-link to="/create-resolution">목표작성</router-link>
        <router-link to="/resolutions">둘러보기</router-link>
        <router-link to="/myInfo">회원정보</router-link>
        <router-link to="/message">메세지</router-link>
        <router-link to="/" @click="logoutBtn">로그아웃</router-link>
      </div>
      <div v-else-if="!isLoggedIn && windowWidth > 768" class="links">
        <router-link to="/login">로그인</router-link>
        <router-link to="/terms-of-service">회원가입</router-link>
      </div>
      <div class="account-menu" v-if="windowWidth > 768">
      </div>
      <div class="menu-dropdown" v-else @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
        <button class="menu-dropdown-btn" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">메뉴</button>
        <div v-show="showDropdown" class="menu-dropdown-content show" :style="{ transform: 'translateX(calc(-50% + ' + dropdownPositionX + 'px))' }"
             @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
          <div v-if="isLoggedIn" class="menu-dropdown">
            <router-link to="/create-resolution">목표작성</router-link>
            <router-link to="/resolutions">둘러보기</router-link>
            <router-link to="/myInfo">회원정보</router-link>
            <router-link to="/message">메세지</router-link>
            <router-link to="/" @click="logoutBtn">로그아웃</router-link>
          </div>
          <div v-else-if="!isLoggedIn" class="menu-dropdown">
            <router-link to="/login">로그인</router-link>
            <router-link to="/terms-of-service">회원가입</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "MenuBar",
  data() {
    return {
      showDropdown: false,
      windowWidth: window.innerWidth,
      isMenuFixed: false,
      lastScrollPosition: 0,
      dropdownPositionX: 0,
    };
  },
  async mounted() {
    const accessToken = await localStorage.getItem("accessToken");
    /*
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("토큰이 없습니다.");
        return;
      }
      await this.getUserInfo(accessToken); // 사용자 정보 가져오기
    } catch (error) {
      console.error("회원 정보 가져오기 실패:", error.response.data);
    }

     */
  },
  computed: {
    /*
    isLoggedIn(){
      return this.$store.state.isLoggedIn
    }
     */
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapMutations(['logout']),
    loginCheck() {
      const accessToken = localStorage.getItem("accessToken");
    },
    logoutBtn() {
      // 로그아웃 처리
      console.log("logout 버튼실행")
      localStorage.removeItem("accessToken"); // 토큰 삭제
      this.logout()
    },
    handleScroll() {
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
      this.isMenuFixed = currentScrollPosition > this.lastScrollPosition || currentScrollPosition === 0; // 스크롤이 위로 올라가는 경우에도 메뉴를 표시하기 위해 조건 추가
      this.lastScrollPosition = currentScrollPosition;
    },
    goToMainPage() {
      this.$router.push("/");
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    const accessToken = localStorage.getItem("accessToken");
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style src="../assets/css/Menu.css" lang="css"></style>