<script setup lang="ts">
  import UserProfile3 from "./components/UserProfile.vue";
</script>

<!-- 结构标签 -->
<template>
  <div class="demo">
    <h1>Demo App</h1>
    <p>This is a demo version of the app.</p>
    <p>Hello Vue 3</p>
  </div>
  <UserProfile3 />
</template>

<style>
  .demo {
    background-color: #18e39af7;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    margin-bottom: 15px;
  }
</style>
