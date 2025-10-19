<template>
  <div class="app">
    <h1>ref()</h1>
    <h2>求和为：{{ sum }}</h2>
    <h2>名字为：{{ person.name }}</h2>
    <button @click="changeSum()">sum + 1</button>
    <button @click="editName()">修改名字</button>
    <button @click="editPerson()">修改整个人</button>
  </div>

  <div class="app">
    <h1>shallowRef()</h1>
    <h2>求和为：{{ sum1 }}</h2>
    <h2>名字为：{{ person1.name }}</h2>
    <button @click="changeSum1">sum1 + 1</button>
    <button @click="editName1">修改名字</button>
    <button @click="editPerson1">修改整个人</button>
  </div>

  <div class="app">
    <h1>shallowReactive()</h1>
    <h2>名字为：{{ person2.name }}</h2>
    <button @click="editName2">修改名字</button>
    <button @click="editPerson2">修改整个人</button>
  </div>

  <div class="app">
    <h1>readonly()</h1>
    <h2>sum3求和为：{{ sum3 }}</h2>
    <h2>sum3Readonly求和为：{{ sum3Readonly }}</h2>
    <h2>名字为：{{ person3.name }}</h2>
    <button @click="changeSum3">sum3 + 1</button>
    <button @click="changeSum3Readonly3">changeSum3Readonly3 + 1</button>
    <button @click="editName3">修改名字</button>
    <button @click="editPerson3">修改整个人</button>
  </div>

  <div class="app">
    <h1>shallowReadonly()</h1>
    <h2>sum4求和为：{{ sum4 }}</h2>
    <h2>sum4ShallowReadonly求和为：{{ sum4ShallowReadonly }}</h2>
    <h2>名字为：{{ person4.name }}</h2>
    <h2>ip为：{{ person4.device.ip }}</h2>
    <button @click="changeSum4">sum4 + 1</button>
    <button @click="changeSum4ShallowReadonly">sum4ShallowReadonly + 1</button>
    <button @click="editName4">修改名字</button>
    <button @click="editIp4">修改ip</button>
    <button @click="editPerson4">修改整个人</button>
  </div>

  <div class="app">
    <h1>toRaw()</h1>
    <h2>sum5求和为：{{ sum5 }}</h2>
    <h2>toRaw(sum5)求和为：{{ sum5ToRaw }}</h2>
    <h2>名字为：{{ person5.name }}</h2>
    <h2>名字（ToRaw）为：{{ person5ToRaw.name }}</h2>
    <button @click="changeSum5">sum5 + 1</button>
    <button @click="changeSum5ToRaw">sum5ToRaw + 1</button>
    <button @click="editName5">修改名字</button>
    <button @click="editPerson5">修改整个人</button>
  </div>

  <div class="app">
    <h1>markRaw()</h1>
    <h2>person6MarkRaw.name：{{ person6MarkRaw.name }}</h2>
    <button @click="editName6">修改名字</button>
    <h2>reactive(person6).name：{{ person6Reactive.name }}</h2>
    <button @click="editNameReactive6">修改名字</button>
    <h2>ip为：{{ person6MarkRaw.device.ip }}</h2>
    <h2>ip（markRaw）为：{{ person6MarkRaw.device.ip }}</h2>
    <button @click="editIp6">修改ip</button>
    <button @click="editPerson6">修改整个人</button>
  </div>

  <div class="app">
    <h1>customRef()</h1>
    <h1>{{ debunceCount }}</h1>
    <input type="number" v-model="debunceCount">
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, shallowRef, shallowReactive, readonly, shallowReadonly, toRaw, markRaw, customRef } from 'vue';

const sum = ref(0);
const person = ref({
  name: '张三'
});

function changeSum() {
  sum.value++;
}

function editName() {
  person.value.name = '王五';
}

function editPerson() {
  person.value = {
    name: '赵六'
  };
}

// 第二组数据
const sum1 = shallowRef(0);
// shallowRef() 和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。
// 只有对 .value 的访问是响应式的。
const person1 = shallowRef({
  name: '李四'
});

function changeSum1() {
  sum1.value++;
}

// shallowRef包装的对象无法修改对象的属性
function editName1() {
  person1.value.name = '孙七';
}

// shallowRef包装的对象只能修改对象本身
function editPerson1() {
  person1.value = {
    name: '周八'
  };
}

