<template>
  <div class="person">
    <h2>个人信息</h2>
    <p>Id: {{ id }}</p>
    <p>姓名: {{ name }}</p>
    <!-- Vue 的插值语法{{ 绑定数据 }} -->
    <p>年龄（非响应式）: {{ ageNoReactive }}</p>
    <!-- 在 Vue 模板中，ref数据类型的数据会被自动解包，所以不需要使用 .value -->
    <p>年龄（响应式）: {{ age }}</p>
    <!-- @click 单击事件监听 -->
    <button @click="editName">修改姓名</button>
    <button @click="increaseAgeNoReactive">年龄+1（非响应式）</button>
    <button @click="increaseAge">年龄+1（响应式）</button>
    <button @click="showPhoneNumber">显示联系方式</button>

    <div class="device">
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
        <input v-model="newMac" placeholder="请输入MAC地址" style="padding: 5px; border-radius: 4px; border: 1px solid #ccc;" />
        <button @click="addMac" style="display: inline-block; margin-left: 5px;">添加MAC</button>
      </div>
    </div>
  </div>
</template>

<!-- 在script标签中添加setup属性后不用写export default代码块，直接定义变量、函数，且不用显式导出 -->
<script setup lang="ts">
// defineOptions()方法可以定义组件的选项，如name属性
defineOptions({
  name: 'UserProfile2'
})

// 引入ref函数来创建响应式基本数据类型
import { ref } from 'vue'
// 引入reactive函数来创建响应式对象类型
import { reactive } from 'vue'

// 创建响应式数据
const name = ref('张三')
// 创建响应式数据
const age = ref(17)
let ageNoReactive = 17
// 创建响应式数据
const id = ref(13579)
const phone = '13554376813'

class Device {
  ip: string
  mac: Array<string>

  constructor(ip: string, mac: Array<string>) {
    this.ip = ip
    this.mac = mac
  }
}

const macArr = Array.of('00:0a:95:9d:68:16', '00:0a:95:9d:68:17')
const device = reactive(new Device('192.168.1.1', macArr))

// 新增用于绑定输入框的响应式数据
const newMac = ref('')

function editName() {
  // 响应式数据需要通过 .value 属性来访问或修改 ref 的值
  name.value = '李四'
}

function increaseAgeNoReactive() {
  // 非响应式数据变化后页面不能马上更新
  ageNoReactive++
}

function increaseAge() {
  // 响应式数据需要通过 .value 属性来访问或修改 ref 的值
  age.value++
}

function showPhoneNumber() {
  alert(`手机号：${phone} `)
}

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
</script>

<style scoped>
.person, .device {
  background-color: #87ceeb;
  width: 300px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

button {
  display: block;
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
