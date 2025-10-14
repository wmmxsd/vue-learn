<template>
  <div class="container">
    <h2>设备信息-{{ uId }}-{{uName }}</h2>
    <h2>设备信息-{{ appProps.uId }}-{{ appProps.uName }}</h2>
    <!--
      获取DOM元素的引用，用于直接操作或访问该DOM节点。
      通过ref属性绑定到p标签，可以在Vue实例中通过const p1 = ref(null)访问到该DOM元素。
      此方式常用于需要直接操作DOM的场景，如获取元素尺寸、焦点控制等。
    -->
    <p ref="p1">ref dom from UserProfile.vue</p>
    <button @click="console.log(p1)">输出p1的dom</button>
    <button @click="console.log($refs.p1)">输出p1的dom-2</button>
    <ul>
      <li v-for="value in appProps.deviceList" v-bind:key="value.id">{{ value.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { type Devices } from '@/components/device'

const p1 = ref(null)

/* const devices = reactive<Devices>([
  { id: '1', name: '设备1' },
  { id: '2', name: '设备2' }
])
console.log(devices) */

// 使用 defineProps 来声明组件接收的 prop
// const appProps = defineProps(['uId', 'uName', 'deviceList'])

// 使用 defineProps并且加上限定值来声明组件接收的 prop
/* const appProps = defineProps<{
  uId: string,
  uName: string,
  deviceList?: Devices
}>() */

// 使用 defineProps并且加上限定值，并且使用 withDefaults 来设置默认值
const appProps = withDefaults(
  defineProps<{
    uId: string,
    uName: string,
    deviceList?: Devices
  }>(),
  {
    deviceList: () => []
  }
)

if (appProps.deviceList && appProps.deviceList.length > 0) {
  if(appProps.deviceList[0]) {
    appProps.deviceList[0].name = '修改后的设备1'
  }
}

defineOptions({
  name: 'UserProfile-customDefine'
})

// 暴露给父组件
defineExpose({ p1 })
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
