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

<script lang="ts" setup>
import { watch, computed, ref, toRef, reactive } from 'vue'
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

// 场景二：监视ref定义的响应式对象类型（deep：深度监听（意思是对象的属性变化也会监听） immediate：立即执行(意思是初始化时也会执行））
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
  const lastChineseCharIndex = nameToRef.value.indexOf("三")
  if (lastChineseCharIndex !== nameToRef.value.length - 1) {
    nameIndex = parseInt(nameToRef.value.substring(lastChineseCharIndex + 1)) + 1
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

// 场景三：监视reactive定义的响应式对象类型，默认开启深度监听
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

  constructor(ip: string, mac: Array<string>, graphicsCard?: GraphicsCard) {
    this.ip = ip
    this.mac = mac
    this.graphicsCard = graphicsCard
  }
}

const macArr = Array.of('00:0a:95:9d:68:16', '00:0a:95:9d:68:17')
const device = reactive(new Device('192.168.1.1', macArr))
// 新增用于绑定输入框的响应式数据
const newMac = ref('')

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

// 监听ref函数包装的对象的基本数据，使用 getter 函数（一个有返回值的函数）
watch(() => user.value.age, (newValue, oldValue) => {
  console.log('watch user.value.age by getter function:', newValue, oldValue)
})

// 监听ref函数包装的对象的基本数据，使用toRef转换基本数据类型
const ageToRef = toRef(user.value, 'age')
watch(ageToRef, (newValue, oldValue) => {
  console.log('watch user.value.age by ref function:', newValue, oldValue)
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
}, {deep: true})


// 场景5️：同时监听多个值
watch([() => user.value.age, () => device.graphicsCard], (newValues, oldValues) => {
  console.log('watch multiple values:', newValues, oldValues)
}, {deep: true})
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
