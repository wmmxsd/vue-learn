<script setup lang="ts">
  import UserProfile3 from "./components/UserProfile.vue"
  import { type Devices } from '@/components/device'
  import { onMounted, reactive, ref } from 'vue'

  const p1 = ref(null)
  const userProfile3FromApp = ref(null)

  // 组件挂载完成后执行回调函数
  onMounted(() => {
    console.log("onMounted", userProfile3FromApp.value.p1)
  })

  const devices = reactive<Devices>([
  { id: '1', name: '设备1' },
  { id: '2', name: '设备2' }
])
console.log(devices)
</script>

<template>
  <div class="demo">
    <h1>Demo App</h1>
    <p>This is a demo version of the app.</p>
    <p>Hello Vue 3</p>
    <!--
      获取DOM元素的引用，用于直接操作或访问该DOM节点。
      通过ref属性绑定到p标签，可以在Vue实例中通过$refs.p1访问到该DOM元素。
      此方式常用于需要直接操作DOM的场景，如获取元素尺寸、焦点控制等。
    -->
    <p ref="p1">ref dom from App.vue</p>
    <button @click="console.log(p1)">输出p1的dom</button>
     <ul>
      <li v-for="value in devices" v-bind:key="value.id">{{ value.name }}</li>
    </ul>
  </div>
  <UserProfile3 ref="userProfile3FromApp" uId="123456" uName="测试ref" v-model:deviceList="devices"/>
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
