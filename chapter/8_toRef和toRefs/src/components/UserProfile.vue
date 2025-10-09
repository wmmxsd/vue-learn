<template>
  <div class="person">
    <h2>个人信息</h2>
    <!-- Vue 的插值语法{{ 绑定数据 }} -->
    <p>Id: {{ user.id }}</p>
    <p>姓名: {{ user.name }}</p>
    <!-- 在 Vue 模板中，ref数据类型的数据会被自动解包，所以不需要使用 .value -->
    <p>年龄（响应式）: {{ user.age }}</p>
    <!-- @click 单击事件监听 -->
    <button @click="editName">修改姓名</button>
    <button @click="editAge">修改年龄</button>
  </div>
</template>

<!-- 在script标签中添加setup属性后不用写export default代码块，直接定义变量、函数，且不用显式导出 -->
<script setup lang="ts">
// defineOptions()方法可以定义组件的选项，如name属性
defineOptions({
  name: 'UserProfile2',
})

// 引入reactive函数
import { reactive, toRef, toRefs } from 'vue'

class User {
  id: number
  name: string
  age: number
  devices: Array<Device>

  constructor(id:number, name: string, age: number, devices: Array<Device>) {
    this.id = id
    this.name = name
    this.age = age
    this.devices = devices
  }
}

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

const networkCardArr = Array.of(
  new NetworkCard('192.168.1.1', '00:0a:95:9d:68:16'),
  new NetworkCard('192.168.1.1', '00:0a:95:9d:68:16'),
)
const device = new Device('d1', networkCardArr)
const user = reactive(new User(111, '张三', 18, [device]))

// 通过解构赋值创建的变量不是响应式的，所以修改变量不会触发页面更新
// let {name, age} = user
// console.log(name, age)
// toRefs()方法创建的变量是响应式的，所以修改变量会触发页面更新
const {name, age} = toRefs(user)
console.log(name, age)

// toRef()方法是将值/引用/getter标准化为ref引用。本处是为了将响应式对象user中的age属性转换为一个独立的ref引用(ageToRef)
// 同时ageToRef与原始user对象的age属性保持响应式连接
const ageToRef = toRef(user, 'age')
console.log("ageToRef:", ageToRef.value)
function editName() {
  let nameIndex = 1;
  const lastChineseCharIndex = name.value.indexOf("三")
  if (lastChineseCharIndex !== name.value.length - 1) {
    nameIndex = parseInt(name.value.substring(lastChineseCharIndex + 1)) + 1
  }

  // 通过解构赋值创建的变量不是响应式的，所以修改变量不会触发页面更新
  // name = `张三${nameIndex}`
  // console.log(name, user.name)
  name.value = `张三${nameIndex}`
}

function editAge() {
  // user.age++
  age.value++
}
</script>

<style scoped>
.person {
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
