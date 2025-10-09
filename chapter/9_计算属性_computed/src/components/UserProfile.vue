<template>
  <div class="container">
    <h2>计算器</h2>
    <input type="number" v-model.number="num1" />
    <span> + </span>
    <input type="number" v-model.number="num2" />
    <span> = </span>
    <span style="background-color: green; color: white;">{{ sum }}</span>
    <button @click="changeResult()">随机修改结果</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
const num1 = ref()
const num2 = ref()

// computed 是 Vue 提供的一个 API，用来声明一种特殊的响应式属性，且只是只读的。
// 这种属性的值是基于其它响应式数据（如 ref 或 reactive 创建的数据）计算得出的。
// const sum = computed(() => (num1.value || 0) + (num2.value || 0));

// 这么定义的computed属性是可读可写的
const sum = computed({
  // set和get函数必须同时存在
  get() {
    return (num1.value || 0) + (num2.value || 0)
  },
  set(newValue) {
    console.log('新值是：', newValue)
    num1.value = newValue / 2
    num2.value = newValue - num1.value
  }
})

function changeResult() {
  // 如果computed属性内部没有get和set函数那么修改computed属性控制台会提示：Write operation failed: computed value is readonly
  // sum.value = Math.floor(Math.random() * 100);

  // 如果computed属性内部有get和set函数那么是可以修改computed属性的
  sum.value = Math.floor(Math.random() * 100)
}
</script>

<style lang="css" scoped>
.container {
  background-color: #87ceeb;
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
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
