<template>
  <div class="person">
    <h2>个人信息</h2>
    <p>Id: {{ id }}</p>
    <p>姓名: {{ name }}</p>
    <!-- Vue 的插值语法{{ 绑定数据 }} -->
    <!-- 在 Vue 模板中，ref 会被自动解包，所以不需要使用 .value -->
    <p>年龄（非响应式）: {{ ageNoReactive }}</p>
    <p>年龄（响应式）: {{ age }}</p>
    <p>optionsAPI_data: {{ optionsAPI_data }}</p>
    <p>optionsAPI_age: {{ optionsAPI_age }}</p>
    <!-- @click 单击事件监听 -->
    <button @click="optionsAPI_editName">修改姓名（optionsAPI）</button>
    <button @click="editName">修改姓名（compositionAPI）</button>
    <button @click="increaseAgeNoReactive">年龄+1（非响应式）</button>
    <button @click="increaseAge">年龄+1（响应式）</button>
    <button @click="showPhoneNumber">显示联系方式</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'UserProfile',
  // optionsAPI的data和setup共存时，data函数不仅能定义变量，且它的this可以访问setup中定义的数据
  data() {
    return {
      optionsAPI_data: "optionsAPI_data",
      optionsAPI_age: this.age
    }
  },
  // optionsAPI的methods和setup共存时，标签可以访问methods中定义的函数
  methods: {
    optionsAPI_editName() {
      this.name = 'optionsAPI'
    }
  },

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

/* export default {
  name: 'UserProfile',
  data() {
    return {
      name: '张三',
      age: 17,
      ageNoReactive: 17,
      id: 13579,
      phone: '13554376813',
    }
  },
  methods: {
    editName() {
      this.name = '李四'
    },
    increaseAgeNoReactive() {
      this.ageNoReactive++
    },
    increaseAge() {
      this.age++
    },
    showPhoneNumber() {
      alert(`手机号：${this.phone} `)
    },
  },
} */
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
