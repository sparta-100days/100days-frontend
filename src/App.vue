<template>
  <div id="app">
    <MenuBar />
    <router-view></router-view>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuLinks.vue";

export default {
  name: "App",
  components: { MenuBar },
};
</script>

<style>
/* Add global styles here */
</style>
