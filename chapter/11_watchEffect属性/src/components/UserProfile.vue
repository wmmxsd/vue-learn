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
    <p>
      安装状态:  {{ device.installStatus ? '已安装' : '已卸载' }}
      <button v-if="device.installStatus" style="display: inline-block;" @click="uninstallDevice">卸载</button>
    </p>

  </div>
</template>

<script lang="ts" setup>
import { watch, ref, watchEffect, toRef } from 'vue'

class GraphicsCard {
  brand: string
  model: string

  constructor(brand: string, model: string) {
    this.brand = brand
    this.model = model
  }
}

class Device {
  ip: string
  mac: Array<string>
  //?代表可选的
  graphicsCard?: GraphicsCard
  installStatus: boolean = true

  constructor(ip: string, mac: Array<string>, graphicsCard?: GraphicsCard) {
    this.ip = ip
    this.mac = mac
    this.graphicsCard = graphicsCard
  }
}

const macArr = Array.of('00:0a:95:9d:68:16', '00:0a:95:9d:68:17')
const device = ref(new Device('192.168.1.1', macArr))
// 新增用于绑定输入框的响应式数据
const newMac = ref('')

watch(device, (newValue, oldValue) => {
  console.log('watch reactive object:', newValue, oldValue)
}, { immediate: true })

function editIp() {
  device.value.ip = '192.168.1.2'
}

function addMac() {
  if (newMac.value.trim() !== '') {
    device.value.mac.push(newMac.value)
    newMac.value = ''
  }
}

function deleteMac(index: number) {
  device.value.mac.splice(index, 1)
}

function changeToAmd() {
  device.value.graphicsCard = new GraphicsCard('AMD', 'Radeon RX 9070XT')
}

function uninstallDevice() {
  device.value.installStatus = false
}

// watchEffect不用明确的指定监听项，函数中用到哪些值就只监听这些值
watchEffect(() => {
  if (!device.value.installStatus) {
    alert('正在向后台发送卸载请求...')
  }
})
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
