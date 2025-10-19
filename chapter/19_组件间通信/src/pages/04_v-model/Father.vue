<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>username:{{ username }}</h4>
    <h4>password:{{ password }}</h4>
    <h4>email:{{ email }}</h4>
    <h4>phone:{{ phone }}</h4>
    <!-- v-model用在html标签上 -->
    <!-- <input type="text" v-model="username"> -->
    <!-- v-model相当于:vaue + @input事件 -->
    <!-- <input type="text" :value="username" @input="username = (<HTMLInputElement>$event.target).value"> -->

    <!-- v-model用在组件标签上 -->
     <!-- 自定义子组件上写v-model属性可以实现双向绑定，效果和下面的组件效果一样 -->
    <AtguiguInput
    v-model:uName.capitalize="username"
    v-model:pw="password"
    v-model:email.lazy.trim="email"
    v-model:phone.number.trim="phone"
    />
     <!-- 自定义子组件上写:modelValue和@update:modelValue属性可以双向绑定，
      不过需在子组件上的defineProps和defineEmits函数中分别加上modelValue和update:modelValue。
      数据传递：父组件通过 :modelValue="username" 将 username 数据传递给子组件的 modelValue prop
      数据同步：父组件通过 @update:modelValue="username = $event" 监听事件并更新本地数据
      数据更新：当子组件需要更新值时，通过 $emit('update:modelValue', newValue) 触发事件
       -->
    <!-- <AtguiguInput :modelValue="username" @update:modelValue="username = $event"
    /> -->

    <!-- 修改modelValue -->
    <!-- <AtguiguInput v-model:ming="username" v-model:mima="password"/> -->
  </div>
</template>

<script setup lang="ts" name="Father">
	import { ref } from "vue";
  import AtguiguInput from './AtguiguInput.vue'
  // 数据
  const username = ref('zhansgan')
  const password = ref('123456')
  const email = ref('1@123.com')
  const phone = ref('7610232')
</script>

<style scoped>
.father {
  padding: 20px;
  background-color: rgb(165, 164, 164);
  border-radius: 10px;
}
</style>
