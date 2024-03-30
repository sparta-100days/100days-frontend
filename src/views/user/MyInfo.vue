<template>
  <div class="myinfo-back-container"></div>
  <div class="myinfo-container">
    <!-- 탭 -->
    <div class="myinfo-tab-container">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="changeTab(index)"
        :class="{ active: activeTab === index }"
        class="myinfo-tab-item"
      >
        {{ tab }}
      </div>
    </div>

    <!-- 페이지 내용 -->
    <div class="myinfo-page-content">
      <!-- 각 탭에 해당하는 컴포넌트 로드 -->
      <component :is="currentComponent" v-if="activeTab === 0"></component>
      <component :is="currentComponent2" v-if="activeTab === 1"></component>
      <component :is="currentComponent3" v-if="activeTab === 2"></component>
    </div>
  </div>
</template>

<script>
import Tab1 from "@/components/Profile.vue";
import Tab2 from "@/components/MyResolutionList.vue";
import Tab3 from '@/components/MyLikeList.vue'; // 수정

export default {
  data() {
    return {
      activeTab: 0, // 현재 선택된 탭의 인덱스
      tabs: ["회원정보", "작성목표", "좋아요"], // 탭의 목록
      currentComponent: Tab1, // 초기 페이지
      currentComponent2: Tab2, // 탭 2에 대한 컴포넌트
      currentComponent3: Tab3, // 탭 3에 대한 컴포넌트
    };
  },
  components: {
    Tab1,
    Tab2,
    Tab3,
  },
  methods: {
    // 탭 변경 이벤트 핸들러
    changeTab(index) {
      this.activeTab = index;
    },
  },
};
</script>

<style src="../../assets/css/user/MyInfo.css" lang="css"></style>