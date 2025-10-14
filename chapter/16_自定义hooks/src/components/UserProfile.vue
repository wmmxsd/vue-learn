<template>
  <div class="container">
    <h2>当前求和为{{ sum }}</h2>
    <button @click="add">点我+1</button>
  </div>
  <hr>
  <div class="container">
    <img v-for="item in dogList" :src="item" alt="dog" :key="item" width="200px"
      style="margin: 10px; border-radius: 10px; box-shadow: 0 0 10px;">"
  </div>
</template>

<script lang="ts" setup>
// 引入自定义的useSum hook
import { getSum } from "../hooks/useSum"
// 引入自定义的useDog hook
import getDogList from "../hooks/useDog"
// 引入自定义的defaultFunc hook
import useDefaultHook111 from "../hooks/defaultFunc"

const { sum, add } = getSum()
const { dogList } = getDogList()
useDefaultHook111()
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
