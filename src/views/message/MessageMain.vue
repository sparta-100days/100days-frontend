<template>
  <div class="message-back-container">
    <div class="message-container">
    <!-- 사이드 메뉴 -->
    <div class="message-tab-container">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="changeTab(index)"
        :class="{ active: activeTab === index }"
        class="massage-tab-item"
      >
          {{ tab }}}
      </div>
    </div>

      <!-- 쪽지 메뉴 -->
      <div class="massage-main-content">
        <component :is="writeComponent" v-if="activeTab === 0"></component>
        <component :is="sendComponent" v-if="activeTab === 1"></component>
        <component :is="receivedComponent" v-if="activeTab === 2"></component>
        <component :is="adminComponent" v-if="activeTab === 3"></component>
        <!-- 수정된 부분 -->
        <component :is="messageDetailComponent" v-if="activeTab === 1 && selectedMenu === 'detail'"></component>
        <component :is="messageDetailComponent" v-if="activeTab === 2 && selectedMenu === 'detail'"></component>
        <component :is="messageDetailComponent" v-if="activeTab === 3 && selectedMenu === 'detail'"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from '../index';
import  Tab1  from "@/components/message/MessageWrite.vue";
import  Tab2  from "@/components/message/MessageSend.vue";
import  Tab3  from "@/components/message/MessageReceived.vue";
import  Tab4  from "@/components/message/MessageAdmin.vue";
import MessageDetail from "@/components/message/MessageDetail.vue";

export default {
  data() {
    return {
      activeTab: 0,
      tabs: ["쪽지작성", "보낸쪽지", "받은쪽지", "관리자쪽지"],
      writeComponent: Tab1,
      sendComponent: Tab2,
      receivedComponent: Tab3,
      adminComponent: Tab4,
      messageDetailComponent: MessageDetail,
      selectedMessage: '', // 선택된 쪽지 정보
      selectedMenu: '', // 선택된 메뉴
    };
  },
  components: {
    MessageDetail,
    Tab1,
    Tab2,
    Tab3,
    Tab4,
  },
  methods: {
    changeTab(index) {
      this.activeTab = index;
      switch (index) {
        case 0:
          this.messageDetailComponent = Tab2;
          break;
        case 1:
          this.messageDetailComponent = Tab3;
          break;
        case 2:
          this.messageDetailComponent = Tab4;
          break;
        default:
          this.messageDetailComponent = null;
      }
    },
  }
};
</script>

<style src="@/assets/css/message/MessageMain.css" lang="css"></style>
