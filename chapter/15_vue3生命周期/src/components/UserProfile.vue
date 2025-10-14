<template>
  <div class="container">
    <h2>当前求和为{{ sum }}</h2>
    <button @click="add">点我+1</button>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';

const sum = ref(0)

function add() {
  sum.value++
}

onBeforeMount(() => {
  console.log('UserProfile组件挂载之前')
})

onMounted(() => {
  console.log('UserProfile组件挂载完成')
})

onBeforeUnmount(() => {
  console.log('UserProfile组件卸载之前')
})

onUnmounted(() => {
  console.log('UserProfile组件卸载完成')
})

onBeforeUpdate(() => {
  console.log('UserProfile组件更新之前')
})

onUpdated(() => {
  console.log('UserProfile组件更新完成')
})
</script>

<style lang="css">
.container {
  background-color: #87ceeb;
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  /* padding: 20px; */
  text-align: center;
}

button {
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  text-align: cente;
}
</style>
