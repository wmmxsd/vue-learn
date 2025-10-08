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
      <h2>设备信息1</h2>
      <p>
        设备名: {{ device.name
        }}<button style="display: inline-block" @click="editDeviceName">修改设备名</button>
      </p>
      <p>网络信息:</p>
      <ol>
        <li
          v-for="(networkCard, index) in device.networkCard"
          v-bind:key="networkCard.mac"
          v-bind:id="`mac-${index}`"
        >
          {{ networkCard.ip }} {{ networkCard.mac }}
          <button style="display: inline-block" @click="deleteNetworkCard(index)">删除</button>
        </li>
      </ol>
      <!-- 新增输入框和按钮 -->
      <div style="margin: 10px 0">
        <input
          v-model="newMac"
          placeholder="请输入MAC地址"
          style="padding: 5px; border-radius: 4px; border: 1px solid #ccc"
        />
        <button @click="addNetworkCard" style="display: inline-block; margin-left: 5px">
          添加MAC
        </button>
      </div>
    </div>
  </div>

  <div class="device" style="float: left;">
    <h2>设备信息2</h2>
    <p>设备名: {{ device1.name}}</p>
    <p>网络信息:</p>
    <ol>
      <li
        v-for="(networkCard, index) in device1.networkCard"
        v-bind:key="networkCard.mac"
        v-bind:id="`mac-${index}`"
      >
        {{ networkCard.ip }} {{ networkCard.mac }}
        <button style="display: inline-block" @click="deleteNetworkCardWithRef(index)">删除</button>
      </li>
    </ol>
  </div>
</template>

<!-- 在script标签中添加setup属性后不用写export default代码块，直接定义变量、函数，且不用显式导出 -->
<script setup lang="ts">
// defineOptions()方法可以定义组件的选项，如name属性
defineOptions({
  name: 'UserProfile2',
})

// 引入ref函数来创建响应式基本数据类型
import { ref } from 'vue'
// 引入reactive函数来创建响应式对象类型
import { reactive } from 'vue'

// 可以同时引入ref和reactive函数
// import { ref, reactive } from 'vue'

// 创建响应式数据
const name = ref('张三')
// 创建响应式数据
const age = ref(17)
let ageNoReactive = 17
// 创建响应式数据
const id = ref(13579)
const phone = '13554376813'

class NetworkCard {
  ip: string
  mac: string

  constructor(ip: string, mac: string) {
    this.ip = ip
    this.mac = mac
  }
}

class Device {
  name: string
  networkCard: Array<NetworkCard>

  constructor(name: string, networkCard: Array<NetworkCard>) {
    this.name = name
    this.networkCard = networkCard
  }
}

const networkCardArr = Array.of(new NetworkCard('192.168.1.1', '00:0a:95:9d:68:16'), new NetworkCard('192.168.1.1', '00:0a:95:9d:68:16'))
const networkCardArr1 = Array.of(new NetworkCard('192.168.1.1', '00:0a:95:9d:68:16'), new NetworkCard('192.168.1.1', '00:0a:95:9d:68:16'))
const device = reactive(new Device('d1', networkCardArr))
// ref 也可以用来创建响应式对象类型,但需要通过 .value 访问对象的属性
const device1 = ref(new Device('d2', networkCardArr1))

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

function editDeviceName() {
  device.name = '修改过的设备名'
}

function addNetworkCard() {
  if (newMac.value.trim() !== '') {
    device.networkCard.push(new NetworkCard('', newMac.value))
    newMac.value = ''
  }
}

function deleteNetworkCard(index: number) {
  device.networkCard.splice(index, 1)
}

function deleteNetworkCardWithRef(index: number) {
  // 响应式数据需要通过 .value 访问或修改 ref 的值
  device1.value.networkCard.splice(index, 1)
}
</script>

<style scoped>
.person,
.device {
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
