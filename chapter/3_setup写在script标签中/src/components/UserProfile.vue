<template>
  <div class="person">
    <h2>个人信息</h2>
    <p>Id: {{ id }}</p>
    <p>姓名: {{ name }}</p>
    <!-- Vue 的插值语法{{ 绑定数据 }} -->
    <!-- 在 Vue 模板中，ref 会被自动解包，所以不需要使用 .value -->
    <p>年龄（非响应式）: {{ ageNoReactive }}</p>
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

import { ref } from 'vue'
const name = ref('张三')
const age = ref(17)
let ageNoReactive = 17
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
  age.value++
}

function showPhoneNumber() {
  alert(`手机号：${phone} `)
}
</script>
<!-- <script lang="ts">
import { ref } from 'vue';

export default {
  name: 'UserProfile',
  // setup配置项让你可以在其函数中同时定义属性、函数、计算属性、监视等无需在data():{}、methods:{}、computed:{}、watch:{}中分别去实现
  // setup需要显式导出

  // 这样代码更集中，更容易复用，更容易维护
  setup() {
    const name = ref('张三')
    const age = ref(17)
    let ageNoReactive = 17
    const id = ref(13579)
    const phone = "13554376813"

    function editName() {
      // 响应式数据需要通过 .value 属性来访问或修改 ref 的值
      name.value = '李四'
    }

    function increaseAgeNoReactive() {
      // 非响应式数据变化后页面不能马上更新
      ageNoReactive++
    }

    function increaseAge() {
      age.value++
    }

    function showPhoneNumber() {
      alert(`手机号：${phone} `)
    }

    return {
      id,
      name,
      age,
      ageNoReactive,
      phone,
      editName,
      increaseAge,
      increaseAgeNoReactive,
      showPhoneNumber
    }
  }
}
</script> -->

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
