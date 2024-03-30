<template>
  <div class="myinfo-back-container"></div>
  <div class="waterdrops"></div>
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
      <component :is="currentComponent1" v-if="activeTab === 0"></component>
      <component :is="currentComponent2" v-if="activeTab === 1"></component>
      <component :is="currentComponent3" v-if="activeTab === 2"></component>
      <component :is="currentComponent4" v-if="activeTab === 3"></component>
    </div>
  </div>
</template>

<script>
import Tab1 from "@/components/Profile.vue";
import Tab2 from "@/components/MyResolutionList.vue";
import Tab3 from "@/components/MyLikeList.vue";
import Tab4 from "@/components/Withdraw.vue";

export default {
  data() {
    return {
      activeTab: 0, // 현재 선택된 탭의 인덱스
      tabs: ["회원정보", "작성목표", "좋아요", "회원탈퇴"], // 탭의 목록
      currentComponent1: Tab1, // 초기 페이지
      currentComponent2: Tab2, // 탭 2에 대한 컴포넌트
      currentComponent3: Tab3, // 탭 3에 대한 컴포넌트
      currentComponent4: Tab4,
    };
  },
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4,
  },
  methods: {
    // 탭 변경 이벤트 핸들러
    changeTab(index) {
      this.activeTab = index;
    },
    createWaterdrops() {
      const waterdropContainer = document.querySelector(".waterdrops");
      for (let i = 0; i < 10; i++) {
        // 여러 개의 물방울 생성 (10개 예시)
        const waterdrop = document.createElement("div");
        waterdrop.className = "waterdrop";
        waterdrop.style.left = `${Math.random() * 100}%`; // 랜덤한 위치 설정
        waterdrop.style.animationDuration = `${Math.random() * 3 + 2}s`; // 랜덤한 애니메이션 속도 설정 (2~5초)
        waterdropContainer.appendChild(waterdrop);
      }
    },
  },
  mounted() {
    this.createWaterdrops();
  },
};
</script>

<style src="../../assets/css/user/MyInfo.css" lang="css"></style>