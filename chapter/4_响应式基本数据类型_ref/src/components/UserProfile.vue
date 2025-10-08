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
// 创建响应式数据
const name = ref('张三')
// 创建响应式数据
const age = ref(17)
let ageNoReactive = 17
// 创建响应式数据
const id = ref(13579)
const phone = '13554376813'

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
