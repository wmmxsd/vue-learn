<template>
  <!-- <input type="text" v-bind:value="modelValue"
    @input="emit('update:modelValue', (<HTMLInputElement>$event.target).value)"> -->

  <!-- <input
    type="text"
    :value="ming"
    @input="emit('update:ming',(<HTMLInputElement>$event.target).value)"
  >
  <br>
  <input
    type="text"
    :value="mima"
    @input="emit('update:mima',(<HTMLInputElement>$event.target).value)"
  > -->

  <!-- 从 Vue 3.4 开始，推荐的实现方式是使用 defineModel() 宏来接受父组件中的v-model数据，
   然后标签中直接使用 v-model 语法 -->
  <input type="text" v-model="uName">
  <input type="text" v-model="pw">
  <input type="text" v-model="email">
  <input type="text" v-model="phone">
</template>

<script setup lang="ts" name="AtguiguInput">
// defineProps(['modelValue', 'ming', 'mima'])

// const emit = defineEmits(['update:modelValue', 'update:ming', 'update:mima'])

// vue版本大于等于3.4使用defineModel() 宏来接受父组件中的v-model数据，这样标签中直接使用 v-model 组件来绑定数据
const [uName, uNameModifiers] = defineModel('uName')
console.log(uName, uNameModifiers)
const [pw, pwModifiers] = defineModel('pw')
const [email, emailModifiers] = defineModel('email')
console.log(email, emailModifiers)

// 我们可以给 defineModel() 传入 get 和 set 这两个选项
const [phone, phoneModifiers] = defineModel('phone', {
  set(value:string) {
    if (phoneModifiers.trim) {
      value = value.trim()
    }
    return value
  },
  get(value:string) {
    return value ? value : ''
  }
})
</script>

<style scoped>
input {
  border: 2px solid black;
  background-image: linear-gradient(45deg, red, yellow, green);
  height: 30px;
  font-size: 20px;
  color: white;
}
</style>
