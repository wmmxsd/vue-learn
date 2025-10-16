<template>
  <div class="container">
    <h2>个人信息</h2>
    <!-- Vue 的插值语法{{ 绑定数据 }} -->
    <p>Id: {{ user.id }}</p>
    <p>姓名: {{ user.name }}</p>
    <!-- 在 Vue 模板中，ref数据类型的数据会被自动解包，所以不需要使用 .value -->
    <p>年龄: {{ user.age }}</p>
    <!-- @click 单击事件监听 -->
    <button @click="editName">修改姓名</button>
    <button @click="editAge">修改年龄</button>
    <button @click="editAll">同时修改</button>
    <button @click="editAllByActions">同时修改由actions实现</button>
  </div>
</template>

<script lang="ts" setup>
import { watch, toRef } from 'vue'
import { useruserInfoStore } from '@/store/USerStore'
// 场景二：监视ref定义的响应式对象类型（deep：深度监听（意思是对象的属性变化也会监听） immediate：立即执行(意思是初始化时也会执行））
const userStore = useruserInfoStore()
const user = userStore.$state.user
const nameToRef = toRef(userStore.$state.user, 'name')
let nameIndex = 1;
console.log(user)
console.log(user)
console.log(nameToRef)
console.log(nameToRef.value)

function editName() {
  const lastChineseCharIndex = nameToRef.value.indexOf("三")
  if (lastChineseCharIndex !== nameToRef.value.length - 1) {
    nameIndex = parseInt(nameToRef.value.substring(lastChineseCharIndex + 1)) + 1
  }

  nameToRef.value = `张三${nameIndex}`
}

function editAge() {
  user.age++
}

/* 批量修改可以使用 $patch */
function editAll() {
  userStore.$patch({
    user: {
      name: `张三${++nameIndex}`,
      age: user.age + 1
    }
  })
}

/* 也可以使用actions修改user */
function editAllByActions() {
  nameToRef.value = `张三${++nameIndex}`
  user.age++
  userStore.setUser(user)
}

watch(user, (newValue, oldValue) => {
  console.log('watch:', user, newValue, oldValue)
  // deep：深度监听(意思是对象的属性变化也会监听)
  // immediate：立即执行(意思是初始化时也会执行)
}, { deep: true, immediate: true })


// 监听ref函数包装的对象的基本数据，使用 getter 函数（一个有返回值的函数）
watch(() => user.age, (newValue, oldValue) => {
  console.log('watch user.age by getter function:', newValue, oldValue)
})

// 监听ref函数包装的对象的基本数据，使用toRef转换基本数据类型
const ageToRef = toRef(user, 'age')
watch(ageToRef, (newValue, oldValue) => {
  console.log('watch user.age by ref function:', newValue, oldValue)
})
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
