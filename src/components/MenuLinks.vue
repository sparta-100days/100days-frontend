<template>
  <div class="fixed-menu" :class="{ 'show-menu': isMenuFixed || showDropdown }">
    <div class="menu-links">
      <img :class="{ 'logo': true, 'centered-logo': windowWidth <= 768 }" src="../assets/img/logo.svg" alt="Logo" @click="goToMainPage">
      <div v-if="windowWidth > 768" class="links">
        <router-link to="/create-resolution">목표작성</router-link>
        <router-link to="/resolutions">둘러보기</router-link>
      </div>
      <div class="account-menu" v-if="windowWidth > 768">
        <router-link to="/login">
          <button class="login-btn">로그인</button>
        </router-link>
        <router-link to="/myPage">
          <button class="login-btn">마이페이지</button>
        </router-link>
        <router-link to="/message">
          <button class="login-btn">내 쪽지함</button>
        </router-link>
      </div>
      <div class="dropdown" v-else>
        <button class="dropdown-btn" @click="toggleDropdown">메뉴</button>
        <div v-show="showDropdown" class="dropdown-content">
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
      lastScrollPosition: 0
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
    },
    goToMainPage() {
      this.$router.push("/");
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  }
}
</script>

<style src="../assets/css/Menu.css" lang="css"></style>