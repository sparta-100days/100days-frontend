<template>
  <div id="app">
    <MenuLinks />
    <MainContent />
  </div>
</template>

<script>
import MenuLinks from './components/MenuLinks.vue';
import MainContent from './components/MainContent.vue';

export default {
  name: 'App',
  components: {
    MenuLinks,
    MainContent
  }
}
</script>

<style>
/* Add global styles here */
</style>