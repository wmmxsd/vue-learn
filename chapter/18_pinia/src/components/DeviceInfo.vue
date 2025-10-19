<template>
  <div class="container">
    <h2>设备信息</h2>
    <p>IP: {{ device.ip }}<button style="display: inline-block;" @click="editIp">修改IP</button></p>
    <p>MAC:</p>
    <ol>
      <li v-for="(mac, index) in device.mac" v-bind:key="mac" v-bind:id="`mac-${index}`">{{ mac }}
        <button style="display: inline-block;" @click="deleteMac(index)">删除</button>
      </li>
    </ol>
    <!-- 新增输入框和按钮 -->
    <div style="margin: 10px 0;">
      <input v-model="newMac" placeholder="请输入MAC地址"
        style="padding: 5px; border-radius: 4px; border: 1px solid #ccc;" />
      <button @click="addMac" style="margin-left: 5px;">添加MAC</button>
    </div>
    <div v-if="!device.graphicsCard">
      <p>无显卡</p>
    </div>
    <div v-else>
      <label>
        品牌:
        <input type="text" v-model="device.graphicsCard.brand" />
      </label>
      <label>
        型号:
        <input type="text" v-model="device.graphicsCard.model" />
      </label>
      <p>显卡: {{ device.graphicsCard.brand }} - {{ device.graphicsCard.model }}</p>
    </div>
    <button @click="changeToAmd">叛变到AMD</button>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from 'vue'
import { GraphicsCard } from '../types/Device'
import { userDeviceInfoStore } from "@/store/DeviceInfoStore";

// 场景三：监视reactive定义的响应式对象类型，默认开启深度监听
// 新增用于绑定输入框的响应式数据
const newMac = ref('')

const deviceInfoStore = userDeviceInfoStore()
// 使用device.graphicsCard报错是因为 device 是一个 Pinia store 实例，TypeScript 无法直接识别其嵌套属性 graphicsCard 的类型，导致类型检查失败。
// const device = deviceInfoStore
const device = deviceInfoStore.$state.device

watch(device, (newValue, oldValue) => {
  console.log('watch reactive object:', newValue, oldValue)
}, { immediate: true })

function editIp() {
  device.ip = '192.168.1.2'
}

function addMac() {
  if (newMac.value.trim() !== '') {
    device.mac.push(newMac.value)
    newMac.value = ''
  }
}

function deleteMac(index: number) {
  device.mac.splice(index, 1)
}

function changeToAmd() {
  device.graphicsCard = new GraphicsCard('AMD', 'Radeon RX 9070XT')

}

// 场景四：监视ref或reactive定义的对象类型中的某个属性

// 监听reactive函数包装的对象的基本数据，watch 无法直接监听基本数据类型（如 device.ip 是字符串），需要传入一个 getter 函数或使用 toRef 转换
/* watch(device.ip, (newValue, oldValue) => {
  console.log('watch device.ip:', newValue, oldValue)
}) */

// 监听reactive函数包装的对象的基本数据，使用 getter 函数（一个有返回值的函数）
watch(() => device.ip, (newValue, oldValue) => {
  console.log('watch device.ip by getter function:', newValue, oldValue)
})

// 监听reactive函数包装的对象的基本数据，使用toRef转换基本数据类型
const ipToRef = toRef(device, 'ip')
watch(ipToRef, (newValue, oldValue) => {
  console.log('watch device.ip by ref function:', newValue, oldValue)
})

// 监听reactive函数包装的对象的某个对象类型的属性
device.graphicsCard = new GraphicsCard('NVIDIA', 'RTX 5090')
// 点击“叛变到AMD”按钮时无法监听到变化，因为直接监听对象的某个对象类型的属性时如果该属性的实例发生变化则无法监听到变化
watch(device.graphicsCard, (newValue, oldValue) => {
  console.log('watch device.graphicsCard by .graphicsCard:', newValue, oldValue)
})

//函数会重新获取graphicsCard的引用值，直接监听对象的某个对象类型的属性时引用值已经固定了地址值固定了不可变
//加上deep配置是为了获取graphicsCard对象内部属性的变化
watch(() => device.graphicsCard, (newValue, oldValue) => {
  console.log('watch device.graphicsCard by function:', newValue, oldValue)
}, { deep: true })
</script>

<style lang="css" scoped>
.container {
  background-color: #87ceeb;
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
