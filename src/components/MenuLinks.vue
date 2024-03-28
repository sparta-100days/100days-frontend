<template>
  <div class="fixed-menu" :class="{ 'show-menu': isMenuFixed || showDropdown }">
    <div class="menu-links">
      <img :class="{ 'logo': true, 'centered-logo': windowWidth <= 768 }" src="../assets/img/logo.svg" alt="Logo" @click="goToMainPage">
      <div v-if="windowWidth > 768" class="links">
        <router-link to="/create-resolution">목표작성</router-link>
        <router-link to="/resolutions">둘러보기</router-link>
      </div>
      <div class="account-menu" v-if="windowWidth > 768">
        <router-link to="/login" class="icon-link" data-text="로그인">
          <div class="icon-container">
            <img class="login-icon" src="../assets/img/login.png" alt="login" @click="goToMainPage">
            <span class="icon-text">로그인</span>
          </div>
        </router-link>
        <router-link to="/signup" class="icon-link" data-text="회원가입">
          <div class="icon-container">
            <img class="signup-icon" src="../assets/img/signup.png" alt="signup" @click="goToMainPage">
            <span class="icon-text">회원가입</span>
          </div>
        </router-link>
        <router-link to="/myInfo" class="icon-link" data-text="회원정보">
          <div class="icon-container">
            <img class="myinfo-icon" src="../assets/img/myInfo.png" alt="myinfo" @click="goToMainPage">
            <span class="icon-text">회원정보</span>
          </div>
        </router-link>
        <router-link to="/message" class="icon-link" data-text="쪽지">
          <div class="icon-container">
            <img class="message-icon" src="../assets/img/message.png" alt="message" @click="goToMainPage">
            <span class="icon-text">쪽지</span>
          </div>
        </router-link>
      </div>
      <div class="dropdown" v-else @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
        <button class="dropdown-btn" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">메뉴</button>
        <div v-show="showDropdown" class="dropdown-content show" :style="{ transform: 'translateX(calc(-50% + ' +
        dropdownPositionX + 'px))' }" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
          <router-link to="/create-resolution">목표작성</router-link>
          <router-link to="/resolutions">둘러보기</router-link>
          <router-link to="/login">로그인</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
      this.isMenuFixed = currentScrollPosition > this.lastScrollPosition || currentScrollPosition === 0; // 스크롤이 위로 올라가는 경우에도 메뉴를 표시하기 위해 조건 추가
      this.lastScrollPosition = currentScrollPosition;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        // 드롭다운 메뉴가 펼쳐질 때 현재 마우스의 X 위치를 저장
        this.dropdownPositionX = event.clientX;
      }
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
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
}
</script>

<style src="../assets/css/Menu.css" lang="css"></style>