<template>
  <div class="create-resolution-background">
    <i class="fas fa-moon" id="second-moon"></i>
    <i class="fas fa-moon blur" id="second-moon-blur"></i>
    <div class="create-resolution-container">
    <h2>새 목표 만들기</h2>
      <form @submit.prevent="submitForm">
        <input type="text" class="create-resolution-title" id="title" v-model="resolution.title" required placeholder="제목을 입력하세요." />
        <textarea class="create-resolution-description" id="description" v-model="resolution.description" required placeholder="목표에 대한 설명을 입력해주세요."></textarea>
        <select class="category-selecter" aria-label="Default select example" @change="selectCategory($event.target.value)">
          <option selected>카테고리를 선택하세요</option>
          <option class="selected-category" v-for="(category, index) in categories" :key="index">
            {{ category.name }}
          </option>
        </select>
        <button type="submit" class="create-resolution-btn">목표 생성</button>
      </form>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/index.js";
export default {
  data() {
    return {
      resolution: {
        title: "",
        description: "",
        category: "",
      },
      categories: [],
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    async submitForm() {
      console.log("resolution: ", this.resolution);
      try {
        await apiClient.post("/api/v1/resolution", {
          title: this.resolution.title,
          description: this.resolution.description,
          category: this.resolution.category,
        });
        alert("목표 작성이 완료되었습니다.");
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getCategory() {
      const category = await apiClient.get("/api/categories");
      console.log(category);
      this.categories = category.data;
    },
    selectCategory(category) {
      console.log("카테고리 변경됨");
      this.resolution.category = category;
    },
  },
};
</script>

<style src="@/assets/css/resolution/CreateResolution.css" lang="css"></style>
