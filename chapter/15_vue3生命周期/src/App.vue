<template>
  <div class="app">
    <UserProfile3 v-if="isShowPersonComponent" />
    <button v-if="isShowPersonComponent" @click="hidePersonComponent">关闭子组件</button>
    <button v-else @click="showPersonComponent">显示子组件</button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from "vue";
import UserProfile3 from "./components/UserProfile.vue"

const isShowPersonComponent = ref(true)

function hidePersonComponent() {
  isShowPersonComponent.value = false
}

function showPersonComponent() {
  isShowPersonComponent.value = true
}

onBeforeMount(() => {
  console.log('App组件挂载之前')
})

onMounted(() => {
  console.log('App组件挂载完成')
})

onBeforeUnmount(() => {
  console.log('App组件卸载之前')
})

onUnmounted(() => {
  console.log('App组件卸载完成')
})

onBeforeUpdate(() => {
  console.log('App组件更新之前')
})

onUpdated(() => {
  console.log('App组件更新完成')
})
</script>

<style>
.app {
  background-color: #18e39af7;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin-bottom: 15px;
}
</style>