// 第三组数据
// 和 reactive() 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的属性是响应式的。
// 属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。
// 谨慎使用！浅层数据结构应该只用于组件中的根级状态。请避免将其嵌套在深层次的响应式对象中，因为它创建的树具有不一致的响应行为，这可能很难理解和调试。

let person2 = shallowReactive({
  name: '李四'
});

// shallowRef包装的对象无法修改对象的属性
function editName2() {
  person2.name = '孙七';
}

// shallowRef包装的对象只能修改对象本身
function editPerson2() {
  person2 = {
    name: '周八'
  };
}

// 第四组数据
// 接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理
const sum3 = ref(0);
const sum3Readonly = readonly(sum3);
const person3 = reactive({
  name: '李四'
});
let person3Readonly = readonly(person3);

function changeSum3() {
  sum3.value++;
}

function changeSum3Readonly3() {
  sum3Readonly.value++;
}

// readonly包装的对象无法修改对象的属性
function editName3() {
  person3Readonly.name = '孙七';
}

// readonly包装的对象无法修改对象本身
function editPerson3() {
  person3Readonly = {
    name: '周八'
  };
}

// 第五组数据
// 和 readonly() 不同，shallowReadonly没有深层级的转换：只有根层级的属性变为了只读。
// 属性的值都会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。
/* const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性会失败
state.foo++

// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false

// 这是可以通过的
state.nested.bar++ */
const sum4 = ref(0);
const sum4ShallowReadonly = shallowReadonly(sum4);
const person4 = reactive({
  name: '李四',
  device: {
    ip: '192.168.1.1',
    mac: '00:00:00:00:00:00'
  }
});
let person4ShallowReadonly = shallowReadonly(person4);

function changeSum4() {
  sum4.value++;
}

function changeSum4ShallowReadonly() {
  sum4ShallowReadonly.value++;
}

// shallowReadonly不能修改第一层的属性
function editName4() {
  person4ShallowReadonly.name = '孙七';
}

// shallowReadonly可以修改第二层的属性
function editIp4() {
  person4ShallowReadonly.device.ip = '192.168.1.2';
}

function editPerson4() {
  person4ShallowReadonly = {
    name: '周八',
    device: {
      ip: '192.168.1.2',
      mac: '10:00:00:00:00:00'
    }
  };
}

// 第六组数据
// toRaw() 可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象。
// 这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。
const sum5 = ref(0);
// toRaw()对ref()创建的代理对象无效！！！
const sum5ToRaw = toRaw(sum5);
const person5 = reactive({
  name: '李四',
  device: {
    ip: '192.168.1.1',
    mac: '00:00:00:00:00:00'
  }
});
let person5ToRaw = toRaw(person5);
console.log('person5', person5)
console.log('person5ToRaw', person5ToRaw)

function changeSum5() {
  sum5.value++;
}

function changeSum5ToRaw() {
  sum5ToRaw.value++
}

function editName5() {
  person5ToRaw.name = '孙七';
}

function editPerson5() {
  person5ToRaw = {
    name: '周八',
    device: {
      ip: '192.168.1.2',
      mac: '10:00:00:00:00:00'
    }
  };
}

// 第七组数据
// markRaw() 将一个对象标记为不可被转为代理。返回该对象本身。
// 只在根层能访问到原始值，所以如果把一个嵌套的、没有标记的原始对象设置成一个响应式对象，然后再次访问它，你获取到的是代理的版本。
let person6MarkRaw = markRaw({
  name: '李四',
  device: {
    ip: '192.168.1.1',
    mac: '00:00:00:00:00:00'
  }
});

const person6Reactive = reactive(person6MarkRaw);
console.log('person6MarkRaw', person6MarkRaw)
console.log('person6Reactive', person6Reactive)

function editName6() {
  person6MarkRaw.name = '孙七';
}

function editNameReactive6() {
  person6Reactive.name = '孙七111';
}

function editIp6() {
  person6MarkRaw.device.ip = '192.168.1.2';
}

function editPerson6() {
  person6MarkRaw = {
    name: '周八',
    device: {
      ip: '192.168.1.2',
      mac: '10:00:00:00:00:00'
    }
  };
}

// 第八组数据
// customRef():创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。
// ustomRef() 预期接收一个工厂函数作为参数，这个工厂函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。
// 一般来说，track() 应该在 get() 方法中调用，而 trigger() 应该在 set() 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。

import useCountCustomRef from './hooks/useCountCustomRef'
const { debunceCount } = useCountCustomRef(100)
</script>

<style scoped>
.app {
  background-color: #18e39af7;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin-bottom: 15px;
}
</style>
