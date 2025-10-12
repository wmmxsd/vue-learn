<template>
  <div class="container">
    <h2>设备信息</h2>
    <!--
      获取DOM元素的引用，用于直接操作或访问该DOM节点。
      通过ref属性绑定到p标签，可以在Vue实例中通过const p1 = ref(null)访问到该DOM元素。
      此方式常用于需要直接操作DOM的场景，如获取元素尺寸、焦点控制等。
    -->
    <p ref="p1">ref dom from UserProfile.vue</p>
    <button @click="console.log(p1)">输出p1的dom</button>
    <button @click="console.log($refs.p1)">输出p1的dom-2</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const p1 = ref(null)

// 暴露给父组件
  defineExpose({p1})
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
