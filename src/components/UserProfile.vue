<template>
  <div class="container">
    <h2>计算器</h2>
    <input type="number" v-model.number="num1" />
    <span> + </span>
    <input type="number" v-model.number="num2" />
    <span> = </span>
    <span style="background-color: green; color: white;">{{ sum }}</span>
    <button id="changeResultBtn" @click="changeResult()">随机修改结果</button>

    <!-- 历史记录 -->
    <div>
      <h2>历史记录</h2>
      <div v-if="!history || history.length === 0">暂无历史记录</div>
      <div v-else>
        <div v-for="(item, index) in history.slice().reverse()" v-bind:key="index">
          {{ item[0] }} + {{ item[1] }} = {{ item[2] }}
        </div>
      </div>
    </div>
  </div>

  <div class="container">
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

<script lang="ts" setup>
import { watch, computed, ref, toRef } from 'vue'
const num1 = ref()
const num2 = ref()
// const history = ref<Array<Array<number>>>([])
const history = ref<number[][]>([])

// computed 是 Vue 提供的一个 API，用来声明一种特殊的响应式属性，且只是只读的。
// 这种属性的值是基于其它响应式数据（如 ref 或 reactive 创建的数据）计算得出的。
// const sum = computed(() => (num1.value || 0) + (num2.value || 0));

// 这么定义的computed属性是可读可写的
const sum = computed({
  // set和get函数必须同时存在
  get() {
    return (num1.value || 0) + (num2.value || 0)
  },
  set(newValue) {
    num1.value = newValue / 2
    num2.value = newValue - num1.value
  }
})

function changeResult() {
  // 如果computed属性内部没有get和set函数那么修改computed属性控制台会提示：Write operation failed: computed value is readonly
  // sum.value = Math.floor(Math.random() * 100);

  // 如果computed属性内部有get和set函数那么是可以修改computed属性的
  sum.value = Math.floor(Math.random() * 100)
}

// 场景一：监视响应式基本数据类型
let count: number = 0
const watchAttr = watch(sum, (newValue) => {
  if (count == 6) {
    // 停止监听
    alert('体验次数已到达上限')
    watchAttr.stop()
    const changeResultBtn = document.getElementById('changeResultBtn') as HTMLButtonElement
    changeResultBtn.disabled = true
    changeResultBtn.style.backgroundColor = '#ccc'
    changeResultBtn.style.cursor = 'not-allowed'
  }

  const arr = Array.of(num1.value, num2.value, newValue)

  if (num1.value == null || num2.value == null) {
    return
  }

  history.value.push(arr)

  if (history.value.length > 5) {
    history.value.shift()
  }

  count++
})

// 场景二：监视响应式对象类型（deep：深度监听（意思是对象的属性变化也会监听） immediate：立即执行(意思是初始化时也会执行））
class User {
  id: number
  name: string
  age: number
  constructor(id: number, name: string, age: number) {
    this.id = id
    this.name = name
    this.age = age
  }
}

const user = ref<User>(new User(111, '张三', 18))
const nameToRef = toRef(user.value, 'name')
  let nameIndex = 1;
  console.log(user)
  console.log(user.value)
  console.log(nameToRef)
  console.log(nameToRef.value)
function editName() {
  const lastChineseCharIndex = user.value.name.indexOf("三")
  if (lastChineseCharIndex !== user.value.name.length - 1) {
    nameIndex = parseInt(user.value.name.substring(lastChineseCharIndex + 1)) + 1
  }

  nameToRef.value = `张三${nameIndex}`
}

function editAge() {
  user.value.age++
}

watch(user, (newValue, oldValue) => {
  console.log('watch:', user.value, newValue, oldValue)
  // deep：深度监听(意思是对象的属性变化也会监听)
  // immediate：立即执行(意思是初始化时也会执行)
}, { deep: true, immediate: true })

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
