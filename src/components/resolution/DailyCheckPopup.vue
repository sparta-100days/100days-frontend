<template>
  <div class="popup-container">
    <div class="popup-content">
      <div class="popup-top">
        <h2>데일리 체크</h2>
        <input type="checkbox" id="daily-check-box" checked />
        <span class="close-btn" @click="closePopup">×</span>
      </div>
      <form @submit.prevent="submitPost">
        <div class="daily-check-popup-form-group">
          <input
            type="text"
            v-model="postData.title"
            required
            placeholder="제목을 입력해주세요"
          />
        </div>
        <span class="post-toggle" @click="writePost">▼ 포스트 작성하기</span>
        <div class="daily-check-popup-form-group" v-if="isPost">
          <input
            id="daily-check-popup-content"
            v-model="postData.content"
            required
            placeholder="내용을 입력해주세요"
          />
        </div>
        <div class="daily-check-popup-form-group">
          <button class="daily-check-popup-btn" type="submit">작성 완료</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index";

export default {
  data() {


    return {
      postData: {
        title: "",
        content: "",
        imageUrl: null,
      },
      isPost: false,
    };
  },
  props: {
    resolutionId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async submitPost() {
      const PostType = {
        APPEND: "APPEND",
        CHECK: "CHECK",
        // 다른 타입들 추가 가능
      };
      const resolutionId = this.resolutionId;
      // 이 부분에서 API를 호출하여 포스트를 생성합니다.
      // axios 또는 fetch 등의 라이브러리를 사용하여 백엔드에 요청을 보냅니다.
      // 요청을 성공적으로 보낸 후에는 팝업을 닫을 수 있습니다.
      // 팝업을 닫기 위해 부모 컴포넌트로 이벤트를 발생시킬 수 있습니다.
      // 이 예제에서는 팝업을 닫는 메소드를 부모 컴포넌트에서 제공받아 사용합니다.
      const postRequest = {
        title: this.postData.title,
        content: this.postData.content,
        imageUrl: this.postData.imageUrl,
      };
      try {
        if (this.postData.content == null) {
          await apiClient.post(
            `/api/posts/${resolutionId}`,
            {
              title: postRequest.title,
              content: "null",
              imageUrl: postRequest.imageUrl,
            },
            {
              params: {
                type: PostType.CHECK,
              },
            }
          );
        } else {
          await apiClient.post(
            `/api/posts/${resolutionId}`,
            {
              title: postRequest.title,
              content: postRequest.content,
              imageUrl: postRequest.imageUrl,
            },
            {
              params: {
                type: PostType.APPEND,
              },
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
      alert("포스트가 등록되었습니다.");
      this.$emit("close");
    },
    closePopup() {
      this.$emit("close");
    },
    writePost() {
      if (!this.isPost) {
        this.isPost = true;
      } else {
        this.isPost = false;
      }
    },
  },
};
</script>

<style src="../../assets/css/resolution/DailyCheckPopup.css" lang="css"></style>
