<template>
  <div class="app">
    <h1 class="title">Pinia Test</h1>
    <UserProfile />
    <DeviceInfo />
  </div>
</template>

<script setup lang="ts">
  import UserProfile from './components/UserProfile.vue'
  import DeviceInfo from './components/DeviceInfo.vue';
</script>

<style scoped>
.app {
 background-color: #18e39af7;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    margin-bottom: 15px;
}

.title {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 30px;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  letter-spacing: 1px;
}
</style>
